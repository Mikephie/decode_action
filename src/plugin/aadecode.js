// ./plugin/aadecode.js
// AADecode - Decode JavaScript that has been encoded with aaencode format

/**
 * 检测代码是否是 aaencode 格式
 * @param {string} code - 输入代码
 * @returns {boolean} - 如果是 aaencode 格式则返回 true
 */
function isAAEncoded(code) {
  if (typeof code !== 'string' || !code.trim()) {
    return false;
  }
  
  // aaencode 内容中的常见模式
  const patterns = [
    /ﾟωﾟﾉ= \/｀ｍ'）ﾉ ~┻━┻/,
    /\(ﾟДﾟ\) \['_'\]/,
    /\(ﾟΘﾟ\)/,
    /\(o\^_\^o\)/
  ];
  
  return patterns.some(pattern => pattern.test(code));
}

/**
 * 解码 AAencode 格式的 JavaScript
 * @param {string} code - 编码后的 JavaScript
 * @returns {string} - 解码后的 JavaScript 或原始代码
 */
function aadecode(code) {
  // 如果不是 aaencode 格式，跳过处理
  if (!isAAEncoded(code)) {
    return code;
  }

  try {
    // 清理代码
    const encodedText = code.replace(/\/\*'∇｀\*\//g, '').trim();
    
    // 检查是否是有效的 aaencode 内容
    const evalPreamble = "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (";
    const evalPostamble = ") (ﾟΘﾟ)) ('_');";
    
    if (encodedText.lastIndexOf(evalPreamble) < 0 || 
        encodedText.lastIndexOf(evalPostamble) !== encodedText.length - evalPostamble.length) {
      console.log("代码不是有效的 aaencode 格式");
      return code;
    }
    
    // 转换为解码
    const decodePreamble = "( (ﾟДﾟ) ['_'] (";
    const decodePostamble = ") ());";
    
    const decodingScript = encodedText
      .replace(evalPreamble, decodePreamble)
      .replace(evalPostamble, decodePostamble);
    
    // 使用 eval 解码 - 这对于这种特定的编码方法是必要的
    // eslint-disable-next-line no-eval
    const decodedCode = eval(decodingScript);
    
    console.log("AADecode 解码成功");
    return decodedCode;
  } catch (error) {
    console.error(`AADecode 解码错误: ${error.message}`);
    return code; // 出错时返回原始代码
  }
}

// 使插件与你的框架兼容
export default aadecode;