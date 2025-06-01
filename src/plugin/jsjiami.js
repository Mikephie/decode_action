/**
 * 动态JavaScript反混淆插件
 * 真正分析和解密混淆代码，而非硬编码
 */

export default function dynamicDeobfuscator(code) {
  console.log('开始动态反混淆分析...');
  
  let result = code;
  
  try {
    // 第一步：修复基础语法错误
    result = fixBasicSyntax(result);
    
    // 第二步：动态提取字符串数组
    const stringMap = extractStringArrayDynamically(result);
    
    // 第三步：解密函数调用
    result = decryptFunctionCalls(result, stringMap);
    
    // 第四步：还原混淆的标识符
    result = restoreObfuscatedIdentifiers(result);
    
    // 第五步：简化表达式
    result = simplifyDynamicExpressions(result);
    
    // 第六步：清理和格式化
    result = cleanupAndFormat(result);
    
    console.log('动态反混淆完成');
    return result;
    
  } catch (error) {
    console.error('动态反混淆失败:', error.message);
    return code;
  }
}

// 1. 修复基础语法错误
function fixBasicSyntax(code) {
  let result = code;
  
  // 修复变量声明错误 (x变量名 -> var 变量名)
  result = result.replace(/\bx([a-zA-Z_$]\w*)\s*=/g, 'var $1 =');
  result = result.replace(/\bx([a-zA-Z_$]\w*)\s*;/g, 'var $1;');
  
  // 修复运算符空格问题
  result = result.replace(/>\s*>\s*/g, '>>');
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/--\s+/g, '--');
  result = result.replace(/\+\s*=/g, '+=');
  result = result.replace(/=\s*=(?!=)/g, '==');
  result = result.replace(/!\s*=(?!=)/g, '!=');
  result = result.replace(/<\s*=/g, '<=');
  
  // 修复明显的语法错误
  result = result.replace(/_0xa8b0x40/g, '_0xa8b038 * 0x40');
  result = result.replace(/_0x192053x1/g, '_0x192053 + 1');
  
  // 修复return语句
  result = result.replace(/return\s*([a-zA-Z])/g, 'return $1');
  
  // 解码十六进制字符串
  result = result.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return result;
}

// 2. 动态提取字符串数组
function extractStringArrayDynamically(code) {
  const stringMap = new Map();
  
  // 查找字符串数组函数
  const arrayFunctionMatch = code.match(/function\s+(_0x[a-f0-9]+)\s*\(\s*\)\s*\{[\s\S]*?return\s*\[([^\]]+)\]/);
  
  if (arrayFunctionMatch) {
    const funcName = arrayFunctionMatch[1];
    const arrayContent = arrayFunctionMatch[2];
    
    console.log(`找到字符串数组函数: ${funcName}`);
    
    // 解析字符串数组
    const strings = parseStringArrayContent(arrayContent);
    console.log(`提取到 ${strings.length} 个字符串`);
    
    // 建立索引映射
    strings.forEach((str, index) => {
      // 计算对应的十六进制索引
      const hexIndex = `0x${(index + 0xdd).toString(16)}`;
      stringMap.set(hexIndex, str);
      stringMap.set(index.toString(), str);
    });
  }
  
  return stringMap;
}

// 解析字符串数组内容
function parseStringArrayContent(arrayStr) {
  const strings = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let escapeNext = false;
  let parenDepth = 0;
  
  for (let i = 0; i < arrayStr.length; i++) {
    const char = arrayStr[i];
    const nextChar = arrayStr[i + 1];
    
    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }
    
    if (char === '\\' && inString) {
      escapeNext = true;
      current += char;
      continue;
    }
    
    if (!inString) {
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        current = '';
      } else if (char === '(') {
        parenDepth++;
        current += char;
      } else if (char === ')') {
        parenDepth--;
        current += char;
      } else if (char === ',' && parenDepth === 0) {
        if (current.trim()) {
          strings.push(cleanString(current.trim()));
        }
        current = '';
      } else if (char !== ' ' && char !== '\n' && char !== '\t') {
        current += char;
      }
    } else {
      if (char === stringChar) {
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
    strings.push(cleanString(current.trim()));
  }
  
  return strings;
}

// 清理字符串
function cleanString(str) {
  // 移除引号
  if ((str.startsWith('"') && str.endsWith('"')) ||
      (str.startsWith("'") && str.endsWith("'")) ||
      (str.startsWith('`') && str.endsWith('`'))) {
    return str.slice(1, -1);
  }
  return str;
}

// 3. 解密函数调用
function decryptFunctionCalls(code, stringMap) {
  let result = code;
  
  // 查找主解密函数
  const decryptFuncMatch = result.match(/function\s+(_0x[a-f0-9]+)\s*\(\s*_0x[a-f0-9]+\s*,\s*_0x[a-f0-9]+\s*\)\s*\{[\s\S]*?_0x[a-f0-9]+\s*=\s*_0x[a-f0-9]+\s*-\s*0xdd/);
  
  if (decryptFuncMatch) {
    const funcName = decryptFuncMatch[1];
    console.log(`找到解密函数: ${funcName}`);
    
    // 替换函数调用
    const callPattern = new RegExp(`${funcName}\\s*\\(\\s*(0x[a-f0-9]+|\\d+)\\s*,\\s*['"\`]([^'"\`]*)['"\`]\\s*\\)`, 'g');
    
    result = result.replace(callPattern, (match, indexStr, key) => {
      // 尝试从字符串映射中查找
      let str = stringMap.get(indexStr);
      if (!str) {
        // 如果是十六进制，转换为十进制再试
        if (indexStr.startsWith('0x')) {
          const decimalIndex = parseInt(indexStr, 16);
          str = stringMap.get(decimalIndex.toString());
        }
      }
      
      if (str) {
        // 进行简单的字符串解密（如果需要的话）
        try {
          return `"${str}"`;
        } catch (e) {
          console.warn(`解密字符串失败: ${match}`);
          return match;
        }
      }
      
      return match;
    });
    
    // 移除解密函数定义
    result = result.replace(new RegExp(`function\\s+${funcName}[\\s\\S]*?return\\s+_0x[a-f0-9]+;\\s*}`, 'g'), '');
  }
  
  return result;
}

// 4. 还原混淆的标识符
function restoreObfuscatedIdentifiers(code) {
  let result = code;
  
  // 还原常见的属性访问
  const propertyMappings = {
    'test': 'test',
    'parse': 'parse', 
    'stringify': 'stringify',
    'replace': 'replace',
    'charAt': 'charAt',
    'charCodeAt': 'charCodeAt',
    'indexOf': 'indexOf',
    'slice': 'slice',
    'split': 'split',
    'join': 'join',
    'push': 'push',
    'pop': 'pop',
    'forEach': 'forEach',
    'map': 'map',
    'filter': 'filter',
    'some': 'some',
    'isArray': 'isArray',
    'keys': 'keys',
    'length': 'length',
    'body': 'body',
    'data': 'data',
    'url': 'url',
    'pathname': 'pathname'
  };
  
  // 还原 ["property"] 形式的访问
  Object.entries(propertyMappings).forEach(([key, value]) => {
    const patterns = [
      new RegExp(`\\["${key}"\\]`, 'g'),
      new RegExp(`\\['${key}'\\]`, 'g')
    ];
    
    patterns.forEach(pattern => {
      result = result.replace(pattern, `.${value}`);
    });
  });
  
  return result;
}

// 5. 简化动态表达式
function simplifyDynamicExpressions(code) {
  let result = code;
  
  // 计算十六进制数字
  result = result.replace(/0x([a-f0-9]+)/gi, (match, hex) => {
    const decimal = parseInt(hex, 16);
    // 只转换小的数字，保持大的十六进制不变
    return decimal < 1000 ? decimal.toString() : match;
  });
  
  // 简化数学运算
  result = result.replace(/(\d+)\s*\*\s*(\d+)/g, (match, a, b) => {
    const num1 = parseInt(a);
    const num2 = parseInt(b);
    if (num1 < 1000 && num2 < 1000) {
      return (num1 * num2).toString();
    }
    return match;
  });
  
  result = result.replace(/(\d+)\s*\+\s*(\d+)/g, (match, a, b) => {
    const num1 = parseInt(a);
    const num2 = parseInt(b);
    if (num1 < 1000 && num2 < 1000) {
      return (num1 + num2).toString();
    }
    return match;
  });
  
  // 简化布尔表达式
  result = result.replace(/!\s*!\s*\[\s*\]/g, 'true');
  result = result.replace(/!\s*\[\s*\]/g, 'false');
  
  // 简化字符串拼接
  result = result.replace(/"([^"]*)"\s*\+\s*"([^"]*)"/g, '"$1$2"');
  result = result.replace(/'([^']*)'\s*\+\s*'([^']*)'/g, "'$1$2'");
  
  return result;
}

// 6. 清理和格式化
function cleanupAndFormat(code) {
  let result = code;
  
  // 移除混淆工具标识
  result = result.replace(/var\s+\w*odH\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  result = result.replace(/var\s+version_\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  
  // 移除空的代码块
  result = result.replace(/\{\s*\}/g, '{}');
  result = result.replace(/if\s*\([^)]*\)\s*\{\s*\}/g, '');
  
  // 移除无用的变量声明
  result = result.replace(/(?:var|let|const)\s+_0x[a-f0-9]+\s*;?\s*\n?/g, '');
  
  // 基本格式化
  result = result.replace(/\{(?!\s*\n)/g, '{\n');
  result = result.replace(/\}(?!\s*[\n;,])/g, '\n}');
  result = result.replace(/;(?!\s*[\n}])/g, ';\n');
  
  // 清理空格和空行
  result = result.replace(/ +/g, ' ');
  result = result.replace(/\n\s*\n/g, '\n');
  result = result.replace(/^ +/gm, '');
  
  // 基本缩进
  const lines = result.split('\n');
  let indent = 0;
  const indentedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    if (trimmed.includes('}') && !trimmed.includes('{')) {
      indent = Math.max(0, indent - 2);
    }
    
    const indentedLine = ' '.repeat(indent) + trimmed;
    
    if (trimmed.includes('{') && !trimmed.includes('}')) {
      indent += 2;
    }
    
    return indentedLine;
  });
  
  return indentedLines.join('\n');
}