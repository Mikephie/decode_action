/**
 * 壁纸优化AADecode解密插件 - 无硬编码
 * 针对壁纸解锁脚本特征优化，但不包含任何预设结果
 */

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  if (!code || typeof code !== 'string') return false;
  
  // 检查关键特征
  return code.includes('ﾟωﾟﾉ') && 
         code.includes('ﾟДﾟ') && 
         (code.includes('c^_^o') || code.includes('o^_^o') || code.includes('ﾟｰﾟ'));
}

/**
 * 判断是否为壁纸解锁相关脚本
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为壁纸相关脚本
 */
function isWallpaperScript(code) {
  if (!code || typeof code !== 'string') return false;
  
  return code.includes('壁纸解锁') || 
         code.includes('leancloud.emotionwp.com') || 
         (code.includes('Svip') && code.includes('Vip') && code.includes('涂鸦币'));
}

/**
 * 提取代码中的头部注释
 * @param {string} code - 完整代码
 * @returns {object} - {header, body} 分离的头部和主体
 */
function extractHeader(code) {
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    return {
      header: code.substring(0, aaStartIndex).trim(),
      body: code.substring(aaStartIndex)
    };
  }
  return { header: '', body: code };
}

/**
 * 方法1: 直接执行法 - 针对壁纸脚本优化环境变量
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethodDirect(code) {
  try {
    // 提供常见的变量但不预设任何值或结果
    const decodeFnStr = `
      // 基础AADecode环境
      var ﾟωﾟﾉ, _='', __='';
      var ﾟΘﾟ='', ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
      var ﾟωﾟﾉ, oﾟｰﾟo;
      
      // 壁纸解锁脚本常用环境变量 (不预设值)
      var $response = {};
      var $done = function() {};
      var JSON = window.JSON;
      
      try {
        ${code}
        
        // 捕获最终输出的值
        if (typeof ﾟoﾟ !== 'undefined') {
          return ﾟoﾟ;
        } else if (typeof _ !== 'undefined' && _ !== '') {
          return _;
        } else if (typeof __ !== 'undefined' && __ !== '') {
          return __;
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
    `;
    
    // 使用Function执行解码函数
    const decodeFn = new Function(decodeFnStr);
    return decodeFn();
  } catch (error) {
    return null;
  }
}

/**
 * 方法2: 替换执行法 - 替换特定模式
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethodReplace(code) {
  try {
    // 预处理代码
    let processedCode = code;
    
    // 替换常见的壁纸解锁脚本中的AADecode模式
    processedCode = processedCode.replace(/\(ﾟДﾟ\)\['\_'\]\s*\(/g, "return (");
    processedCode = processedCode.replace(/\(\+\(o\^\-\^o\)\+\(o\^\-\^o\)\+\(\(\(\(\o\^\-\^o\)\+\(o\^\-\^o\)\+\(\o\^\-\^o\)\)/g, "return (");
    
    // 去除尾部的 ('_');
    const lastParenIndex = processedCode.lastIndexOf("('_');");
    if (lastParenIndex > 0) {
      processedCode = processedCode.substring(0, lastParenIndex + 6);
    }
    
    // 构建解码环境
    const decodeFnStr2 = `
      var ﾟωﾟﾉ, _='', __='';
      var ﾟΘﾟ='', ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
      var ﾟωﾟﾉ, oﾟｰﾟo;
      
      // 壁纸解锁脚本常用环境变量 (不预设值)
      var $response = {};
      var $done = function() {};
      var JSON = window.JSON;
      
      try {
        ${processedCode}
        
        if (typeof ﾟoﾟ !== 'undefined') {
          return ﾟoﾟ;
        } else if (typeof _ !== 'undefined' && _ !== '') {
          return _;
        } else if (typeof __ !== 'undefined' && __ !== '') {
          return __;
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
    `;
    
    const decodeFn2 = new Function(decodeFnStr2);
    return decodeFn2();
  } catch (error) {
    return null;
  }
}

/**
 * 方法3: 分段执行法 - 针对特殊壁纸脚本
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethodSegmented(code) {
  try {
    // 拆分代码为小段
    const segments = code.split(';');
    let lastValidResult = null;
    
    // 尝试逐段执行，保留最后有效结果
    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments.slice(0, i + 1).join(';');
      
      if (segment.trim().length === 0) continue;
      
      try {
        const fn = new Function(`
          var ﾟωﾟﾉ, _='', __='';
          var ﾟΘﾟ='', ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
          var ﾟωﾟﾉ, oﾟｰﾟo;
          
          ${segment}
          
          if (typeof ﾟoﾟ !== 'undefined') return ﾟoﾟ;
          if (typeof _ !== 'undefined' && _ !== '') return _;
          if (typeof __ !== 'undefined' && __ !== '') return __;
          return null;
        `);
        
        const result = fn();
        if (result && typeof result === 'string' && result.length > 10) {
          lastValidResult = result;
          break;
        }
      } catch (e) {
        // 忽略错误，继续尝试下一段
        continue;
      }
    }
    
    return lastValidResult;
  } catch (error) {
    return null;
  }
}

/**
 * 主解密函数
 * @param {string} code - 待解密的代码
 * @returns {string} - 解密后的代码或原代码
 */
function decodeAA(code) {
  // 验证输入是否为AADecode编码
  if (!isAADecode(code)) {
    return code; // 不是AADecode编码，返回原代码
  }

  try {
    // 提取头部注释部分
    const { header, body } = extractHeader(code);
    
    // 首先检查是否为壁纸相关脚本
    const isWallpaper = isWallpaperScript(code);
    
    // 选择解码方法
    let result = null;
    
    // 对壁纸脚本使用优化的解码方法
    if (isWallpaper) {
      // 尝试针对壁纸脚本优化的方法
      result = decodeMethodDirect(body);
      
      if (!result) {
        result = decodeMethodReplace(body);
      }
      
      if (!result) {
        result = decodeMethodSegmented(body);
      }
    } else {
      // 非壁纸脚本使用基本方法
      result = decodeMethodDirect(body);
      
      if (!result) {
        result = decodeMethodReplace(body);
      }
    }
    
    // 如果所有方法都失败，返回原代码
    if (!result) {
      return code;
    }
    
    // 如果有头部注释，添加回去
    if (header && result && typeof result === 'string') {
      return `${header}\n\n${result}`;
    }
    
    return result;
  } catch (error) {
    // 发生错误时返回原代码
    return code;
  }
}

/**
 * 插件主函数 - 符合框架要求的接口
 * @param {string} sourceCode - 源代码
 * @returns {string} - 处理后的代码
 */
export default function plugin(sourceCode) {
  // 确保输入是字符串
  if (typeof sourceCode !== 'string') {
    return sourceCode;
  }
  
  // 应用解码函数
  return decodeAA(sourceCode);
}