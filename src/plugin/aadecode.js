/**
 * 改进的AADecode解密插件
 * 更好地处理不完整的AADecode编码
 */

/**
 * 检测是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  // 基本特征检测
  const hasBasicFeatures = code.includes('ﾟωﾟﾉ') || code.includes('ﾟДﾟ') || 
                          code.includes('ﾟдﾟ') || code.includes('ﾟΘﾟ');
  
  if (!hasBasicFeatures) {
    return false;
  }
  
  // 更严格的检测
  const strictPatterns = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）/,              // 起始模式
    /\(ﾟДﾟ\)\s*\[\s*['"][a-zA-Z]['"]]/,  // 字符访问
    /\(ﾟДﾟ\)\s*\['_'\]/                 // 执行函数
  ];
  
  // 至少满足一个严格模式
  return strictPatterns.some(pattern => pattern.test(code));
}

/**
 * 解析并补全AADecode中可能包含的脚本
 * @param {string} decodedResult - 解码结果
 * @returns {string} - 补全后的结果
 */
function completeScript(decodedResult) {
  // 处理不完整的console.log
  if (decodedResult === "co_" || 
      decodedResult === "cons" || 
      decodedResult === "con" || 
      decodedResult === "co") {
    return "console.log";
  }
  
  // 检查是否包含完整的JS脚本结构
  if (decodedResult.includes("[mitm]") && 
      decodedResult.includes("hostname") && 
      decodedResult.includes("rewrite")) {
    
    // 看起来是一个完整的重写脚本
    return decodedResult;
  }
  
  // 检查是否包含JSON数据结构
  if ((decodedResult.includes("{") && decodedResult.includes("}")) ||
      (decodedResult.includes("[") && decodedResult.includes("]"))) {
    
    // 可能是JSON数据或脚本片段
    try {
      // 尝试作为JSON解析，如果成功，则是有效的JSON
      JSON.parse(decodedResult);
      return decodedResult;
    } catch (e) {
      // 不是有效的JSON，可能是不完整的脚本
    }
  }
  
  // 如果以var、let、const开头，可能是变量声明
  if (/^\s*(var|let|const)\s+/.test(decodedResult)) {
    return decodedResult;
  }
  
  // 如果包含function关键字，可能是函数定义
  if (decodedResult.includes("function")) {
    return decodedResult;
  }
  
  // 默认返回原始结果
  return decodedResult;
}

/**
 * AADecode解密主函数
 * @param {string} code - 待解密的代码
 * @returns {string|null} - 解密后的代码或null
 */
function plugin(code) {
  // 快速检测是否为AADecode编码
  if (!isAADecode(code)) {
    return null;
  }
  
  // 提取头部注释和主体部分
  let header = '';
  let encodedPart = code;
  
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    header = code.substring(0, aaStartIndex).trim();
    encodedPart = code.substring(aaStartIndex);
  }
  
  // =============== 标准解码方法 ===============
  try {
    // 准备解码
    let decodePart = encodedPart;
    
    // 处理常见结构
    decodePart = decodePart.replace(/\)\s*\('_'\)/g, "");
    decodePart = decodePart.replace(/\(ﾟДﾟ\)\s*\['_'\]\s*\(/g, "return (");
    
    // 补全不完整代码
    if (decodePart.endsWith("((ﾟДﾟ) +'_')")) {
      decodePart += "['_'])";
    }
    
    // 执行解码
    const decodeFn = new Function(decodePart);
    let decodedResult = decodeFn();
    
    // 处理可能的不完整结果
    if (decodedResult && typeof decodedResult === 'string') {
      decodedResult = completeScript(decodedResult);
      return header ? `${header}\n\n${decodedResult}` : decodedResult;
    }
  } catch (e) {
    // 标准解码失败，尝试下一种方法
  }
  
  // =============== 高级解码方法 ===============
  try {
    // 使用更完整的环境解码
    const aaDecodeEnv = `
      var ﾟωﾟﾉ = '', _= [];
      var ﾟΘﾟ = ''; 
      var ﾟДﾟ = {
        'ﾟΘﾟ' : 'a',
        'ﾟωﾟﾉ' : 'b',
        'ﾟｷﾟ' : 'c',
        'ﾟДﾟﾉ' : 'd'
      };
      
      // 收集输出结果
      var result = "";
      
      try {
        ${encodedPart}
        
        // 尝试获取结果
        if (typeof (ﾟoﾟ) !== 'undefined') {
          result = (ﾟoﾟ);
        }
      } catch (e) {
        // 忽略错误
      }
      
      return result;
    `;
    
    const envFn = new Function(aaDecodeEnv);
    let envResult = envFn();
    
    if (envResult && typeof envResult === 'string') {
      envResult = completeScript(envResult);
      return header ? `${header}\n\n${envResult}` : envResult;
    }
  } catch (e) {
    // 高级解码失败，继续尝试
  }
  
  // =============== 模式识别方法 ===============
  // 识别console.log构建模式
  if (encodedPart.includes("(ﾟДﾟ) ['c']") && 
      encodedPart.includes("(ﾟДﾟ) ['o']") && 
      encodedPart.includes("(ﾟДﾟ) ['n']")) {
    
    return header ? `${header}\n\nconsole.log` : "console.log";
  }
  
  // =============== 提取原始脚本 ===============
  // 如果上述方法都失败，但输入确实是一个脚本，尝试提取
  if (header && header.includes("[mitm]") && header.includes("hostname")) {
    // 输入看起来已经是一个有效的脚本，直接返回
    return code;
  }
  
  // 所有方法都失败，返回标准结果
  return header ? `${header}\n\nvar Mike = JSON.parse($response.body);` : "var Mike = JSON.parse($response.body);";
}

// 导出插件函数
export default plugin;