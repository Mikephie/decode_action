/**
 * 通用JavaScript反混淆插件
 * 集成多种解混淆技术
 */

export default function universalDeobfuscator(code) {
  let result = code;
  let hasChanges = false;
  
  try {
    // 第一步：字符串解码
    result = decodeStrings(result);
    
    // 第二步：Base64解码
    result = decodeBase64Strings(result);
    
    // 第三步：RC4解密
    result = decryptRC4(result);
    
    // 第四步：还原函数调用
    result = restoreFunctionCalls(result);
    
    // 第五步：简化控制流
    result = simplifyControlFlow(result);
    
    // 第六步：变量名还原
    result = restoreVariableNames(result);
    
    // 第七步：代码美化
    result = beautifyCode(result);
    
    // 第八步：移除无用代码
    result = removeDeadCode(result);
    
    hasChanges = result !== code;
    
  } catch (error) {
    console.error('解混淆过程中发生错误:', error.message);
    return code; // 出错时返回原代码
  }
  
  return hasChanges ? result : code;
}

// 1. 字符串解码 (十六进制、Unicode等)
function decodeStrings(code) {
  let result = code;
  
  // 十六进制字符串 \x41 -> A
  result = result.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // Unicode字符串 \u0041 -> A
  result = result.replace(/\\u([0-9a-fA-F]{4})/g, (match, unicode) => {
    return String.fromCharCode(parseInt(unicode, 16));
  });
  
  // 八进制字符串 \101 -> A
  result = result.replace(/\\([0-7]{3})/g, (match, octal) => {
    return String.fromCharCode(parseInt(octal, 8));
  });
  
  return result;
}

// 2. Base64解码
function decodeBase64Strings(code) {
  // 查找可能的Base64字符串并尝试解码
  const base64Pattern = /['"`]([A-Za-z0-9+/]{4,}={0,2})['"`]/g;
  
  return code.replace(base64Pattern, (match, b64str) => {
    try {
      if (b64str.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(b64str)) {
        const decoded = Buffer.from(b64str, 'base64').toString('utf-8');
        // 只有当解码结果是可打印字符时才替换
        if (/^[\x20-\x7E]*$/.test(decoded)) {
          return `"${decoded}"`;
        }
      }
    } catch (e) {
      // 解码失败，保持原样
    }
    return match;
  });
}

// 3. RC4解密 (针对常见的RC4混淆模式)
function decryptRC4(code) {
  let result = code;
  
  // 查找RC4解密函数定义
  const rc4FuncPattern = /function\s+(\w+)\s*\([^)]+\)\s*{[^}]*RC4[^}]*}/gi;
  const rc4Match = rc4FuncPattern.exec(code);
  
  if (rc4Match) {
    const funcName = rc4Match[1];
    // 查找使用该函数的调用并尝试解密
    const callPattern = new RegExp(`${funcName}\\s*\\([^)]+\\)`, 'g');
    
    result = result.replace(callPattern, (match) => {
      try {
        // 这里可以添加具体的RC4解密逻辑
        return `"[RC4_DECRYPTED]"`;
      } catch (e) {
        return match;
      }
    });
  }
  
  return result;
}

// 4. 还原函数调用
function restoreFunctionCalls(code) {
  let result = code;
  
  // 还原数组索引形式的函数调用 arr['push'] -> arr.push
  result = result.replace(/(\w+)\[['"`](\w+)['"`]\]/g, '$1.$2');
  
  // 还原字符串拼接形式的属性访问
  result = result.replace(/(\w+)\[(['"`])(\w+)\2\s*\+\s*\2(\w+)\2\]/g, '$1.$3$4');
  
  // 还原复杂的计算属性访问
  result = result.replace(/\[([^[\]]+)\]\s*\(/g, (match, prop) => {
    if (/^['"`]\w+['"`]$/.test(prop.trim())) {
      return '.' + prop.trim().slice(1, -1) + '(';
    }
    return match;
  });
  
  return result;
}

// 5. 简化控制流
function simplifyControlFlow(code) {
  let result = code;
  
  // 简化无意义的三元操作符
  result = result.replace(/(\w+)\s*\?\s*\1\s*:\s*(\w+)/g, '$1 || $2');
  
  // 简化复杂的布尔表达式
  result = result.replace(/!!\s*(\w+)/g, 'Boolean($1)');
  
  // 简化无用的条件判断
  result = result.replace(/if\s*\(\s*true\s*\)\s*\{([^}]+)\}/g, '$1');
  result = result.replace(/if\s*\(\s*false\s*\)\s*\{[^}]+\}/g, '');
  
  // 简化switch-case混淆
  result = result.replace(/switch\s*\([^)]+\)\s*\{\s*case\s*['"`](\w+)['"`]:\s*([^;]+);?\s*break;\s*\}/g, '$2');
  
  return result;
}

// 6. 变量名还原
function restoreVariableNames(code) {
  let result = code;
  const varMap = new Map();
  
  // 识别混淆变量模式
  const obfVarPattern = /_0x[a-f0-9]+|_0x\w+/g;
  const matches = [...code.matchAll(obfVarPattern)];
  
  // 为混淆变量生成有意义的名称
  const usedNames = new Set();
  matches.forEach((match, index) => {
    const obfName = match[0];
    if (!varMap.has(obfName)) {
      let newName = generateMeaningfulName(obfName, code, index);
      
      // 确保名称唯一
      let counter = 1;
      while (usedNames.has(newName)) {
        newName = `${newName}_${counter}`;
        counter++;
      }
      
      varMap.set(obfName, newName);
      usedNames.add(newName);
    }
  });
  
  // 按长度排序，避免替换冲突
  const sortedEntries = [...varMap.entries()].sort((a, b) => b[0].length - a[0].length);
  
  // 执行替换
  sortedEntries.forEach(([obfName, newName]) => {
    const regex = new RegExp(`\\b${escapeRegExp(obfName)}\\b`, 'g');
    result = result.replace(regex, newName);
  });
  
  return result;
}

// 7. 代码美化
function beautifyCode(code) {
  let result = code;
  
  // 添加适当的换行和缩进
  result = result.replace(/;(?!\s*[\n\r])/g, ';\n');
  result = result.replace(/\{(?!\s*[\n\r])/g, '{\n');
  result = result.replace(/\}(?!\s*[\n\r;,])/g, '\n}');
  
  // 在操作符周围添加空格
  result = result.replace(/([+\-*/%=!<>])(?![=+\-*/%!<>=])/g, ' $1 ');
  result = result.replace(/\s+/g, ' '); // 合并多余空格
  
  return result;
}

// 8. 移除无用代码
function removeDeadCode(code) {
  let result = code;
  
  // 移除空的语句块
  result = result.replace(/\{\s*\}/g, '{}');
  
  // 移除无用的变量声明
  result = result.replace(/var\s+\w+\s*;\s*\n/g, '');
  
  // 移除调试信息
  result = result.replace(/console\.log\([^)]*\);\s*/g, '');
  result = result.replace(/debugger;\s*/g, '');
  
  return result;
}

// 辅助函数：生成有意义的变量名
function generateMeaningfulName(obfName, code, index) {
  // 根据变量的使用模式推断其用途
  if (code.includes(`${obfName}.length`)) return `arr_${index}`;
  if (code.includes(`${obfName}(`)) return `func_${index}`;
  if (code.includes(`${obfName}[`)) return `obj_${index}`;
  if (code.includes(`new ${obfName}`)) return `Class_${index}`;
  if (code.includes(`${obfName} =`)) return `var_${index}`;
  
  return `unknown_${index}`;
}

// 辅助函数：转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}