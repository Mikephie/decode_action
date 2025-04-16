
// 导入需要的 Node.js 模块（如果在 Node.js 环境中）
let vm;
try {
  vm = await import('node:vm');
} catch (e) {
  // 在浏览器环境中可能不可用，忽略错误
}

/**
 * 对eval加密过的JS代码进行解密
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function evalDecode(code) {
  // 检查是否为 eval 加密的代码
  if (!code.includes('eval(') && !code.includes('eval (')) {
    return null;
  }

  try {
    // 创建一个假的环境以避免执行副作用
    const fakeFunctions = {
      // 常见的全局函数
      setTimeout: () => {},
      setInterval: () => {},
      clearTimeout: () => {},
      clearInterval: () => {},
      // 浏览器环境
      document: { 
        createElement: () => ({}),
        querySelector: () => ({}),
        addEventListener: () => {}
      },
      location: {
        href: "https://example.com",
        host: "example.com",
        hostname: "example.com",
        protocol: "https:"
      },
      navigator: {
        userAgent: "Mozilla/5.0"
      },
      // Quantumult X 环境
      $response: {},
      $request: {},
      $notify: () => {},
      $done: () => {}
    };
    
    // 创建一个拦截eval的上下文
    let lastEvalResult = null;
    const contextObj = {
      ...fakeFunctions,
      eval: function(evalCode) {
        lastEvalResult = evalCode;
        return evalCode; // 返回代码而不是执行它
      }
    };
    
    // 使用VM模块在隔离环境中执行（如果在Node环境中）
    if (vm) {
      // 准备沙盒环境
      const sandbox = vm.createContext(contextObj);
      
      // 执行代码，但拦截eval调用
      vm.runInContext(code, sandbox);
      
      // 返回最后一次eval的结果
      return lastEvalResult;
    } else {
      // 浏览器环境下的备选方案
      // 保存原始eval
      const originalEval = globalThis.eval;
      
      // 替换eval以捕获最后的结果
      globalThis.eval = function(evalCode) {
        lastEvalResult = evalCode;
        return evalCode;
      };
      
      try {
        // 用替换后的eval执行代码
        new Function('window', 'document', 'location', 'navigator', 
                     '$response', '$request', '$notify', '$done', code)
          (contextObj, contextObj.document, contextObj.location, 
           contextObj.navigator, contextObj.$response, contextObj.$request, 
           contextObj.$notify, contextObj.$done);
      } finally {
        // 还原原始eval
        globalThis.eval = originalEval;
      }
      
      return lastEvalResult;
    }
  } catch (error) {
    console.error('Eval 解码错误:', error);
    return null;
  }
}

/**
 * 插件主函数
 * @param {string} code - 要解码的代码
 * @returns {string|null} - 解码后的代码或null（解码失败时）
 */
function pluginFunction(code) {
  return evalDecode(code);
}

// 导出插件（ES Module格式）
export default {
  plugin: pluginFunction,
  unpack: evalDecode
};