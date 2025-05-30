// src/plugin/aadecode.js

/**
 * 最简版 AADecode 插件
 * 完全专注于提供 plugin.plugin 方法
 */

// 定义解码函数
function decode(code) {
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

// 创建并导出插件对象
const plugin = {
  plugin: decode
};

// 导出方式 1: 作为默认导出
export default plugin;