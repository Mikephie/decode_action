/**
 * 增强版 AADecode - 支持复杂的混淆代码
 * 可以处理：
 * 1. 多个AAEncode块
 * 2. 嵌套的eval
 * 3. 混合的JavaScript代码
 * 4. 大型混淆文件
 */

function decodeAA(code) {
  console.log('[aadecode] 开始分析代码...');
  console.log('[aadecode] 代码长度:', code.length, '字符');
  
  let decoded = code;
  let changesMade = false;
  
  // 方法1: 查找并解码所有AAEncode块
  if (/ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ/.test(decoded)) {
    console.log('[aadecode] 检测到AAEncode特征');
    
    // 查找所有可能的AAEncode块
    const aaBlocks = findAAEncodeBlocks(decoded);
    console.log('[aadecode] 找到', aaBlocks.length, '个可能的AAEncode块');
    
    // 逐个解码
    for (let i = 0; i < aaBlocks.length; i++) {
      const block = aaBlocks[i];
      console.log(`[aadecode] 处理第 ${i + 1} 个块 (${block.length} 字符)`);
      
      const decodedBlock = decodeAABlock(block);
      if (decodedBlock && decodedBlock !== block) {
        decoded = decoded.replace(block, decodedBlock);
        changesMade = true;
        console.log(`[aadecode] 块 ${i + 1} 解码成功`);
      }
    }
  }
  
  // 方法2: 处理eval混淆
  if (decoded.includes('eval')) {
    console.log('[aadecode] 检测到eval语句');
    decoded = processEvals(decoded);
    if (decoded !== code) changesMade = true;
  }
  
  // 方法3: 处理Function构造器
  if (decoded.includes('Function(')) {
    console.log('[aadecode] 检测到Function构造器');
    decoded = processFunctionConstructors(decoded);
    if (decoded !== code) changesMade = true;
  }
  
  // 方法4: 处理转义序列
  if (decoded.includes('\\x') || decoded.includes('\\u')) {
    console.log('[aadecode] 检测到转义序列');
    decoded = processEscapeSequences(decoded);
    if (decoded !== code) changesMade = true;
  }
  
  if (changesMade) {
    console.log('[aadecode] 解码完成，代码已更新');
  } else {
    console.log('[aadecode] 未检测到可解码内容');
  }
  
  return decoded;
}

// 查找AAEncode块
function findAAEncodeBlocks(code) {
  const blocks = [];
  
  // 方法1: 查找完整的AAEncode语句（从ﾟωﾟﾉ开始到('_')结束）
  const fullPattern = /ﾟωﾟﾉ\s*=[\s\S]*?\)\s*\(\s*'_'\s*\)\s*;?/g;
  let matches = code.match(fullPattern);
  if (matches) {
    blocks.push(...matches);
  }
  
  // 方法2: 查找独立的AAEncode表达式
  const exprPattern = /\(ﾟДﾟ\)\s*\['_'\][\s\S]*?\)\s*\('_'\)/g;
  matches = code.match(exprPattern);
  if (matches) {
    // 需要找到完整的上下文
    matches.forEach(match => {
      const startIndex = code.indexOf(match);
      if (startIndex > 0) {
        // 向前查找变量定义
        let contextStart = startIndex;
        for (let i = startIndex - 1; i >= 0; i--) {
          if (code[i] === ';' || code[i] === '{' || code[i] === '}') {
            contextStart = i + 1;
            break;
          }
        }
        const fullBlock = code.substring(contextStart, startIndex + match.length);
        if (fullBlock.includes('ﾟωﾟﾉ')) {
          blocks.push(fullBlock);
        }
      }
    });
  }
  
  return [...new Set(blocks)]; // 去重
}

// 解码单个AAEncode块
function decodeAABlock(block) {
  try {
    const decoder = new Function(`
      var ﾟωﾟﾉ, o, c, ﾟΘﾟ, ﾟｰﾟ, ﾟДﾟ, ﾟεﾟ, ﾟoﾟ, oﾟｰﾟo;
      var _result = '';
      var _output = [];
      
      // 捕获各种输出
      var alert = function(msg) { _output.push(String(msg)); };
      var console = { 
        log: function(msg) { _output.push(String(msg)); }
      };
      var document = { 
        write: function(msg) { _output.push(String(msg)); },
        writeln: function(msg) { _output.push(String(msg)); }
      };
      
      try {
        ${block}
      } catch(e) {
        // 从错误信息提取可能的结果
        if (e.message) {
          var match = e.message.match(/([\\w]+) is not defined/);
          if (match) _output.push(match[1]);
        }
      }
      
      return _output.join('');
    `);
    
    const result = decoder();
    if (result) {
      // 如果结果看起来像是JavaScript代码，返回它
      if (isValidJavaScript(result)) {
        return result;
      }
      // 否则作为字符串返回
      return JSON.stringify(result);
    }
  } catch (e) {
    console.warn('[aadecode] 解码块失败:', e.message);
  }
  
  return null;
}

// 处理eval语句
function processEvals(code) {
  let processed = code;
  
  // 查找eval语句
  const evalPattern = /eval\s*\(\s*(.+?)\s*\)/g;
  
  processed = processed.replace(evalPattern, (match, expr) => {
    try {
      // 尝试安全执行
      const func = new Function(`
        try {
          return ${expr};
        } catch(e) {
          return ${JSON.stringify(match)};
        }
      `);
      
      const result = func();
      if (typeof result === 'string' && result !== match) {
        console.log('[aadecode] eval语句已解码');
        return result;
      }
    } catch (e) {
      // 保持原样
    }
    return match;
  });
  
  return processed;
}

// 处理Function构造器
function processFunctionConstructors(code) {
  let processed = code;
  
  // 查找new Function或Function调用
  const funcPattern = /(?:new\s+)?Function\s*\(\s*(['"`])([\s\S]*?)\1\s*\)/g;
  
  processed = processed.replace(funcPattern, (match, quote, body) => {
    try {
      // 如果body包含return语句，尝试执行
      if (body.includes('return')) {
        const func = new Function(body);
        const result = func();
        if (typeof result === 'string') {
          console.log('[aadecode] Function构造器已解码');
          return JSON.stringify(result);
        }
      }
    } catch (e) {
      // 保持原样
    }
    return match;
  });
  
  return processed;
}

// 处理转义序列
function processEscapeSequences(code) {
  let processed = code;
  
  // 处理十六进制转义 \xHH
  processed = processed.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // 处理Unicode转义 \uHHHH
  processed = processed.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // 处理八进制转义 \NNN
  processed = processed.replace(/\\([0-7]{1,3})/g, (match, oct) => {
    return String.fromCharCode(parseInt(oct, 8));
  });
  
  if (processed !== code) {
    console.log('[aadecode] 转义序列已处理');
  }
  
  return processed;
}

// 检查是否为有效的JavaScript代码
function isValidJavaScript(str) {
  // 简单检查：包含常见的JS关键字或结构
  const jsPatterns = [
    /function\s*\(/,
    /var\s+\w+/,
    /let\s+\w+/,
    /const\s+\w+/,
    /if\s*\(/,
    /for\s*\(/,
    /while\s*\(/,
    /return\s+/,
    /\{[\s\S]*\}/
  ];
  
  return jsPatterns.some(pattern => pattern.test(str));
}

export default decodeAA;