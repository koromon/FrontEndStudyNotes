/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-07-25 18:39:02
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-07-25 19:42:33
 */
import Element from "./Element";
import { ATTR, TEXT, REPLACE, REMOVE } from "./patchTypes";
import { render, setAttrs } from "./virtualDom";

let finalPatches = {},
  rnIndex = 0;

function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodewalk(rDom);
}

function rNodewalk(rNode) {
  // 取出对应的 patch 和子元素
  const rnPatch = finalPatches[rnIndex++],
    childNodes = rNode.childNodes;

  // 深度遍历
  [...childNodes].map((c) => {
    // 递归
    rNodewalk(c);
  });

  // 有补丁才进行变更
  if (rnPatch) {
    patchAction(rNode, rnPatch);
  }
}

// 打补丁
function patchAction(rNode, rnPatch) {
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key];
          if (value) {
            setAttrs(rNode, key, value);
          } else {
            rNode.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        rNode.textContent = p.text;
        break;
      case REPLACE:
        // 判断替换的是节点还是普通文本
        const newNode =
          p.newNode instanceof Element
            ? render(p.newNode)
            : document.createTextNode(p.newNode);

        rNode.parentNode.replaceChild(newNode, rNode);
        break;
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      default:
        break;
    }
  });
}

export default doPatch;
