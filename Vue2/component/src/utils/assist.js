/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 11:44:53
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-30 21:57:10
 */

/**
 * 由一个组件，向上找到最近的指定组件
 * @param {*} context 当前上下文，一般传 this
 * @param {*} componentName 要查找的组件 name
 * @returns 组件实例
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || componentName.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * 由一个组件，向上找到所有的指定组件，一般用于递归组件中
 * @param {*} context 当前上下文，一般传 this
 * @param {*} componentName 要查找的组件 name
 * @returns 组件实例数组
 */
function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

/**
 * 由一个组件，向下找到最近的指定组件
 * @param {*} context 当前上下文，一般传 this
 * @param {*} componentName 要查找的组件 name
 * @returns 组件实例
 */
function findComponentDownward(context, componentName) {
  const childrens = context.$children || [];
  let children = null;

  for (const child of childrens) {
    const name = child.$options.name;
    if (name === componentName) {
      children = child;
      break;
    } else {
      children = findComponentDownward(child, componentName);
      if (children) {
        break;
      }
    }
  }
  return children;
}

/**
 * 由一个组件，向下找到所有指定的组件
 * @param {*} context 当前上下文，一般传 this
 * @param {*} componentName 要查找的组件 name
 * @returns 组件实例数组
 */
function findComponentsDownward(context, componentName) {
  const childrens = context.$children || [];

  return childrens.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

/**
 * 由一个组件，找到指定组件的兄弟组件
 * @param {*} context 当前上下文，一般传 this
 * @param {*} componentName 要查找的组件 name
 * @param {*} exceptMe 是否把本身除外
 * @returns 组件实例数组
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter((item) => {
    return item.$options.name === componentName;
  });
  // 每个组件的 _uid 都是不会重复的
  let index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents,
};

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}
// deepCopy
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export { deepCopy };

/**
 * 解决Vue Template模板中无法使用可选链的问题
 * @param obj
 * @param rest
 * @returns {*}
 */
export const optionalChaining = (obj, ...rest) => {
  let tmp = obj;
  for (let key in rest) {
    let name = rest[key];
    tmp = tmp?.[name];
  }
  return tmp || "";
};
