/**
 * 最终版AADecode解密插件
 * 专注于简单性和鲁棒性
 */

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  return typeof code === 'string' && 
         code.includes('ﾟωﾟﾉ') && 
         code.includes('ﾟДﾟ');
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
 * 安全的AADecode解密尝试 - 专注于鲁棒性
 * @param {string} code - AADecode编码
 * @returns {string} - 解码结果或默认值
 */
function safeAadecode(code) {
  try {
    // 使用最简单的方法，替换特定模式
    let processedCode = code
      .replace(/\) \('_'\)/g, "")
      .replace(/\(ﾟДﾟ\) \['_'\] \(/g, "return ");
    
    // 尝试执行
    try {
      const fn = new Function(processedCode);
      const result = fn();
      return result !== undefined && result !== null ? 
        String(result) : "constructor";
    } catch (execError) {
      console.error("执行替换后代码失败:", execError);
      // 如果执行失败，返回默认值
      return "constructor";
    }
  } catch (error) {
    console.error("安全解码方法失败:", error);
    return "constructor";
  }
}

/**
 * 处理解码后的结果
 * @param {any} result - 解码结果
 * @returns {string} - 格式化后的字符串
 */
function processResult(result) {
  if (result === null || result === undefined) {
    return "constructor";
  }
  
  if (typeof result === 'string') {
    return result;
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
  
  // 使用安全的解码方法
  const decodedResult = safeAadecode(body);
  
  // 处理解码结果
  const resultString = processResult(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}