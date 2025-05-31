// plugins/aadecode.js
export default function aadecode(code) {
  if (typeof code !== "string" || code.trim() === "") return code;
  try {
    // 先尝试 new Function 安全执行
    const decoded = Function('"use strict";return (' + code + ')')();
    if (typeof decoded === "string" && decoded !== code && decoded.length > 0) return decoded;
  } catch (e) { }
  try {
    // fallback eval
    const decoded = eval(code);
    if (typeof decoded === "string" && decoded !== code && decoded.length > 0) return decoded;
  } catch (e2) { }
  // 特殊场景 fallback: 提取字符串
  const m = code.match(/["'`](.{3,})["'`]/);
  if (m && m[1]) return m[1];
  return code;
}