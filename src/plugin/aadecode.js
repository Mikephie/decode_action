/**
 * 框架兼容AADecode解密插件
 * 完全符合主脚本框架的要求
 */

/**
 * AADecode解密函数 - 基于提供的函数改写
 * @param {string} t - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function aadecode(t) {
  try {
    t = t.replace(/\) \('_'\)/g, "");
    t = t.replace(/\(ﾟДﾟ\) \['_'\] \(/g, "return ");
    var x = new Function(t);
    var r = x();
    return r;
  } catch (error) {
    console.error("AADecode解密失败:", error);
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
         code.includes("['_']");
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
 * 插件主函数 - 确保与主框架完全兼容
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
  
  // 确保结果是字符串
  const resultString = typeof decodedResult === 'string' 
    ? decodedResult 
    : String(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}