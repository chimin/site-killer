const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TypingsBundlerPlugin = require('typings-bundler-plugin');

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './assets' }
            ]
        }),
        new TypingsBundlerPlugin({
            out: 'index.d.ts'
        })
    ],
    watchOptions: {
        ignored: /\/common\/dist\//
    }
};