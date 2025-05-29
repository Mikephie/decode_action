/**
 * 修复语法错误的AADecode插件
 * 基于网页版极简解码函数，增加语法错误处理
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
 * AADecode解密函数 - 增强语法错误处理
 * @param {string} t - AADecode编码
 * @returns {string} - 解码结果
 */
function aadecode(t) {
  try {
    // 第一种尝试：使用原始替换模式
    try {
      // 注意：使用非转义的正则来匹配，避免语法问题
      let code = t.replace(/\) \('_'\)/g, "");
      code = code.replace(/\(ﾟДﾟ\) \['_'\] \(/g, "return ");
      
      const x = new Function(code);
      const r = x();
      return r !== undefined ? r : "constructor";
    } catch (error1) {
      console.error("基本替换模式失败:", error1);
      
      // 第二种尝试：更保守的替换
      try {
        // 只替换最后一个函数调用
        const lastCallIndex = t.lastIndexOf("(ﾟДﾟ) ['_'] (");
        if (lastCallIndex !== -1) {
          const before = t.substring(0, lastCallIndex);
          const after = t.substring(lastCallIndex + "(ﾟДﾟ) ['_'] (".length);
          
          const code = before + "return " + after.replace(/\) \('_'\)/g, "");
          
          const x = new Function(code);
          const r = x();
          return r !== undefined ? r : "constructor";
        }
      } catch (error2) {
        console.error("保守替换模式失败:", error2);
      }
      
      // 第三种尝试：最基本的提取
      try {
        // 尝试直接提取结果字符串
        const resultMatch = t.match(/\(ﾟДﾟ\)\['\_'\]\(\(ﾟДﾟ\)\['\_'\]\((.+?)\)/);
        if (resultMatch && resultMatch[1]) {
          return resultMatch[1].replace(/\+/g, '').replace(/\'/g, '').trim();
        }
      } catch (error3) {
        console.error("提取模式失败:", error3);
      }
    }
    
    // 所有方法都失败，返回默认值
    return "constructor";
  } catch (outerError) {
    console.error("整体解码过程失败:", outerError);
    return "constructor";
  }
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
  
  // 使用增强版aadecode函数
  const decodedResult = aadecode(body);
  
  // 确保结果是字符串
  const resultString = typeof decodedResult === 'string' 
    ? decodedResult 
    : String(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}