// src/plugin/aadecode.js

/**
 * 解码 AAencode 格式的 JavaScript
 * 此函数将 aaencode 格式的代码转换回正常的 JavaScript
 * @param {string} code - 编码后的代码
 * @returns {string} - 解码后的代码
 */
export default function(code) {
  // 基本检查 - 如果不是字符串或为空，直接返回
  if (typeof code !== 'string' || !code.trim()) {
    return code;
  }
  
  // 简单检查是否可能是 aaencode 格式
  // aaencode 格式通常包含这些特殊字符
  if (!code.includes('ﾟДﾟ') || !code.includes('_')) {
    return code;
  }

  try {
    // 清理代码
    const encodedText = code.replace(/\/\*'∇｀\*\//g, '').trim();
    
    // 检查是否有 aaencode 的标志性结构
    const evalPreamble = "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (";
    const evalPostamble = ") (ﾟΘﾟ)) ('_');";
    
    if (encodedText.lastIndexOf(evalPreamble) < 0 || 
        encodedText.lastIndexOf(evalPostamble) !== encodedText.length - evalPostamble.length) {
      return code;
    }
    
    // 转换为可解码的形式
    const decodePreamble = "( (ﾟДﾟ) ['_'] (";
    const decodePostamble = ") ());";
    
    const decodingScript = encodedText
      .replace(evalPreamble, decodePreamble)
      .replace(evalPostamble, decodePostamble);
    
    // 使用 eval 解码
    // eslint-disable-next-line no-eval
    const decodedCode = eval(decodingScript);
    
    // 如果解码成功且结果不为空，返回解码后的代码
    if (decodedCode && typeof decodedCode === 'string') {
      return decodedCode;
    }
    
    // 如果解码结果为空或不是字符串，返回原始代码
    return code;
  } catch (error) {
    // 解码失败，返回原始代码
    return code;
  }
}