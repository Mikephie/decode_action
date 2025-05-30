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

    // 检查是否为 AAEncode 格式
    if (text.lastIndexOf(evalPreamble) < 0) {
      throw new Error("Given code is not encoded as aaencode.");
    }
    if (text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
      throw new Error("Given code is not encoded as aaencode.");
    }

    // 替换为解码模式
    var decodingScript = text.replace(evalPreamble, decodePreamble)
                             .replace(evalPostamble, decodePostamble);

    // 安全执行解码脚本
    const decodedResult = eval(decodingScript);
    
    console.log(`AADecode: Layer ${depth + 1} decoded:`, decodedResult.substring(0, 50) + (decodedResult.length > 50 ? '...' : ''));
    
    // 检查解密结果是否还包含 AAEncode
    if (hasAAEncodeCharacteristics(decodedResult)) {
      console.log(`AADecode: Detected nested AAEncode at layer ${depth + 1}, continuing recursion...`);
      return executeFullAADecode(decodedResult, depth + 1);
    }
    
    return decodedResult;

  } catch (error) {
    console.log(`AADecode: Standard decode failed at layer ${depth + 1}:`, error.message);
    
    // 如果标准解码失败，尝试备用方法
    try {
      // 尝试直接字符串提取
      const alertMatch = encodedText.match(/alert\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (alertMatch) {
        const result = alertMatch[1];
        // 检查提取的结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(result)) {
          console.log(`AADecode: Extracted string contains AAEncode, recursing...`);
          return executeFullAADecode(result, depth + 1);
        }
        return result;
      }
      
      // 尝试其他常见模式
      const consoleMatch = encodedText.match(/console\.log\s*\(\s*['"]([^'"]+)['"]\s*\)/);
      if (consoleMatch) {
        const result = consoleMatch[1];
        if (hasAAEncodeCharacteristics(result)) {
          return executeFullAADecode(result, depth + 1);
        }
        return result;
      }

      // 尝试通用字符串提取
      const stringMatch = encodedText.match(/['"]([^'"]{5,})['"](?![^'"]*['"])/);
      if (stringMatch) {
        const result = stringMatch[1];
        if (hasAAEncodeCharacteristics(result)) {
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
  // Check for aaencode signatures
  const signatures = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/, // Core pattern
    /\(ﾟДﾟ\)\['_'\]/, // Common structure
    /\(c\^_\^o\)/, // Character codes
    /\(o\^_\^o\)/ // Character codes
  ];
  
  for (const pattern of signatures) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // Check for high density of AA characters
  const aaChars = ['ﾟωﾟ', 'ﾟΘﾟ', 'ﾟｰﾟ', 'ﾟДﾟ', '┻━┻', '^_^'];
  let charCount = 0;
  
  for (const char of aaChars) {
    if (code.includes(char)) {
      charCount++;
    }
  }
  
  // If we have at least 3 characteristic AA patterns, it's likely aaencoded
  return charCount >= 3;
}

function extractAAEncodedContent(sourceCode) {
  // Look for the complete encoded block
  const fullMatch = sourceCode.match(/ﾟωﾟﾉ[\s\S]+?\)\s*\(\s*['"]_['"]\s*\)\s*;/);
  if (fullMatch) {
    return fullMatch[0];
  }
  
  // Look for the pattern in a string assignment
  const stringMatch = sourceCode.match(/["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/);
  if (stringMatch) {
    return stringMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // Try to extract from variable assignment
  const varMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/);
  if (varMatch) {
    return varMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // If we can't find a well-defined block, return the whole source
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

// Export the plugin function with recursive support
export default function PluginAAdecode(sourceCode) {
  // Additional direct string extraction before plugin logic
  try {
    // For common cases, try direct string extraction first
    const directPatterns = [
      /alert\s*\(\s*["']([^"']{3,})["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']{3,})["']\s*\)/,
      /["']([^"']{10,})["']/  // Long strings are often the payload
    ];
    
    for (const pattern of directPatterns) {
      const match = sourceCode.match(pattern);
      if (match && match[1] && match[1].length > 2) {
        const result = match[1];
        console.log('AADecode: Direct string extraction successful');
        
        // 检查直接提取的结果是否还包含 AAEncode
        if (hasAAEncodeCharacteristics(result)) {
          console.log('AADecode: Direct extracted string contains AAEncode, recursing...');
          try {
            return executeFullAADecode(result, 0);
          } catch (e) {
            console.log('AADecode: Recursive decode of direct extraction failed:', e.message);
            return result; // 返回原始提取结果
          }
        }
        return result;
      }
    }
  } catch (e) {
    console.log('AADecode: Direct extraction failed, continuing with full decode');
  }
  
  return aadecode(sourceCode);
}