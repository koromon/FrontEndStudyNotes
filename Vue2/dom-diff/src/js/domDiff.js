/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-07-25 17:50:39
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-07-25 18:33:23
 */
import { ATTR, TEXT, REPLACE, REMOVE } from "./patchTypes";

let patches = {},
  vnIndex = 0;

function domDiff(oldVDom, newVDom) {
  let index = 0;
  // 递归遍历
  vnodeWalk(oldVDom, newVDom, index);
  return patches;
}

function vnodeWalk(oldNode, newNode, index) {
  // 这里的参数只需要具体的节点做业务处理，所以不需要标识为 oldVDom

  // 每个节点都可以有多种变更操作
  let vnPatch = [];

  if (!newNode) {
    // 不存在，表明被删除
    vnPatch.push({
      type: REMOVE,
      index,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    // 都是文本节点的情况，只考虑都为文本节点时（本节主要目的是理清思路）
    if (oldNode !== newNode) {
      vnPatch.push({
        type: TEXT,
        text: newNode,
      });
    }
  } else if (oldNode.type === newNode.type) {
    // 节点标签一致，对比属性
    const attrPatch = attrsWalk(oldNode.props, newNode.props);
    // 判断是否有变更
    if (Object.keys(attrPatch).length) {
      vnPatch.push({
        type: ATTR,
        attrs: attrPatch,
      });
    }

    // 遍历子元素
    childrenWalk(oldNode.children, newNode.children);
  } else {
    vnPatch.push({
      type: REPLACE,
      newNode,
    });
  }

  if (vnPatch.length) {
    // index 的作用是为了标识树结构中对应的节点
    patches[index] = vnPatch;
  }
}

function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};

  for (const key in oldAttrs) {
    // 修改属性
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }

  for (const key in newAttrs) {
    // 新增属性
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }
  return attrPatch;
}

function childrenWalk(oldChildren, newChildren) {
  oldChildren.map((c, idx) => {
    // 深度遍历，每次 vnIndex 序号都要递增
    vnodeWalk(c, newChildren[idx], ++vnIndex);
  });
}

export default domDiff;
