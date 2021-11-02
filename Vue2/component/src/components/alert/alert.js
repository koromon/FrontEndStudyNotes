/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-05 21:10:08
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-05 21:14:05
 */

import Notification from "./notification.js";

let messageInstance;

function getMessageInstance() {
  // 单例
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({ duration = 1.5, content = "" }) {
  let instance = getMessageInstance();
  instance.add({
    content: content,
    duration: duration,
  });
}

export default {
  info(options) {
    return notice(options);
  },
};
