<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 10:31:49
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 11:41:10
-->
<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import Emitter from "@/mixins/emitter";
export default {
  name: "iForm",
  mixins: [Emitter],
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      fields: [], // 缓存全部 FormItem 实例
    };
  },
  created() {
    this.$on("on-form-item-add", (field) => {
      if (field) this.fields.push(field);
    });
    this.$on("on-form-item-remove", (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持回调或者 Promise
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          // 第一个参数为空，是为了全部触发规则都进行校验
          field.validate("", (errors) => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成，这里不需要 reject
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>

<style></style>
