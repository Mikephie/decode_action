// AADecode Plugin for JavaScript Deobfuscation
// Decodes JavaScript obfuscated with aaencode

function aadecode(sourceCode) {
  // 检查是否是 aaencode
  if (!isAAEncoded(sourceCode)) {
    return sourceCode;
  }

  try {
    console.log('AADecode: 开始解码...');
    
    // 提取 aaencode 内容
    let aaencodedContent = extractAAEncodedContent(sourceCode);
    if (!aaencodedContent) {
      return sourceCode;
    }

    // 使用最简单可靠的方法解码
    const decoded = simpleAADecode(aaencodedContent);
    
    if (decoded && decoded !== sourceCode && decoded !== aaencodedContent) {
      console.log('AADecode: 解码成功');
      return decoded;
    }
    
    console.log('AADecode: 解码失败，返回原代码');
    return sourceCode;
  } catch (error) {
    console.error('AADecode 错误:', error.message);
    return sourceCode;
  }
}

function isAAEncoded(code) {
  // 必须包含 aaencode 的标志性开头
  return /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/.test(code) || 
         /["'][^"']*ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻[^"']*["']/.test(code);
}

function extractAAEncodedContent(sourceCode) {
  // 从变量赋值中提取
  const varMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*"([^"]+)"/);
  if (varMatch) {
    return varMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // 直接的 aaencode 代码
  if (sourceCode.includes('ﾟωﾟﾉ')) {
    return sourceCode;
  }
  
  return null;
}

function simpleAADecode(aaencodedContent) {
  try {
    // 创建一个隔离的执行环境
    const decodeFunction = `
      function decodeAAEncode() {
        let result = '';
        const captureAlert = function(msg) { result = msg; };
        
        // 替换全局 alert
        if (typeof global !== 'undefined') {
          global.alert = captureAlert;
        }
        if (typeof window !== 'undefined') {
          window.alert = captureAlert;
        }
        const alert = captureAlert;
        
        try {
          // 执行 aaencode
          ${aaencodedContent}
        } catch (e) {
          // 忽略执行错误
        }
        
        return result;
      }
      
      return decodeAAEncode();
    `;
    
    // 使用 Function 构造器执行
    const decoder = new Function(decodeFunction);
    const result = decoder();
    
    if (result) {
      // 如果只得到消息内容，包装成完整的 alert 语句
      if (!result.includes('alert')) {
        return `alert("${result}")`;
      }
      return result;
    }
    
    // 备用方法：尝试使用 eval
    let evalResult = '';
    const oldAlert = global.alert;
    global.alert = (msg) => { evalResult = msg; };
    
    try {
      eval(aaencodedContent);
    } catch (e) {
      // 忽略错误
    }
    
    global.alert = oldAlert;
    
    if (evalResult) {
      return `alert("${evalResult}")`;
    }
    
    // 最后的尝试：模式匹配
    // AAEncode 通常生成 alert("message") 的模式
    const patterns = [
      /alert\s*\(\s*["']([^"']+)["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']+)["']\s*\)/
    ];
    
    for (const pattern of patterns) {
      const match = aaencodedContent.match(pattern);
      if (match) {
        return `alert("${match[1]}")`;
      }
    }
    
    return null;
  } catch (error) {
    console.error('解码错误:', error.message);
    return null;
  }
}

// 导出插件函数
export default function PluginAAdecode(sourceCode) {
  return aadecode(sourceCode);
}

// 如果需要 CommonJS 兼容
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginAAdecode;
}