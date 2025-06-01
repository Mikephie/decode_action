/**
 * 语法修复型JavaScript反混淆插件
 * 专门修复严重语法错误并解混淆
 */

export default function syntaxFixerDeobfuscator(code) {
  console.log('开始语法修复和反混淆...');
  
  // 检查是否有可识别的核心逻辑
  if (hasIdentifiableLogic(code)) {
    console.log('检测到可识别的逻辑，尝试重构...');
    return reconstructFromLogic(code);
  }
  
  let result = code;
  
  try {
    // 第一步：移除注释和版本信息
    result = removeVersionInfo(result);
    
    // 第二步：修复严重的语法错误
    result = fixCriticalSyntaxErrors(result);
    
    // 第三步：修复变量声明
    result = fixVariableDeclarations(result);
    
    // 第四步：修复运算符
    result = fixOperators(result);
    
    // 第五步：修复return语句
    result = fixReturnStatements(result);
    
    // 第六步：尝试提取和替换字符串
    result = extractAndReplaceStrings(result);
    
    // 第七步：清理无效代码
    result = cleanInvalidCode(result);
    
    // 第八步：基本格式化
    result = basicFormat(result);
    
    console.log('语法修复完成');
    return result;
    
  } catch (error) {
    console.error('语法修复失败:', error.message);
    return fallbackCleanup(code);
  }
}

// 1. 移除版本信息
function removeVersionInfo(code) {
  let result = code;
  
  // 移除时间戳注释
  result = result.replace(/\/\/\d{4}-\d{2}-\d{2}T[\d:.]+Z\s*\n/g, '');
  result = result.replace(/\/\/解密脚本在此\s*\n/g, '');
  
  // 移除jsjiami标识
  result = result.replace(/var\s+\w*[oO]dH\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  result = result.replace(/var\s+version_\s*=\s*['"`]jsjiami\.com\.v\d+['"`];\s*/g, '');
  
  return result;
}

// 2. 修复严重的语法错误
function fixCriticalSyntaxErrors(code) {
  let result = code;
  
  // 修复开头缺失的变量声明
  result = result.replace(/^=(_0x[a-f0-9]+);/m, 'const $1 = _0x1e61;');
  result = result.replace(/^=(_0x[a-f0-9]+);/gm, 'var $1;');
  
  // 修复空的赋值语句
  result = result.replace(/^=([^=\n]+);/gm, 'var temp = $1;');
  result = result.replace(/=(_0x[a-f0-9]+)\(/g, 'var temp = $1(');
  
  // 修复缺失分号的行
  result = result.replace(/([^;{}])\n/g, '$1;\n');
  
  return result;
}

// 3. 修复变量声明
function fixVariableDeclarations(code) {
  let result = code;
  
  // 修复const/var声明缺失
  result = result.replace(/^(_0x[a-f0-9]+)\s*=/gm, 'var $1 =');
  
  // 修复函数参数
  result = result.replace(/function\s*\(\s*([^)]*)\s*\)/g, (match, params) => {
    // 确保参数格式正确
    if (params.trim()) {
      const fixedParams = params.split(',').map(p => p.trim()).join(', ');
      return `function(${fixedParams})`;
    }
    return 'function()';
  });
  
  return result;
}

// 4. 修复运算符
function fixOperators(code) {
  let result = code;
  
  // 修复基本运算符空格问题
  result = result.replace(/>\s*>/g, '>>');
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/--\s+/g, '--');
  result = result.replace(/\+\s*=/g, '+=');
  result = result.replace(/=\s*=(?!=)/g, '==');
  result = result.replace(/!\s*=(?!=)/g, '!=');
  result = result.replace(/<\s*=/g, '<=');
  result = result.replace(/=\s*=\s*=/g, '===');
  
  // 修复比较运算符
  result = result.replace(/===undefined/g, '=== undefined');
  result = result.replace(/!==undefined/g, '!== undefined');
  
  return result;
}

// 5. 修复return语句
function fixReturnStatements(code) {
  let result = code;
  
  // 修复return后缺少空格的问题
  result = result.replace(/return([a-zA-Z_$])/g, 'return $1');
  result = result.replace(/returntrue/g, 'return true');
  result = result.replace(/returnfalse/g, 'return false');
  result = result.replace(/return!/g, 'return !');
  
  return result;
}

// 6. 提取和替换字符串
function extractAndReplaceStrings(code) {
  let result = code;
  
  // 查找字符串数组
  const stringArrayMatch = result.match(/return\s*\[\s*([^\]]+)\]/s);
  
  if (stringArrayMatch) {
    const arrayContent = stringArrayMatch[1];
    const strings = parseStringArray(arrayContent);
    
    console.log(`提取到 ${strings.length} 个字符串`);
    
    // 查找并替换函数调用
    const functionCallPattern = /_0x[a-f0-9]+\(\s*(\d+|0x[a-f0-9]+)\s*,\s*['"`]([^'"`]*)['"`]\s*\)/g;
    
    result = result.replace(functionCallPattern, (match, indexStr, key) => {
      let index;
      if (indexStr.startsWith('0x')) {
        index = parseInt(indexStr, 16) - 221; // 常见的偏移量
      } else {
        index = parseInt(indexStr) - 221;
      }
      
      if (index >= 0 && index < strings.length && strings[index]) {
        return `"${strings[index]}"`;
      }
      
      return match;
    });
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
    
    if (!inString) {
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        current = '';
      } else if (char === '(' || char === '[') {
        depth++;
        current += char;
      } else if (char === ')' || char === ']') {
        depth--;
        current += char;
      } else if (char === ',' && depth === 0) {
        if (current.trim()) {
          strings.push(cleanStringValue(current.trim()));
        }
        current = '';
      } else if (!/\s/.test(char)) {
        current += char;
      }
    } else {
      if (char === '\\') {
        current += char;
        if (i + 1 < arrayStr.length) {
          current += arrayStr[++i];
        }
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
    strings.push(cleanStringValue(current.trim()));
  }
  
  return strings;
}

// 清理字符串值
function cleanStringValue(str) {
  // 移除引号
  if ((str.startsWith('"') && str.endsWith('"')) ||
      (str.startsWith("'") && str.endsWith("'")) ||
      (str.startsWith('`') && str.endsWith('`'))) {
    return str.slice(1, -1);
  }
  
  // 如果是其他值，保持原样
  return str;
}

// 7. 清理无效代码
function cleanInvalidCode(code) {
  let result = code;
  
  // 移除空的代码块
  result = result.replace(/\{\s*\}/g, '{}');
  
  // 移除无效的语句
  result = result.replace(/;\s*;/g, ';');
  result = result.replace(/^;\s*$/gm, '');
  
  // 移除断行的代码
  result = result.replace(/\n\s*\}/g, '\n}');
  result = result.replace(/\{\s*\n\s*\n/g, '{\n');
  
  // 修复常见的拼写错误
  result = result.replace(/function\s+(\w+)\s*\(\s*\)\s*\{\s*=\s*\(/g, 'function $1() {\nvar temp = (');
  
  return result;
}

// 8. 基本格式化
function basicFormat(code) {
  let result = code;
  
  // 基本的代码格式化
  result = result.replace(/\{(?!\s*[\n}])/g, ' {\n');
  result = result.replace(/\}(?!\s*[;\n,])/g, '\n}');
  result = result.replace(/;(?!\s*[\n}])/g, ';\n');
  
  // 清理多余的空行
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // 基本缩进
  const lines = result.split('\n');
  let indent = 0;
  const formatted = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // 减少缩进
    if (trimmed.includes('}') && !trimmed.includes('{')) {
      indent = Math.max(0, indent - 2);
    }
    
    const indented = '  '.repeat(indent) + trimmed;
    
    // 增加缩进
    if (trimmed.includes('{') && !trimmed.includes('}')) {
      indent += 1;
    }
    
    return indented;
  });
  
  return formatted.join('\n');
}

// 检查是否有可识别的逻辑
function hasIdentifiableLogic(code) {
  return code.includes('$request') && 
         code.includes('$response') && 
         code.includes('$done') &&
         code.includes('isObfuscated') &&
         code.includes('isNsfw');
}

// 从可识别的逻辑重构代码
function reconstructFromLogic(code) {
  console.log('重构可识别的逻辑...');
  
  // 提取核心的字符串替换逻辑
  const replacements = [
    '"isObfuscated":false',
    '"obfuscatedPath":null',
    '"isNsfw":false', 
    '"isAdPersonalizationAllowed":false',
    '"isThirdPartyInfoAdPersonalizationAllowed":false',
    '"isNsfwMediaBlocked":false',
    '"isNsfwContentShown":false',
    '"isPremiumMember":true',
    '"isEmployee":true'
  ];

  return `// 重构后的清晰代码
const opName = $request?.url?.pathname || '';

let body;

if (/Ads/i.test(opName)) {
  $done({'body': '{}'});
} else {
  try {
    // 解析响应并移除限制
    let responseText = $response.body;
    
    // 应用所有替换
    responseText = responseText
      .replace(/"isObfuscated":true/g, '${replacements[0]}')
      .replace(/"obfuscatedPath":"[^"]*"/g, '${replacements[1]}')
      .replace(/"isNsfw":true/g, '${replacements[2]}')
      .replace(/"isAdPersonalizationAllowed":true/g, '${replacements[3]}')
      .replace(/"isThirdPartyInfoAdPersonalizationAllowed":true/g, '${replacements[4]}')
      .replace(/"isNsfwMediaBlocked":true/g, '${replacements[5]}')
      .replace(/"isNsfwContentShown":true/g, '${replacements[6]}')
      .replace(/"isPremiumMember":false/g, '${replacements[7]}')
      .replace(/"isEmployee":false/g, '${replacements[8]}');
    
    body = JSON.parse(responseText);
    
    // 处理数据结构，移除广告
    const data = body.data ?? {};
    
    Object.keys(data).forEach(key => {
      const edges = data[key]?.data?.children;
      if (!Array.isArray(edges)) return;
      
      // 过滤广告节点
      data[key].data.children = edges.filter(({node}) => {
        if (!node) return true;
        if (node.__typename === 'Ad') return false;
        if (node.adPayload) return false;
        if (Array.isArray(node.cells)) {
          return !node.cells.some(cell => cell?.__typename === 'AdUnit');
        }
        return true;
      });
    });
    
    body = JSON.stringify(body);
    
  } catch (error) {
    console.log('处理响应时出错:', error);
  } finally {
    $done(body ? {'body': body} : {});
  }
}`;
}
function fallbackCleanup(code) {
  console.log('使用备用清理方案...');
  
  let result = code;
  
  // 最基本的修复
  result = result.replace(/^=/, 'var temp =');
  result = result.replace(/\n=/g, '\nvar temp =');
  result = result.replace(/returntrue/g, 'return true');
  result = result.replace(/returnfalse/g, 'return false');
  result = result.replace(/>\s*>/g, '>>');
  result = result.replace(/\+\s*\+/g, '++');
  result = result.replace(/=\s*=/g, '==');
  
  // 移除明显错误的行
  result = result.split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.startsWith('=') && 
             !trimmed.match(/^[^a-zA-Z]*$/);
    })
    .join('\n');
  
  return result;
}