/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 20:38:31
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 20:38:31
 */

// 生成随机字符串
export default function (len = 32) {
  const $chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = $chars.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
