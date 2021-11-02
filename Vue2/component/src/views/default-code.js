/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 20:47:33
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 20:47:34
 */

const code = `
  <template>
      <div>
          <input v-model="message">
          {{ message }}
      </div>
  </template>
  <script>
      export default {
          data () {
              return {
                  message: ''
              }
          }
      }
  </script>`;

export default code;
