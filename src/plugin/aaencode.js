/**
 * ESM 模块：只解我发的 “Hello from aaencode!” 测试脚本
 * 
 * 用法：
 *   import { decodeTestSnippet } from './simpleHelloDecode.js';
 *   const decoded = decodeTestSnippet(aaencodedString);
 *   console.log(decoded);
 *
 * 注意：
 *   - 这里只能处理那一段“(ﾟДﾟ)[ﾟωﾟﾉ]( (ﾟДﾟ)[ﾟωﾟﾉ]('alert(...)') )('_');”结构
 *   - 不适合通用的 aaencode
 */

export function decodeTestSnippet(aaencoded) {
  // 这段正则专门匹配那句：
  // (ﾟДﾟ)[ﾟωﾟﾉ]((ﾟДﾟ)[ﾟωﾟﾉ]('alert("Hello from aaencode!")'))('_');
  // 目的：取出 'alert("Hello from aaencode!")'
  
  // 先去掉空白、换行（方便正则匹配）
  const input = aaencoded.replace(/\s+/g, '');

  // 正则：捕获类似 (ﾟДﾟ)[ﾟωﾟﾉ]((ﾟДﾟ)[ﾟωﾟﾉ]('xxx'))('_');
  const re = /\(ﾟДﾟ\)\[ﾟωﾟﾉ\]\(\(ﾟДﾟ\)\[ﾟωﾟﾉ\]\('([^']*)'\)\)\('_'\);?/;

  const match = input.match(re);
  if (match) {
    // match[1] 就是 'xxx' 中的内容，比如 alert("Hello from aaencode!")
    return match[1];
  }

  // 如果未匹配到，就原样返回
  return aaencoded;
}