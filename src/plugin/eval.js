/**
 * 轻量级JavaScript代码格式化工具
 * 无需依赖Babel等重量级库
 */

// 解包函数 - 处理eval加密的代码
function unpack(packedCode) {
  let unpacked = '';
  const fakeEval = (code) => {
    unpacked = code;
    return code;
  };
  
  // 替换eval调用
  const modifiedCode = packedCode.replace(/eval\s*\(/, 'fakeEval(');
  
  try {
    const func = new Function('fakeEval', 'String', 'RegExp', modifiedCode);
    func(fakeEval, String, RegExp);
    return unpacked;
  } catch (e) {
    console.log('解包错误:', e);
    return null;
  }
}

// 递归解包 - 处理多层嵌套的eval
function recursiveUnpack(code, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return code;
  
  try {
    let result = unpack(code);
    if (result && result !== code) {
      if (result.includes('eval(')) {
        return recursiveUnpack(result, depth + 1, maxDepth);
      }
      return result;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }
  
  return code;
}

// 轻量级代码格式化函数
function formatCode(code) {
  // 基本清理
  code = code.trim();
  
  // 初始缩进级别
  let indentLevel = 0;
  let formattedCode = '';
  let inString = false;
  let stringChar = '';
  let inComment = false;
  let inRegex = false;
  let lastChar = '';
  let lastNonWhitespace = '';
  
  // 判断是否应该在此处添加新行
  function shouldAddNewLine(char, nextChar) {
    if (inString || inComment || inRegex) return false;
    
    // 分号、花括号后添加新行
    if (char === ';' || char === '{' || char === '}') return true;
    
    // 某些操作符前后添加新行
    if ((char === '=' && nextChar !== '=' && lastNonWhitespace !== '!' && 
         lastNonWhitespace !== '<' && lastNonWhitespace !== '>' && 
         lastNonWhitespace !== '=') && !inString) {
      // 检查是否是在对象赋值中
      let isInObjectAssignment = false;
      let i = formattedCode.length - 1;
      while (i >= 0) {
        if (formattedCode[i] === '{') {
          isInObjectAssignment = true;
          break;
        }
        if (formattedCode[i] === ';' || formattedCode[i] === '}') {
          break;
        }
        i--;
      }
      if (!isInObjectAssignment && formattedCode.indexOf('function') === -1) {
        return true;
      }
    }
    
    return false;
  }
  
  // 获取缩进字符串
  function getIndent() {
    return '  '.repeat(indentLevel);
  }
  
  // 逐字符处理代码
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const nextChar = code[i + 1] || '';
    
    // 处理字符串
    if ((char === '"' || char === "'" || char === '`') && lastChar !== '\\') {
      if (inString && char === stringChar) {
        inString = false;
      } else if (!inString) {
        inString = true;
        stringChar = char;
      }
    }
    
    // 处理正则表达式
    if (char === '/' && nextChar !== '/' && nextChar !== '*' && !inString && !inComment) {
      // 简单检测是否是正则表达式的开始（这里可能不完全准确）
      if (!inRegex && (lastNonWhitespace === '=' || lastNonWhitespace === '(' || 
          lastNonWhitespace === ':' || lastNonWhitespace === ',' || 
          lastNonWhitespace === '[' || lastNonWhitespace === '!')) {
        inRegex = true;
      } else if (inRegex && lastChar !== '\\') {
        inRegex = false;
      }
    }
    
    // 处理注释
    if (char === '/' && nextChar === '/' && !inString && !inRegex && !inComment) {
      inComment = true;
    }
    if (inComment && char === '\n') {
      inComment = false;
    }
    
    // 处理缩进
    if (!inString && !inComment && !inRegex) {
      if (char === '{') {
        formattedCode += char;
        indentLevel++;
        formattedCode += '\n' + getIndent();
        continue;
      } else if (char === '}') {
        indentLevel = Math.max(0, indentLevel - 1);
        formattedCode = formattedCode.trimEnd();
        formattedCode += '\n' + getIndent() + char;
        if (nextChar !== ';' && nextChar !== ',' && nextChar !== ')') {
          formattedCode += '\n' + getIndent();
        }
        continue;
      } else if (shouldAddNewLine(char, nextChar)) {
        formattedCode += char;
        if (i < code.length - 1) {
          formattedCode += '\n' + getIndent();
        }
        continue;
      } else if (char === '\n') {
        formattedCode += '\n' + getIndent();
        continue;
      }
    }
    
    // 添加当前字符到格式化后的代码
    formattedCode += char;
    
    // 更新上一个字符
    lastChar = char;
    if (!char.match(/\s/)) {
      lastNonWhitespace = char;
    }
  }
  
  // 后处理
  formattedCode = formattedCode
    // 修复多余的空行
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // 确保操作符周围有空格
    .replace(/([+\-*/%&|^])([\w])/g, '$1 $2')
    .replace(/([\w])([\+\-\*\/%&\|\^])/g, '$1 $2')
    // 确保冒号后有空格
    .replace(/:\s*([^\s])/g, ': $1')
    // 确保逗号后有空格
    .replace(/,\s*([^\s])/g, ', $1')
    // 确保对象内键值对有适当的格式
    .replace(/{\s*(\w+):/g, '{ $1:')
    // 清理行尾空格
    .replace(/\s+$/gm, '');
  
  // 添加注释区域
  formattedCode = detectAndCommentSections(formattedCode);
  
  return formattedCode;
}

// 检测代码中的主要部分并添加注释
function detectAndCommentSections(code) {
  const sections = [
    { pattern: /let\s+(names|productName|productType|appVersion)/g, comment: '// 基础配置变量' },
    { pattern: /subscriber\s*=\s*{/g, comment: '// 订阅配置信息' },
    { pattern: /\$\.notify\(/g, comment: '// 通知配置' },
    { pattern: /\$done\(/g, comment: '// 完成处理' },
    { pattern: /function\s+Env\s*\(/g, comment: '// Env环境函数定义' }
  ];
  
  // 查找每个部分在代码中的位置
  const foundSections = [];
  
  sections.forEach(section => {
    let match;
    while ((match = section.pattern.exec(code)) !== null) {
      foundSections.push({
        index: match.index,
        comment: section.comment
      });
    }
  });
  
  // 按位置排序
  foundSections.sort((a, b) => a.index - b.index);
  
  // 在代码中插入注释
  let offset = 0;
  foundSections.forEach(section => {
    // 寻找该位置之前的换行符
    let insertPosition = section.index + offset;
    let lookBehind = code.substring(0, insertPosition);
    let lastNewline = lookBehind.lastIndexOf('\n');
    
    if (lastNewline !== -1) {
      insertPosition = lastNewline + 1;
    }
    
    // 避免重复注释
    const precedingText = code.substring(Math.max(0, insertPosition - 50), insertPosition);
    if (!precedingText.includes(section.comment)) {
      code = code.substring(0, insertPosition) + section.comment + '\n' + code.substring(insertPosition);
      offset += section.comment.length + 1;
    }
  });
  
  return code;
}

// 完整处理流程
function processCode(inputCode) {
  // 1. 解包代码
  const unpacked = recursiveUnpack(inputCode);
  
  // 2. 格式化代码
  const formatted = formatCode(unpacked);
  
  // 3. 添加头部信息
  const finalCode = 
    `// Generated at ${new Date().toISOString()}\n` +
    '// Processed with lightweight JavaScript formatter\n\n' +
    formatted;
    
  return finalCode;
}

// 导出模块
export default {
  unpack: recursiveUnpack,
  format: formatCode,
  process: processCode
};
