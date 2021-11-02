<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 20:30:58
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 20:53:10
-->
<template>
  <div ref="display"></div>
</template>

<script>
import Vue from "vue";
import randomStr from "@/utils/random_str";

export default {
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      html: "",
      css: "",
      js: "",
      id: randomStr(),
    };
  },
  watch: {
    code() {
      // code 更新的时候整个过程要重来一遍
      this.destroyCode();
      this.renderCode();
    },
  },
  methods: {
    /**
     * 基于正则分割代码
     * source vue 文件代码，即 props: code
     * type 分割的部分，也就是 template/script/style
     */
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) {
        return "";
      }
      openingTag = openingTag[0];

      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      // 外层包裹了 div#app 是为了容错
      const template =
        '<div id="app">' + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        const parseStrToFunc = new Function(this.js)();
        console.log("this js", parseStrToFunc);

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el);
        if (this.css !== "") {
          const style = document.createElement("style");
          style.id = this.id; // 方便后续移除
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
  },
  mounted() {
    this.renderCode();
  },
  beforeDestroy() {
    this.destroyCode();
  },
};
</script>

<style></style>
