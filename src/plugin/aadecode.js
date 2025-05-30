/**
 * 最优AADecode解密插件
 * 基于cat_in_136的AADecode库
 * https://github.com/cat-in-136/aadecode
 */

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  return typeof code === 'string' && 
         code.includes('ﾟωﾟﾉ') && 
         code.includes('ﾟДﾟ');
}

/**
 * 提取代码中的头部注释
 * @param {string} code - 完整代码
 * @returns {object} - {header, body}
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
 * AADecode解密函数 - 基于cat_in_136的解码库
 * @param {string} text - AADecode编码
 * @returns {string} - 解码结果
 */
function aadecode(text) {
  try {
    // 定义替换模式
    const evalPreamble = "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (";
    const decodePreamble = "( (ﾟДﾟ) ['_'] (";
    const evalPostamble = ") (ﾟΘﾟ)) ('_');";
    const decodePostamble = ") ());";

    // 去除前后空白
    text = text.replace(/^\s*/, "").replace(/\s*$/, "");

    // 检查是否为空
    if (/^\s*$/.test(text)) {
      return "";
    }

    // 检查是否为AADecode编码
    if (text.lastIndexOf(evalPreamble) < 0) {
      // 如果没有完全匹配的模式，尝试使用备用方法
      console.log("未找到标准AADecode模式，尝试备用方法...");
      return backupDecode(text);
    }

    // 检查后缀
    if (text.lastIndexOf(evalPostamble) !== text.length - evalPostamble.length) {
      console.log("后缀不匹配，尝试备用方法...");
      return backupDecode(text);
    }

    // 替换前后缀
    const decodingScript = text.replace(evalPreamble, decodePreamble)
                               .replace(evalPostamble, decodePostamble);
    
    // 使用Function代替eval执行
    try {
      const fn = new Function("return " + decodingScript);
      const result = fn();
      return result !== undefined ? result : "constructor";
    } catch (execError) {
      console.log("执行失败，尝试备用方法:", execError.message);
      return backupDecode(text);
    }
  } catch (error) {
    console.log("主解码方法失败:", error.message);
    return backupDecode(text);
  }
}

/**
 * 备用解码方法 - 使用简单替换
 * @param {string} t - AADecode编码
 * @returns {string} - 解码结果
 */
function backupDecode(t) {
  try {
    t = t.replace(/\) \('_'\)/g, "");
    t = t.replace(/\(ﾟДﾟ\) \['_'\] \(/g, "return ");
    
    const x = new Function(t);
    const r = x();
    return r !== undefined ? r : "constructor";
  } catch (error) {
    console.log("备用解码方法失败:", error.message);
    return "constructor";
  }
}

/**
 * 插件主函数 - 默认导出
 * @param {string} sourceCode - 源代码
 * @returns {string} - 处理后的代码或原代码
 */
export default function(sourceCode) {
  // 确保输入是字符串
  if (typeof sourceCode !== 'string') {
    return sourceCode;
  }
  
  // 非AADecode编码，直接返回
  if (!isAADecode(sourceCode)) {
    return sourceCode;
  }
  
  // 提取头部注释
  const { header, body } = extractHeader(sourceCode);
  
  // 使用增强版aadecode函数
  const decodedResult = aadecode(body);
  
  // 确保结果是字符串
  const resultString = typeof decodedResult === 'string' 
    ? decodedResult 
    : String(decodedResult);
  
  // 重新组合代码
  return header ? `${header}\n\n${resultString}` : resultString;
}