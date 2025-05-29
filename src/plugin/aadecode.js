/**
 * AADecode 解码插件（ESM版）
 * 识别并提取头部注释，解码AAEncode编码的JavaScript代码
 */

/**
 * 识别并提取AADecode编码之前的注释和配置信息
 * @param {string} code - 完整的代码字符串
 * @returns {{header: string, encodedPart: string}} - 头部注释和编码内容
 */
export function extractHeader(code) {
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    return {
      header: code.substring(0, aaStartIndex).trim(),
      encodedPart: code.substring(aaStartIndex)
    };
  }
  return {
    header: '',
    encodedPart: code
  };
}

/**
 * 判断是否为AADecode编码代码
 * @param {string} code
 * @returns {boolean}
 */
export function detect(code) {
  return code.includes('ﾟωﾟﾉ') || code.includes('ﾟДﾟ') || 
         code.includes('ﾟдﾟ') || code.includes('ﾟΘﾟ');
}

/**
 * 解码AA编码的JavaScript代码，同时保留头部注释
 * @param {string} code
 * @returns {string|null} 解码后的代码或null
 */
export function plugin(code) {
  try {
    const { header, encodedPart } = extractHeader(code);

    if (!detect(encodedPart)) {
      return null;
    }

    let decodePart = encodedPart;
    decodePart = decodePart.replace(") ('_')", "");
    decodePart = decodePart.replace("(ﾟДﾟ) ['_'] (", "return ");

    // 用 new Function 执行解码脚本
    const x = new Function(decodePart);
    const decodedContent = x();

    // 如果有头部注释则保留拼接
    return header ? `${header}\n\n${decodedContent}` : decodedContent;
  } catch (e) {
    console.error('AADecode解码错误:', e);
    return null;
  }
}