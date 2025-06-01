/**
 * 通用JavaScript反混淆插件
 * 适用于各种混淆模式，不依赖特定代码结构
 */

export default function universalJsDeobfuscator(code) {
  console.log('开始通用反混淆处理...');
  
  let result = code;
  let hasChanges = true;
  let iteration = 0;
  const maxIterations = 10;
  
  // 多轮迭代，直到没有变化为止
  while (hasChanges && iteration < maxIterations) {
    const before = result;
    
    try {
      // 基础语法修复
      result = fixBasicSyntax(result);
      
      // 字符串解码
      result = decodeStrings(result);
      
      // 数值计算
      result = calculateNumbers(result);
      
      // 布尔值简化
      result = simplifyBooleans(result);
      
      // 属性访问还原
      result = restorePropertyAccess(result);
      
      // 函数调用简化
      result = simplifyFunctionCalls(result);
      
      // 表达式求值
      result = evaluateExpressions(result);
      
      // 无用代码移除
      result = removeDeadCode(result);
      
      hasChanges = result !== before;
      iteration++;
      
      if (hasChanges) {
        console.log(`完成第 ${iteration} 轮处理`);
      }
      
    } catch (error) {
      console.warn(`第 ${iteration + 1} 轮处理出错: ${error.message}`);
      break;
    }
  }
  
  // 最终清理和格式化
  result = finalCleanup(result);
  
  console.log(`通用反混淆完成，共进行 ${iteration} 轮处理`);
  return result;
}

// 1. 基础语法修复
function fixBasicSyntax(code) {
  let result = code;
  
  // 修复常见的运算符空格问题
  result = result.replace(/>\s*>/g, '>>');
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/--\s+/g, '--');
  result = result.replace(/\+\s*=/g, '+=');
  result = result.replace(/(?<![!=<>])=\s*=(?!=)/g, '==');
  result = result.replace(/!\s*=(?!=)/g, '!=');
  result = result.replace(/<\s*=/g, '<=');
  result = result.replace(/>\s*=/g, '>=');
  
  // 修复return语句
  result = result.replace(/return([a-zA-Z_$!])/g, 'return $1');
  
  // 修复变量声明错误
  result = result.replace(/^(\s*)=\s*([^=])/gm, '$1var temp = $2');
  
  return result;
}

// 2. 字符串解码
function decodeStrings(code) {
  let result = code;
  
  // 十六进制字符串解码
  result = result.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch (e) {
      return match;
    }
  });
  
  // Unicode字符串解码
  result = result.replace(/\\u([0-9a-fA-F]{4})/g, (match, unicode) => {
    try {
      return String.fromCharCode(parseInt(unicode, 16));
    } catch (e) {
      return match;
    }
  });
  
  // 八进制字符串解码
  result = result.replace(/\\([0-7]{1,3})/g, (match, octal) => {
    try {
      const code = parseInt(octal, 8);
      return code <= 255 ? String.fromCharCode(code) : match;
    } catch (e) {
      return match;
    }
  });
  
  return result;
}

// 3. 数值计算
function calculateNumbers(code) {
  let result = code;
  
  // 十六进制转十进制
  result = result.replace(/\b0x([a-f0-9]+)\b/gi, (match, hex) => {
    try {
      const decimal = parseInt(hex, 16);
      // 只转换较小的数字，保持大数字的可读性
      return decimal < 10000 ? decimal.toString() : match;
    } catch (e) {
      return match;
    }
  });
  
  // 简单的数学运算
  result = result.replace(/\b(\d+)\s*\*\s*(\d+)\b/g, (match, a, b) => {
    try {
      const num1 = parseInt(a);
      const num2 = parseInt(b);
      if (num1 < 1000 && num2 < 1000) {
        return (num1 * num2).toString();
      }
    } catch (e) {}
    return match;
  });
  
  result = result.replace(/\b(\d+)\s*\+\s*(\d+)\b/g, (match, a, b) => {
    try {
      const num1 = parseInt(a);
      const num2 = parseInt(b);
      if (num1 < 1000 && num2 < 1000) {
        return (num1 + num2).toString();
      }
    } catch (e) {}
    return match;
  });
  
  result = result.replace(/\b(\d+)\s*-\s*(\d+)\b/g, (match, a, b) => {
    try {
      const num1 = parseInt(a);
      const num2 = parseInt(b);
      if (num1 < 1000 && num2 < 1000 && num1 > num2) {
        return (num1 - num2).toString();
      }
    } catch (e) {}
    return match;
  });
  
  return result;
}

// 4. 布尔值简化
function simplifyBooleans(code) {
  let result = code;
  
  // !![] -> true
  result = result.replace(/!\s*!\s*\[\s*\]/g, 'true');
  
  // ![] -> false
  result = result.replace(/!\s*\[\s*\]/g, 'false');
  
  // !!variable -> Boolean(variable)
  result = result.replace(/!\s*!\s*([a-zA-Z_$][\w$]*)/g, 'Boolean($1)');
  
  // 简化条件表达式
  result = result.replace(/true\s*\?\s*([^:]+)\s*:\s*[^;,}]+/g, '$1');
  result = result.replace(/false\s*\?\s*[^:]+\s*:\s*([^;,}]+)/g, '$1');
  
  return result;
}

// 5. 属性访问还原
function restorePropertyAccess(code) {
  let result = code;
  
  // ["property"] -> .property
  result = result.replace(/\[\s*["']([a-zA-Z_$][\w$]*)['"]\s*\]/g, '.$1');
  
  // ['method'] -> .method (常见方法名)
  const commonMethods = [
    'charAt', 'charCodeAt', 'indexOf', 'lastIndexOf', 'slice', 'substring',
    'substr', 'split', 'replace', 'match', 'search', 'toLowerCase', 'toUpperCase',
    'trim', 'push', 'pop', 'shift', 'unshift', 'splice', 'join', 'reverse',
    'sort', 'concat', 'length', 'toString', 'valueOf', 'hasOwnProperty',
    'isArray', 'parse', 'stringify', 'keys', 'values', 'entries', 'forEach',
    'map', 'filter', 'reduce', 'find', 'some', 'every', 'includes', 'test'
  ];
  
  commonMethods.forEach(method => {
    const pattern = new RegExp(`\\[\\s*["']${method}["']\\s*\\]`, 'g');
    result = result.replace(pattern, `.${method}`);
  });
  
  return result;
}

// 6. 函数调用简化
function simplifyFunctionCalls(code) {
  let result = code;
  
  // String['fromCharCode'] -> String.fromCharCode
  result = result.replace(/String\s*\[\s*["']fromCharCode["']\s*\]/g, 'String.fromCharCode');
  
  // parseInt(hex, 16) 的结果直接计算（如果是常量）
  result = result.replace(/parseInt\s*\(\s*["']([0-9a-f]+)["']\s*,\s*16\s*\)/gi, (match, hex) => {
    try {
      return parseInt(hex, 16).toString();
    } catch (e) {
      return match;
    }
  });
  
  return result;
}

// 7. 表达式求值
function evaluateExpressions(code) {
  let result = code;
  
  // 字符串拼接
  result = result.replace(/["']([^"']*)["']\s*\+\s*["']([^"']*)["']/g, '"$1$2"');
  
  // 简单的逻辑运算
  result = result.replace(/true\s*&&\s*([^&|]+)/g, '$1');
  result = result.replace(/([^&|]+)\s*&&\s*true/g, '$1');
  result = result.replace(/false\s*\|\|\s*([^&|]+)/g, '$1');
  result = result.replace(/([^&|]+)\s*\|\|\s*false/g, '$1');
  
  return result;
}

// 8. 无用代码移除
function removeDeadCode(code) {
  let result = code;
  
  // 移除空的代码块
  result = result.replace(/\{\s*\}/g, '{}');
  
  // 移除无效的条件
  result = result.replace(/if\s*\(\s*true\s*\)\s*\{([^}]+)\}/g, '$1');
  result = result.replace(/if\s*\(\s*false\s*\)\s*\{[^}]*\}/g, '');
  
  // 移除空的语句
  result = result.replace(/;\s*;/g, ';');
  result = result.replace(/^\s*;\s*$/gm, '');
  
  // 移除调试代码
  result = result.replace(/console\s*\.\s*log\s*\([^)]*\)\s*;?\s*/g, '');
  result = result.replace(/debugger\s*;?\s*/g, '');
  
  return result;
}

// 9. 最终清理
function finalCleanup(code) {
  let result = code;
  
  // 移除混淆工具标识
  result = result.replace(/\/\*[\s\S]*?\*\//g, ''); // 块注释
  result = result.replace(/\/\/.*$/gm, ''); // 行注释（但保留有用的注释）
  
  // 基本格式化
  result = result.replace(/\{(?!\s*[\n}])/g, ' {\n');
  result = result.replace(/\}(?!\s*[;\n,])/g, '\n}');
  result = result.replace(/;(?!\s*[\n}])/g, ';\n');
  
  // 清理空行
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  result = result.replace(/^\s*\n/gm, '');
  
  // 基本缩进
  const lines = result.split('\n');
  let indent = 0;
  const formatted = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    if (trimmed.includes('}') && !trimmed.includes('{')) {
      indent = Math.max(0, indent - 1);
    }
    
    const indented = '  '.repeat(indent) + trimmed;
    
    if (trimmed.includes('{') && !trimmed.includes('}')) {
      indent += 1;
    }
    
    return indented;
  });
  
  result = formatted.join('\n');
  
  // 最终清理
  result = result.replace(/\n{3,}/g, '\n\n');
  
  return result;
}