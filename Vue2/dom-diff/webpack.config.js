/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-07-25 16:19:40
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-07-25 16:33:06
 */
const HtmlWebpackPlugin = require("html-webpack-plugin"),
  { resolve } = require("path");

module.exports = {
  entry: "./src/js/index.js",
  mode: "development",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src/index.html"),
    }),
  ],
  devServer: {
    contentBase: "./",
    open: true,
  },
};
