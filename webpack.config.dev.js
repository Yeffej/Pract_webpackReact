const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@components": path.resolve(__dirname, "src/Components"),
            "@styles": path.resolve(__dirname, "src/Styles")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                   loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "html-loader" }
                ]
            },
            {
                test: /\.s?[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }) 
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        open: true,
        port: 3006
    }
}