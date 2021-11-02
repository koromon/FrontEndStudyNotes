<!--
 * @Description:  
 * @Author: chenming.feng
 * @Date: 2021-10-05 13:58:52
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 14:40:38
-->
<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      />
    </span>
    <slot>
      <span v-if="group">{{ label }}</span>
    </slot>
  </label>
</template>

<script>
import Emitter from "@/mixins/emitter";
import { findComponentUpward } from "@/utils/assist";
export default {
  name: "iCheckbox",
  mixins: [Emitter],
  props: {
    label: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  data() {
    return {
      model: [], // 多选绑定到数组，https://cn.vuejs.org/v2/guide/forms.html#%E5%A4%8D%E9%80%89%E6%A1%86
      group: false,
      parent: null,
      currentValue: false,
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "Value should be trueValue or falseValue.";
      }
    },
  },
  mounted() {
    this.parent = findComponentUpward(this, "iCheckboxGroup");
    // 如果是复选框组，走不同的处理逻辑
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        // 如果 disabled 的话其实不会触发 change
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);

      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        this.dispatch("iFormItem", "on-form-change", value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>

<style></style>
