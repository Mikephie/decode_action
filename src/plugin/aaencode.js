/**
 * 符合主脚本接口的 AA 解码插件
 * 基于 jamtg 的原始实现
 */

// 核心解码函数
function aadecode(text) {
  var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  var decodePostamble = ") ());";

  // 去除开头和结尾的空格
  text = text.replace(/^\s*/, "").replace(/\s*$/, "");

  // 空输入返回空字符串
  if (/^\s*$/.test(text)) {
    return "";
  }
  
  // 检查是否是 AA 编码
  if (text.lastIndexOf(evalPreamble) < 0) {
    throw new Error("Given code is not encoded as aaencode.");
  }
  
  // 处理 eval 或 decode 模式
  if (text.lastIndexOf(evalPostamble) >= 0) {
    text = text.replace(evalPreamble, decodePreamble);
    text = text.replace(evalPostamble, decodePostamble);
  }
  
  // 检查是否是高级解码模式
  var matches = /\(c\^_\^o\)/.exec(text);
  if (matches != null) {
    var advanced = true;
    var charcode = 2;
  } else {
    var advanced = false;
  }
  
  // 高级解码模式处理
  if (advanced) {
    // 字符码转换函数
    function _decode_string(value) {
      var result = "";
      for (var i = 0; i < value.length; i++) {
        result += String.fromCharCode(value.charCodeAt(i) - charcode);
      }
      return result;
    }
    
    // 解码字符串值
    function _decode_value(value) {
      var result = "";
      var chunks = value.split(/(\(\d+\))/);
      for (var i = 0; i < chunks.length; i++) {
        if (/\(\d+\)/.test(chunks[i])) {
          result += String.fromCharCode(parseInt(/\((\d+)\)/.exec(chunks[i])[1]));
        } else {
          result += _decode_string(chunks[i]);
        }
      }
      return result;
    }
    
    // 分割文本并处理
    var text_chunks = text.split(/'([^']+)'/);
    
    // 重建代码
    var code = "";
    for (var i = 0; i < text_chunks.length; i++) {
      if (i % 2) {
        code += _decode_value(text_chunks[i]);
      } else {
        code += text_chunks[i];
      }
    }
    
    return code;
  }
  
  // 标准模式处理
  try {
    // 使用安全的方式执行 eval
    var evalFunc = Function;
    return evalFunc("return " + text)();
  } catch (e) {
    // 如果失败，尝试备用方法
    try {
      var backupFunc = Function(text);
      return backupFunc();
    } catch (e2) {
      throw new Error("Failed to evaluate code: " + e2.message);
    }
  }
}

/**
 * 检查代码是否可能是 AA 编码
 */
function isAAEncoded(code) {
  if (typeof code !== 'string') return false;
  
  // 检查 AA 编码的特征
  var patterns = [
    /ﾟωﾟﾉ/,
    /\(ﾟДﾟ\)/,
    /\(ﾟΘﾟ\)/,
    /\(o\^_\^o\)/
  ];
  
  return patterns.some(pattern => pattern.test(code));
}

/**
 * 插件接口，符合主脚本的期望
 */
async function plugin(code) {
  try {
    // 首先检查是否可能是 AA 编码
    if (!isAAEncoded(code)) {
      console.log("不是 AA 编码，跳过处理");
      return null;
    }
    
    console.log("进行 AA 解码...");
    const decoded = aadecode(code);
    
    if (decoded && decoded !== code) {
      console.log("AA 解码成功");
      return decoded;
    } else {
      console.log("解码结果与原内容相同，可能不是 AA 编码");
      return null;
    }
  } catch (error) {
    console.error("AA 解码错误:", error.message);
    return null;
  }
}

// 导出符合主脚本期望的接口
export default {
  plugin: plugin
};