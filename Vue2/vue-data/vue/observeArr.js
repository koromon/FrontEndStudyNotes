/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 22:40:21
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-12 22:49:55
 */

import observe from "./observe";

function observeArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 回到监听普通数据的逻辑
    observe(arr[i]);
  }
}

export default observeArr;
