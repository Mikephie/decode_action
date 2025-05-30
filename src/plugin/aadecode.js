// src/plugin/aadecode.js

/**
 * AADecode 插件 - 解码 aaencode 格式的 JavaScript
 * ESM 格式
 */

/**
 * 解码 aaencode 格式的 JavaScript
 * @param {string} code - 输入代码
 * @returns {string} - 解码后的代码
 */
function decodeAAencode(code) {
  // 安全检查
  if (typeof code !== 'string' || !code.trim()) {
    return code;
  }
  
  // 检查是否可能是 aaencode 格式
  if (!code.includes('ﾟДﾟ') || !code.includes('_')) {
    return code;
  }

  try {
    console.log('检测到 aaencode 格式，尝试解码...');
    
    // 准备解码
    const encodedText = code.trim();
    
    // 检查特征
    const evalPreamble = "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (";
    const evalPostamble = ") (ﾟΘﾟ)) ('_');";
    
    if (encodedText.indexOf(evalPreamble) < 0 || 
        encodedText.lastIndexOf(evalPostamble) !== encodedText.length - evalPostamble.length) {
      console.log('代码不是有效的 aaencode 格式');
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
    const result = eval(decodingScript);
    
    // 检查结果
    if (result && typeof result === 'string') {
      console.log('AADecode 解码成功');
      return result;
    }
    
    console.log('解码结果无效，返回原始代码');
    return code;
  } catch (error) {
    // 解码失败，返回原始代码
    console.error(`AADecode 解码错误: ${error.message}`);
    return code;
  }
}

// 创建一个具有 plugin 方法的对象
const plugin = {
  plugin: decodeAAencode
};

// 命名导出 - ESM 风格
export { plugin };

// 提供函数作为默认导出 - 与你分享的其他插件模式匹配
export default function(code) {
  return decodeAAencode(code);
}