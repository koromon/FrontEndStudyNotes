/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-10 22:43:50
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-12 17:55:07
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve(__dirname, ""),
      path.resolve(__dirname, "node_modules"),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
