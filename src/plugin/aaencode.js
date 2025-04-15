/**
 * 直接 AA 解码器 - 尝试使用 eval 直接执行解码
 * 很多 AA 编码实际上是可以直接用 eval 执行的自解码 JS
 */

/**
 * 检测字符串是否是 AA 编码
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否是 AA 编码
 */
function isAAEncoded(code) {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  // 检查常见的 AA 编码模式
  return /ﾟωﾟﾉ/.test(code) || /\(ﾟДﾟ\)/.test(code) || /\(c\^_\^o\)/.test(code);
}

/**
 * 直接 AA 解码
 * @param {string} code - AA 编码的代码
 * @returns {string|null} - 解码后的代码，失败则返回 null
 */
function directAADecode(code) {
  try {
    // 替换掉尾部的执行部分
    code = code.replace(/\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*['"]_['"]\s*\)\s*;?\s*$/, ")");
    
    // 添加 return 语句使结果可以被捕获
    code = code.replace(/\(ﾟДﾟ\)\s*\[\s*['"]_['"]\s*\]\s*\(/, "return (");
    
    // 创建一个函数并执行
    const decodeFn = new Function(code);
    const result = decodeFn();
    
    return result;
  } catch (error) {
    console.error("直接解码失败:", error.message);
    return null;
  }
}

/**
 * 导出 plugin 方法，符合主脚本接口
 */
async function plugin(code) {
  if (!isAAEncoded(code)) {
    return null;
  }
  
  console.log("尝试直接 AA 解码...");
  
  // 尝试直接解码
  const decoded = directAADecode(code);
  if (decoded) {
    console.log("直接 AA 解码成功");
    return decoded;
  }
  
  // 如果直接解码失败，可以在这里添加其他解码方法
  
  return null; // 所有方法都失败，返回 null
}

export default {
  plugin
};