/**
 * 修复版AADecode解密插件
 * 修复了"Unexpected token 'return'"错误
 */

/**
 * AADecode解密函数 - 修复语法错误问题
 * @param {string} t - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function aadecode(t) {
  try {
    // 更精确的替换，确保语法正确
    // 注意：我们需要确保替换后的代码不会有多余的return或语法错误
    
    // 1. 找到可能的最后一个函数调用
    const lastCallIndex = t.lastIndexOf("(ﾟДﾟ) ['_'] (");
    if (lastCallIndex !== -1) {
      // 创建一个带有前缀和后缀的完整代码
      let processedCode = t;
      
      // 替换最后一个函数调用为return语句
      processedCode = processedCode.substring(0, lastCallIndex) + 
                     "return " + 
                     processedCode.substring(lastCallIndex + "(ﾟДﾟ) ['_'] (".length);
      
      // 移除尾部的 ) ('_'); 调用（如果存在）
      const endCall = ") ('_');";
      const endCallIndex = processedCode.lastIndexOf(endCall);
      if (endCallIndex !== -1) {
        processedCode = processedCode.substring(0, endCallIndex) + ";";
      }
      
      // 创建并执行函数
      try {
        const decodeFn = new Function(processedCode);
        const result = decodeFn();
        return result;
      } catch (innerError) {
        console.error("执行解码函数失败:", innerError);
      }
    }
    
    // 2. 如果第一种方法失败，尝试第二种方法
    // 这种方法更激进，直接在代码最后添加return语句
    try {
      // 移除所有的 ) ('_'); 调用
      let cleanCode = t.replace(/\)\s*\('_'\);/g, ";");
      
      // 在代码末尾添加一个返回语句，捕获最后的表达式
      cleanCode += "\nreturn (ﾟДﾟ);";
      
      const decodeFn2 = new Function(cleanCode);
      const result2 = decodeFn2();
      return result2;
    } catch (error2) {
      console.error("第二种解码方法失败:", error2);
    }
    
    // 3. 如果前两种方法都失败，尝试原始方法
    try {
      // 使用原始的替换方法，但更精确
      let originalCode = t;
      originalCode = originalCode.replace(/\)\s*\('_'\)/g, "");
      originalCode = originalCode.replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return (");
      
      const originalFn = new Function(originalCode);
      const originalResult = originalFn();
      return originalResult;
    } catch (error3) {
      console.error("原始解码方法失败:", error3);
      return null;
    }
  } catch (outerError) {
    console.error("AADecode整体解码失败:", outerError);
    return null;
  }
}

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  return typeof code === 'string' && 
         code.includes('ﾟωﾟﾉ') && 
         code.includes('ﾟДﾟ') && 
         (code.includes("['_']") || code.includes("ﾟДﾟ)['_']"));
}

/**
 * 提取代码中的头部注释
 * @param {string} code - 完整代码
 * @returns {object} - {header, body}
 */
function extractHeader(code) {
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    return {
      header: code.substring(0, aaStartIndex).trim(),
      body: code.substring(aaStartIndex)
    };
  }
  return { header: '', body: code };
}

/**
 * 处理解码后的结果
 * @param {any} result - 解码结果
 * @returns {string} - 格式化后的字符串
 */
function processResult(result) {
  if (result === null || result === undefined) {
    return "null";
  }
  
  if (typeof result === 'string') {
    return result;
  }
  
  if (typeof result === 'function') {
    return result.toString();
  }
  
  if (typeof result === 'object') {
    try {
      return JSON.stringify(result, null, 2);
    } catch (e) {
      return Object.prototype.toString.call(result);
    }
  }
  
  return String(result);
}

/**
 * 插件主函数 - 默认导出
 * @param {string} sourceCode - 源代码
 * @returns {string} - 处理后的代码或原代码
 */
export default function(sourceCode) {
  // 确保输入是字符串
  if (typeof sourceCode !== 'string') {
    return sourceCode;
  }
  
  // 非AADecode编码，直接返回
  if (!isAADecode(sourceCode)) {
    return sourceCode;
  }
  
  // 提取头部注释
  const { header, body } = extractHeader(sourceCode);
  
  // 执行解码
  const decodedResult = aadecode(body);
  
  // 解码失败，返回原代码
  if (decodedResult === null) {
    return sourceCode;
  }
  
  // 处理解码结果
  const resultString = processResult(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}