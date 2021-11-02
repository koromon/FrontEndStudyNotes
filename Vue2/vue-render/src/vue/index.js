/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-10 22:46:34
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-11 00:24:00
 */
import { initState } from "./init";

class Vue {
  constructor(options) {
    this._init(options); // 相关初始化设置，这小节只专注数据劫持
  }
  _init(options) {
    const vm = this; // 实例
    vm.$options = options;
    initState(vm);
  }
}

export default Vue;
