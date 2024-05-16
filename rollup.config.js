const path = require('path');
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import svg from 'rollup-plugin-svg';

const files = {
    URDFLoader: 'URDFLoader.js',
    URDFClasses: 'URDFClasses.js',
    URDFViewer: 'urdf-viewer-element.js',
    URDFManipulator: 'urdf-manipulator-element.js',
};

const isExternal = p => !!/^three/.test(p);

export default Object.entries(files).map(([name, file]) => {

    const inputPath = path.join(__dirname, `./src/${file}`);
    const outputPath = path.join(__dirname, `./umd/${file}`);

    return {

        input: inputPath,
        treeshake: false,
        external: p => isExternal(p),
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env'],
            }),
            commonjs(),
            svg() // Add the SVG plugin here
        ],

        output: {

            name,
            extend: true,
            format: 'umd',
            file: outputPath,
            sourcemap: true,

            globals: path => /^three/.test(path) ? 'THREE' : null,

        },

    };
});
