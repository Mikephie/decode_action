// plugin/eval.js - 解包 eval 加密 JavaScript 的插件模块

/**
 * 提取 eval 起始位置之前的注释头部
 * @param {string} code
 * @returns {{ header: string, encodedPart: string }}
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
 * 解包 eval 包裹的代码
 * @param {string} code
 * @returns {string|null}
 */
function unpack(code) {
  try {
    const { header, encodedPart } = extractHeader(code);

    const patchedCode = encodedPart
      .replace(/^eval\s*\(\s*/, 'return ')
      .replace(/\)\s*;?\s*$/, '');

    const decoded = new Function(patchedCode)();

    if (typeof decoded === 'string') {
      return header ? `${header}\n\n${decoded}` : decoded;
    }

    return null;
  } catch (err) {
    console.error('[EvalDecode] 解包失败:', err.message);
    return null;
  }
}

// ✅ 导出 unpack 接口，符合主脚本 PluginEval.unpack(code) 的调用方式
export default {
  unpack
};