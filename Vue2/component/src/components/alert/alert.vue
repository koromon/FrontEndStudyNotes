<!--
 * @Description: 实例化封装
 * @Author: chenming.feng
 * @Date: 2021-10-05 20:56:33
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 21:15:32
-->
<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
let seed = 0;
function getUuid() {
  return "alert_" + seed++;
}
export default {
  // 通过 JS 调用，不用预留 props 和 events 接口
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      const name = getUuid();

      let _notice = Object.assign(
        {
          name: name,
        },
        notice
      );

      this.notices.push(_notice);

      // 定时移除，单位：秒
      const duration = notice.duration || 1;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const notices = this.notices;

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
}
.alert-content {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
</style>
