const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'frontend'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'index.js'
     },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                },

            },
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
};