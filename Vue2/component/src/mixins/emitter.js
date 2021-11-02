/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 10:52:34
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 10:52:35
 */
// 向下广播
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName, params]);
    } else {
      // 子组件递归
      broadcast.apply(child, [componentName, eventName, params]);
    }
  });
}
// 向上派发
function dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.name;
  // 一直向上循环找到对应组件
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name;
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName, params]);
  }
}
const Emitter = {
  methods: {
    dispatch(componentName, eventName, params) {
      dispatch.call(this, componentName, eventName, params);
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
export default Emitter;
