/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-02 20:20:07
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-03 00:27:04
 */
import { initMixin } from "./init";

class Vue {
  constructor(options) {
    this._init(options); // 相关初始化设置，这小节只专注数据劫持
  }
}
initMixin(Vue);

// 模板： render > template > html模板
let vm = new Vue({
  el: "#app",
  data() {
    return {
      name: "kk",
      age: 18,
      info: {
        job: "student",
        friends: [
          {
            id: 1,
            name: "xiaohong",
          },
          {
            id: 2,
            name: "xiaoming",
          },
        ],
      },
      hobby: ["piano", "travel", "film"],
    };
  },
});
