
// 检查是否在 Node.js 环境
const isNode = typeof process !== 'undefined' && 
               process.versions != null && 
               process.versions.node != null;

// 动态导入 Node.js 模块（如果在 Node.js 环境中）
let nodeVM;
if (isNode) {
  try {
    nodeVM = (await import('node:vm')).default;
  } catch (e) {
    console.error('无法导入 vm 模块:', e);
  }
}

/**
 * 替换代码中的 eval 函数调用，捕获其参数
 * @param {string} code - 包含 eval 调用的代码
 * @returns {string} - 修改后的代码
 */
function replaceEvalWithCapture(code) {
  // 捕获 eval 的参数并返回它，而不是执行它
  return code.replace(/eval\s*\(/g, '(function(x) { return x; })(');
}

/**
 * 创建模拟的浏览器环境
 * @returns {Object} - 模拟的浏览器对象
 */
function createMockBrowser() {
  return {
    window: {
      document: { createElement: () => ({}), addEventListener: () => {} },
      navigator: { userAgent: "Mozilla/5.0" },
      location: { href: "https://example.com" },
      screen: { width: 1920, height: 1080 },
      $response: {}, $request: {}, $done: () => {}, $notify: () => {}
    },
    document: { createElement: () => ({}), addEventListener: () => {} },
    navigator: { userAgent: "Mozilla/5.0" },
    location: { href: "https://example.com" },
    screen: { width: 1920, height: 1080 },
    console: { log: () => {}, error: () => {}, warn: () => {} },
    $response: {}, $request: {}, $done: () => {}, $notify: () => {}
  };
}

/**
 * 解包 eval 加密的代码
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function unpack(code) {
  // 如果不包含 eval，直接返回
  if (!code.includes('eval(') && !code.includes('eval (')) {
    return null;
  }
  
  try {
    // 替换 eval 为一个捕获函数
    const modifiedCode = replaceEvalWithCapture(code);
    
    if (isNode && nodeVM) {
      // 在 Node.js 环境中使用 vm 模块
      const mockEnv = createMockBrowser();
      const sandbox = { ...mockEnv, ...global };
      
      // 创建上下文并运行代码
      const context = nodeVM.createContext(sandbox);
      const result = nodeVM.runInContext(modifiedCode, context);
      
      // 返回结果，如果是字符串（可能是另一层加密）则递归解包
      if (typeof result === 'string' && result.includes('eval(')) {
        return unpack(result);
      }
      return result;
    } else {
      // 浏览器环境或备选方案
      const mockEnv = createMockBrowser();
      
      // 使用 Function 构造函数创建一个函数并执行
      // 传入所有必要的全局变量
      const funcParams = ['window', 'document', 'navigator', 'location', 
                          '$response', '$request', '$notify', '$done'];
      const funcArgs = [
        mockEnv.window, mockEnv.document, mockEnv.navigator, mockEnv.location,
        mockEnv.$response, mockEnv.$request, mockEnv.$notify, mockEnv.$done
      ];
      
      // 创建并执行函数
      const func = new Function(...funcParams, `return ${modifiedCode}`);
      const result = func(...funcArgs);
      
      // 递归解包多层加密
      if (typeof result === 'string' && result.includes('eval(')) {
        return unpack(result);
      }
      return result;
    }
  } catch (error) {
    console.error('解包错误:', error);
    // 在出错的情况下，尝试更直接的方法
    try {
      // 简单地替换 eval 并执行
      const simpleReplaced = code.replace(/eval\s*\(/g, '(');
      return simpleReplaced;
    } catch (e) {
      console.error('备选解包方法也失败:', e);
      return null;
    }
  }
}

// 导出插件（ES Module格式）
export default {
  plugin: unpack,
  unpack: unpack
};