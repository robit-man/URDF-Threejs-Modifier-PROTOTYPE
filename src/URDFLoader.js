import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { URDFRobot, URDFJoint, URDFLink, makeURDFCollider } from './URDFClasses.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

/*
Reference coordinate frames for THREE.js and ROS.
Both coordinate systems are right handed so the URDF is instantiated without
frame transforms. The resulting model can be rotated to rectify the proper up,
right, and forward directions

THREE.js
   Y
   |
   |
   .-----X
 ／
Z

ROS URDf
       Z
       |   X
       | ／
 Y-----.

*/

const tempQuaternion = new THREE.Quaternion();
const tempEuler = new THREE.Euler();

// take a vector "x y z" and process it into
// an array [x, y, z]
function processTuple(val) {

    if (!val) return [0, 0, 0];
    return val.trim().split(/\s+/g).map(num => parseFloat(num));

}

// applies a rotation a threejs object in URDF order
function applyRotation(obj, rpy, additive = false) {

    // if additive is true the rotation is applied in
    // addition to the existing rotation
    if (!additive) obj.rotation.set(0, 0, 0);

    tempEuler.set(rpy[0], rpy[1], rpy[2], 'ZYX');
    tempQuaternion.setFromEuler(tempEuler);
    tempQuaternion.multiply(obj.quaternion);
    obj.quaternion.copy(tempQuaternion);

}

/* URDFLoader Class */
// Loads and reads a URDF file into a THREEjs Object3D format
export default
class URDFLoader {

    constructor(manager, allowMeshBVH = false) {

        this.manager = manager || THREE.DefaultLoadingManager;
        this.allowMeshBVH = allowMeshBVH;
        this.retryMap = {};

    }

    /* Public API */
    // urdf:    The path to the URDF within the package OR absolute
    // onComplete:      Callback that is passed the model once loaded
    load(urdf, onComplete, onProgress, onError, options) {

        // Check if a full URI is specified before
        // prepending the package info
        const manager = this.manager;
        const workingPath = THREE.LoaderUtils.extractUrlBase(urdf);
        const urdfPath = this.manager.resolveURL(urdf);

        const errors = {};

        let managerOnErrorDefault = function() {};
        let managerOnProgressDefault = function() {};
        let managerOnLoadDefault = function() {};
        let model;

        if (manager.onError) {

            managerOnErrorDefault = manager.onProgress.bind(manager);

        }

        if (manager.onProgress) {

            managerOnProgressDefault = manager.onProgress.bind(manager);

        }

        if (manager.onLoad) {

            managerOnLoadDefault = manager.onLoad.bind(manager);

        }

        const that = this;
        manager.onError = function(url) {

            errors[url] = 'Error in loading resource';

            if (onError) {

                onError({
                    url,
                    retry: that.retryMap[url],
                });

            }

            managerOnErrorDefault(url);

        };

        manager.onProgress = function(url, itemsLoaded, itemsTotal) {

            if (onProgress) {

                onProgress(url, itemsLoaded, itemsTotal);

            }

            managerOnProgressDefault(url, itemsLoaded, itemsTotal);

        };

        manager.onLoad = function() {

            if (onComplete) {

                const partialErrors = Object.keys(errors).length === 0
                    ? undefined
                    : errors;

                onComplete(model, partialErrors);

            }

            managerOnLoadDefault();

        };

        options = Object.assign({
            workingPath,
        }, options);

        manager.itemStart(urdfPath);
        fetch(urdfPath, options.fetchOptions)
            .then(res => res.text())
            .then(data => {

                model = this.parse(data, options);
                window.model = model;
                manager.itemEnd(urdfPath);

            })
            .catch(e => {

                console.error('URDFLoader: Error parsing file.', e);
                manager.itemError(urdfPath);
                manager.itemEnd(urdfPath);

            });

    }

    parse(content, options = {}) {

        const packages = options.packages || '';
        const loadMeshCb = options.loadMeshCb || this.defaultMeshLoader.bind(this);
        const workingPath = options.workingPath || '';
        const parseVisual = ('parseVisual' in options) ? options.parseVisual : true;
        const parseCollision = options.parseCollision || false;
        const manager = this.manager;
        const linkMap = {};
        const jointMap = {};
        const materialMap = {};

        // Resolves the path of mesh files
        function resolvePath(path) {

            if (!/^package:\/\//.test(path)) {

                return workingPath ? workingPath + path : path;

            }

            // Remove "package://" keyword and split meshPath at the first slash
            const [targetPkg, relPath] = path.replace(/^package:\/\//, '').split(/\/(.+)/);

            if (typeof packages === 'string') {

                // "pkg" is one single package
                if (packages.endsWith(targetPkg)) {

                    // "pkg" is the target package
                    return packages + '/' + relPath;

                } else {

                    // Assume "pkg" is the target package's parent directory
                    return packages + '/' + targetPkg + '/' + relPath;

                }

            } else if (typeof packages === 'object') {

                // "pkg" is a map of packages
                if (targetPkg in packages) {

                    return packages[targetPkg] + '/' + relPath;

                } else {

                    console.error(`URDFLoader : ${ targetPkg } not found in provided package list.`);
                    return null;

                }

            }

        }

        // Process the URDF text format
        const processUrdf = data => {

            const parser = new DOMParser();
            const urdf = parser.parseFromString(data, 'text/xml');
            const children = [ ...urdf.children ];

            const robotNode = children.filter(c => c.nodeName === 'robot').pop();
            return processRobot.call(this, robotNode);

        };

        // Process the <robot> node
        function processRobot(robot) {

            const robotNodes = [ ...robot.children ];
            const links = robotNodes.filter(c => c.nodeName.toLowerCase() === 'link');
            const joints = robotNodes.filter(c => c.nodeName.toLowerCase() === 'joint');
            const materials = robotNodes.filter(c => c.nodeName.toLowerCase() === 'material');
            const obj = new URDFRobot();

            obj.robotName = robot.getAttribute('name');
            obj.urdfRobotNode = robot;

            // Create the <material> map
            materials.forEach(m => {

                const name = m.getAttribute('name');
                materialMap[name] = processMaterial.call(this, m);

            });

            // Create the <link> map
            links.forEach(l => {

                const name = l.getAttribute('name');
                const isRoot = robot.querySelector(`child[link="${ name }"]`) === null;
                linkMap[name] = processLink.call(this, l, isRoot ? obj : null);

            });

            // Create the <joint> map
            joints.forEach(j => {

                const name = j.getAttribute('name');
                jointMap[name] = processJoint.call(this, j);

            });

            obj.joints = jointMap;
            obj.links = linkMap;

            return obj;

        }

        // Process joint nodes and parent them
        function processJoint(joint) {

            const children = [ ...joint.children ];
            const jointType = joint.getAttribute('type');
            const obj = new URDFJoint();
            obj.urdfNode = joint;
            obj.name = joint.getAttribute('name');
            obj.jointType = jointType;

            let parent = null;
            let child = null;
            let xyz = [0, 0, 0];
            let rpy = [0, 0, 0];

            // Extract the attributes
            children.forEach(n => {

                const type = n.nodeName.toLowerCase();
                if (type === 'origin') {

                    xyz = processTuple(n.getAttribute('xyz'));
                    rpy = processTuple(n.getAttribute('rpy'));

                } else if (type === 'child') {

                    child = linkMap[n.getAttribute('link')];

                } else if (type === 'parent') {

                    parent = linkMap[n.getAttribute('link')];

                } else if (type === 'limit') {

                    obj.limit.lower = parseFloat(n.getAttribute('lower') || obj.limit.lower);
                    obj.limit.upper = parseFloat(n.getAttribute('upper') || obj.limit.upper);

                }

            });

            // Join the links
            parent.add(obj);
            obj.add(child);
            applyRotation(obj, rpy);
            obj.position.set(xyz[0], xyz[1], xyz[2]);

            // Set up the rotate function
            const axisNode = children.filter(n => n.nodeName.toLowerCase() === 'axis')[0];

            if (axisNode) {

                const axisXYZ = axisNode.getAttribute('xyz').split(/\s+/g).map(num => parseFloat(num));
                obj.axis = new THREE.Vector3(axisXYZ[0], axisXYZ[1], axisXYZ[2]);
                obj.axis.normalize();

            }

            return obj;

        }

        // Process the <link> nodes
        function processLink(link, target = null) {

            if (target === null) {

                target = new URDFLink();

            }

            const children = [ ...link.children ];
            target.name = link.getAttribute('name');
            target.urdfNode = link;

            if (parseVisual) {
                const visualNodes = children.filter(n => n.nodeName.toLowerCase() === 'visual');
                visualNodes.forEach(vn => processLinkElement.call(this, vn, target, materialMap));
            }
            if (parseCollision) {
                const collisionNodes = children.filter(n => n.nodeName.toLowerCase() === 'collision');
                collisionNodes.forEach(vn => processLinkElement.call(this, vn, target));
            }

            return target;

        }

        function processMaterial(node) {

            const matNodes = [ ...node.children ];
            const material = new THREE.MeshPhongMaterial();

            material.name = node.getAttribute('name') || '';
            matNodes.forEach(n => {

                const type = n.nodeName.toLowerCase();
                if (type === 'color') {

                    const rgba =
                        n
                            .getAttribute('rgba')
                            .split(/\s/g)
                            .map(v => parseFloat(v));

                    material.color.setRGB(rgba[0], rgba[1], rgba[2]);
                    material.opacity = rgba[3];
                    material.transparent = rgba[3] < 1;

                } else if (type === 'texture') {

                    const loader = new THREE.TextureLoader(manager);
                    const filename = n.getAttribute('filename');
                    const filePath = resolvePath(filename);
                    const onError = () => {
                        this.retryMap[filePath] = () => loader.load(filePath, () => null, () => null, onError);
                    };
                    material.map = loader.load(filePath, () => null, () => null, onError);

                }
            });

            return material;

        }

        // Process the visual and collision nodes into meshes
        function processLinkElement(vn, linkObj, materialMap = {}) {

            const isCollisionNode = vn.nodeName.toLowerCase() === 'collision';
            let xyz = [0, 0, 0];
            let rpy = [0, 0, 0];
            let scale = [1, 1, 1];

            const children = [ ...vn.children ];
            let material = null;
            let primitiveModel = null;

            // get the material first
            const materialNode = children.filter(n => n.nodeName.toLowerCase() === 'material')[0];
            if (materialNode) {

                const name = materialNode.getAttribute('name');
                if (name && name in materialMap) {

                    material = materialMap[name];

                } else {

                    material = processMaterial.call(this, materialNode);

                }

            } else {

                material = new THREE.MeshPhongMaterial();

            }

            children.forEach(n => {

                const type = n.nodeName.toLowerCase();
                if (type === 'geometry') {

                    const geoType = n.children[0].nodeName.toLowerCase();
                    if (geoType === 'mesh') {

                        const filename = n.children[0].getAttribute('filename');
                        const filePath = resolvePath(filename);

                        // file path is null if a package directory is not provided.
                        if (filePath !== null) {

                            const scaleAttr = n.children[0].getAttribute('scale');
                            if (scaleAttr) scale = processTuple(scaleAttr);

                            const cb = (obj, err) => {

                                if (err) {

                                    console.error('URDFLoader: Error loading mesh.', err);
                                    this.retryMap[filePath] = () => loadMeshCb(filePath, manager, cb);

                                } else if (obj) {

                                    if (obj instanceof THREE.Mesh) {

                                        obj.material = material;
                                        if (this.allowMeshBVH) {
                                            obj.raycast = acceleratedRaycast;
                                            obj.geometry.boundsTree = new MeshBVH(obj.geometry);
                                        }
                                    }

                                    linkObj.add(obj);

                                    obj.position.set(xyz[0], xyz[1], xyz[2]);
                                    obj.rotation.set(0, 0, 0);

                                    // multiply the existing scale by the scale components because
                                    // the loaded model could have important scale values already applied
                                    // to the root. Collada files, for example, can load in with a scale
                                    // to convert the model units to meters.
                                    obj.scale.x *= scale[0];
                                    obj.scale.y *= scale[1];
                                    obj.scale.z *= scale[2];

                                    applyRotation(obj, rpy);

                                    if (isCollisionNode) {

                                        makeURDFCollider(obj);

                                    }

                                }

                            };
                            loadMeshCb(filePath, manager, cb);

                        }

                    } else if (geoType === 'box') {

                        primitiveModel = new THREE.Mesh();
                        primitiveModel.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                        primitiveModel.material = material;

                        if (this.allowMeshBVH) {
                            primitiveModel.raycast = acceleratedRaycast;
                            primitiveModel.geometry.boundsTree = new MeshBVH(primitiveModel.geometry);
                        }

                        const size = processTuple(n.children[0].getAttribute('size'));

                        linkObj.add(primitiveModel);
                        primitiveModel.scale.set(size[0], size[1], size[2]);

                        if (isCollisionNode) {

                            makeURDFCollider(primitiveModel);

                        }

                    } else if (geoType === 'sphere') {

                        primitiveModel = new THREE.Mesh();
                        primitiveModel.geometry = new THREE.SphereBufferGeometry(1, 30, 30);
                        primitiveModel.material = material;

                        if (this.allowMeshBVH) {
                            primitiveModel.raycast = acceleratedRaycast;
                            primitiveModel.geometry.boundsTree = new MeshBVH(primitiveModel.geometry);
                        }

                        const radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                        primitiveModel.scale.set(radius, radius, radius);

                        linkObj.add(primitiveModel);

                        if (isCollisionNode) {

                            makeURDFCollider(primitiveModel);

                        }

                    } else if (geoType === 'cylinder') {

                        primitiveModel = new THREE.Mesh();
                        primitiveModel.geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 30);
                        primitiveModel.material = material;

                        if (this.allowMeshBVH) {
                            primitiveModel.raycast = acceleratedRaycast;
                            primitiveModel.geometry.boundsTree = new MeshBVH(primitiveModel.geometry);
                        }

                        const radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                        const length = parseFloat(n.children[0].getAttribute('length')) || 0;
                        primitiveModel.scale.set(radius, length, radius);
                        primitiveModel.rotation.set(Math.PI / 2, 0, 0);

                        linkObj.add(primitiveModel);

                        if (isCollisionNode) {

                            makeURDFCollider(primitiveModel);

                        }

                    }

                } else if (type === 'origin') {

                    xyz = processTuple(n.getAttribute('xyz'));
                    rpy = processTuple(n.getAttribute('rpy'));

                }

            });

            // apply the position and rotation to the primitive geometry after
            // the fact because it's guaranteed to have been scraped from the child
            // nodes by this point
            if (primitiveModel) {

                applyRotation(primitiveModel, rpy, true);
                primitiveModel.position.set(xyz[0], xyz[1], xyz[2]);

            }

        }

        return processUrdf(content);

    }

    // Default mesh loading function
    defaultMeshLoader(path, manager, done) {

        if (/\.stl(?:\?|$)/i.test(path)) {

            const loader = new STLLoader(manager);
            loader.load(path, geom => {
                const mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial());
                done(mesh);
            });

        } else if (/\.dae(?:\?|$)/i.test(path)) {

            const loader = new ColladaLoader(manager);
            loader.load(path, dae => done(dae.scene));

        } else {

            console.warn(`URDFLoader: Could not load model at ${ path }.\nNo loader available`);

        }

    }

};
