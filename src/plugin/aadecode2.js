// ============ plugin/aadecode2.js ============
/**
 * AADecode 第二阶段 - 处理嵌套或非典型 aaencode 剩余层
 */
export default function decodeAA2(code) {
  // 如果不包含AAEncode特征，直接返回
  if (!/ﾟωﾟ|･ﾟ･|｀;'|==3|\/\*.*\*\//.test(code)) return code;
  
  console.log('[aadecode2] 检测到可能的嵌套AAEncode，尝试进一步解码...');
  
  try {
    // 检查是否是函数字符串
    if (code.includes('function') || code.includes('=>')) {
      // 尝试执行函数
      const fn = eval(`(${code})`);
      if (typeof fn === 'function') {
        const result = fn();
        if (typeof result === 'string') {
          console.log('[aadecode2] 成功执行函数并获取结果');
          return result;
        }
      }
    }
    
    // 检查是否是表达式
    if (!code.includes(';') && !code.includes('{')) {
      const result = eval(code);
      if (typeof result === 'string') {
        console.log('[aadecode2] 成功计算表达式');
        return result;
      }
    }
    
    // 尝试其他变体
    const variations = [
      `(${code})`,
      `(${code})()`,
      `eval(${code})`,
      code
    ];
    
    for (const variant of variations) {
      try {
        const result = eval(variant);
        if (typeof result === 'string' && result !== code) {
          console.log('[aadecode2] 通过变体成功解码');
          return result;
        }
      } catch (e) {
        // 继续尝试下一个
      }
    }
    
  } catch (e) {
    console.warn('[aadecode2] 执行失败:', e.message);
  }
  
  return code;
}