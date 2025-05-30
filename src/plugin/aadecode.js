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

    // Method 1: Try using Node.js VM (if available)
    const decoded = decodeWithVM(aaencodedContent);
    if (decoded && decoded !== aaencodedContent && decoded !== '') {
      console.log('AADecode: VM 解码成功');
      return decoded;
    }

    // Method 2: Try manual parsing
    const manualDecoded = manualDecode(aaencodedContent);
    if (manualDecoded && manualDecoded !== aaencodedContent && manualDecoded !== '') {
      console.log('AADecode: 手动解码成功');
      return manualDecoded;
    }

    // Method 3: Try pattern-based extraction
    const patternDecoded = patternBasedDecode(aaencodedContent);
    if (patternDecoded && patternDecoded !== '') {
      console.log('AADecode: 模式解码成功');
      return patternDecoded;
    }

    console.log('AADecode: 所有解码方法均未能解码');
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

function decodeWithVM(aaencodedContent) {
  try {
    // Check if we're in Node.js environment
    if (typeof require !== 'undefined') {
      try {
        const vm = require('vm');
        
        const script = `
          const results = [];
          const captureAlert = function(msg) { results.push(msg); };
          
          // Create a minimal browser-like environment
          const window = { alert: captureAlert };
          const document = {};
          const alert = captureAlert;
          
          try {
            ${aaencodedContent}
          } catch (e) {}
          
          results.join('');
        `;
        
        const context = vm.createContext({});
        return vm.runInContext(script, context);
      } catch (vmError) {
        console.log('VM 方法不可用:', vmError.message);
      }
    }
    
    // Fallback: try direct execution with alert capture
    let result = '';
    const captureAlert = (msg) => { result = msg; };
    
    // Create a minimal environment
    const fakeWindow = { alert: captureAlert };
    const fakeDocument = {};
    
    // Execute in isolated function
    const executor = new Function('window', 'document', 'alert', aaencodedContent);
    
    try {
      executor(fakeWindow, fakeDocument, captureAlert);
    } catch (e) {
      // Try without parameters
      const globalAlert = global.alert;
      global.alert = captureAlert;
      try {
        eval(aaencodedContent);
      } catch (e2) {}
      global.alert = globalAlert;
    }
    
    return result;
  } catch (e) {
    console.log('直接执行失败:', e.message);
  }
  
  return null;
}

function manualDecode(aaencodedContent) {
  try {
    // Create isolated execution context with all necessary variables
    const execContext = `
      (function() {
        try {
          // Initialize all aaencode variables
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
          
          // Execute the rest of the initialization
          ${aaencodedContent.substring(0, aaencodedContent.indexOf('(ﾟДﾟ)[\'_\']'))}
          
          return { ﾟДﾟ: ﾟДﾟ, ﾟΘﾟ: ﾟΘﾟ, ﾟｰﾟ: ﾟｰﾟ, ﾟεﾟ: typeof ﾟεﾟ !== 'undefined' ? ﾟεﾟ : '', ﾟoﾟ: typeof ﾟoﾟ !== 'undefined' ? ﾟoﾟ : '', c: c, o: o };
        } catch (e) {
          return null;
        }
      })()
    `;
    
    const context = eval(execContext);
    if (!context) return null;
    
    // Extract the encoded payload
    const payloadMatch = aaencodedContent.match(/\(ﾟДﾟ\)\s*\['_'\]\s*\(\s*\(ﾟДﾟ\)\s*\['_'\]\s*\(([^)]+)\)/);
    if (!payloadMatch) return null;
    
    // Parse the encoded string construction
    const parts = payloadMatch[1].split('+').map(part => part.trim());
    let decoded = '';
    
    // Create evaluation context
    const evalInContext = (expr) => {
      try {
        return eval(`
          (function() {
            var ﾟДﾟ = ${JSON.stringify(context.ﾟДﾟ)};
            var ﾟΘﾟ = ${context.ﾟΘﾟ};
            var ﾟｰﾟ = ${context.ﾟｰﾟ};
            var ﾟεﾟ = "${context.ﾟεﾟ}";
            var ﾟoﾟ = "${context.ﾟoﾟ}";
            var c = ${context.c};
            var o = ${context.o};
            return ${expr};
          })()
        `);
      } catch (e) {
        return null;
      }
    };
    
    for (const part of parts) {
      if (part === '(ﾟДﾟ)[ﾟεﾟ]') {
        decoded += '\\';
      } else if (part === '(ﾟДﾟ)[ﾟoﾟ]') {
        decoded += '"';
      } else {
        const value = evalInContext(part);
        if (typeof value === 'number') {
          decoded += String.fromCharCode(value);
        }
      }
    }
    
    // Try to evaluate the decoded string to get the actual code
    if (decoded.startsWith('"') && decoded.endsWith('"')) {
      try {
        return JSON.parse(decoded);
      } catch (e) {
        return decoded.slice(1, -1);
      }
    }
    
    return decoded || null;
  } catch (e) {
    console.log('手动解码失败:', e.message);
    return null;
  }
}

function patternBasedDecode(aaencodedContent) {
  try {
    // Look for common patterns in aaencode output
    
    // Pattern 1: alert("message")
    const alertMatch = aaencodedContent.match(/alert\s*\(\s*["']([^"']+)["']\s*\)/);
    if (alertMatch) {
      return alertMatch[1];
    }
    
    // Pattern 2: String literals in the encoded data
    const stringLiterals = [];
    const stringMatches = aaencodedContent.matchAll(/["']([^"']{10,})["']/g);
    for (const match of stringMatches) {
      stringLiterals.push(match[1]);
    }
    
    // Return the longest meaningful string
    if (stringLiterals.length > 0) {
      return stringLiterals.reduce((a, b) => a.length > b.length ? a : b);
    }
    
    return null;
  } catch (e) {
    console.log('模式解码失败:', e.message);
    return null;
  }
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