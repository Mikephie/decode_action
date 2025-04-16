// EvalDecode 插件 (ES Module) - 模拟 eval 解包逻辑，保留头部注释

/**
 * 提取 eval 加密前的注释信息
 * @param {string} code - 包含 eval 包裹的完整代码
 * @returns {{header: string, encodedPart: string}}
 */
function extractHeader(code) {
  const evalStartIndex = code.indexOf('eval(');
  if (evalStartIndex > 0) {
    const header = code.slice(0, evalStartIndex).trim();
    const encodedPart = code.slice(evalStartIndex);
    return { header, encodedPart };
  }
  return { header: '', encodedPart: code };
}

/**
 * 解包 eval 加密代码
 * @param {string} code - eval 加密的完整代码
 * @returns {string|null} - 解密后的源码或 null
 */
function evalDecode(code) {
  try {
    const { header, encodedPart } = extractHeader(code);

    // 替换 eval 为 return，构建出原始代码
    const patchedCode = encodedPart
      .replace(/^eval\s*\(\s*/, 'return ')
      .replace(/\)\s*;?\s*$/, '');

    // 执行构造函数还原被 eval 包裹的真实代码
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

/**
 * 插件主函数
 * @param {string} code - 加密代码
 * @returns {string|null} - 解密结果
 */
function pluginFunction(code) {
  return evalDecode(code);
}

// 为 decode-js 项目添加统一插件导出结构
pluginFunction.plugin = function(code) {
  return evalDecode(code);
};

export default {
  plugin: pluginFunction
};
