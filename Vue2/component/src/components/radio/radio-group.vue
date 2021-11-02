<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 16:42:36
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 17:14:38
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
  name: "iRadioGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  mounted() {
    this.updateModel();
  },
  watch: {
    value() {
      this.updateModel();
    },
  },
  methods: {
    updateModel() {
      this.childrens = findComponentsDownward(this, "iRadio");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          child.currentValue = value;
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
