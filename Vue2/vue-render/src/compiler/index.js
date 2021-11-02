/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-08-03 00:01:44
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-08-28 15:22:37
 */
import { parseHtmlToAst } from "./astParser";

function compileToRenderFunction(html) {
  const ast = parseHtmlToAst(html);
  let code = generate(ast);
  console.log("code", code);
}

export { compileToRenderFunction };
