/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-06-10 22:46:27
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-06-13 00:59:17
 */
import Vue from "vue";

// Vue 其实就是一个函数，传入 options
let vm = new Vue({
  el: "#app",
  data() {
    return {
      title: "学生列表",
      classNum: 1,
      total: 2,
      teacher: ["张三", "李四"],
      students: [
        {
          id: 1,
          name: "小明",
        },
        {
          id: 2,
          name: "小红",
        },
      ],
      info: {
        school: {
          name: "广大",
          address: "广州",
          locs: [
            "192",
            "168",
            {
              link: 1,
            },
          ],
        },
      },
    };
  },
});

// console.log(vm);
// console.log(vm.title);
// vm.title = "test";
// console.log(vm.$options.data());
// vm.students.push({
//   nem: "小刚",
//   id: 3,
// });
// vm.teacher.push("小程");
// console.log(
//   vm.students.splice(1, 1, {
//     id: 3,
//     name: "小白",
//   })
// );
// console.log(vm._data);
vm.total = 3;
vm.teacher[0] = "王五"; // 不会响应
console.log("==");
vm.teacher.splice(0, 1, "王五"); // 响应
// console.log(vm.info.school.address);
// console.log(vm.students);
