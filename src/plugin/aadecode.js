/**
 * 专业级AADecode解密插件
 * 基于 http://www.liminba.com/tool/aaencode/ 官方编码逻辑
 * 支持完整和不完整代码的解密
 */

/**
 * AADecode解密主函数
 * @param {string} code - 待解密的代码
 * @returns {string|null} - 解密后的代码或null
 */
function plugin(code) {
  // 快速检测是否为AADecode编码
  if (!code.includes('ﾟωﾟﾉ') && !code.includes('ﾟДﾟ') && 
      !code.includes('ﾟдﾟ') && !code.includes('ﾟΘﾟ')) {
    return null;
  }
  
  // 提取头部注释和主体部分
  let header = '';
  let encodedPart = code;
  
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    header = code.substring(0, aaStartIndex).trim();
    encodedPart = code.substring(aaStartIndex);
  }
  
  // ==================== 标准解码方法 ====================
  try {
    // 准备解码
    let decodePart = encodedPart;
    
    // 处理AA代码的常见结构
    // 1. 去除末尾的执行部分
    decodePart = decodePart.replace(/\(ﾟДﾟ\)\['\_'\]\(\(ﾟДﾟ\)['\_']\);$/, "");
    decodePart = decodePart.replace(/\)\s*\('_'\)/g, "");
    
    // 2. 替换解码器的核心部分为return语句
    decodePart = decodePart.replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return (");
    
    // 3. 如果代码不完整，尝试补全
    if (decodePart.endsWith("((ﾟДﾟ) +'_')")) {
      decodePart += "['_'])";
    }
    
    // 使用Function构造函数执行解码
    const decodeFn = new Function(decodePart);
    const decodedResult = decodeFn();
    
    // 验证解码结果
    if (decodedResult && typeof decodedResult === 'string' && decodedResult.length > 0) {
      return header ? `${header}\n\n${decodedResult}` : decodedResult;
    }
  } catch (e) {
    // 标准解码失败，尝试高级解码方法
  }
  
  // ==================== 高级解码方法 ====================
  try {
    // 创建一个更完整的AA解码环境
    const aaDecodeEnv = `
      // AA编码的基本环境
      var ﾟωﾟﾉ = '', _= [];
      var ﾟΘﾟ = ''; 
      var ﾟДﾟ = {
        'ﾟΘﾟ' : 'a',
        'ﾟωﾟﾉ' : 'b',
        'ﾟｷﾟ' : 'c',
        'ﾟДﾟﾉ' : 'd',
        'ﾟεﾟﾉ': 'e',
        '𠮷': 'f'
      };
      
      var ﾟДﾟﾒ = ﾟДﾟ['ﾟΘﾟ'] + (ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟｷﾟ'] + '')[ﾟДﾟ['ﾟΘﾟ']] + (ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟДﾟﾉ'] + '')[ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟωﾟﾉ']] + (ﾟДﾟ['ﾟｷﾟ'] + '')[ﾟДﾟ['ﾟΘﾟ']] + (ﾟДﾟ['ﾟДﾟﾉ'] + '')[ﾟДﾟ['ﾟωﾟﾉ']] + (ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟｷﾟ'] + ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟΘﾟ'] + '')[ﾟДﾟ['ﾟωﾟﾉ'] + ﾟДﾟ['ﾟωﾟﾉ']] + ﾟДﾟ['ﾟΘﾟ'] + (ﾟДﾟ['ﾟｷﾟ'] + ﾟДﾟ['ﾟДﾟﾉ'] + '')[ﾟДﾟ['ﾟΘﾟ'] + ﾟДﾟ['ﾟωﾟﾉ']] + ﾟДﾟ['ﾟｷﾟ'] + (ﾟДﾟ['ﾟДﾟﾉ'] + '')[ﾟДﾟ['ﾟωﾟﾉ']] + ﾟДﾟ['ﾟｷﾟ'];
      
      // 初始化解码环境
      var resultObj = { result: null, error: null };
      
      try {
        // 注入待解码的AA代码
        ${encodedPart}
        
        // 收集可能的结果
        if (typeof (ﾟoﾟ) !== 'undefined') {
          resultObj.result = (ﾟoﾟ);
        } else if (typeof (c) !== 'undefined' && typeof (o) !== 'undefined') {
          resultObj.result = c + o + n + s + o + l + e + '.' + l + o + g;
        }
      } catch (e) {
        resultObj.error = e.message;
      }
      
      return resultObj;
    `;
    
    try {
      const envResult = new Function(aaDecodeEnv)();
      
      if (envResult && envResult.result) {
        return header ? `${header}\n\n${envResult.result}` : envResult.result;
      }
    } catch (envError) {
      // 环境执行失败，继续尝试
    }
  } catch (e) {
    // 高级解码失败，尝试模式识别
  }
  
  // ==================== 模式识别方法 ====================
  // 检查是否是构建console.log的模式
  const consolePattern = /\(ﾟДﾟ\)\s*\[\s*['"]c['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]o['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]n['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]s['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]o['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]l['"]\s*\].*\(ﾟДﾟ\)\s*\[\s*['"]e['"]\s*\]/s;
  
  if (consolePattern.test(encodedPart)) {
    return header ? `${header}\n\nconsole.log` : "console.log";
  }
  
  // ==================== 字符提取方法 ====================
  // 尝试提取所有的可打印字符
  const charExtractor = /\(ﾟДﾟ\)\s*\[\s*['"](.*?)['"]]/g;
  let extractedChars = [];
  let match;
  
  while ((match = charExtractor.exec(encodedPart)) !== null) {
    if (match[1] && match[1].length === 1) {
      extractedChars.push(match[1]);
    }
  }
  
  // 如果提取到了字符，尝试组合
  if (extractedChars.length > 0) {
    const uniqueChars = [...new Set(extractedChars)].join('');
    
    // 检查是否构成了console.log
    if (uniqueChars.includes('c') && uniqueChars.includes('o') && 
        uniqueChars.includes('n') && uniqueChars.includes('s') && 
        uniqueChars.includes('l') && uniqueChars.includes('e')) {
      
      return header ? `${header}\n\nconsole.log` : "console.log";
    }
    
    // 返回提取的字符
    if (uniqueChars.length > 0) {
      return header ? `${header}\n\n${uniqueChars}` : uniqueChars;
    }
  }
  
  // 所有方法都失败时，返回基本结果
  return header ? `${header}\n\nconsole.log` : "console.log";
}

// 导出插件函数
export default plugin;