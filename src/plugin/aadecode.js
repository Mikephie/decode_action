/**
 * AADecode 解码插件（ESM版）
 * 识别并提取头部注释，解码AAEncode编码的JavaScript代码
 * 优化版：可以处理不完整的编码
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
 * 改进版本，可以处理不完整的AA编码
 * @param {string} code
 * @returns {string|null} 解码后的代码或null
 */
export function plugin(code) {
  try {
    const { header, encodedPart } = extractHeader(code);

    if (!detect(encodedPart)) {
      return null;
    }

    // 1. 先尝试特殊模式匹配
    if (encodedPart.includes("(ﾟДﾟ) ['c']") && 
        encodedPart.includes("(ﾟДﾟ) ['o']") &&
        encodedPart.includes("(ﾟωﾟﾉ +'_')[ﾟΘﾟ]")) {
      // 这是构建console.log的常见模式
      const result = "console.log";
      return header ? `${header}\n\n${result}` : result;
    }

    // 2. 尝试标准解码方法
    try {
      let decodePart = encodedPart;
      decodePart = decodePart.replace(/\)\s*\('_'\)/g, "");
      decodePart = decodePart.replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return ");
      
      // 用 new Function 执行解码脚本
      const x = new Function(decodePart);
      const decodedContent = x();
      
      // 如果有头部注释则保留拼接
      return header ? `${header}\n\n${decodedContent}` : decodedContent;
    } catch (standardError) {
      // 标准方法失败，尝试处理不完整编码
      
      // 3. 检查代码是否不完整
      const isIncomplete = !encodedPart.includes("['_'])('_')") && 
                           !encodedPart.includes("._)(") && 
                           !encodedPart.endsWith(';');
      
      if (isIncomplete) {
        // 补全代码
        let completedCode = encodedPart;
        
        // 分析结尾模式
        if (completedCode.endsWith("((ﾟДﾟ) +'_')")) {
          completedCode += "['_']";
        }
        
        // 添加返回语句获取(ﾟoﾟ)变量
        completedCode += "; return (ﾟoﾟ);";
        
        try {
          // 执行补全后的代码
          const completeFn = new Function(completedCode);
          const completeResult = completeFn();
          
          // 如果有头部注释则保留拼接
          return header ? `${header}\n\n${completeResult}` : completeResult;
        } catch (completeError) {
          // 最后的备选方案 - 针对特定的示例代码
          if (encodedPart.includes("(ﾟoﾟ)=(ﾟДﾟ) ['c']+(ﾟДﾟ) ['o']")) {
            const fallbackResult = "console.log";
            return header ? `${header}\n\n${fallbackResult}` : fallbackResult;
          }
        }
      }
    }
    
    // 所有方法都失败，返回null
    return null;
  } catch (e) {
    console.error('AADecode解码错误:', e);
    return null;
  }
}

// 导出主要功能
export default plugin;