/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 20:59:46
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 21:19:53
 */

import Alert from "./alert.vue";
import Vue from "vue";

// alert.vue 会被 loader 把 template 编译为 Render 函数，最终会成为一个对象
Alert.newInstance = (properties) => {
  const props = properties || {};

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Alert, {
        props: props,
      });
    },
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  // 组件实例，这里只 render 了一个实例
  const alert = Instance.$children[0];

  return {
    add(noticeProps) {
      alert.add(noticeProps);
    },
    remove(name) {
      // 这里暂时没有用，外部没法获取名字
      alert.remove(name);
    },
  };
};

export default Alert;
