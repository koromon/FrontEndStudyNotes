<!--
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-02 20:36:34
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-02 21:38:41
-->

## template => 编译 ... =》 形成真实 DOM

Q: AST 和虚拟 DOM 有什么区别？

AST 是源代码的抽象语法结构的树状描述，所有的语法其实都能形成一个 AST 树。我们可以把源代码转成 AST 树，然后再进行优化处理，处理完之后再转换回源代码。

虚拟 DOM 是用来描述 DOM 对象的，而 AST 并不是专门用来描述 HTML 节点的（是针对源码处理的）。我们用 AST 来处理模板中的一些特殊指令。

---

1. 获取到 template
2. template -> AST 树（源代码的抽象语法结构的树状描述）
3. AST -> render 函数 -> 通过 \_c、\_v、\_s 系列方法转换成字符串
4. render 函数 —> 虚拟节点
5. 设置 PATCH -> 打补丁到真实 DOM
