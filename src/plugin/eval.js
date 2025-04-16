// evaldecode.js - 解包 eval 包裹的 JavaScript 字符串，保留注释头部

/**
 * 提取头部注释和 eval 包裹的部分
 * @param {string} code - 源代码字符串
 * @returns {{header: string, encodedPart: string}}
 */
function extractHeader(code) {
  const evalStart = code.indexOf('eval(');
  if (evalStart > 0) {
    const header = code.slice(0, evalStart).trim();
    const encodedPart = code.slice(evalStart);
    return { header, encodedPart };
  }
  return { header: '', encodedPart: code };
}

/**
 * 执行 eval 解码
 * @param {string} code - 含 eval 的代码
 * @returns {string|null} - 解码结果
 */
function evalDecode(code) {
  try {
    const { header, encodedPart } = extractHeader(code);

    const patchedCode = encodedPart
      .replace(/^eval\s*\(\s*/, 'return ')
      .replace(/\)\s*;?\s*$/, '');

    const decoded = new Function(patchedCode)();

    return typeof decoded === 'string'
      ? (header ? `${header}\n\n${decoded}` : decoded)
      : null;
  } catch (err) {
    console.error('[EvalDecode] 解码失败:', err.message);
    return null;
  }
}

/**
 * 插件主函数
 * @param {string} code - 需要解码的源码
 * @returns {string|null}
 */
function pluginFunction(code) {
  return evalDecode(code);
}

// ✅ 为主控 main.js 挂载 plugin.plugin 接口
pluginFunction.plugin = pluginFunction;

// ✅ 使用 ES Module 格式导出
export default {
  plugin: pluginFunction
};