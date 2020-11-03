const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('min-zip-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.ts',
        popup: './src/popup.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src',
                    filter: path => path.match('^.*\.(json|html|png)$')
                }
            ]
        }),
        new ZipPlugin({
            filename: './packed/site-killer'
        })
    ]
};