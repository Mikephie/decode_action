/**
 * Eval 解包工具包装器 - 兼容浏览器 DecodePlugins 插件系统
 */
(function () {
  const module = { exports: {} };
  const exports = module.exports;

  /**
   * 解包 eval 加密的代码（支持递归）
   * @param {string} code - 待解包的代码
   * @returns {string|null} - 解包结果或 null（失败）
   */
  function plugin(code) {
    try {
      if (!/eval\s*\(/.test(code)) return null;

      // 用函数包裹 eval，捕获传入值
      const modifiedCode = code.replace(/eval\s*\(/g, '(function(__x){return __x})(');

      // 构造轻量执行环境
      const sandbox = {
        window: {},
        document: {},
        navigator: { userAgent: "Mozilla/5.0" },
        location: {},
      };

      const result = Function('window', 'document', 'navigator', 'location', `
        "use strict";
        return ${modifiedCode};
      `)(sandbox.window, sandbox.document, sandbox.navigator, sandbox.location);

      if (typeof result === 'string') {
        if (/eval\s*\(/.test(result)) {
          return plugin(result); // 递归解包
        }
        return result;
      }

      return String(result);
    } catch (err) {
      console.warn("[eval-plugin] 替换执行失败，尝试回退替换法");
      try {
        const stripped = code.replace(/eval\s*\(/g, '(');
        return stripped;
      } catch (replaceErr) {
        console.error("[eval-plugin] 回退解包失败:", replaceErr);
        return null;
      }
    }
  }

  // 导出插件接口
  exports.plugin = plugin;

  // 注册为浏览器插件系统 DecodePlugins 的子模块
  window.DecodePlugins = window.DecodePlugins || {};
  window.DecodePlugins.eval = {
    name: "eval",
    detect: function (code) {
      // 更强的 eval 特征判断，包括 Dean 格式 eval(function(p,a,c,k,e,d)
      return /eval\s*\(/.test(code) || /eval\(function\s*\(\w,\w,\w,\w,\w,\w\)/.test(code);
    },
    plugin: function (code) {
      return plugin(code);
    }
  };

  console.log("[DecodePlugins] Eval 解包插件已加载");
})();