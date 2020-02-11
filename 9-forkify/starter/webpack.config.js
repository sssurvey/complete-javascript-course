// Object for specfify settings
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'], // <-- entry for building the bunlde on the dev side
    output: {
        path: path.resolve(__dirname, 'dist/'), // <-- path to put the bundle, and res
        filename: 'js/bundle.js' // <-- the actual bundle.js
    },
    // mode: 'development' // <-- this allows us to not optimize too much when bundling
    //                     // i.e: not minify the code etc. Helps with the speed
    //                     // we can override this via the npm script with webpack
    //                     // and not do it here
    devServer: {
        contentBase: './dist', // <--- content to serve is set to the ./dist. Since
                               // since src is only for development, while the dist
                               // is for deployement.
                               // <-- this is for the dependency webpack-dev-server
                               // we don't really need live-server if we have this
                               // just keep in mind webpack, cli, server are seperate 
                               // dependencies
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,           // <--- test all js files
                exclude: /node_modules/, // <--- ignore test on node_modules
                use: {
                    loader: 'babel-loader' // <--- if .js, then we use babel loader
                }
            },
        ]
    }
};