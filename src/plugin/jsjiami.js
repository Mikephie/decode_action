/**
 * 专业JavaScript反混淆插件
 * 针对jsjiami.com和类似的复杂混淆
 */

export default function professionalDeobfuscator(code) {
  let result = code;
  let iterations = 0;
  const maxIterations = 5;
  
  console.log('开始专业反混淆处理...');
  
  // 多轮迭代处理
  while (iterations < maxIterations) {
    const beforeLength = result.length;
    
    try {
      // 第一步：清理和预处理
      result = preprocessCode(result);
      
      // 第二步：解析和还原字符串数组
      result = extractAndReplaceStrings(result);
      
      // 第三步：还原函数调用
      result = deobfuscateFunctionCalls(result);
      
      // 第四步：简化表达式
      result = simplifyComplexExpressions(result);
      
      // 第五步：还原控制流
      result = restoreControlFlow(result);
      
      // 第六步：清理代码
      result = cleanupObfuscatedCode(result);
      
      iterations++;
      
      // 如果这一轮没有变化，就停止
      if (result.length === beforeLength) {
        break;
      }
      
      console.log(`完成第 ${iterations} 轮处理`);
      
    } catch (error) {
      console.error(`第 ${iterations + 1} 轮处理出错:`, error.message);
      break;
    }
  }
  
  // 最后格式化
  result = finalFormat(result);
  
  console.log(`反混淆完成，共进行了 ${iterations} 轮处理`);
  return result;
}

// 1. 预处理代码
function preprocessCode(code) {
  let result = code;
  
  // 移除时间戳和注释
  result = result.replace(/\/\/\d{4}-\d{2}-\d{2}T[\d:.]+Z\s*\n/g, '');
  result = result.replace(/\/\/解密脚本在此\s*\n/g, '');
  
  // 修复基本语法问题
  result = result.replace(/>\s*>\s*/g, '>>');
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/--\s+/g, '--');
  result = result.replace(/\+\s*=/g, '+=');
  result = result.replace(/=\s*=/g, '==');
  result = result.replace(/!\s*=/g, '!=');
  result = result.replace(/<\s*=/g, '<=');
  
  // 修复return语句
  result = result.replace(/return\s*([a-zA-Z])/g, 'return $1');
  
  // 修复hex编码的字符串
  result = result.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return result;
}

// 2. 提取和替换字符串
function extractAndReplaceStrings(code) {
  let result = code;
  
  // 查找主要的字符串数组函数
  const arrayFuncMatch = result.match(/function\s+(_\d+)\s*\(\s*\)\s*\{\s*const\s+(_\d+)\s*=\s*\([^}]+\}\s*\)\s*;\s*\1\s*=\s*function\s*\(\s*\)\s*\{\s*return\s+\2\s*;\s*\};\s*return\s+\1\s*\(\s*\)\s*;\s*\}/);
  
  if (arrayFuncMatch) {
    const funcName = arrayFuncMatch[1];
    
    // 查找字符串数组内容
    const arrayContentMatch = result.match(new RegExp(`const\\s+\\w+\\s*=\\s*\\(function\\s*\\(\\s*\\)\\s*\\{\\s*return\\s*\\[([^\\]]+)\\]`));
    
    if (arrayContentMatch) {
      const strings = parseStringArray(arrayContentMatch[1]);
      
      // 查找解密函数
      const decryptFuncMatch = result.match(/function\s+(_\d+)\s*\(\s*_\d+\s*,\s*_\d+\s*\)\s*\{[^}]+_\d+\s*=\s*_\d+\s*-\s*\d+[^}]+\}/);
      
      if (decryptFuncMatch) {
        const decryptFunc = decryptFuncMatch[1];
        
        // 替换所有的函数调用
        const callPattern = new RegExp(`${decryptFunc}\\s*\\(\\s*(\\d+)\\s*,\\s*'([^']*)'\\s*\\)`, 'g');
        
        result = result.replace(callPattern, (match, index, key) => {
          const idx = parseInt(index);
          if (idx < strings.length && strings[idx]) {
            return `"${strings[idx].replace(/['"]/g, '').replace(/\\\\/g, '\\')}"`;
          }
          return match;
        });
        
        // 移除函数定义
        result = result.replace(new RegExp(`function\\s+${decryptFunc}[^}]+\\}`, 'g'), '');
        result = result.replace(new RegExp(`function\\s+${funcName}[^}]+\\}`, 'g'), '');
      }
    }
  }
  
  return result;
}

// 解析字符串数组
function parseStringArray(arrayStr) {
  const strings = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let depth = 0;
  
  for (let i = 0; i < arrayStr.length; i++) {
    const char = arrayStr[i];
    const nextChar = arrayStr[i + 1];
    
    if (!inString) {
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        current = '';
      } else if (char === ',' && depth === 0) {
        if (current.trim()) {
          strings.push(current.trim());
        }
        current = '';
      } else if (char === '(' || char === '[') {
        depth++;
        current += char;
      } else if (char === ')' || char === ']') {
        depth--;
        current += char;
      } else if (char !== ' ' && char !== '\n' && char !== '\t') {
        current += char;
      }
    } else {
      if (char === '\\' && nextChar) {
        current += char + nextChar;
        i++; // 跳过下一个字符
      } else if (char === stringChar) {
        strings.push(current);
        current = '';
        inString = false;
        stringChar = '';
      } else {
        current += char;
      }
    }
  }
  
  if (current.trim()) {
    strings.push(current.trim());
  }
  
  return strings;
}

// 3. 反混淆函数调用
function deobfuscateFunctionCalls(code) {
  let result = code;
  
  // 还原常见的方法调用
  const methodMap = {
    'parse': 'parse',
    'stringify': 'stringify',
    'replace': 'replace',
    'test': 'test',
    'charAt': 'charAt',
    'charCodeAt': 'charCodeAt',
    'indexOf': 'indexOf',
    'slice': 'slice',
    'split': 'split',
    'join': 'join',
    'push': 'push',
    'pop': 'pop',
    'shift': 'shift',
    'unshift': 'unshift',
    'forEach': 'forEach',
    'map': 'map',
    'filter': 'filter',
    'some': 'some',
    'every': 'every',
    'isArray': 'isArray',
    'keys': 'keys',
    'values': 'values',
    'entries': 'entries'
  };
  
  // 还原 ["method"] 形式的调用
  Object.entries(methodMap).forEach(([key, value]) => {
    const patterns = [
      new RegExp(`\\["${key}"\\]`, 'g'),
      new RegExp(`\\['${key}'\\]`, 'g'),
      new RegExp(`\\[\`${key}\`\\]`, 'g')
    ];
    
    patterns.forEach(pattern => {
      result = result.replace(pattern, `.${value}`);
    });
  });
  
  return result;
}

// 4. 简化复杂表达式
function simplifyComplexExpressions(code) {
  let result = code;
  
  // 简化数字表达式
  result = result.replace(/(\d+)\s*\*\s*(\d+)/g, (match, a, b) => {
    try {
      return (parseInt(a) * parseInt(b)).toString();
    } catch (e) {
      return match;
    }
  });
  
  result = result.replace(/(\d+)\s*\+\s*(\d+)/g, (match, a, b) => {
    try {
      return (parseInt(a) + parseInt(b)).toString();
    } catch (e) {
      return match;
    }
  });
  
  result = result.replace(/(\d+)\s*-\s*(\d+)/g, (match, a, b) => {
    try {
      return (parseInt(a) - parseInt(b)).toString();
    } catch (e) {
      return match;
    }
  });
  
  // 简化布尔表达式
  result = result.replace(/!\s*!\s*\[\s*\]/g, 'true');
  result = result.replace(/!\s*\[\s*\]/g, 'false');
  result = result.replace(/!\s*!\s*(\w+)/g, 'Boolean($1)');
  
  // 简化字符串拼接
  result = result.replace(/"([^"]*)"\s*\+\s*"([^"]*)"/g, '"$1$2"');
  result = result.replace(/'([^']*)'\s*\+\s*'([^']*)'/g, "'$1$2'");
  
  return result;
}

// 5. 还原控制流
function restoreControlFlow(code) {
  let result = code;
  
  // 简化条件表达式
  result = result.replace(/if\s*\(\s*true\s*\)\s*\{([^}]+)\}\s*else\s*\{[^}]*\}/g, '$1');
  result = result.replace(/if\s*\(\s*false\s*\)\s*\{[^}]*\}\s*else\s*\{([^}]+)\}/g, '$1');
  result = result.replace(/if\s*\(\s*true\s*\)\s*\{([^}]+)\}/g, '$1');
  result = result.replace(/if\s*\(\s*false\s*\)\s*\{[^}]*\}/g, '');
  
  // 简化三元操作符
  result = result.replace(/true\s*\?\s*([^:]+)\s*:\s*[^;,}]+/g, '$1');
  result = result.replace(/false\s*\?\s*[^:]+\s*:\s*([^;,}]+)/g, '$1');
  
  return result;
}

// 6. 清理混淆代码
function cleanupObfuscatedCode(code) {
  let result = code;
  
  // 移除空的代码块
  result = result.replace(/\{\s*\}/g, '{}');
  result = result.replace(/if\s*\([^)]*\)\s*\{\s*\}/g, '');
  
  // 移除无用的变量声明
  result = result.replace(/(?:var|let|const)\s+_\d+\s*;?\s*\n?/g, '');
  
  // 移除调试代码
  result = result.replace(/console\.log\([^)]*\);\s*/g, '');
  result = result.replace(/debugger;\s*/g, '');
  
  // 移除空行
  result = result.replace(/\n\s*\n/g, '\n');
  
  return result;
}

// 7. 最终格式化
function finalFormat(code) {
  let result = code;
  
  // 基本格式化
  result = result.replace(/\{(?!\s*\n)/g, '{\n');
  result = result.replace(/\}(?!\s*[\n;,])/g, '\n}');
  result = result.replace(/;(?!\s*[\n}])/g, ';\n');
  
  // 操作符格式化
  result = result.replace(/([=+\-*/%<>!])(?![=+\-*/%<>!])/g, ' $1 ');
  result = result.replace(/\s+([=+\-*/%<>!]{2})\s+/g, ' $1 ');
  
  // 清理空格
  result = result.replace(/ +/g, ' ');
  result = result.replace(/^ +/gm, '');
  
  // 基本缩进
  const lines = result.split('\n');
  let indent = 0;
  const indentedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // 减少缩进（在添加内容之前）
    if (trimmed.includes('}') && !trimmed.includes('{')) {
      indent = Math.max(0, indent - 2);
    }
    
    const indentedLine = ' '.repeat(indent) + trimmed;
    
    // 增加缩进（在添加内容之后）
    if (trimmed.includes('{') && !trimmed.includes('}')) {
      indent += 2;
    }
    
    return indentedLine;
  });
  
  result = indentedLines.join('\n');
  
  // 最终清理
  result = result.replace(/\n{3,}/g, '\n\n');
  
  return result;
}