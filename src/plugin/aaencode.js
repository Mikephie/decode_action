/**
 * 解码 AA 编码的 JavaScript
 * @param {string} t - AA 编码的字符串
 * @returns {string} - 解码后的 JavaScript 代码
 */
export function aadecode(t) {
  t = t.replace("\) \('_'\)", "");
  t = t.replace("\(ﾟДﾟ\) \['_'\] \(", "return ");
  var x = new Function(t);
  var r = x();
  return r;
}