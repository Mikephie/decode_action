// src/plugin/aadecode.js

/**
 * AADecode 插件 - 解码 aaencode 格式的 JavaScript
 * 匹配框架插件格式
 */

export default function(code) {
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