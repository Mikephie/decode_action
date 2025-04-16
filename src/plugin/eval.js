/**
 * Eval解包工具 - ES Module版本
 * 
 * 用法:
 * import evalDecoder from './eval-decoder.js';
 * 
 * // 检测是否为eval加密的代码
 * if (evalDecoder.detect(code)) {
 *   // 解包代码
 *   const deobfuscated = evalDecoder.plugin(code);
 *   console.log(deobfuscated);
 * }
 */

/**
 * 解包eval加密的代码
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function plugin(code) {
  try {
    // 如果不包含eval，直接返回null
    if (!code.includes('eval(') && !code.includes('eval (')) {
      return null;
    }
    
    // 替换eval为一个捕获函数
    let modifiedCode = code.replace(/eval\s*\(/g, '(function(x) { return x; })(');
    
    // 尝试执行修改后的代码获取eval的参数
    try {
      // 创建一个执行环境
      const env = {
        window: {},
        document: {},
        navigator: { userAgent: "Mozilla/5.0" },
        location: {}
      };
      
      // 执行代码
      const result = Function('window', 'document', 'navigator', 'location',
                            `return ${modifiedCode}`)(
                            env.window, env.document, env.navigator, env.location);
      
      // 如果结果是字符串且包含eval，递归解包
      if (typeof result === 'string') {
        if (result.includes('eval(')) {
          return plugin(result);
        }
        return result;
      }
      
      return String(result);
    } catch (err) {
      console.log("执行替换eval的方法失败，尝试直接替换方法");
      
      // 尝试直接替换eval
      try {
        modifiedCode = code.replace(/eval\s*\(/g, '(');
        return modifiedCode;
      } catch (replaceErr) {
        console.error("直接替换eval方法也失败:", replaceErr);
        return null;
      }
    }
  } catch (error) {
    console.error("Eval解包发生错误:", error);
    return null;
  }
}

/**
 * 检测代码是否使用eval混淆
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否为eval混淆的代码
 */
function detect(code) {
  return code.includes('eval(') || code.includes('eval (');
}

// 导出插件接口
export default {
  plugin,
  detect
};

// 自动注册为全局插件（如果在浏览器环境中）
if (typeof window !== 'undefined') {
  window.DecodePlugins = window.DecodePlugins || {};
  window.DecodePlugins.eval = {
    detect,
    plugin
  };
  console.log("ES Module版Eval解包插件已加载");
}