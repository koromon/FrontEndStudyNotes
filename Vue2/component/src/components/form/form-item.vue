<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 10:31:54
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 11:33:16
-->
<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import AsyncValidator from "async-validator";

export default {
  name: "iFormItem",
  inject: ["form"],
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: "", // 校验状态
      validateMessage: "", // 校验不通过时的提示信息
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    if (this.prop) {
      // 存在 prop 则需要校验
      this.dispatch("iForm", "on-form-item-add", this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }

      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      // 没有 trigger 或者对应的 trigger 都会过滤出来
      let filteredRule = rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
      return filteredRule;
    },
    // 重置数据
    resetField() {
      // 所以 element-ui 的重置也是第一次渲染时绑定的数据
      this.validateState = "";
      this.validateMessage = "";

      this.form.model[this.prop] = this.initialValue;
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = () => {}) {
      // form-item 只能针对单个组件进行校验，批量校验需要通过 form 组件调用
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";

        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      console.log("onFieldBlur");
      this.validate("blur");
    },
    onFieldChange() {
      console.log("onFieldChange");
      this.validate("change");
    },
  },
};
</script>

<style>
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
