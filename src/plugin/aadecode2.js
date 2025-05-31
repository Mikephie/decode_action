/**
 * AADecode 第二阶段 - 处理嵌套或非典型 aaencode 剩余层
 */
function decodeAA2(code) {
  if (!/ﾟωﾟ|･ﾟ･|｀;'|==3|\/\*.*\*\//.test(code)) return code;

  try {
    // 防止环境变量污染
    const fn = new Function('return ' + code);
    const result = fn();
    if (typeof result === 'string') return result;
    if (typeof result === 'function') return result.toString();
  } catch (e) {
    console.warn('[aadecode2] 执行失败:', e.message);
  }
  return code;
}

export default decodeAA2;