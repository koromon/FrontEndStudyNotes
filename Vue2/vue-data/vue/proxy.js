/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-11 00:18:52
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-11 00:43:49
 */
function proxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}
export default proxyData;
