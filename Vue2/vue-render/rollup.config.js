/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-02 20:13:53
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-02 20:24:37
 */
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./src/index.js",
  output: {
    format: "umd",
    name: "Vue",
    file: "dist/umd/vue.js",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      open: true,
      port: 8019,
      contentBase: "",
      openPage: "/index.html",
    }),
    commonjs(),
  ],
};
