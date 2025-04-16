// plugin/eval.js - 解密 eval("...") 包裹代码的 ES Module 插件

/**
 * 解包 eval("...") 格式的 JavaScript 加密脚本
 * @param {string} code
 * @returns {string|null}
 */
function unpack(code) {
  try {
    // 只匹配 eval("...") 或 eval('...') 或 eval(`...`)
    const match = code.match(/^eval\s*\(\s*(['"`])([\s\S]+?)\1\s*\);?$/);

    if (!match) {
      console.log('[EvalDecode] 不符合 eval("...") 结构，跳过');
      return null;
    }

    const quote = match[1];  // 引号类型：' 或 " 或 `
    const payload = match[2]; // 被包裹的真实字符串内容

    // 模拟浏览器的 eval，还原字符串内容
    const decoded = JSON.parse(quote + payload + quote);

    // 解码成功
    return decoded;
  } catch (err) {
    console.error('[EvalDecode] 解码失败:', err.message);
    return null;
  }
}

// ✅ 导出符合你主控脚本的结构（ESM 风格）
export default {
  unpack
};