/**
 * AADecode2 增强版 - 深度解混淆
 * 处理更复杂的混淆模式
 */

import vm from 'vm';

function decodeAA2(code) {
  console.log('[aadecode2] 开始深度解混淆...');
  
  let decoded = code;
  
  // 1. 处理字符串拼接混淆
  decoded = processStringConcatenation(decoded);
  
  // 2. 处理数组索引混淆
  decoded = processArrayObfuscation(decoded);
  
  // 3. 处理Unicode和转义字符
  decoded = processUnicodeObfuscation(decoded);
  
  // 4. 处理自执行函数
  decoded = processIIFE(decoded);
  
  // 5. 处理变量替换
  decoded = processVariableSubstitution(decoded);
  
  // 6. 最后尝试执行并捕获结果
  const finalResult = tryExecuteCode(decoded);
  if (finalResult && finalResult !== decoded) {
    console.log('[aadecode2] 通过执行获得最终结果');
    return finalResult;
  }
  
  return decoded;
}

// 处理字符串拼接
function processStringConcatenation(code) {
  // 查找类似 "a" + "b" + "c" 的模式
  const concatPattern = /(['"`])([^'"`]*)\1\s*\+\s*(['"`])([^'"`]*)\3/g;
  
  let processed = code;
  let lastProcessed;
  
  // 持续处理直到没有变化
  do {
    lastProcessed = processed;
    processed = processed.replace(concatPattern, (match, q1, s1, q2, s2) => {
      return `"${s1}${s2}"`;
    });
  } while (processed !== lastProcessed);
  
  if (processed !== code) {
    console.log('[aadecode2] 字符串拼接已简化');
  }
  
  return processed;
}

// 处理数组索引混淆
function processArrayObfuscation(code) {
  // 查找类似 _0x1234 的变量名
  const arrayVarPattern = /_0x[0-9a-f]+/gi;
  const arrayVars = [...new Set(code.match(arrayVarPattern) || [])];
  
  if (arrayVars.length === 0) return code;
  
  console.log('[aadecode2] 发现', arrayVars.length, '个混淆数组变量');
  
  try {
    // 创建沙箱环境执行代码
    const sandbox = { result: null };
    const context = vm.createContext(sandbox);
    
    // 尝试执行代码来获取数组内容
    const setupCode = `
      var window = {};
      var document = {};
      ${code}
      
      // 导出找到的数组
      var arrays = {};
      ${arrayVars.map(v => `if (typeof ${v} !== 'undefined') arrays['${v}'] = ${v};`).join('\n')}
      result = arrays;
    `;
    
    vm.runInContext(setupCode, context, { timeout: 1000 });
    
    if (sandbox.result) {
      let processed = code;
      
      // 替换数组访问
      Object.entries(sandbox.result).forEach(([varName, array]) => {
        if (Array.isArray(array)) {
          // 替换 varName[index] 为实际值
          const accessPattern = new RegExp(`${varName}\\[(\\d+)\\]`, 'g');
          processed = processed.replace(accessPattern, (match, index) => {
            const idx = parseInt(index);
            if (idx < array.length) {
              return JSON.stringify(array[idx]);
            }
            return match;
          });
        }
      });
      
      if (processed !== code) {
        console.log('[aadecode2] 数组混淆已解码');
        return processed;
      }
    }
  } catch (e) {
    console.log('[aadecode2] 数组解混淆失败:', e.message);
  }
  
  return code;
}

// 处理Unicode混淆
function processUnicodeObfuscation(code) {
  let processed = code;
  
  // Unicode转义 \u{HHHHH}
  processed = processed.replace(/\\u\{([0-9a-fA-F]+)\}/g, (match, hex) => {
    return String.fromCodePoint(parseInt(hex, 16));
  });
  
  // 处理String.fromCharCode调用
  const fromCharCodePattern = /String\.fromCharCode\(([\d,\s]+)\)/g;
  processed = processed.replace(fromCharCodePattern, (match, codes) => {
    try {
      const codeArray = codes.split(',').map(c => parseInt(c.trim()));
      return JSON.stringify(String.fromCharCode(...codeArray));
    } catch (e) {
      return match;
    }
  });
  
  // 处理atob (base64解码)
  const atobPattern = /atob\s*\(\s*(['"`])([A-Za-z0-9+/=]+)\1\s*\)/g;
  processed = processed.replace(atobPattern, (match, quote, base64) => {
    try {
      return JSON.stringify(Buffer.from(base64, 'base64').toString());
    } catch (e) {
      return match;
    }
  });
  
  if (processed !== code) {
    console.log('[aadecode2] Unicode混淆已处理');
  }
  
  return processed;
}

// 处理立即执行函数表达式(IIFE)
function processIIFE(code) {
  // 查找并尝试执行IIFE
  const iifePattern = /\(function\s*\([^)]*\)\s*\{([\s\S]*?)\}\s*\)\s*\([^)]*\)/g;
  
  let processed = code;
  
  processed = processed.replace(iifePattern, (match) => {
    try {
      const sandbox = { result: match };
      const context = vm.createContext(sandbox);
      
      vm.runInContext(`
        var _result;
        try {
          _result = ${match};
        } catch(e) {
          _result = null;
        }
        result = _result;
      `, context, { timeout: 100 });
      
      if (sandbox.result && typeof sandbox.result === 'string') {
        console.log('[aadecode2] IIFE已执行');
        return JSON.stringify(sandbox.result);
      }
    } catch (e) {
      // 保持原样
    }
    return match;
  });
  
  return processed;
}

// 处理变量替换
function processVariableSubstitution(code) {
  // 查找简单的变量赋值
  const varPattern = /(?:var|let|const)\s+(\w+)\s*=\s*(['"`])([^'"`]*)\2\s*;/g;
  const variables = {};
  
  // 收集变量值
  let match;
  while ((match = varPattern.exec(code)) !== null) {
    variables[match[1]] = match[3];
  }
  
  if (Object.keys(variables).length === 0) return code;
  
  let processed = code;
  
  // 替换变量使用
  Object.entries(variables).forEach(([varName, value]) => {
    // 只替换明确的变量使用，避免替换属性名等
    const usePattern = new RegExp(`\\b${varName}\\b(?!\\s*:)`, 'g');
    processed = processed.replace(usePattern, JSON.stringify(value));
  });
  
  if (processed !== code) {
    console.log('[aadecode2] 变量替换完成');
  }
  
  return processed;
}

// 尝试执行代码并获取结果
function tryExecuteCode(code) {
  try {
    const sandbox = {
      output: [],
      console: {
        log: (...args) => sandbox.output.push(args.join(' '))
      },
      alert: (msg) => sandbox.output.push(String(msg)),
      document: {
        write: (msg) => sandbox.output.push(String(msg)),
        writeln: (msg) => sandbox.output.push(String(msg))
      }
    };
    
    const context = vm.createContext(sandbox);
    
    // 包装代码以捕获返回值
    const wrappedCode = `
      var _finalResult;
      try {
        _finalResult = (function() { ${code} })();
      } catch(e) {
        _finalResult = null;
      }
      _finalResult;
    `;
    
    const result = vm.runInContext(wrappedCode, context, { 
      timeout: 1000,
      displayErrors: false 
    });
    
    // 如果有输出，返回输出
    if (sandbox.output.length > 0) {
      return sandbox.output.join('\n');
    }
    
    // 如果有返回值，返回它
    if (result) {
      return String(result);
    }
  } catch (e) {
    // 静默失败
  }
  
  return null;
}

export default decodeAA2;