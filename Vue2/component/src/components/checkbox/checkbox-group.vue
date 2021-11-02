<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 13:58:58
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 14:32:08
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentsDownward } from "@/utils/assist";

export default {
  name: "iCheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  mounted() {
    this.updateModel(true);
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
  methods: {
    updateModel(update) {
      // 每当组内有一个选择框发生变化，就更新全部选择框
      this.childrens = findComponentsDownward(this, "iCheckbox");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("iFormItem", "on-form-change", data);
    },
  },
};
</script>

<style></style>
