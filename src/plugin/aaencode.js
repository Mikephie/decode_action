import { VM } from 'vm2';

function isAAEncode(code) {
  // Expanded pattern to better detect various Kaomoji encodings
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ|o\^_\^o|c\^_\^o/.test(code);
}

function sandboxEval(code) {
  try {
    // Create a VM with appropriate environment
    const vm = new VM({
      timeout: 3000, // Increased timeout for complex scripts
      sandbox: {
        console: {
          log: () => {},
          error: () => {},
          warn: () => {}
        }
      },
    });
    
    return vm.run(code);
  } catch (error) {
    console.error('[AAEncode] VM execution failed:', error.message);
    return null;
  }
}

// Specialized wrapper for Kaomoji style that uses Function['_'] pattern
function tryWrapperExecution(code) {
  try {
    // This pattern is common in Kaomoji obfuscation
    // We wrap it in a function that returns the result
    const wrappedCode = `
      (function() {
        var result;
        // Create mock environment
        var _0x1234 = {};
        Function.prototype._ = function(code) { 
          result = code; 
          return this; 
        };
        
        // Run the original code
        ${code}
        
        return result;
      })()
    `;
    
    const vm = new VM({
      timeout: 3000,
      sandbox: {}
    });
    
    return vm.run(wrappedCode);
  } catch (error) {
    console.error('[AAEncode] Wrapper execution failed:', error.message);
    return null;
  }
}

function decodeAAencode(code) {
  if (!isAAEncode(code)) return null;
  
  console.log('[AAEncode] 检测到 AAEncode/Kaomoji 混淆，尝试解密...');

  try {
    // 方法 1: 直接尝试执行代码
    let result = sandboxEval(code);
    if (typeof result === 'string' && result.length > 0) {
      console.log('[AAEncode] 直接执行成功');
      return result;
    }
    
    // 方法 2: 处理调用链，如果结果不是字符串但可能是需要再次执行的代码
    let maxDepth = 5;
    while (result && typeof result !== 'string' && maxDepth--) {
      const tempResult = sandboxEval(result.toString());
      if (tempResult) {
        result = tempResult;
      } else {
        break;
      }
    }
    
    if (typeof result === 'string' && result.length > 0) {
      console.log('[AAEncode] 多级执行成功');
      return result;
    }
    
    // 方法 3: 特殊处理特定的 Kaomoji 模式
    if (code.includes('ﾟДﾟ') && code.includes('[\'_\']')) {
      console.log('[AAEncode] 尝试特殊包装处理');
      result = tryWrapperExecution(code);
      if (typeof result === 'string' && result.length > 0) {
        console.log('[AAEncode] 特殊包装处理成功');
        return result;
      }
    }
    
    // 方法 4: 尝试查找并提取 Function['_'](...) 调用的内容
    const functionCallMatch = code.match(/\['_'\]\s*\(\s*\['_'\]\s*\((.*)\)\)/);
    if (functionCallMatch) {
      try {
        console.log('[AAEncode] 尝试提取函数调用内容');
        // 尝试直接解析内部表达式
        const innerCode = `(function() { return ${functionCallMatch[1]}; })()`;
        result = sandboxEval(innerCode);
        if (typeof result === 'string' && result.length > 0) {
          console.log('[AAEncode] 函数调用内容提取成功');
          return result;
        }
      } catch (e) {
        console.error('[AAEncode] 提取函数调用内容失败:', e.message);
      }
    }

    console.log('[AAEncode] 解密失败，无法得到有效的字符串结果');
    return null;
  } catch (err) {
    console.error('[AAEncode] 解密过程出错:', err.message);
    return null;
  }
}

// ES Module export
export default decodeAAencode;
