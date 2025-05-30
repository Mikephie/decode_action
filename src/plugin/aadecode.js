// AADecode Plugin for JavaScript Deobfuscation
// Decodes JavaScript obfuscated with aaencode

function aadecode(sourceCode) {
  // 立即检查是否真的是 aaencode
  if (!isAAEncoded(sourceCode)) {
    console.log('AADecode: 不是 AAEncode 编码，跳过处理');
    return sourceCode;
  }

  try {
    console.log('AADecode: 确认是 AAEncode 编码，开始解码...');
    
    // Extract aaencoded content
    let aaencodedContent = extractAAEncodedContent(sourceCode);
    if (!aaencodedContent) {
      console.log('AADecode: 无法提取 AAEncode 内容');
      return sourceCode;
    }

    console.log('AADecode: 提取到内容长度:', aaencodedContent.length);

    // Try all decoding methods
    const methods = [
      { name: 'Direct Eval', func: directEvalDecode },
      { name: 'Safe Sandbox', func: safeSandboxDecode },
      { name: 'Pattern Extract', func: patternExtractDecode }
    ];

    for (const method of methods) {
      try {
        console.log(`AADecode: 尝试 ${method.name} 方法...`);
        const decoded = method.func(aaencodedContent);
        if (decoded && decoded !== aaencodedContent && decoded !== '') {
          console.log(`AADecode: ${method.name} 解码成功`);
          // 验证解码结果
          if (isValidDecodedContent(decoded)) {
            return decoded;
          } else {
            console.log(`AADecode: ${method.name} 结果无效，继续尝试`);
          }
        }
      } catch (e) {
        console.log(`AADecode: ${method.name} 失败:`, e.message);
      }
    }

    console.log('AADecode: 所有解码方法均失败');
    return sourceCode;
  } catch (error) {
    console.error('AADecode: 插件错误:', error);
    return sourceCode;
  }
}

function isAAEncoded(code) {
  // AAEncode 的核心特征 - 这个开头是必须的
  const aaCorePattern = /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/;
  
  // 检查直接代码
  if (aaCorePattern.test(code)) {
    console.log('检测到直接的 AAEncode 代码');
    return true;
  }
  
  // 检查字符串中的 aaencode
  const stringMatch = code.match(/["']([^"']*ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻[^"']*)["']/);
  if (stringMatch) {
    console.log('检测到字符串中的 AAEncode 代码');
    return true;
  }
  
  // 检查是否包含足够多的 AAEncode 特征字符
  const aaChars = ['ﾟωﾟ', 'ﾟΘﾟ', 'ﾟｰﾟ', 'ﾟДﾟ'];
  let charCount = 0;
  for (const char of aaChars) {
    if (code.includes(char)) {
      charCount++;
    }
  }
  
  // 如果包含3个或以上特征字符，且包含特定的结构
  if (charCount >= 3 && code.includes('(ﾟДﾟ)') && code.includes("['_']")) {
    console.log('检测到 AAEncode 特征字符');
    return true;
  }
  
  return false;
}

function extractAAEncodedContent(sourceCode) {
  // Try to extract from variable assignment
  const varMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*"([^"]+)"/);
  if (varMatch) {
    // Unescape the string
    return varMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // Try to extract direct aaencode
  const directMatch = sourceCode.match(/ﾟωﾟﾉ\s*=[\s\S]+?\)\s*\(\s*'_'\s*\)\s*;/);
  if (directMatch) {
    return directMatch[0];
  }
  
  return sourceCode;
}

function directEvalDecode(aaencodedContent) {
  try {
    let capturedOutput = '';
    
    // Create a complete execution environment
    const sandbox = `
      (function() {
        var window = window || {};
        var document = document || {};
        var alert = function(msg) { capturedOutput = msg; return msg; };
        var console = { log: function(msg) { capturedOutput = msg; return msg; } };
        
        ${aaencodedContent}
        
        return capturedOutput;
      })();
    `;
    
    // Use Function constructor for safer eval
    const func = new Function('capturedOutput', sandbox);
    const result = func('');
    
    return result || capturedOutput;
  } catch (e) {
    // If that fails, try a more direct approach
    try {
      let result = '';
      
      // Override global alert
      const originalAlert = global.alert;
      global.alert = function(msg) { result = msg; };
      
      // Execute the code
      eval(aaencodedContent);
      
      // Restore
      global.alert = originalAlert;
      
      return result;
    } catch (e2) {
      throw e2;
    }
  }
}

function safeSandboxDecode(aaencodedContent) {
  try {
    // Build execution context step by step
    const context = {};
    
    // Execute initialization code
    const initCode = `
      var ﾟωﾟﾉ = /\`m'）ﾉ ~┻━┻   //*'∇\`*/ ['_']; 
      var o = (ﾟｰﾟ) = _ = 3; 
      var c = (ﾟΘﾟ) = (ﾟｰﾟ) - (ﾟｰﾟ); 
      var (ﾟДﾟ) = (ﾟΘﾟ) = (o ^ _ ^ o) / (o ^ _ ^ o);
      var (ﾟДﾟ) = {
        ﾟΘﾟ: '_',
        ﾟωﾟﾉ: ((ﾟωﾟﾉ == 3) + '_')[ﾟΘﾟ],
        ﾟｰﾟﾉ: (ﾟωﾟﾉ + '_')[o ^ _ ^ o - (ﾟΘﾟ)],
        ﾟДﾟﾉ: ((ﾟｰﾟ == 3) + '_')[ﾟｰﾟ]
      };
    `;
    
    eval(initCode);
    
    // Find the main decoding call
    const mainCallMatch = aaencodedContent.match(/\(ﾟДﾟ\)\s*\['_'\]\s*\(\s*\(ﾟДﾟ\)\s*\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
    if (!mainCallMatch) {
      return null;
    }
    
    // Execute the full aaencode to set up all variables
    eval(aaencodedContent.substring(0, aaencodedContent.lastIndexOf('(ﾟДﾟ)[\'_\']')));
    
    // Now decode the payload
    const payload = mainCallMatch[1];
    const func = eval('(ﾟДﾟ)[\'_\']');
    
    if (typeof func === 'function') {
      // Build the encoded string
      const encodedStr = eval(payload);
      // Decode it
      const decoded = func(encodedStr)(ﾟΘﾟ);
      
      // Execute the decoded function to get the alert content
      let alertContent = '';
      const tempAlert = function(msg) { alertContent = msg; };
      
      // Replace alert and execute
      const originalAlert = global.alert;
      global.alert = tempAlert;
      
      try {
        eval(decoded);
      } catch (e) {}
      
      global.alert = originalAlert;
      
      return alertContent || decoded;
    }
    
    return null;
  } catch (e) {
    throw e;
  }
}

function patternExtractDecode(aaencodedContent) {
  try {
    // Method 1: Look for alert patterns
    const alertMatch = aaencodedContent.match(/alert\s*\(\s*["']([^"']+)["']\s*\)/);
    if (alertMatch) {
      return `alert("${alertMatch[1]}")`;
    }
    
    // Method 2: Try to extract from the encoded data pattern
    // AAEncode usually has a pattern like (ﾟДﾟ)['_']((ﾟДﾟ)['_'](encoded_string)(ﾟΘﾟ))('_')
    const encodedMatch = aaencodedContent.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\((.+?)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
    if (encodedMatch) {
      // Try to manually decode the numbers
      const parts = encodedMatch[1].split('+').map(p => p.trim());
      let decoded = '';
      
      // Simple number mappings
      const mappings = {
        '(ﾟΘﾟ)': 1,
        '(ﾟｰﾟ)': 2,
        '(o^_^o)': 3,
        '(c^_^o)': 0,
        '((ﾟｰﾟ) + (ﾟΘﾟ))': 3,
        '((o^_^o) +(o^_^o))': 6,
        '((o^_^o) - (ﾟΘﾟ))': 2
      };
      
      for (const part of parts) {
        if (part === '(ﾟДﾟ)[ﾟεﾟ]') {
          decoded += '\\';
        } else if (part === '(ﾟДﾟ)[ﾟoﾟ]') {
          decoded += '"';
        } else if (mappings[part] !== undefined) {
          // Skip - these are usually character codes
        } else {
          // Try to evaluate simple expressions
          try {
            const num = eval(part.replace(/ﾟΘﾟ/g, '1').replace(/ﾟｰﾟ/g, '2').replace(/o\^_\^o/g, '3').replace(/c\^_\^o/g, '0'));
            if (typeof num === 'number' && num > 0 && num < 256) {
              decoded += String.fromCharCode(num);
            }
          } catch (e) {}
        }
      }
      
      if (decoded.includes('alert')) {
        return decoded;
      }
    }
    
    return null;
  } catch (e) {
    throw e;
  }
}

function isValidDecodedContent(content) {
  // 检查是否是有效的 JavaScript 代码
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  // 检查是否包含乱码
  if (content.includes('ï¾') || content.includes('ﾟ')) {
    return false;
  }
  
  // 检查是否包含常见的 JavaScript 关键字或结构
  const jsPatterns = [
    /alert\s*\(/,
    /console\s*\./,
    /function\s/,
    /var\s/,
    /let\s/,
    /const\s/,
    /\{[\s\S]*\}/,
    /\([\s\S]*\)/
  ];
  
  return jsPatterns.some(pattern => pattern.test(content));
}

// Export the plugin function
export default function PluginAAdecode(sourceCode) {
  // 快速检查：如果不包含任何 AAEncode 特征字符，直接返回
  const quickCheck = ['ﾟωﾟ', 'ﾟΘﾟ', 'ﾟｰﾟ', 'ﾟДﾟ'].some(char => sourceCode.includes(char));
  if (!quickCheck) {
    return sourceCode;
  }
  
  return aadecode(sourceCode);
}