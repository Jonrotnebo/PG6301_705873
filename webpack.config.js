//Disclaimer: i did not write this file, its altered primaly from linked part, some of it is retrieved from other parts and altered.
//Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/client/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './public'
    }
};