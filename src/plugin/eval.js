// plugin/evaldecode.js - 纯 ESM，支持 plugin.plugin() 结构

/**
 * 提取头部注释和 eval 包裹的代码部分
 */
function extractHeader(code) {
  const index = code.indexOf('eval(');
  if (index > 0) {
    return {
      header: code.slice(0, index).trim(),
      encodedPart: code.slice(index)
    };
  }
  return { header: '', encodedPart: code };
}

/**
 * 解码 eval 包裹的代码
 */
function evalDecode(code) {
  try {
    const { header, encodedPart } = extractHeader(code);
    const patched = encodedPart
      .replace(/^eval\s*\(\s*/, 'return ')
      .replace(/\)\s*;?\s*$/, '');
    const decoded = new Function(patched)();
    return typeof decoded === 'string'
      ? (header ? `${header}\n\n${decoded}` : decoded)
      : null;
  } catch (e) {
    console.error('[EvalDecode] 解码失败:', e.message);
    return null;
  }
}

/**
 * 插件接口函数
 */
function pluginFn(code) {
  return evalDecode(code);
}

// ✅ 导出为具备 plugin.plugin 的对象（无 default）
export const plugin = {
  plugin: pluginFn
};