/**
 * 插件名称：EvalDecode
 * 插件功能：解码 eval 包裹的 JavaScript 字符串代码
 */

/**
 * 解码函数体（核心逻辑）
 */
function evalDecode(code) {
  const evalStartIndex = code.indexOf('eval(');
  if (evalStartIndex === -1) return null;

  const header = code.slice(0, evalStartIndex).trim();
  const encoded = code.slice(evalStartIndex)
    .replace(/^eval\s*\(\s*/, 'return ')
    .replace(/\)\s*;?\s*$/, '');

  try {
    const decoded = new Function(encoded)();
    return header ? `${header}\n\n${decoded}` : decoded;
  } catch (e) {
    console.error('[EvalDecode] 解包失败:', e.message);
    return null;
  }
}

/**
 * 插件统一接口
 */
function plugin(code) {
  return evalDecode(code);
}

/**
 * 对外导出（ESM + CommonJS 双兼容方式）
 */
plugin.plugin = plugin;

// 兼容 ESM
export default {
  plugin
};

// 兼容 CommonJS（如果用 require 加载也不会报错）
// module.exports = { plugin }; // 只在需要 CommonJS 兼容时取消注释