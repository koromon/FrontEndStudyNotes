/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-03 00:24:56
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-05 00:29:24
 */

/*
<div id="app" style="color: red;font-size: 20px">
  你好， {{name}}
  <span class="text" style="color: green;">{{age}}</span>
</div>
*/
// 不断用正则匹配 DOM 元素，生成 AST

// Regular Expressions for parsing tags and attributes
// id="app" id='app' id=app
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 匹配标签名
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// 匹配特殊标签 <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parseHtmlToAst(html) {
  let text;

  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        // 如果 < 是起始标签的开始，那么就没必要走下去了，下面是结束标签的 <
        continue;
      }

      const endTagMatch = html.match(endTag);
      // 结束标签并没有属性，所以不用做特殊处理
      if (endTagMatch) {
        console.log(endTagMatch);
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    // 处理文本
    if (text) {
      advance(text.length);
      chars(text);
    }
  }
  // 各种解析用的函数

  function parseStartTag(tag) {
    const start = html.match(startTagOpen);
    console.log("#@#@#@", start);
    let end, attr;
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      // 如果没有遇到结束符，并且存在属性
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      // 遇到结束标签
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }
  // 解析后要删除对应的字符串
  function advance(n) {
    console.log("======截取函数=========");
    html = html.substring(n);
  }

  function start(tagName, attrs) {
    console.log("======开始=========");
    console.log(tagName, attrs);
  }

  function end(tagName) {
    console.log("======结束=========");
    console.log(tagName);
  }

  function chars(text) {
    console.log("======文本=========");
    console.log(text);
  }
}

function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    attrs,
    parent,
  };
}

export { parseHtmlToAst };
