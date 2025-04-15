/**
 * 增强型 AA 解码函数
 * 增加了错误处理和更多的预处理步骤
 * @param {string} t - AA 编码的字符串
 * @returns {string|null} - 解码后的 JavaScript 代码，失败时返回 null
 */
export function aadecode(t) {
  if (!t || typeof t !== 'string') {
    console.error('输入必须是非空字符串');
    return null;
  }

  try {
    // 清理代码，移除可能导致解析错误的部分
    t = t.trim();
    
    // 应用基本的替换
    t = t.replace(/\)\s*\('_'\)/g, "");
    t = t.replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return ");
    
    // 添加额外的安全检查
    if (t.includes('return') === false) {
      console.warn('警告：无法在代码中找到预期的模式，解码可能不正确');
    }
    
    // 创建一个安全的上下文来执行代码
    const safeContext = {
      console: { log: () => {}, warn: () => {}, error: () => {} },
      setTimeout: () => {},
      setInterval: () => {},
      document: {},
      window: {},
      location: {}
    };
    
    // 使用 Function 构造函数前添加更多检查
    if (t.includes('import') || t.includes('export') || t.includes('require')) {
      console.error('代码包含模块导入/导出语句，可能无法安全执行');
      return null;
    }
    
    // 使用 with 语句限制代码的执行上下文
    const contextWrapper = `
      with (safeContext) {
        ${t}
      }
    `;
    
    // 创建函数并执行
    const x = new Function('safeContext', contextWrapper);
    const r = x(safeContext);
    
    return r;
  } catch (error) {
    console.error('AA 解码过程中出现错误:', error);
    
    // 尝试一种备用的解码方法
    try {
      // 移除所有注释
      const noComments = t.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
      
      // 使用更简单的方法尝试解码
      const simplified = noComments.replace(/\)\s*\('_'\)/g, "").replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return ");
      const func = new Function(simplified);
      return func();
    } catch (backupError) {
      console.error('备用解码方法也失败了:', backupError);
      return null;
    }
  }
}

/**
 * 简单的检测函数，判断字符串是否可能是 AA 编码
 * @param {string} str - 待检测的字符串
 * @returns {boolean} - 是否可能是 AA 编码
 */
export function isAAEncoded(str) {
  if (!str || typeof str !== 'string') {
    return false;
  }
  
  // AA 编码的典型特征
  const aaPatterns = [
    /ﾟωﾟﾉ=/,
    /\(ﾟДﾟ\)/,
    /\(ﾟΘﾟ\)/,
    /\(o\^_\^o\)/
  ];
  
  // 检查是否包含 AA 编码的特征
  return aaPatterns.some(pattern => pattern.test(str));
}

/**
 * 直接执行 AA 编码的字符串并获取结果
 * 警告：这可能有安全风险，仅用于可信代码
 * @param {string} encodedStr - AA 编码的字符串
 * @returns {any} - 执行结果
 */
export function executeAACode(encodedStr) {
  const decoded = aadecode(encodedStr);
  if (!decoded) {
    throw new Error('无法解码 AA 编码的字符串');
  }
  
  // 警告：eval 有安全风险
  // 仅在可信环境中使用
  try {
    return eval(decoded);
  } catch (error) {
    console.error('执行解码后的代码时出错:', error);
    throw error;
  }
}