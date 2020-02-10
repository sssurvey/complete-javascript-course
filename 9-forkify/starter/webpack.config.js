// Object for specfify settings
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    // mode: 'development' // <-- this allows us to not optimize too much when bundling
    //                     // i.e: not minify the code etc. Helps with the speed
    //                     // we can override this via the npm script with webpack
    //                     // and not do it here
};