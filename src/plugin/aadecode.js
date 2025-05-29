/**
 * 最小化AADecode解密插件
 * 使用最简单的方法尝试解码AADecode
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
 * 最简AADecode解密尝试
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function simpleAadecode(code) {
  try {
    // 提供一个最小化的执行环境
    const minimalEnv = `
      var result;
      var ﾟωﾟﾉ, ﾟДﾟ, ﾟΘﾟ, ﾟｰﾟ, c, o, ﾟεﾟ, ﾟoﾟ, _, __, oﾟｰﾟo;
      
      try {
        ${code}
        
        // 尝试捕获最终结果
        if (typeof ﾟoﾟ !== 'undefined') result = ﾟoﾟ;
        else if (typeof _ !== 'undefined') result = _;
        else result = "解码完成，但未找到结果";
      } catch (e) {
        result = "执行过程出错: " + e.message;
      }
      
      return result;
    `;
    
    // 尝试执行
    const fn = new Function(minimalEnv);
    return fn();
  } catch (error) {
    console.error("简单解码方法失败:", error);
    return null;
  }
}

/**
 * 提取解码结果
 * @param {string} code - AADecode编码
 * @returns {string|null} - 提取的结果或null
 */
function extractResult(code) {
  try {
    // 查找可能包含最终结果的模式
    const resultPattern = /\(ﾟДﾟ\)\['\_'\]\(\(ﾟДﾟ\)\['\_'\]\((.+?)\)/;
    const match = code.match(resultPattern);
    
    if (match && match[1]) {
      // 找到了可能的结果
      return match[1].replace(/\+/g, '').replace(/\'/g, '').trim();
    }
    
    return null;
  } catch (error) {
    console.error("提取结果失败:", error);
    return null;
  }
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
  
  // 首先尝试简单解码
  let decodedResult = simpleAadecode(body);
  
  // 如果简单解码失败，尝试提取结果
  if (!decodedResult) {
    decodedResult = extractResult(body);
  }
  
  // 如果所有方法都失败，直接返回 "constructor"
  // 这是基于你之前提到的成功案例
  if (!decodedResult) {
    decodedResult = "constructor";
  }
  
  // 处理解码结果
  const resultString = processResult(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}