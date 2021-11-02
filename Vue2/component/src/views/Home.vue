<template>
  <div class="home">
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="地点" prop="locs">
        <i-checkbox-group v-model="formValidate.locs">
          <i-checkbox label="广州"></i-checkbox>
          <i-checkbox label="上海"></i-checkbox>
          <i-checkbox label="北京"></i-checkbox>
        </i-checkbox-group>
      </i-form-item>
      <i-form-item label="选项" prop="radio">
        <i-radio label="1" v-model="formValidate.radio">选项一</i-radio>
        <i-radio label="2" v-model="formValidate.radio">选项二</i-radio>
      </i-form-item>
      <i-form-item label="性别" prop="sex">
        <i-radio-group v-model="formValidate.sex">
          <i-radio label="male">男性</i-radio>
          <i-radio label="female">女性</i-radio>
        </i-radio-group>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
    <hr />
    <div>
      <button @click="handleOpen1">打开提示 1</button>
      <button @click="handleOpen2">打开提示 2</button>
    </div>
  </div>
</template>

<script>
import iForm from "@/components/form/form.vue";
import iFormItem from "@/components/form/form-item.vue";
import iInput from "@/components/input/input.vue";
import iCheckbox from "@/components/checkbox/checkbox.vue";
import iCheckboxGroup from "@/components/checkbox/checkbox-group.vue";
import iRadio from "@/components/radio/radio.vue";
import iRadioGroup from "@/components/radio/radio-group.vue";

export default {
  name: "Home",
  components: {
    iForm,
    iFormItem,
    iInput,
    iCheckbox,
    iCheckboxGroup,
    iRadio,
    iRadioGroup,
  },
  data() {
    const validateLocs = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("至少选择一个地点"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        name: "",
        mail: "",
        locs: [],
        radio: "1",
        sex: "male",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        locs: [
          {
            validator: validateLocs,
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.formValidate.locs = ["广州"];
    //   this.formValidate.radio = "2";
    //   this.formValidate.sex = "female";
    // }, 1000);
    // setTimeout(() => {
    //   const component = new this.$alert().$mount();
    //   document.body.appendChild(component.$el);
    // }, 1000);
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
    handleOpen1() {
      console.log(this.$Alert);
      this.$Alert.info({
        content: "我是提示信息 1",
      });
    },
    handleOpen2() {
      this.$Alert.info({
        content: "我是提示信息 2",
        duration: 3,
      });
    },
  },
};
</script>

<style>
.home {
  padding: 20px;
  font-size: 24px;
}
</style>
