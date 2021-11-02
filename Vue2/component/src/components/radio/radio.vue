<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 16:42:31
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 17:17:11
-->

<template>
  <label>
    <input
      type="radio"
      :value="label"
      :disabled="disabled"
      v-model="currentValue"
      @change="change"
    />
    <slot></slot>
  </label>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentUpward } from "@/utils/assist";
export default {
  name: "iRadio",
  mixins: [Emitter],
  props: {
    label: {
      type: [String, Number, Boolean],
    },
    value: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  data() {
    return {
      group: false,
      currentValue: this.value,
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "iRadioGroup");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel();
    }
  },
  methods: {
    change(event) {
      const value = event.target.checked;
      let label = value ? this.label : "";
      this.$emit("input", label);

      if (this.group) {
        this.parent.change(label);
      } else {
        this.$emit("on-change", label);
        this.dispatch("iFormItem", "on-form-change", label);
      }
    },
  },
};
</script>

<style></style>
