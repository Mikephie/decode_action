/**
 * 智能AAEncode解码器
 * 实现高级解码功能，无硬编码，动态分析混淆结构
 */

/**
 * 检测代码是否为AAEncode混淆
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否为AAEncode混淆
 */
function isAAEncode(code) {
  if (typeof code !== 'string') return false;
  
  // AAEncode的特征模式
  return /ﾟωﾟﾉ\s*=/.test(code) && 
         (/\(ﾟДﾟ\)/.test(code) || /\(ﾟΘﾟ\)/.test(code));
}

/**
 * 尝试提取AAEncode混淆中的最终字符串
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 提取的字符串或null
 */
function extractFinalString(code) {
  // 多种匹配模式，按成功可能性排序
  const patterns = [
    // 标准AAEncode结尾模式
    /\(ﾟДﾟ\)\s*\[\s*ﾟoﾟ\s*\]\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 函数调用结尾模式
    /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]\s*\(\s*\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\][^)]*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 简单字符串结尾模式
    /\(['"]([^'"]+)['"]\)\s*;?\s*$/,
    
    // 另一种调用模式
    /\(ﾟДﾟ\)\s*\[\s*'_'\s*\]\s*\([^)]+\)\s*\(ﾟΘﾟ\)\)\s*\(\s*['"]([^"']+)['"]\s*\)/
  ];
  
  for (const pattern of patterns) {
    try {
      const match = code.match(pattern);
      if (match && match[1] && match[1].length > 0) {
        return match[1];
      }
    } catch (e) {
      // 忽略单个正则匹配错误，继续尝试其他模式
      continue;
    }
  }
  
  return null;
}

/**
 * 分析代码结构并提取有意义的内容
 * @param {string} code - 原始混淆代码
 * @param {string} decodedString - AAEncode解码后的字符串
 * @returns {string|null} - 分析后的内容或null
 */
function analyzeCodeStructure(code, decodedString) {
  // 如果解码结果过于简单，可能需要进一步分析
  if (decodedString && decodedString.length < 5) {
    console.log(`[AAEncode] 解码结果过于简单: "${decodedString}"，尝试深度分析...`);
    
    // 分析代码上下文，查找这个简单字符串在原始代码中的使用位置
    const contextRegex = new RegExp(`\\(['"](${decodedString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})['"](\\s*\\)[^;]+;[\\s\\S]{0,500})`, 'i');
    const contextMatch = code.match(contextRegex);
    
    if (contextMatch && contextMatch[2]) {
      console.log('[AAEncode] 找到解码字符串的上下文');
      return `/* 
  注意: 解码后的字符串 "${decodedString}" 被用在以下上下文:
  这可能是进一步分析和理解脚本功能的关键。
*/

/* 相关代码上下文 */
${contextMatch[0].trim()}`;
    }
  }
  
  // 如果代码中包含明显的注释部分，提取这些有价值的信息
  const commentBlocks = code.match(/\/\*{2,}[\s\S]+?\*{2,}\//g) || [];
  let comments = '';
  
  if (commentBlocks.length > 0) {
    comments = `/* 脚本包含以下注释信息 */
${commentBlocks.join('\n\n')}

`;
  }
  
  // 分析代码中的关键函数模式
  const functionPatterns = [
    { pattern: /JSON\.parse\(\$response\.body\)/i, description: '脚本解析响应体' },
    { pattern: /\$done\(\{[^}]*\}\)/i, description: '脚本修改完成后调用$done返回结果' },
    { pattern: /vipEndTime|svipEndTime/i, description: '脚本可能修改会员过期时间' },
    { pattern: /needVIP|needSVIP|isSVIP|isVIP/i, description: '脚本可能修改会员状态' },
    { pattern: /coin|score/i, description: '脚本可能修改积分或金币' }
  ];
  
  const detectedPatterns = functionPatterns
    .filter(({ pattern }) => pattern.test(code))
    .map(({ description }) => description);
  
  let analysis = '';
  if (detectedPatterns.length > 0) {
    analysis = `/* 代码分析 */
// 该脚本可能进行以下操作:
// ${detectedPatterns.join('\n// ')}

`;
  }
  
  // 提取脚本中的关键变量声明
  const varDeclarations = code.match(/var\s+\w+\s*=\s*[^;]+;/g) || [];
  let variables = '';
  
  if (varDeclarations.length > 0) {
    variables = `/* 关键变量声明 */
${varDeclarations.join('\n')}

`;
  }
  
  // 构造解析结果
  if (comments || analysis || variables) {
    return `${comments}${analysis}${variables}/* 最终解码字符串 */
"${decodedString}"`;
  }
  
  return null;
}

/**
 * 解析AAEncode中的字符代码
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 解析结果或null
 */
function parseCharCodes(code) {
  try {
    // 查找特征字符串
    if (!code.includes('(ﾟДﾟ)[ﾟεﾟ]')) {
      return null;
    }
    
    // 定义一些基本的映射模式
    const patterns = {
      '(ﾟΘﾟ)': '1',
      '(ﾟｰﾟ)': '4', 
      '(c^_^o)': '0',
      '(o^_^o)': '3',
      '((ﾟｰﾟ)+(ﾟΘﾟ))': '5',
      '((o^_^o)+(o^_^o))': '6',
      '((ﾟｰﾟ)+(o^_^o))': '7',
      '((ﾟｰﾟ)+(ﾟｰﾟ))': '8',
      '((ﾟｰﾟ)+(ﾟｰﾟ)+(ﾟΘﾟ))': '9',
      '(ﾟДﾟ)[ﾟεﾟ]': '\\'
    };
    
    // 预处理代码，去除空白符
    let processed = code.replace(/\s+/g, '');
    
    // 替换已知模式
    for (const [pattern, replacement] of Object.entries(patterns)) {
      processed = processed.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }
    
    // 尝试找到和解析转义序列
    const escapeSequences = processed.match(/\\([0-7]{3}|x[0-9a-fA-F]{2})/g) || [];
    if (escapeSequences.length === 0) {
      return null;
    }
    
    // 解析转义序列
    const chars = escapeSequences.map(seq => {
      if (seq.startsWith('\\x')) {
        return String.fromCharCode(parseInt(seq.slice(2), 16));
      } else {
        return String.fromCharCode(parseInt(seq.slice(1), 8));
      }
    });
    
    return chars.join('');
  } catch (e) {
    console.error('[AAEncode] 字符解析错误:', e.message);
    return null;
  }
}

/**
 * 主解码函数 - 智能AAEncode解码
 * @param {string} code - 要解码的代码
 * @returns {string|null} - 解码结果或null
 */
function decodeAAencode(code) {
  if (!code || typeof code !== 'string') {
    return null;
  }
  
  // 检查是否是AAEncode
  if (!isAAEncode(code)) {
    return null;
  }
  
  console.log('[AAEncode] 检测到AAEncode混淆，尝试解密...');
  
  try {
    // 方法1: 直接提取最终字符串
    const extractedString = extractFinalString(code);
    if (extractedString) {
      console.log('[AAEncode] 通过提取最终字符串成功解密');
      
      // 进一步分析代码结构
      const analysisResult = analyzeCodeStructure(code, extractedString);
      if (analysisResult) {
        return analysisResult;
      }
      
      return extractedString;
    }
    
    // 方法2: 解析字符代码
    const parsedChars = parseCharCodes(code);
    if (parsedChars) {
      console.log('[AAEncode] 通过解析字符代码成功解密');
      return parsedChars;
    }
    
    // 方法3: 正则匹配替换
    const simplifiedCode = code
      .replace(/\/\*.*?\*\//g, '') // 移除注释
      .replace(/[\s\n\r]+/g, '')  // 移除空白符
      .replace(/ﾟДﾟ\)\[ﾟoﾟ\]\).*?\('([^'"]*)'\);?$/, '$1'); // 提取字符串
      
    if (simplifiedCode !== code && simplifiedCode.length < code.length / 2) {
      console.log('[AAEncode] 通过正则匹配成功解密');
      return simplifiedCode;
    }
    
    // 从原始代码中提取可能的有用信息
    const commentBlocks = code.match(/\/\*{2,}[\s\S]+?\*{2,}\//g) || [];
    if (commentBlocks.length > 0) {
      console.log('[AAEncode] 解密失败，但提取了脚本注释信息');
      return `/* 解密AAEncode失败，但提取了以下信息 */
${commentBlocks.join('\n\n')}

/* 注意：原始AAEncode混淆代码可能需要在特定环境执行才能正确解密 */`;
    }
    
    console.log('[AAEncode] 所有解密方法均失败');
    return null;
  } catch (error) {
    console.error('[AAEncode] 处理时发生错误:', error.message);
    return null;
  }
}

// 导出解码函数
export default decodeAAencode;