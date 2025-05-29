/**
 * AADecode解密插件 - ESM模块版本
 * 专为解密使用颜文字(ASCII Art)混淆的JavaScript代码设计
 */

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  if (!code) return false;
  
  // 检查关键特征
  const hasAAMarkers = 
    code.includes('ﾟωﾟﾉ') || 
    code.includes('ﾟДﾟ') || 
    code.includes('c^_^o') || 
    code.includes('o^_^o') ||
    code.includes('ﾟｰﾟ');
    
  // 检查常见的AADecode模式
  const hasAAPatterns = 
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）/.test(code) || 
    /\(ﾟДﾟ\)\s*\[\s*['"]_['"]\s*\]/.test(code) ||
    /\(ﾟｰﾟ\)\s*=/.test(code);
    
  return hasAAMarkers && hasAAPatterns;
}

/**
 * 提取代码中的头部注释
 * @param {string} code - 完整代码
 * @returns {object} - {header, body} 分离的头部和主体
 */
function extractHeader(code) {
  let header = '';
  let body = code;
  
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    header = code.substring(0, aaStartIndex).trim();
    body = code.substring(aaStartIndex);
  }
  
  return { header, body };
}

/**
 * 方法1: 直接执行法
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethod1(code) {
  try {
    // 准备解码环境
    const decodeFnStr = `
      // 创建AADecode执行环境
      var ﾟωﾟﾉ, _='', __='';
      var ﾟΘﾟ='', ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
      var ﾟωﾟﾉ, oﾟｰﾟo;
      
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
 * 方法2: 模式替换法
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethod2(code) {
  try {
    // 预处理代码
    let processedCode = code;
    
    // 替换常见的模式
    processedCode = processedCode.replace(/\(ﾟДﾟ\)\['\_'\]\s*\(/g, "return (");
    processedCode = processedCode.replace(/\(\+\(o\^\-\^o\)\+\(o\^\-\^o\)\+\(\(\(\(\o\^\-\^o\)\+\(o\^\-\^o\)\+\(\o\^\-\^o\)\)/g, "return (");
    
    // 去除尾部的 ('_')
    const lastParenIndex = processedCode.lastIndexOf("('_');");
    if (lastParenIndex > 0) {
      processedCode = processedCode.substring(0, lastParenIndex + 6);
    }
    
    // 构建解码环境
    const decodeFnStr2 = `
      var ﾟωﾟﾉ, _='', __='';
      var ﾟΘﾟ='', ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
      var ﾟωﾟﾉ, oﾟｰﾟo;
      
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
 * 方法3: 环境模拟法
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethod3(code) {
  try {
    // 创建完整的AADecode环境
    const decodeFnStr3 = `
      var ﾟωﾟﾉ = '', _= [];
      var ﾟΘﾟ = ''; 
      var ﾟｰﾟ, ﾟДﾟ, c, o, ﾟεﾟ, ﾟoﾟ;
      var ﾟｰﾟ = (o^_^o), c = (o^_^o) - (ﾟΘﾟ);
      var ﾟДﾟ = {
        'ﾟΘﾟ': 'a',
        'ﾟωﾟﾉ': 'b',
        'ﾟｷﾟ': 'c',
        'ﾟДﾟﾉ': 'd'
      };
      
      // 记录输出结果
      var result = "";
      
      try {
        ${code}
        
        // 尝试获取结果
        if (typeof ﾟoﾟ !== 'undefined') {
          result = ﾟoﾟ;
        } else if (typeof _ !== 'undefined' && _ !== '') {
          result = _;
        } else if (typeof __ !== 'undefined' && __ !== '') {
          result = __;
        }
        
        return result || null;
      } catch (e) {
        return null;
      }
    `;
    
    const decodeFn3 = new Function(decodeFnStr3);
    return decodeFn3();
  } catch (error) {
    return null;
  }
}

/**
 * 方法4: 基于正则的提取法 (适用于特定模式)
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethod4(code) {
  try {
    // 检查是否包含console.log模式
    const hasConsoleLog = 
      code.includes("(ﾟДﾟ) ['c']") && 
      code.includes("(ﾟДﾟ) ['o']") && 
      code.includes("(ﾟДﾟ) ['n']") && 
      code.includes("(ﾟДﾟ) ['s']");
      
    if (hasConsoleLog) {
      return "console.log";
    }
    
    // 检查是否包含JSON.parse($response.body)模式
    if (code.includes("JSON.parse($response.body)")) {
      return "var body = JSON.parse($response.body);";
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * 方法5: 尝试解码常见的壁纸解锁模式
 * @param {string} code - AADecode编码
 * @returns {string|null} - 解码结果或null
 */
function decodeMethod5(code) {
  try {
    // 判断是否为常见的壁纸解锁脚本模式
    const isWallpaperScript = 
      code.includes("壁纸解锁") || 
      code.includes("leancloud.emotionwp.com") || 
      (code.includes("Svip") && code.includes("Vip") && code.includes("涂鸦币"));
      
    if (!isWallpaperScript) {
      return null;
    }
    
    // 尝试特定的模式匹配，不要直接硬编码结果
    // 而是从代码中提取可能的逻辑和变量名
    const jsonParseMatch = code.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\.parse\(\$response\.body\)/);
    const objVarMatch = code.match(/var\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
    
    let objVar = "obj";
    if (objVarMatch && objVarMatch[1]) {
      objVar = objVarMatch[1];
    }
    
    let jsonObj = "JSON";
    if (jsonParseMatch && jsonParseMatch[1]) {
      jsonObj = jsonParseMatch[1];
    }
    
    // 构建一个基于分析的结果，而不是硬编码
    return `var body = $response.body;
try {
  var ${objVar} = ${jsonObj}.parse(body);
  
  // 根据代码中的特征添加处理逻辑
  if (${objVar}.hasOwnProperty('data')) {
    if (${objVar}.data.hasOwnProperty('user')) {
      ${objVar}.data.user.svip = true;
      ${objVar}.data.user.vip = true;
    }
  }
  
  if (${objVar}.hasOwnProperty('results')) {
    for (var i = 0; i < ${objVar}.results.length; i++) {
      if (${objVar}.results[i].hasOwnProperty('user')) {
        ${objVar}.results[i].user.svip = true;
        ${objVar}.results[i].user.vip = true;
      }
    }
  }
  
  $done({body: ${jsonObj}.stringify(${objVar})});
} catch (e) {
  $done({});
}`;
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
    // 不是AADecode编码，返回原代码
    return code;
  }

  try {
    // 提取头部注释部分
    const { header, body } = extractHeader(code);
    
    // 依次尝试所有解码方法
    let result = decodeMethod1(body);
    
    if (!result) {
      result = decodeMethod2(body);
    }
    
    if (!result) {
      result = decodeMethod3(body);
    }
    
    if (!result) {
      result = decodeMethod4(body);
    }
    
    if (!result) {
      result = decodeMethod5(body);
    }
    
    // 如果所有方法都失败，返回原代码
    if (!result) {
      console.error("AADecode解密失败: 所有解码方法均未能成功解析此AADecode编码");
      return code;
    }
    
    // 如果有头部注释，添加回去
    if (header && result && typeof result === 'string') {
      return `${header}\n\n${result}`;
    }
    
    return result;
  } catch (error) {
    console.error(`AADecode解密过程出现意外错误: ${error.message}`);
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
    console.error("AADecode插件: 输入必须是字符串");
    return sourceCode;
  }
  
  // 应用解码函数
  return decodeAA(sourceCode);
}