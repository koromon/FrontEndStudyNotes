/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 17:57:55
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:57:02
 */
import { arrMethods } from "./array";
import observeArr from "./observeArr";
import defineReactiveData from "./reactive";

class Observer {
  constructor(data) {
    // 对于对象和数组有不同的处理对象
    if (Array.isArray(data)) {
      // 数组的操作一般都是通过数组本身的 API 进行，且会导致原数据发生变化
      // 比如 push/splice 都会导致数组新增数据，但是我们要判断新增的数据是什么类型，这种情况因为我们没法劫持（ES5下）数组的 API，只能重写数组的方法达到监听的效果

      // 重新赋值数组对象上的原型链
      data.__proto__ = arrMethods;

      // 递归处理数据内的数据
      // 这里也说明为什么直接修改数组中的某个普通类型不会发生双向绑定，因为这个数组中的普通类型没有进行监听
      observeArr(data);
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    // 对象属性通过 defineProperty 设置
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i],
        value = data[key];
      defineReactiveData(data, key, value);
    }
  }
}

export default Observer;
