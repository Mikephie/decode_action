// plugins/aadecode.js
export function aadecode(code) {
  if (typeof code !== "string") return null;
  // 简单特征判断，可省略
  if (!/ﾟ\wﾟ|ﾟωﾟ|ﾟДﾟ/.test(code)) return null;
  try {
    // 推荐用 Function 封闭 eval
    return Function('"use strict";return (' + code + ')')();
  } catch (e) {
    // fallback
    try {
      return eval(code);
    } catch (ee) {
      return null;
    }
  }
}