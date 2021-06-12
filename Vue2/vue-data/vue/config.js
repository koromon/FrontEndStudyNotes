/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-12 22:10:46
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:48:01
 */

// 能够导致数组发生变化的方法
// 有可能导致视图的更新
const ARR_METHODS = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

export { ARR_METHODS };
