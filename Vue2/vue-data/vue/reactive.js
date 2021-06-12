/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 18:01:36
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-12 22:58:42
 */

import observe from "./observe";

function defineReactiveData(data, key, value) {
  // 注意：这里的 value 如果是对象类型，也要递归该 value 为响应式的
  observe(value);

  Object.defineProperty(data, key, {
    get() {
      console.log(`获取响应式数据 ${key}：`, value);
      return value;
    },
    set(newValue) {
      console.log(`设置响应式数据 ${key}：`, newValue);
      if (newValue === value) {
        return;
      }
      // 这里的赋值有可能也是对象类型，所以要重新观察
      observe(newValue);
      value = newValue;
    },
  });
}

export default defineReactiveData;
