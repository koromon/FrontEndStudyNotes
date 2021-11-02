/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 17:48:11
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:41:46
 */

import Observer from "./Observer";

function observe(data) {
  if (typeof data !== "object" || data === null) {
    // 非对象类型的不需要观察
    return;
  }
  // 观察者对象只需要处理业务，所以上面的类型判断单独抽离出来
  return new Observer(data);
}

export default observe;
