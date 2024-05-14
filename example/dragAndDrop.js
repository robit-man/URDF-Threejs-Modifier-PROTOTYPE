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

document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('dragenter', e => e.preventDefault());
document.addEventListener('drop', e => {
    e.preventDefault();

    // Convert the DataTransfer object to files
    dataTransferToFiles(e.dataTransfer)
        .then(files => {
            // Normalize and clean file paths
            const cleanFilePath = path => {
                return path.replace(/\\/g, '/')
                    .split(/\//g)
                    .reduce((acc, el) => {
                        if (el === '..') acc.pop();
                        else if (el !== '.') acc.push(el);
                        return acc;
                    }, [])
                    .join('/');
            };

            const fileNames = Object.keys(files).map(n => cleanFilePath(n));
            console.log("All uploaded files:", fileNames); // Log all files that were uploaded

            // Set URL modifier for THREE.js loader based on the dragged files
            viewer.urlModifierFunc = url => {
                const cleaned = cleanFilePath(url.replace(viewer.package, ''));
                const fileName = fileNames.find(name => {
                    const len = Math.min(name.length, cleaned.length);
                    return cleaned.substr(cleaned.length - len) === name.substr(name.length - len);
                });

                if (fileName) {
                    const blobUrl = URL.createObjectURL(files[fileName]);
                    console.log(`Mapped URL for ${fileName}:`, blobUrl); // Log the blob URL
                    requestAnimationFrame(() => URL.revokeObjectURL(blobUrl));
                    return blobUrl;
                }

                return url;
            };

            // Identify and load the URDF file content
            const urdfEntry = Object.entries(files).find(([path]) => path.endsWith('.urdf'));
            if (urdfEntry) {
                const [path, file] = urdfEntry;
                console.log("URDF file path:", path); // Log the path of the URDF file

                const reader = new FileReader();
                reader.onload = () => {
                    const urdfContent = reader.result;
                    console.log("URDF Content:", urdfContent); // Log the contents of the URDF file
                    viewer.urdfContent = urdfContent; // Assuming you have a way to store this in your viewer
                };
                reader.onerror = () => console.error("Failed to read the URDF file.");
                reader.readAsText(file);
            }

            // Setting viewer properties
            viewer.up = '+Z';
            document.getElementById('up-select').value = viewer.up;
            setColor('#263238');
            animToggle.classList.remove('checked');
        });
});
