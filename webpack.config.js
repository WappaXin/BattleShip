const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watch } = require("fs/promises");
const { watchFile } = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: {
        passAndPlay: "./src/passAndPlay.js",
        playComputer: "./src/playComputer.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html" , "./src/passAndPlay.html" , "./src/playComputer.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html",
        }),
        new HtmlWebpackPlugin({
            filename: "passAndPlay.html",
            template: "./src/passAndPlay.html",
            chunks: ["passAndPlay"]
        }),
        new HtmlWebpackPlugin({
            filename: "playComputer.html",
            template: "./src/playComputer.html",
            chunks: ["playComputer"]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
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