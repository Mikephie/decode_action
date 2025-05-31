// plugin/aadecode.js
export default function aadecode(code) {
  if (typeof code !== "string" || code.trim() === "") return code;
  try {
    // 优先用 Function 更安全
    const decoded = Function('"use strict";return (' + code + ')')();
    if (typeof decoded === "string" && decoded !== code && decoded.length > 0) return decoded;
  } catch (e) {}
  try {
    // fallback eval
    const decoded = eval(code);
    if (typeof decoded === "string" && decoded !== code && decoded.length > 0) return decoded;
  } catch (e2) {}
  return code;
}