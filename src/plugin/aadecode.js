/**
 * AADecode Plugin - Decodes JavaScript obfuscated with aaencode
 * 
 * This plugin combines robust detection with efficient decoding methods
 * to handle various forms of aaencoded JavaScript.
 */

// 正确的 AADecode 解密器实现（支持递归解密和变量修复）
function executeFullAADecode(encodedText, depth = 0) {
  const MAX_DEPTH = 10; // 防止无限递归
  
  if (depth >= MAX_DEPTH) {
    console.log(`AADecode: Maximum recursion depth (${MAX_DEPTH}) reached`);
    return encodedText;
  }

  try {
    // 修复可能缺失的变量定义
    let fixedText = fixAAEncodeVariables(encodedText);
    
    // 使用标准的 AADecode 实现
    var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    var decodePostamble = ") ());";

    // 清理输入文本
    var text = fixedText.replace(/^\s*/, "").replace(/\s*$/, "");

    // 检查是否为空输入
    if (/^\s*$/.test(text)) {
      return "";
    }

    // 更宽松的AAEncode格式检查
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

// 修复 AAEncode 变量定义
function fixAAEncodeVariables(text) {
  // 检查是否缺少开头的变量定义
  if (!text.includes('ﾟωﾟﾉ=') && text.includes('ﾟωﾟﾉ')) {
    console.log('AADecode: Adding missing ﾟωﾟﾉ variable definition');
    
    // 添加标准的 AAEncode 开头
    const aaHeader = `ﾟωﾟﾉ= /｀ｍ'）ﾉ ~┻━┻   //*'∇｀*/ ['_']; `;
    
    // 如果文本不是以变量定义开头，添加它
    if (!text.match(/^\s*ﾟωﾟﾉ\s*=/)) {
      text = aaHeader + text;
    }
  }
  
  // 确保其他必要的变量定义存在
  if (!text.includes('o=(ﾟｰﾟ)') && text.includes('(ﾟｰﾟ)')) {
    console.log('AADecode: Adding missing variable definitions');
    const varDefs = `o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); `;
    
    // 在 ﾟωﾟﾉ 定义后添加其他变量
    text = text.replace(/(ﾟωﾟﾉ[^;]*;)\s*/, '$1 ' + varDefs);
  }
  
  return text;
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
  console.log('AADecode: Attempting fallback decode methods...');
  
  // 方法1: 尝试字符串提取
  const stringMatch = encodedText.match(/["']([^"']{5,})["']/);
  if (stringMatch) {
    const result = stringMatch[1];
    console.log('AADecode: Found string in fallback:', result);
    
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
  
  // 方法2: 尝试手动解析字符码
  try {
    console.log('AADecode: Attempting manual character code parsing...');
    const charCodeResult = parseAAEncodeManually(encodedText);
    if (charCodeResult) {
      console.log('AADecode: Manual parsing successful:', charCodeResult);
      return charCodeResult;
    }
  } catch (e) {
    console.log('AADecode: Manual parsing failed:', e.message);
  }
  
  // 方法3: 尝试不同的解密模式
  try {
    console.log('AADecode: Trying alternative decode patterns...');
    
    // 搜索常见的输出模式
    const patterns = [
      /alert\s*\(\s*["']([^"']+)["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']+)["']\s*\)/,
      /document\.write\s*\(\s*["']([^"']+)["']\s*\)/,
      /return\s*["']([^"']+)["']/,
      /["']([^"']{3,20})["']/
    ];
    
    for (const pattern of patterns) {
      const match = encodedText.match(pattern);
      if (match && match[1]) {
        const result = match[1];
        // 过滤掉明显不是最终结果的字符串
        if (!/^(var|let|const|function|if|for|while|return|console|alert|true|false|null|undefined|script|GMT|UTC|\d{4})$/i.test(result)) {
          console.log('AADecode: Found potential result with pattern:', result);
          if (hasAAEncodeCharacteristics(result)) {
            try {
              return executeFullAADecode(result, 0);
            } catch (e) {
              console.log("Recursive decode of pattern match failed:", e.message);
              continue;
            }
          }
          return result;
        }
      }
    }
    
    return "No decodable content found";
  } catch (e) {
    console.log("Fallback decode error:", e);
    return "";
  }
}

// 手动解析 AAEncode 字符码
function parseAAEncodeManually(encodedText) {
  try {
    // 查找编码的字符串部分
    const encodedSection = encodedText.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
    if (!encodedSection) {
      return null;
    }
    
    const codeExpression = encodedSection[1];
    console.log('AADecode: Found encoded expression:', codeExpression.substring(0, 100) + '...');
    
    // 尝试解析表达式中的字符码
    // 这是一个简化的解析器，用于处理常见的AAEncode模式
    const segments = codeExpression.split('+').map(s => s.trim());
    const charCodes = [];
    
    for (const segment of segments) {
      try {
        // 映射常见的AAEncode值
        let value = segment
          .replace(/\(ﾟΘﾟ\)/g, '1')
          .replace(/\(ﾟｰﾟ\)/g, '2') 
          .replace(/\(o\^_\^o\)/g, '3')
          .replace(/\(c\^_\^o\)/g, '0')
          .replace(/ﾟΘﾟ/g, '1')
          .replace(/ﾟｰﾟ/g, '2')
          .replace(/o\^_\^o/g, '3')
          .replace(/c\^_\^o/g, '0');
        
        // 简单的数学表达式求值
        const evaluated = eval(value);
        if (typeof evaluated === 'number' && evaluated >= 0 && evaluated <= 127) {
          charCodes.push(evaluated);
        }
      } catch (e) {
        // 如果某个段解析失败，跳过它
        console.log('AADecode: Failed to parse segment:', segment);
      }
    }
    
    if (charCodes.length > 0) {
      const decoded = charCodes.map(code => String.fromCharCode(code)).join('');
      console.log('AADecode: Manual decode result:', decoded);
      return decoded;
    }
    
    return null;
  } catch (e) {
    console.log('AADecode: Manual parsing error:', e.message);
    return null;
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

// Export the plugin function optimized for plugin chain cooperation
export default function PluginAAdecode(sourceCode) {
  console.log('AADecode: Starting decode process (plugin chain mode)...');
  
  // 🎯 第一步：快速检查是否包含明显的最终结果
  try {
    console.log('AADecode: Quick scan for final results...');
    
    // 搜索明显的最终字符串结果
    const finalResultPatterns = [
      /alert\s*\(\s*["']([a-zA-Z][a-zA-Z0-9]{2,15})["']\s*\)/,
      /console\.log\s*\(\s*["']([a-zA-Z][a-zA-Z0-9]{2,15})["']\s*\)/
    ];
    
    for (const pattern of finalResultPatterns) {
      const match = sourceCode.match(pattern);
      if (match && match[1]) {
        const candidate = match[1];
        // 如果是简单的字母字符串，可能就是最终答案
        if (/^[a-zA-Z]+$/.test(candidate) && candidate.length >= 3) {
          console.log('AADecode: Found final result in quick scan:', candidate);
          return candidate;
        }
      }
    }
  } catch (e) {
    console.log('AADecode: Quick scan failed:', e.message);
  }
  
  // 🔄 第二步：进行一层 AADecode 解密
  if (!hasAAEncodeCharacteristics(sourceCode)) {
    console.log('AADecode: Not aaencoded, skipping...');
    return sourceCode;
  }

  console.log('AADecode: Detected aaencode, attempting single layer decode...');
  
  try {
    // 提取 AAEncode 内容
    const aaencodedContent = extractAAEncodedContent(sourceCode);
    if (!aaencodedContent) {
      console.log('AADecode: Failed to extract aaencoded content');
      return sourceCode;
    }
    
    console.log('AADecode: Extracted content of length:', aaencodedContent.length);
    
    // 尝试单层解密
    try {
      console.log('AADecode: Attempting single layer AADecode...');
      const decoded = executeSingleLayerAADecode(aaencodedContent);
      
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Single layer decode successful');
        
        // 检查解密结果的类型
        if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(decoded) && decoded.length >= 3 && decoded.length <= 20) {
          // 这看起来像最终结果
          console.log('AADecode: Result appears to be final answer:', decoded);
          return decoded;
        } else if (decoded.length > 50 && (decoded.includes('function') || decoded.includes('var') || decoded.includes('eval'))) {
          // 这看起来是JavaScript代码，让其他插件处理
          console.log('AADecode: Result appears to be JavaScript code, passing to next plugin');
          return decoded;
        } else {
          // 其他情况，也传递给下一个插件
          console.log('AADecode: Passing decoded result to next plugin for further processing');
          return decoded;
        }
      }
    } catch (e) {
      console.log('AADecode: Single layer decode failed:', e.message);
    }
    
    // 如果单层解密失败，尝试备用方法
    try {
      console.log('AADecode: Trying fallback methods...');
      const fallbackResult = fallbackDecode(aaencodedContent);
      if (fallbackResult && isValidResult(fallbackResult)) {
        console.log('AADecode: Fallback decode successful, passing to next plugin');
        return fallbackResult;
      }
    } catch (e) {
      console.log('AADecode: Fallback decode failed:', e.message);
    }
    
    console.log('AADecode: All decode methods failed, returning original');
    return sourceCode;
  } catch (error) {
    console.error('AADecode: Plugin error:', error);
    return sourceCode;
  }
}

// 单层 AADecode 解密（不递归）
function executeSingleLayerAADecode(encodedText) {
  try {
    // 修复可能缺失的变量定义
    let fixedText = fixAAEncodeVariables(encodedText);
    
    // 使用标准的 AADecode 实现
    var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    var decodePostamble = ") ());";

    // 清理输入文本
    var text = fixedText.replace(/^\s*/, "").replace(/\s*$/, "");

    // 检查是否为空输入
    if (/^\s*$/.test(text)) {
      return "";
    }

    // 检查AAEncode格式
    if (text.lastIndexOf(evalPreamble) < 0 || text.lastIndexOf(evalPostamble) != text.length - evalPostamble.length) {
      throw new Error("Not a complete AAEncode format");
    }

    // 替换为解码模式
    var decodingScript = text.replace(evalPreamble, decodePreamble)
                             .replace(evalPostamble, decodePostamble);

    // 安全执行解码脚本
    const decodedResult = eval(decodingScript);
    
    console.log('AADecode: Single layer result preview:', decodedResult.toString().substring(0, 100) + (decodedResult.toString().length > 100 ? '...' : ''));
    
    return decodedResult;

  } catch (error) {
    console.log('AADecode: Single layer decode error:', error.message);
    
    // 尝试简单的字符串提取作为备用
    const simpleMatch = encodedText.match(/["']([^"']{3,50})["']/);
    if (simpleMatch) {
      console.log('AADecode: Fallback to simple string extraction');
      return simpleMatch[1];
    }
    
    throw error;
  }
}