/**
 * 独立的 AAEncode 解码器
 * 用于解码使用日语颜文字(Kaomoji)混淆的 JavaScript 代码
 * 无需依赖外部类或模块
 */

/**
 * 检测代码是否为 AAEncode 混淆
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否为 AAEncode 混淆
 */
function isAAEncode(code) {
  if (typeof code !== 'string') return false;
  
  // AAEncode 的特征模式
  return /ﾟωﾟﾉ\s*=/.test(code) && 
         (/\(ﾟДﾟ\)/.test(code) || /\(ﾟΘﾟ\)/.test(code));
}

/**
 * 尝试提取 AAEncode 混淆中的最终字符串
 * @param {string} code - AAEncode 混淆代码
 * @returns {string|null} - 提取的字符串或 null
 */
function extractFinalString(code) {
  // 多种匹配模式，按成功可能性排序
  const patterns = [
    // 1. 标准 AAEncode 结尾模式
    /\(ﾟДﾟ\)\s*\[\s*ﾟoﾟ\s*\]\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 2. 函数调用结尾模式
    /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]\s*\(\s*\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\][^)]*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 3. 简单字符串结尾模式
    /\(['"]([^'"]+)['"]\)\s*;?\s*$/,
    
    // 4. 另一种调用模式
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
 * 分离和解析 AAEncode 中的字符代码块
 * @param {string} code - AAEncode 混淆代码
 * @returns {string|null} - 解码结果或 null
 */
function parseCharCodes(code) {
  try {
    // 1. 预处理代码，去除空白符
    code = code.replace(/[\s\n\r]/g, '');
    
    // 2. 查找特征字符串
    if (!code.includes('(ﾟДﾟ)[ﾟεﾟ]')) {
      return null;
    }
    
    // 3. 定义字节映射表
    const bytesMap = {
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
    
    // 4. 替换字节模式
    let decoded = code;
    for (const [pattern, byte] of Object.entries(bytesMap)) {
      decoded = decoded.split(pattern).join(byte);
    }
    
    // 5. 提取和处理字符代码
    const charBlocks = decoded.split('\\');
    if (charBlocks.length <= 1) return null;
    
    // 解析每个字符块
    const chars = [];
    for (let i = 1; i < charBlocks.length; i++) {
      const block = charBlocks[i].trim();
      if (!block) continue;
      
      // 检查是否为十六进制表示
      const isHex = block.startsWith('x');
      
      try {
        if (isHex) {
          // 处理十六进制代码 (\x..)
          const hexCode = block.substring(1, 3);
          chars.push(String.fromCharCode(parseInt(hexCode, 16)));
        } else {
          // 处理八进制代码 (\...)
          const octCode = block.substring(0, 3);
          chars.push(String.fromCharCode(parseInt(octCode, 8)));
        }
      } catch (e) {
        // 跳过解析失败的字符
        continue;
      }
    }
    
    return chars.join('');
  } catch (e) {
    console.error('[AAEncode] 字符解析错误:', e.message);
    return null;
  }
}

/**
 * 解码 AAEncode 混淆的 JavaScript 代码
 * @param {string} code - 要解码的代码
 * @returns {string|null} - 解码结果或 null
 */
function decodeAAencode(code) {
  if (!code || typeof code !== 'string') {
    return null;
  }
  
  // 检查是否是 AAEncode
  if (!isAAEncode(code)) {
    return null;
  }
  
  console.log('[AAEncode] 检测到 AAEncode 混淆，尝试解密...');
  
  try {
    // 方法 1: 直接提取最终字符串
    const extractedString = extractFinalString(code);
    if (extractedString) {
      console.log('[AAEncode] 通过提取最终字符串成功解密');
      return extractedString;
    }
    
    // 方法 2: 解析字符代码
    const parsedChars = parseCharCodes(code);
    if (parsedChars) {
      console.log('[AAEncode] 通过解析字符代码成功解密');
      return parsedChars;
    }
    
    // 方法 3: 正则匹配替换
    const simplifiedCode = code
      .replace(/\/\*.*?\*\//g, '') // 移除注释
      .replace(/[\s\n\r]+/g, '')  // 移除空白符
      .replace(/ﾟДﾟ\)\[ﾟoﾟ\]\).*?\('([^'"]*)'\);?$/, '$1'); // 提取字符串
      
    if (simplifiedCode !== code && simplifiedCode.length < code.length / 2) {
      console.log('[AAEncode] 通过正则匹配成功解密');
      return simplifiedCode;
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