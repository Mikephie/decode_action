/**
 * Eval 解包插件 (ESM 版本) - 支持 eval(function(p,a,c,k,e,d){...})
 */

function plugin(code) {
  try {
    if (!/eval\s*\(function\s*\(\w,\w,\w,\w,\w,\w\)/.test(code)) {
      return null;
    }

    // 把 eval 替换成直接执行的捕获方式
    const modifiedCode = code.replace(
      /eval\s*\(\s*function\s*\(\w,\w,\w,\w,\w,\w\)/,
      '(function($fn){ return $fn'
    );

    // 补全函数闭合（用于执行）
    const wrappedCode = `
      (function(){
        const captured = [];
        const $fn = function() {
          return (${modifiedCode});
        };
        try {
          return $fn();
        } catch (e) {
          return null;
        }
      })()
    `;

    const result = eval(wrappedCode);

    // 若结果仍包含 eval，尝试递归
    if (typeof result === 'string' && result.includes('eval(')) {
      return plugin(result);
    }

    return typeof result === 'string' ? result : String(result);
  } catch (e) {
    console.error('[eval] 解包失败:', e);
    return null;
  }
}

// ESM 默认导出
export default {
  detect(code) {
    return /eval\s*\(function\s*\(\w,\w,\w,\w,\w,\w\)/.test(code);
  },
  plugin
};