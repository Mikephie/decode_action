/**
 * 高级JavaScript反混淆插件
 * 专门处理jsjiami.com类型的混淆
 */

export default function advancedDeobfuscator(code) {
  let result = code;
  
  try {
    console.log('开始高级反混淆处理...');
    
    // 第一步：移除注释和版本信息
    result = removeComments(result);
    
    // 第二步：修复语法错误
    result = fixSyntaxErrors(result);
    
    // 第三步：还原字符串数组
    result = restoreStringArray(result);
    
    // 第四步：还原函数调用
    result = restoreFunctionCalls(result);
    
    // 第五步：简化复杂表达式
    result = simplifyExpressions(result);
    
    // 第六步：还原对象属性访问
    result = restorePropertyAccess(result);
    
    // 第七步：清理无用代码
    result = cleanupCode(result);
    
    // 第八步：美化代码
    result = formatCode(result);
    
    console.log('反混淆处理完成');
    
  } catch (error) {
    console.error('反混淆过程中发生错误:', error.message);
    return code;
  }
  
  return result;
}

// 1. 移除注释和版本信息
function removeComments(code) {
  let result = code;
  
  // 移除时间戳注释
  result = result.replace(/\/\/\d{4}-\d{2}-\d{2}T[\d:.]+Z\s*\n/g, '');
  
  // 移除解密脚本注释
  result = result.replace(/\/\/解密脚本在此\s*\n/g, '');
  
  // 移除jsjiami版本信息
  result = result.replace(/var\s+\w+\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  result = result.replace(/var\s+version_\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  
  return result;
}

// 2. 修复语法错误
function fixSyntaxErrors(code) {
  let result = code;
  
  // 修复 >> 操作符的空格问题
  result = result.replace(/>\s*>\s*/g, '>>');
  
  // 修复 ++ 操作符的空格问题
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/--\s+/g, '--');
  
  // 修复 += 操作符
  result = result.replace(/\+\s*=/g, '+=');
  
  // 修复 == 操作符
  result = result.replace(/=\s*=/g, '==');
  result = result.replace(/!\s*=/g, '!=');
  result = result.replace(/<\s*=/g, '<=');
  
  // 修复正则表达式中的空格
  result = result.replace(/\/\s+([^\/\s]+)\s+\/([gimuy]*)/g, '/$1/$2');
  
  // 修复对象属性访问
  result = result.replace(/\.\s+(\w+)/g, '.$1');
  
  return result;
}

// 3. 还原字符串数组
function restoreStringArray(code) {
  let result = code;
  
  // 查找字符串数组定义
  const arrayMatch = result.match(/function\s+(\w+)\s*\(\)\s*\{\s*const\s+\w+\s*=\s*\(function\s*\(\)\s*\{\s*return\s*\[([^\]]+)\]/);
  
  if (arrayMatch) {
    const funcName = arrayMatch[1];
    const arrayContent = arrayMatch[2];
    
    // 解析字符串数组
    const strings = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let escapeNext = false;
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      
      if (escapeNext) {
        current += char;
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        current += char;
        escapeNext = true;
        continue;
      }
      
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
        current = char;
      } else if (inString && char === stringChar) {
        current += char;
        strings.push(current);
        current = '';
        inString = false;
        stringChar = '';
      } else if (inString) {
        current += char;
      } else if (char === ',') {
        if (current.trim()) {
          strings.push(current.trim());
        }
        current = '';
      } else if (char !== ' ' && char !== '\n' && char !== '\t') {
        current += char;
      }
    }
    
    if (current.trim()) {
      strings.push(current.trim());
    }
    
    // 替换函数调用
    const callPattern = new RegExp(`${funcName}\\s*\\(\\s*(0x[a-f0-9]+|\\d+)\\s*,\\s*['"\`]([^'"\`]*)['"\`]\\s*\\)`, 'g');
    
    result = result.replace(callPattern, (match, index, key) => {
      const idx = parseInt(index, index.startsWith('0x') ? 16 : 10);
      if (idx < strings.length && strings[idx]) {
        try {
          // 尝试解码字符串（如果是编码的）
          let str = strings[idx];
          if (str.startsWith('"') || str.startsWith("'") || str.startsWith('`')) {
            str = str.slice(1, -1);
          }
          return `"${str}"`;
        } catch (e) {
          return strings[idx] || match;
        }
      }
      return match;
    });
    
    // 移除字符串数组函数定义
    result = result.replace(new RegExp(`function\\s+${funcName}\\s*\\(\\)\\s*\\{[^}]+\\}\\s*;?`, 'g'), '');
  }
  
  return result;
}

// 4. 还原函数调用
function restoreFunctionCalls(code) {
  let result = code;
  
  // 查找主要的解密函数
  const funcMatch = result.match(/const\s+(\w+)\s*=\s*(\w+);\s*function\s+\2/);
  if (funcMatch) {
    const mainFunc = funcMatch[1];
    
    // 这个函数通常用于字符串解密，我们尝试简化其调用
    const pattern = new RegExp(`${mainFunc}\\s*\\(\\s*(0x[a-f0-9]+|\\d+)\\s*,\\s*['"\`]([^'"\`]*)['"\`]\\s*\\)`, 'g');
    
    result = result.replace(pattern, (match, hex, str) => {
      // 简单返回字符串，实际应用中可能需要更复杂的解密逻辑
      return `"${str}"`;
    });
  }
  
  return result;
}

// 5. 简化复杂表达式
function simplifyExpressions(code) {
  let result = code;
  
  // 简化 !![] 为 true
  result = result.replace(/!!\s*\[\s*\]/g, 'true');
  
  // 简化 ![] 为 false  
  result = result.replace(/!\s*\[\s*\]/g, 'false');
  
  // 简化复杂的数字表达式
  result = result.replace(/0x([a-f0-9]+)/gi, (match, hex) => {
    return parseInt(hex, 16).toString();
  });
  
  // 简化算术表达式
  result = result.replace(/(\d+)\s*\*\s*(\d+)/g, (match, a, b) => {
    return (parseInt(a) * parseInt(b)).toString();
  });
  
  result = result.replace(/(\d+)\s*\+\s*(\d+)/g, (match, a, b) => {
    return (parseInt(a) + parseInt(b)).toString();
  });
  
  // 简化字符串拼接
  result = result.replace(/'([^']*?)'\s*\+\s*'([^']*?)'/g, "'$1$2'");
  result = result.replace(/"([^"]*?)"\s*\+\s*"([^"]*?)"/g, '"$1$2"');
  
  return result;
}

// 6. 还原对象属性访问
function restorePropertyAccess(code) {
  let result = code;
  
  // 还原常见的属性访问模式
  const propertyMap = {
    'length': 'length',
    'push': 'push',
    'pop': 'pop',
    'shift': 'shift',
    'unshift': 'unshift',
    'slice': 'slice',
    'splice': 'splice',
    'indexOf': 'indexOf',
    'charAt': 'charAt',
    'charCodeAt': 'charCodeAt',
    'replace': 'replace',
    'split': 'split',
    'join': 'join',
    'toString': 'toString',
    'parse': 'parse',
    'stringify': 'stringify'
  };
  
  // 还原 ['property'] 形式的访问
  Object.entries(propertyMap).forEach(([key, value]) => {
    const pattern = new RegExp(`\\[['"\`]${key}['"\`]\\]`, 'g');
    result = result.replace(pattern, `.${value}`);
  });
  
  // 通用的属性访问还原
  result = result.replace(/\[['"`](\w+)['"`]\]/g, '.$1');
  
  return result;
}

// 7. 清理无用代码
function cleanupCode(code) {
  let result = code;
  
  // 移除空的条件块
  result = result.replace(/if\s*\([^)]*\)\s*{\s*}/g, '');
  
  // 移除无用的变量声明（如果变量名看起来是混淆的）
  result = result.replace(/(?:var|let|const)\s+(?:unknown_\d+|func_\d+|obj_\d+|arr_\d+)\s*;?\s*\n?/g, '');
  
  // 移除空行
  result = result.replace(/\n\s*\n/g, '\n');
  
  // 移除调试信息
  result = result.replace(/console\.log\([^)]*\);\s*/g, '');
  
  return result;
}

// 8. 美化代码
function formatCode(code) {
  let result = code;
  
  // 在 { 后添加换行
  result = result.replace(/\{(?!\s*\n)/g, '{\n');
  
  // 在 } 前添加换行
  result = result.replace(/(?<!\n)\s*\}/g, '\n}');
  
  // 在 ; 后添加换行（除非已经有了）
  result = result.replace(/;(?!\s*[\n}])/g, ';\n');
  
  // 修复操作符周围的空格
  result = result.replace(/([=+\-*/%<>!])(?![=+\-*/%<>!])/g, ' $1 ');
  result = result.replace(/\s+([=+\-*/%<>!]{2})\s+/g, ' $1 ');
  
  // 清理多余空格
  result = result.replace(/ +/g, ' ');
  result = result.replace(/^ +/gm, '');
  
  // 基本缩进
  const lines = result.split('\n');
  let indent = 0;
  const indentedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    if (trimmed.includes('}')) indent = Math.max(0, indent - 2);
    const indentedLine = ' '.repeat(indent) + trimmed;
    if (trimmed.includes('{')) indent += 2;
    
    return indentedLine;
  });
  
  result = indentedLines.join('\n');
  
  return result;
}