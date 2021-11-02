/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-02 21:59:48
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-03 00:27:42
 */

import { initState } from "./state";
import { compileToRenderFunction } from "./compiler";

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    vm.$options = options;

    initState(vm);

    if (vm.$options.el) {
      // 执行挂载函数
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this,
      options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;

    if (!options.render) {
      // 不存在的时候需要做处理，存在的直接根据函数渲染即可
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      // 编译 AST，将 AST 转换为 render
      const render = compileToRenderFunction(template);
      options.render = render;
    }
  };
}

export { initMixin };
