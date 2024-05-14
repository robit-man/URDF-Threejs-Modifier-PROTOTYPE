/* globals animToggle viewer setColor */

// Converts a datatransfer structer into an object with all paths and files
// listed out. Returns a promise that resolves with the file structure.
function dataTransferToFiles(dataTransfer) {

    if (!(dataTransfer instanceof DataTransfer)) {

        throw new Error('Data must be of type "DataTransfer"', dataTransfer);

    }

    const files = {};

    // recurse down the webkit file structure resolving
    // the paths to files names to store in the `files`
    // object
    function recurseDirectory(item) {

        if (item.isFile) {

            return new Promise(resolve => {
                item.file(file => {
                    files[item.fullPath] = file;
                    resolve();
                });
            });

        } else {

            const reader = item.createReader();

            return new Promise(resolve => {

                const promises = [];
                reader.readEntries(et => {
                    et.forEach(e => {
                        promises.push(recurseDirectory(e));
                    });

                    Promise.all(promises).then(() => resolve());
                });
            });
        }
    }

    return new Promise(resolve => {

        // Traverse down the tree and add the files into the zip
        const dtitems = dataTransfer.items && [...dataTransfer.items];
        const dtfiles = [...dataTransfer.files];

        if (dtitems && dtitems.length && dtitems[0].webkitGetAsEntry) {

            const promises = [];
            for (let i = 0; i < dtitems.length; i++) {
                const item = dtitems[i];
                const entry = item.webkitGetAsEntry();

                promises.push(recurseDirectory(entry));

            }
            Promise.all(promises).then(() => resolve(files));

        } else {

            // add a '/' prefix to math the file directory entry
            // on webkit browsers
            dtfiles
                .filter(f => f.size !== 0)
                .forEach(f => files['/' + f.name] = f);

            resolve(files);

        }
    });
}
/* globals animToggle viewer setColor URDFLoader */

document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('dragenter', e => e.preventDefault());
document.addEventListener('drop', e => {
    e.preventDefault();

    // Function to process the dataTransfer structure into an object with all paths and files
    dataTransferToFiles(e.dataTransfer).then(files => {
        // Function to normalize and clean file paths
        const cleanFilePath = path => path.replace(/\\/g, '/').split(/\//g).reduce((acc, el) => {
            if (el === '..') acc.pop();
            else if (el !== '.') acc.push(el);
            return acc;
        }, []).join('/');

        const fileNames = Object.keys(files).map(cleanFilePath);
        console.log("All uploaded files:", fileNames); // Log all files that were uploaded

        // Set URL modifier for THREE.js loader based on the dragged files
        viewer.urlModifierFunc = url => {
            const cleaned = cleanFilePath(url.replace(viewer.package, ''));
            const fileName = fileNames.find(name => cleaned.endsWith(name));
            if (fileName) {
                const blobUrl = URL.createObjectURL(files[fileName]);
                console.log(`Mapped URL for ${fileName}:`, blobUrl); // Log the blob URL
                return blobUrl;
            }
            return url;
        };

        // Find and load the URDF file content
        const urdfEntry = Object.entries(files).find(([path]) => path.endsWith('.urdf'));
        if (urdfEntry) {
            const [path, file] = urdfEntry;
            console.log("URDF file path:", path); // Log the path of the URDF file

            // Loading the URDF content directly if URDFLoader supports it
            if (viewer.urdfLoader && typeof viewer.urdfLoader.loadFromString === 'function') {
                const reader = new FileReader();
                reader.onload = () => {
                    const urdfContent = reader.result;
                    console.log("Loaded URDF Content:", urdfContent); // Log the contents of the URDF file
                    viewer.urdfLoader.loadFromString(urdfContent, function(model) {
                        viewer.setModel(model);  // Update the viewer with the new model
                        viewer.dispatchEvent(new Event('urdf-changed'));
                    });
                };
                reader.onerror = () => console.error("Failed to read the URDF file.");
                reader.readAsText(file);
            } else {
                console.error("URDF loader is not configured to load from string.");
            }
        }

        // Update viewer properties
        viewer.up = '+Z';
        document.getElementById('up-select').value = viewer.up;
        setColor('#263238');
        animToggle.classList.remove('checked');
    });
});


// Helper function to process DataTransfer into a structured object of files
function dataTransferToFiles(dataTransfer) {
    if (!(dataTransfer instanceof DataTransfer)) {
        throw new Error('Data must be of type "DataTransfer"', dataTransfer);
    }

    const files = {};

    function recurseDirectory(item) {
        if (item.isFile) {
            return new Promise(resolve => item.file(file => {
                files[item.fullPath] = file;
                resolve();
            }));
        } else {
            const reader = item.createReader();
            return new Promise(resolve => {
                reader.readEntries(entries => {
                    Promise.all(entries.map(recurseDirectory)).then(() => resolve());
                });
            });
        }
    }

    return new Promise(resolve => {
        const dtItems = dataTransfer.items;
        if (dtItems && dtItems.length && dtItems[0].webkitGetAsEntry) {
            const entries = Array.from(dtItems).map(item => item.webkitGetAsEntry());
            Promise.all(entries.map(recurseDirectory)).then(() => resolve(files));
        } else {
            Array.from(dataTransfer.files).forEach(file => {
                files['/' + file.name] = file;
            });
            resolve(files);
        }
    });
}
