/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-07-25 16:53:53
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-07-25 17:18:56
 */
import Element from "./Element";
function createElement(type, props, children) {
  return new Element(type, props, children);
}

function setAttrs(node, prop, value) {
  switch (prop) {
    case "value":
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}
function render(vDom) {
  const { type, props, children } = vDom;
  const el = document.createElement(type);
  for (const key in props) {
    // 根据不同节点 和 key 有不同的设置方法
    setAttrs(el, key, props[key]);
  }

  // 遍历子元素
  children.map((c) => {
    // 判断子元素的类型
    // 如果是文本节点直接添加，否则递归创建
    c = c instanceof Element ? render(c) : document.createTextNode(c);
    // 添加到父元素
    el.appendChild(c);
  });
  // 记得返回值
  return el;
}

// 渲染结点
function renderDOM(el, rootEl) {
  rootEl.appendChild(el);
}

export { createElement, render, setAttrs, renderDOM };
