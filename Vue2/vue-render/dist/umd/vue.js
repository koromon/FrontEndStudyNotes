(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配标签名

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 匹配特殊标签 <my:header></my:header>

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <div

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // > />

  var startTagClose = /^\s*(\/?)>/; // </div>

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));

  function parseHtmlToAst(html) {
    var text;

    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs); // 如果 < 是起始标签的开始，那么就没必要走下去了，下面是结束标签的 <

          continue;
        }

        var endTagMatch = html.match(endTag); // 结束标签并没有属性，所以不用做特殊处理

        if (endTagMatch) {
          console.log(endTagMatch);
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      } // 处理文本


      if (text) {
        advance(text.length);
        chars(text);
      }
    } // 各种解析用的函数


    function parseStartTag(tag) {
      var start = html.match(startTagOpen);
      console.log("#@#@#@", start);
      var end, attr;

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 如果没有遇到结束符，并且存在属性

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        } // 遇到结束标签


        if (end) {
          advance(end[0].length);
          return match;
        }
      }
    } // 解析后要删除对应的字符串


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

  /*
   * @Description:
   * @Author: chenming.feng
   * @Date: 2021-08-03 00:01:44
   * @LastEditors: chenming.feng
   * @LastEditTime: 2021-08-28 15:22:37
   */

  function compileToRenderFunction(html) {
    var ast = parseHtmlToAst(html);
    var code = generate(ast);
    console.log("code", code);
  }

  /*
   * @Description:
   * @Author: chenming.feng
   * @Date: 2021-08-02 21:59:48
   * @LastEditors: chenming.feng
   * @LastEditTime: 2021-08-03 00:27:42
   */

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;

      if (vm.$options.el) {
        // 执行挂载函数
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this,
          options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el;

      if (!options.render) {
        // 不存在的时候需要做处理，存在的直接根据函数渲染即可
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } // 编译 AST，将 AST 转换为 render


        var render = compileToRenderFunction(template);
        options.render = render;
      }
    };
  }

  var Vue = function Vue(options) {
    _classCallCheck(this, Vue);

    this._init(options); // 相关初始化设置，这小节只专注数据劫持

  };

  initMixin(Vue); // 模板： render > template > html模板

  new Vue({
    el: "#app",
    data: function data() {
      return {
        name: "kk",
        age: 18,
        info: {
          job: "student",
          friends: [{
            id: 1,
            name: "xiaohong"
          }, {
            id: 2,
            name: "xiaoming"
          }]
        },
        hobby: ["piano", "travel", "film"]
      };
    }
  });

})));
//# sourceMappingURL=vue.js.map
