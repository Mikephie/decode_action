/**
 * Eval 解包插件 (ESM 版本)
 * 用于解密 eval(function(p,a,c,k,e,d){...}) 类似结构
 */

function plugin(code) {
  try {
    if (!code.includes('eval(') && !code.includes('eval (')) {
      return null;
    }

    // 替换 eval 为捕获函数
    let modifiedCode = code.replace(/eval\s*\(/g, '(function(x) { return x; })(');

    try {
      const env = {
        window: {},
        document: {},
        navigator: { userAgent: "Mozilla/5.0" },
        location: {},
      };

      const result = Function('window', 'document', 'navigator', 'location',
        `return ${modifiedCode}`
      )(env.window, env.document, env.navigator, env.location);

      if (typeof result === 'string') {
        if (result.includes('eval(')) {
          return plugin(result); // 递归解包
        }
        return result;
      }

      return String(result);
    } catch (err) {
      console.log("[eval] 替换eval执行失败，尝试直接替换");

      try {
        modifiedCode = code.replace(/eval\s*\(/g, '(');
        return modifiedCode;
      } catch (replaceErr) {
        console.error("[eval] 直接替换失败:", replaceErr);
        return null;
      }
    }
  } catch (error) {
    console.error("[eval] 解包出错:", error);
    return null;
  }
}

// 导出为默认对象，供 ESM 导入使用
export default {
  detect(code) {
    return /eval\s*\(/.test(code) || /eval\(function\s*\(\w,\w,\w,\w,\w,\w\)/.test(code);
  },
  plugin
};