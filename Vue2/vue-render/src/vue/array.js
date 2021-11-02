/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 22:09:03
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:53:09
 */

import { ARR_METHODS } from "./config";
import observeArr from "./observeArr";

// arrMethods 是新对象
// Object.create 断开关联
let originArrMethods = Array.prototype,
  arrMethods = Object.create(originArrMethods);

ARR_METHODS.map((m) => {
  // 为了使用 arguments，这里不能用箭头函数
  arrMethods[m] = function () {
    console.log(`代理数组方法 ${m}:`, arguments);
    // 类数组转化为数组，使用原本的 API 执行函数
    let args = Array.prototype.slice.call(arguments);
    // 执行数组原生方法，这里的 this 指向原数组
    let rt = originArrMethods[m].apply(this, args);

    let newArr; // 取出数组新增的数据
    switch (m) {
      case "push":
      case "unshift":
        newArr = args;
        break;
      case "splice":
        newArr = args.slice(2); // [].splice(0,1,{},..)
        break;
      default:
        break;
    }
    if (newArr) {
      // 如果新增了数据，执行监听操作
      observeArr(newArr);
    }
    return rt;
  };
});

export { arrMethods };
