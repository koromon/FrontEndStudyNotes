/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-11 00:06:24
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:36:19
 */
import proxyData from "./proxy";
import observe from "./observe";

function initState(vm) {
  const options = vm.$options;
  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // 初始化的时候不希望修改用户的初始数据，而是用一个临时变量来存储
  // 修改数据的时候是在这个临时变量上修改

  // 如果 data 是一个函数，需要执行，且 this 要绑定到 vm 上
  // 否则，直接指向 data 或赋值空对象
  // 重新赋值 data（原本是函数）以及实例属性 vm._data（方便后续使用）
  vm._data = data = typeof data === "function" ? data.call(vm) : data || {};

  // 我们希望直接通过 vm 访问到 data 的数据，所以要对每个属性做数据劫持（代理到实例上）
  for (let key in data) {
    proxyData(vm, "_data", key);
  }

  // 观察数据
  observe(vm._data);
}

export { initState };
