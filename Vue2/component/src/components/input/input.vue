<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 10:46:53
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 11:08:51
-->
<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from "@/mixins/emitter";
export default {
  name: "iInput",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit("input", value); // 这里是因为绑定了 v-model
      this.dispatch("iFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("iFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>

<style></style>
