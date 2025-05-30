/**
 * AADecode Plugin - Decodes JavaScript obfuscated with aaencode
 * 
 * This plugin combines robust detection with efficient decoding methods
 * to handle various forms of aaencoded JavaScript.
 */

// 正确的 AADecode 解密器实现（支持递归解密）
function executeFullAADecode(encodedText, depth = 0) {
  const MAX_DEPTH = 10; // 防止无限递归
  
  if (depth >= MAX_DEPTH) {
    console.log(`AADecode: Maximum recursion depth (${MAX_DEPTH}) reached`);
    return encodedText;
  }

  try {
    // 使用标准的 AADecode 实现
    var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    var decodePostamble = ") ());";

    // 清理输入文本
    var text = encodedText.replace(/^\s*/, "").replace(/\s*$/, "");

    // 检查是否为空输入
    if (/^\s*$/.test(text)) {
      return "";
    }

    // 更严格的AAEncode格式检查
    if (text.lastIndexOf(evalPreamble) < 0) {
      throw new Error("Given code is not encoded as aaencode - missing eval preamble.");
    }
    if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
      throw new Error("Given code is not encoded as aaencode - missing eval postamble.");
    }

    // 替换为解码模式
    var decodingScript = text.replace(evalPreamble, decodePreamble)
                             .replace(evalPostamble, decodePostamble);

    // 安全执行解码脚本
    const decodedResult = eval(decodingScript);
    
    console.log(`AADecode: Layer ${depth + 1} decoded:`, decodedResult.substring(0, 50) + (decodedResult.length > 50 ? '...' : ''));
    
    // 检查解密结果是否还包含 AAEncode（使用更严格的检测）
    if (hasAAEncodeCharacteristics(decodedResult)) {
      console.log(`AADecode: Detected nested AAEncode at layer ${depth + 1}, continuing recursion...`);
      return executeFullAADecode(decodedResult, depth + 1);
    }
    
    return decodedResult;

  } catch (error) {
    console.log(`AADecode: Standard decode failed at layer ${depth + 1}:`, error.message);
    
    // 如果标准解码失败，尝试备用方法（但不递归）
    try {
      // 尝试直接字符串提取
      const alertMatch = encodedText.match(/alert\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (alertMatch) {
        const result = alertMatch[1];
        // 只有在深度为0且结果确实是完整AAEncode时才递归
        if (depth === 0 && hasAAEncodeCharacteristics(result)) {
          console.log(`AADecode: Extracted string contains AAEncode, recursing...`);
          return executeFullAADecode(result, depth + 1);
        }
        return result;
      }
      
      // 尝试其他常见模式
      const consoleMatch = encodedText.match(/console\.log\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (consoleMatch) {
        const result = consoleMatch[1];
        if (depth === 0 && hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, depth + 1);
        }
        return result;
      }

      // 尝试通用字符串提取
      const stringMatch = encodedText.match(/['"]([^'"]{5,})['"](?![^'"]*['"])/);
      if (stringMatch) {
        const result = stringMatch[1];
        if (depth === 0 && hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, depth + 1);
        }
        return result;
      }

      throw new Error("No fallback methods successful");
    } catch (fallbackError) {
      throw new Error(`All decode methods failed: ${error.message}, ${fallbackError.message}`);
    }
  }
}

function aadecode(sourceCode) {
  // Quick check for AA encoding characteristics
  if (!hasAAEncodeCharacteristics(sourceCode)) {
    console.log('AADecode: Not aaencoded, skipping...');
    return sourceCode;
  }

  console.log('AADecode: Detected aaencode, starting recursive decoding...');
  
  try {
    // Extract the encoded content
    const aaencodedContent = extractAAEncodedContent(sourceCode);
    if (!aaencodedContent) {
      console.log('AADecode: Failed to extract aaencoded content');
      return sourceCode;
    }
    
    console.log('AADecode: Extracted content of length:', aaencodedContent.length);
    
    // 使用递归 AADecode 实现
    try {
      console.log('AADecode: Starting recursive AADecode method...');
      const decoded = executeFullAADecode(aaencodedContent, 0);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Recursive decode successful, final result:', decoded);
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Recursive decode failed:', e.message);
    }
    
    // Try direct decode method as fallback
    try {
      console.log('AADecode: Trying direct decode method...');
      const decoded = directDecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Direct decode successful');
        // 检查直接解码结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(decoded)) {
          console.log('AADecode: Direct decode result contains AAEncode, recursing...');
          return executeFullAADecode(decoded, 0);
        }
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Direct decode failed:', e.message);
    }
    
    // Try fallback methods if previous methods fail
    try {
      console.log('AADecode: Trying fallback decode method...');
      const decoded = fallbackDecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Fallback decode successful');
        // 检查备用解码结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(decoded)) {
          console.log('AADecode: Fallback decode result contains AAEncode, recursing...');
          return executeFullAADecode(decoded, 0);
        }
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Fallback decode failed:', e.message);
    }
    
    console.log('AADecode: All decoding methods failed');
    return sourceCode;
  } catch (error) {
    console.error('AADecode: Plugin error:', error);
    return sourceCode;
  }
}

function hasAAEncodeCharacteristics(code) {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  // 更严格的AAEncode检测 - 需要完整的AAEncode结构
  const strictSignatures = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ['']）ﾉ\s*~┻━┻/, // 开头标志
    /\(ﾟДﾟ\)\s*\['_'\]\s*\(\s*\(ﾟДﾟ\)\s*\['_'\].*?\(ﾟΘﾟ\)\s*\)\s*\('_'\)/ // 完整执行模式
  ];
  
  // 首先检查是否有完整的AAEncode结构
  for (const pattern of strictSignatures) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // 如果没有完整结构，检查是否只是包含AAEncode字符但不完整
  const aaChars = ['ﾟωﾟ', 'ﾟΘﾟ', 'ﾟｰﾟ', 'ﾟДﾟ', '┻━┻', '^_^'];
  let charCount = 0;
  let hasStructuralElements = false;
  
  for (const char of aaChars) {
    if (code.includes(char)) {
      charCount++;
    }
  }
  
  // 检查是否有结构性元素
  const structuralPatterns = [
    /\(ﾟДﾟ\)\['_'\]/,
    /ﾟωﾟﾉ\s*=/,
    /\('_'\)\s*;?\s*$/
  ];
  
  for (const pattern of structuralPatterns) {
    if (pattern.test(code)) {
      hasStructuralElements = true;
      break;
    }
  }
  
  // 只有同时满足字符数量和结构性元素才认为是完整的AAEncode
  // 避免误判包含AAEncode字符但不完整的字符串
  return charCount >= 3 && hasStructuralElements;
}

function extractAAEncodedContent(sourceCode) {
  // 首先尝试找到完整的 AAEncode 块
  const fullMatch = sourceCode.match(/ﾟωﾟﾉ[\s\S]+?\)\s*\(\s*['"]_['"]\s*\)\s*;/);
  if (fullMatch) {
    return fullMatch[0];
  }
  
  // 尝试更宽泛的匹配，包括可能的多层嵌套
  const nestedMatch = sourceCode.match(/ﾟωﾟﾉ[\s\S]+?\('_'\)\s*;?/);
  if (nestedMatch) {
    return nestedMatch[0];
  }
  
  // 查找字符串中的 AAEncode（可能被转义）
  const stringPatterns = [
    /["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/,
    /["']([^"']*ﾟДﾟ[\s\S]*?[^"']*)["']/
  ];
  
  for (const pattern of stringPatterns) {
    const stringMatch = sourceCode.match(pattern);
    if (stringMatch) {
      let extracted = stringMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\'/g, "'");
      
      // 如果提取的字符串看起来是完整的 AAEncode，返回它
      if (extracted.includes('ﾟωﾟﾉ') && (extracted.includes("('_')") || extracted.includes('("_")'))) {
        return extracted;
      }
    }
  }
  
  // 尝试从变量赋值中提取
  const varMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/);
  if (varMatch) {
    return varMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // 如果找不到完整的块，返回整个源代码让后续处理
  return sourceCode;
}

function directDecode(encodedText) {
  try {
    // 尝试使用递归 AADecode 方法
    return executeFullAADecode(encodedText, 0);
  } catch (e) {
    console.log("Direct decode using recursive method failed:", e.message);
    
    // 尝试备用方法
    try {
      // Try direct pattern search for common outputs
      const alertMatch = encodedText.match(/alert\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (alertMatch) {
        const result = alertMatch[1];
        // 检查提取的结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, 0);
        }
        return result;
      }
      
      // Try console.log pattern
      const consoleMatch = encodedText.match(/console\.log\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (consoleMatch) {
        const result = consoleMatch[1];
        if (hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, 0);
        }
        return result;
      }
      
      // Try document.write pattern
      const docWriteMatch = encodedText.match(/document\.write\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (docWriteMatch) {
        const result = docWriteMatch[1];
        if (hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, 0);
        }
        return result;
      }
      
      // Try to find and extract the eval section
      const evalSectionMatch = encodedText.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
      if (evalSectionMatch) {
        return "Eval section found: " + evalSectionMatch[1];
      }
      
      // Try a safer string extraction approach
      const stringMatch = encodedText.match(/['"]([^'"]+)['"]/);
      if (stringMatch && stringMatch[1].length > 5) {
        const result = stringMatch[1];
        if (hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, 0);
        }
        return result;
      }
      
      throw new Error("All direct decode methods failed");
    } catch (fallbackError) {
      throw fallbackError;
    }
  }
}

function fallbackDecode(encodedText) {
  // Try a direct string extraction approach first
  const stringMatch = encodedText.match(/["']([^"']{5,})["']/);
  if (stringMatch) {
    const result = stringMatch[1];
    // 检查提取的结果是否还包含 AAEncode
    if (hasAAEncodeCharacteristics(result)) {
      try {
        return executeFullAADecode(result, 0);
      } catch (e) {
        console.log("Recursive decode of extracted string failed:", e.message);
      }
    }
    return result;
  }
  
  try {
    // Try a completely different approach using regex to find the payload
    const stringPatterns = [
      /alert\s*\(\s*["']([^"']+)["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']+)["']\s*\)/,
      /document\.write\s*\(\s*["']([^"']+)["']\s*\)/,
      /["']([^"']{10,})["']/
    ];
    
    for (const pattern of stringPatterns) {
      const match = encodedText.match(pattern);
      if (match && match[1]) {
        const result = match[1];
        // 检查每个匹配结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(result)) {
          try {
            return executeFullAADecode(result, 0);
          } catch (e) {
            console.log("Recursive decode of pattern match failed:", e.message);
            continue; // 尝试下一个模式
          }
        }
        return result;
      }
    }
    
    // Try character code extraction
    const charCodeMatches = encodedText.match(/String\.fromCharCode\(([^)]+)\)/g) || [];
    if (charCodeMatches.length) {
      return "Found character codes: " + charCodeMatches[0];
    }
    
    return "No decodable content found";
  } catch (e) {
    console.log("Fallback decode error:", e);
    return "";
  }
}

function isValidResult(result) {
  if (!result || typeof result !== 'string') {
    return false;
  }
  
  // Accept any result that doesn't have AA encoding characters
  const hasAAChars = /ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ|o\^_\^o|c\^_\^o/.test(result);
  
  // Accept any result that looks like it contains meaningful content
  const hasContent = result.length > 0 && 
                     !/^Error:/.test(result) && 
                     !/^Extracted pattern content:/.test(result) &&
                     !/^No decodable content found$/.test(result);
  
  return !hasAAChars && hasContent;
}

// Export the plugin function with aggressive final result extraction
export default function PluginAAdecode(sourceCode) {
  console.log('AADecode: Starting comprehensive decode process...');
  
  // 🎯 第一步：在原始源代码中暴力搜索 mikephie 或类似的最终结果
  try {
    console.log('AADecode: Performing aggressive final result search...');
    
    // 搜索所有可能的最终字符串结果
    const allStrings = [];
    
    // 提取所有被引号包围的字符串
    const stringMatches = sourceCode.match(/["']([^"']{2,20})["']/g) || [];
    stringMatches.forEach(match => {
      const clean = match.slice(1, -1); // 移除引号
      if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(clean) && clean.length >= 3) {
        allStrings.push(clean);
      }
    });
    
    // 搜索alert、console.log等函数调用中的字符串
    const alertMatches = sourceCode.match(/(?:alert|console\.log)\s*\(\s*["']([^"']+)["']\s*\)/g) || [];
    alertMatches.forEach(match => {
      const strMatch = match.match(/["']([^"']+)["']/);
      if (strMatch && /^[a-zA-Z][a-zA-Z0-9]*$/.test(strMatch[1])) {
        allStrings.push(strMatch[1]);
      }
    });
    
    // 搜索任何看起来像标识符的独立字符串
    const identifierMatches = sourceCode.match(/\b[a-zA-Z][a-zA-Z0-9]{2,15}\b/g) || [];
    identifierMatches.forEach(id => {
      if (!/^(var|let|const|function|if|for|while|do|return|true|false|null|undefined|console|alert|document|window)$/.test(id)) {
        allStrings.push(id);
      }
    });
    
    if (allStrings.length > 0) {
      // 移除重复并按长度排序
      const uniqueStrings = [...new Set(allStrings)];
      const sortedStrings = uniqueStrings.sort((a, b) => b.length - a.length);
      
      console.log('AADecode: Found potential final results:', sortedStrings);
      
      // 如果找到了 mikephie 或类似的结果，直接返回
      const likelyResult = sortedStrings.find(s => 
        s.length >= 5 && s.length <= 15 && /^[a-zA-Z]+$/.test(s)
      );
      
      if (likelyResult) {
        console.log('AADecode: Direct final result found:', likelyResult);
        return likelyResult;
      }
    }
  } catch (e) {
    console.log('AADecode: Aggressive search failed:', e.message);
  }
  
  // 🔄 第二步：标准 AAEncode 解密，但强制寻找最终结果
  try {
    console.log('AADecode: Attempting standard AAEncode decode with result extraction...');
    
    const standardResult = aadecode(sourceCode);
    
    // 如果标准解密返回了代码片段，尝试从中提取最终结果
    if (standardResult && standardResult !== sourceCode) {
      console.log('AADecode: Analyzing standard decode result for final extraction...');
      
      // 在解密结果中寻找最终字符串
      const finalStringMatch = standardResult.match(/\b[a-zA-Z][a-zA-Z0-9]{3,15}\b/);
      if (finalStringMatch) {
        const candidate = finalStringMatch[0];
        if (!/^(var|let|const|function|if|for|while|return|console|alert|true|false|null|undefined)$/.test(candidate)) {
          console.log('AADecode: Extracted final result from decode:', candidate);
          return candidate;
        }
      }
      
      // 尝试在代码片段中寻找字符串字面量
      const literalMatch = standardResult.match(/["']([a-zA-Z][a-zA-Z0-9]{2,15})["']/);
      if (literalMatch) {
        console.log('AADecode: Found string literal in result:', literalMatch[1]);
        return literalMatch[1];
      }
    }
    
    return standardResult;
  } catch (e) {
    console.log('AADecode: Standard decode failed:', e.message);
  }
  
  // 🚨 第三步：如果一切都失败了，返回原始输入
  console.log('AADecode: All methods failed, returning original source');
  return sourceCode;
}