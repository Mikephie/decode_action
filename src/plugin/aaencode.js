/**
 * AA 解码插件 - 直接使用 jamtg 的原始实现
 * 源自: https://github.com/jamtg/aaencode-and-aadecode
 */

/**
 * 检测是否是 AA 编码
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否是 AA 编码
 */
function isAAEncoded(code) {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  return code.indexOf(evalPreamble) >= 0;
}

/**
 * jamtg 的原始 AA 解码实现
 * @param {string} text - AA 编码的字符串
 * @returns {string} - 解码后的 JavaScript 代码
 */
function aadecode(text) {
  var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  var decodePostamble = ") ());";

  // strip beginning/ending space
  text = text.replace(/^\s*/, "").replace(/\s*$/, "");

  // returns empty text for empty input
  if (/^\s*$/.test(text)) {
    return "";
  }
  
  // check if it is encoded
  if (text.lastIndexOf(evalPreamble) < 0) {
    throw new Error("Given code is not encoded as aaencode.");
  }
  
  // eval or decode
  if (text.lastIndexOf(evalPostamble) >= 0) {
    // eval
    text = text.replace(evalPreamble, decodePreamble);
    text = text.replace(evalPostamble, decodePostamble);
  }
  
  // figure out advanced decode
  var matches = /\(c\^_\^o\)/.exec(text);
  if (matches != null) {
    var advanced = true;
    var charcode = 2; // v2 [charcode] = c
  } else {
    var advanced = false;
  }
  
  // start decoding
  if (advanced) {
    // get string from charcode
    function _decode_string(value) {
      var result = "";
      for (var i = 0; i < value.length; i++) {
        result += String.fromCharCode(value.charCodeAt(i) - charcode);
      }
      return result;
    }
    
    // decode string
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
    
    var text_chunks = text.split(/'([^']+)'/);
    
    // rebuild code
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
  
  try {
    // 最安全的方法：创建一个独立的函数上下文
    var evalFunc = Function("return " + text);
    return evalFunc();
  } catch (e) {
    // 如果上面的方法失败，使用备用方法
    try {
      // 直接使用 Function 构造函数
      var directFunc = Function(text);
      return directFunc();
    } catch (e2) {
      throw new Error("Failed to evaluate code: " + e2.message);
    }
  }
}

/**
 * 插件接口 - 符合主脚本要求
 * @param {string} code - 要处理的代码
 * @returns {string|null} - 处理后的代码，如果不适用则返回 null
 */
async function plugin(code) {
  try {
    // 检查是否是 AA 编码
    if (!isAAEncoded(code)) {
      return null;
    }
    
    console.log("使用 jamtg 原始方法进行 AA 解码...");
    const decoded = aadecode(code);
    
    if (decoded && decoded !== code) {
      console.log("AA 解码成功");
      return decoded;
    }
    
    return null;
  } catch (error) {
    console.error("AA 解码错误:", error.message);
    return null;
  }
}

export default {
  plugin
};