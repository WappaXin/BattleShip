const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watch } = require("fs/promises");
const { watchFile } = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/template.html",
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader , "css-loader"],
            },
        ],
    },
};