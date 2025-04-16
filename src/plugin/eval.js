
// 根据环境确定全局对象
const globalObj = typeof window !== 'undefined' ? window : 
                  typeof global !== 'undefined' ? global : 
                  typeof self !== 'undefined' ? self : {};

// 保存原始的 eval 函数
const evalHolder = globalObj.eval || eval;

/**
 * 对eval加密过的JS代码进行解密
 * @param {string} evalJsCode - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function evalDecode(evalJsCode) {
  try {
    // 检查是否为 eval 加密的代码
    if (!evalJsCode.includes('eval(') && !evalJsCode.includes('eval (')) {
      return null;
    }
    
    return evalHolder.call(globalObj, evalJsCode);
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

// 添加插件方法
pluginFunction.unpack = function(code) {
  return evalDecode(code);
};

// 导出插件（ES Module格式）
export default {
  unpack: evalDecode
};