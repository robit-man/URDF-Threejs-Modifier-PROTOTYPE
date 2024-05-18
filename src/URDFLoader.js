import * as THREE from 'three';
import { AxesHelper } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { URDFRobot, URDFJoint, URDFLink, makeURDFCollider } from './URDFClasses.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import Ammo from 'ammojs3';

const tempQuaternion = new THREE.Quaternion();
const tempEuler = new THREE.Euler();

function processTuple(val) {
    if (!val) return [0, 0, 0];
    return val.trim().split(/\s+/g).map(num => parseFloat(num));
}

function applyRotation(obj, rpy, additive = false) {
    if (!additive) obj.rotation.set(0, 0, 0);

    tempEuler.set(rpy[0], rpy[1], rpy[2], 'ZYX');
    tempQuaternion.setFromEuler(tempEuler);
    tempQuaternion.multiply(obj.quaternion);
    obj.quaternion.copy(tempQuaternion);
}

class URDFLoader {
    constructor(manager, allowMeshBVH = false) {
        this.manager = manager || THREE.DefaultLoadingManager;
        this.allowMeshBVH = allowMeshBVH;
        this.retryMap = {};
        this.physicsWorld = null;
        this.physicsObjects = [];
        this.tempTransform = null;
        this.Ammo = null;
    }

    load(urdf, onComplete, onProgress, onError, options) {
        const manager = this.manager;
        const workingPath = THREE.LoaderUtils.extractUrlBase(urdf);
        const urdfPath = this.manager.resolveURL(urdf);
        const errors = {};
        let managerOnErrorDefault = function () {};
        let managerOnProgressDefault = function () {};
        let managerOnLoadDefault = function () {};
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
        manager.onError = function (url) {
            errors[url] = 'Error in loading resource';
            if (onError) {
                onError({
                    url,
                    retry: that.retryMap[url],
                });
            }
            managerOnErrorDefault(url);
        };

        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            if (onProgress) {
                onProgress(url, itemsLoaded, itemsTotal);
            }
            managerOnProgressDefault(url, itemsLoaded, itemsTotal);
        };

        manager.onLoad = function () {
            if (onComplete) {
                const partialErrors = Object.keys(errors).length === 0 ? undefined : errors;
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

        function resolvePath(path) {
            if (!/^package:\/\//.test(path)) {
                return workingPath ? workingPath + path : path;
            }

            const [targetPkg, relPath] = path.replace(/^package:\/\//, '').split(/\/(.+)/);
            if (typeof packages === 'string') {
                if (packages.endsWith(targetPkg)) {
                    return packages + '/' + relPath;
                } else {
                    return packages + '/' + targetPkg + '/' + relPath;
                }
            } else if (typeof packages === 'object') {
                if (targetPkg in packages) {
                    return packages[targetPkg] + '/' + relPath;
                } else {
                    console.error(`URDFLoader : ${targetPkg} not found in provided package list.`);
                    return null;
                }
            }
        }

        const processUrdf = data => {
            const parser = new DOMParser();
            const urdf = parser.parseFromString(data, 'text/xml');
            const children = [...urdf.children];
            const robotNode = children.filter(c => c.nodeName === 'robot').pop();
            return processRobot.call(this, robotNode);
        };

        function processRobot(robot) {
            const robotNodes = [...robot.children];
            const links = robotNodes.filter(c => c.nodeName.toLowerCase() === 'link');
            const joints = robotNodes.filter(c => c.nodeName.toLowerCase() === 'joint');
            const materials = robotNodes.filter(c => c.nodeName.toLowerCase() === 'material');
            const obj = new URDFRobot();

            obj.robotName = robot.getAttribute('name');
            obj.urdfRobotNode = robot;

            materials.forEach(m => {
                const name = m.getAttribute('name');
                materialMap[name] = processMaterial.call(this, m);
            });

            links.forEach(l => {
                const name = l.getAttribute('name');
                const isRoot = robot.querySelector(`child[link="${name}"]`) === null;
                linkMap[name] = processLink.call(this, l, isRoot ? obj : null);
            });

            joints.forEach(j => {
                const name = j.getAttribute('name');
                jointMap[name] = processJoint.call(this, j);
            });

            obj.joints = jointMap;
            obj.links = linkMap;

            return obj;
        }

        function processJoint(joint) {
            const children = [...joint.children];
            const jointType = joint.getAttribute('type');
            const obj = new URDFJoint();
            obj.urdfNode = joint;
            obj.name = joint.getAttribute('name');
            obj.jointType = jointType;

            let parent = null;
            let child = null;
            let xyz = [0, 0, 0];
            let rpy = [0, 0, 0];

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

            if (parent && parent instanceof THREE.Object3D) {
                parent.add(obj);
            }
            if (child && child instanceof THREE.Object3D) {
                obj.add(child);
            }
            applyRotation(obj, rpy);
            obj.position.set(xyz[0], xyz[1], xyz[2]);

            const jointAxesHelper = new AxesHelper(0.5);
            obj.add(jointAxesHelper);

            const axisNode = children.filter(n => n.nodeName.toLowerCase() === 'axis')[0];
            if (axisNode) {
                const axisXYZ = axisNode.getAttribute('xyz').split(/\s+/g).map(num => parseFloat(num));
                obj.axis = new THREE.Vector3(axisXYZ[0], axisXYZ[1], axisXYZ[2]);
                obj.axis.normalize();
            }

            return obj;
        }

        function processLink(link, target = null) {
            if (target === null) {
                target = new URDFLink();
            }

            const children = [...link.children];
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

            const linkAxesHelper = new AxesHelper(0.5);
            target.add(linkAxesHelper);

            this.addPhysicsToLink(target);

            return target;
        }

        function processMaterial(node) {
            const matNodes = [...node.children];
            const material = new THREE.MeshPhongMaterial();

            material.name = node.getAttribute('name') || '';
            matNodes.forEach(n => {
                const type = n.nodeName.toLowerCase();
                if (type === 'color') {
                    const rgba = n.getAttribute('rgba').split(/\s/g).map(v => parseFloat(v));
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

        function processLinkElement(vn, linkObj, materialMap = {}) {
            const isCollisionNode = vn.nodeName.toLowerCase() === 'collision';
            let xyz = [0, 0, 0];
            let rpy = [0, 0, 0];
            let scale = [1, 1, 1];

            const children = [...vn.children];
            let material = null;
            let primitiveModel = null;

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

            if (primitiveModel) {
                applyRotation(primitiveModel, rpy, true);
                primitiveModel.position.set(xyz[0], xyz[1], xyz[2]);
            }
        }

        return processUrdf(content);
    }

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
            console.warn(`URDFLoader: Could not load model at ${path}.\nNo loader available`);
        }
    }

    addPhysicsToLink(link) {
        if (!this.Ammo) return;

        const shape = new this.Ammo.btBoxShape(new this.Ammo.btVector3(0.5, 0.5, 0.5));
        const transform = new this.Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new this.Ammo.btVector3(link.position.x, link.position.y, link.position.z));

        const mass = 1;
        const localInertia = new this.Ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);

        const motionState = new this.Ammo.btDefaultMotionState(transform);
        const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        const body = new this.Ammo.btRigidBody(rbInfo);

        this.physicsWorld.addRigidBody(body);
        this.physicsObjects.push({ threeObject: link, body });
    }

    initPhysics() {
        Ammo().then((AmmoLib) => {
            this.Ammo = AmmoLib;

            const collisionConfiguration = new AmmoLib.btDefaultCollisionConfiguration();
            const dispatcher = new AmmoLib.btCollisionDispatcher(collisionConfiguration);
            const overlappingPairCache = new AmmoLib.btDbvtBroadphase();
            const solver = new AmmoLib.btSequentialImpulseConstraintSolver();
            this.physicsWorld = new AmmoLib.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
            this.physicsWorld.setGravity(new AmmoLib.btVector3(0, -9.82, 0));

            this.physicsObjects = [];
            this.tempTransform = new AmmoLib.btTransform();

            this.initGround();
        });
    }

    initGround() {
        if (!this.Ammo) return;

        const groundShape = new this.Ammo.btBoxShape(new this.Ammo.btVector3(50, 1, 50));
        const groundTransform = new this.Ammo.btTransform();
        groundTransform.setIdentity();
        groundTransform.setOrigin(new this.Ammo.btVector3(0, -1, 0));

        const mass = 0;
        const localInertia = new this.Ammo.btVector3(0, 0, 0);
        const myMotionState = new this.Ammo.btDefaultMotionState(groundTransform);
        const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
        const body = new this.Ammo.btRigidBody(rbInfo);

        this.physicsWorld.addRigidBody(body);
    }

    updatePhysics() {
        if (!this.physicsWorld) return;

        const deltaTime = 1 / 60;
        this.physicsWorld.stepSimulation(deltaTime, 10);

        this.physicsObjects.forEach(obj => {
            const { threeObject, body } = obj;
            const ms = body.getMotionState();
            if (ms) {
                ms.getWorldTransform(this.tempTransform);
                const p = this.tempTransform.getOrigin();
                const q = this.tempTransform.getRotation();
                threeObject.position.set(p.x(), p.y(), p.z());
                threeObject.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }
        });
    }
}

URDFLoader.prototype.parseFromString = function(urdfString, options) {
    try {
        const parser = new DOMParser();
        const urdfDom = parser.parseFromString(urdfString, "text/xml");

        const model = this.parse(urdfDom, options);

        if (options.onComplete) {
            options.onComplete(model);
        }
    } catch (error) {
        if (options.onError) {
            options.onError(error);
        }
    }
};

URDFLoader.prototype.loadFromString = function(urdfString, onComplete) {
    try {
        const parser = new DOMParser();
        const urdfDOM = parser.parseFromString(urdfString, "text/xml");
        const model = this.parse(urdfDOM, {});
        if (onComplete) {
            onComplete(model);
        }
    } catch (error) {
        console.error('Failed to parse URDF string:', error);
    }
};

URDFLoader.prototype.applyUpdates = function () {
    if (window.model) {
        window.model.refreshScene();
    }
};

function animate(loader, renderer, scene, camera) {
    requestAnimationFrame(() => animate(loader, renderer, scene, camera));

    loader.updatePhysics();
    renderer.render(scene, camera);
}

const loader = new URDFLoader();
loader.initPhysics();

const urdfPath = '/urdf/dropbear/urdf/dropbear.urdf';  // Update this with the actual path to your URDF file
loader.load(urdfPath, (robot) => {
    if (!robot) {
        console.error('Failed to load URDF model.');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(robot);
    robot.traverse(link => {
        if (link.isURDFLink) {
            loader.addPhysicsToLink(link);
        }
    });

    camera.position.z = 5;

    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.position.set(0, 5, 0);
    scene.add(ballMesh);

    const ballShape = new loader.Ammo.btSphereShape(0.5);
    const ballTransform = new loader.Ammo.btTransform();
    ballTransform.setIdentity();
    ballTransform.setOrigin(new loader.Ammo.btVector3(ballMesh.position.x, ballMesh.position.y, ballMesh.position.z));

    const ballMass = 1;
    const ballLocalInertia = new loader.Ammo.btVector3(0, 0, 0);
    ballShape.calculateLocalInertia(ballMass, ballLocalInertia);

    const ballMotionState = new loader.Ammo.btDefaultMotionState(ballTransform);
    const ballRbInfo = new loader.Ammo.btRigidBodyConstructionInfo(ballMass, ballMotionState, ballShape, ballLocalInertia);
    const ballBody = new loader.Ammo.btRigidBody(ballRbInfo);

    loader.physicsWorld.addRigidBody(ballBody);
    loader.physicsObjects.push({ threeObject: ballMesh, body: ballBody });

    animate(loader, renderer, scene, camera);
});
