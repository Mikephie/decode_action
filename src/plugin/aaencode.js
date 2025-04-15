/**
 * AA 解码器插件 - 兼容主脚本的接口要求
 * 基于 jamtg/aaencode-and-aadecode
 */

/**
 * 检测字符串是否是 AA 编码
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否是 AA 编码
 */
function isAAEncoded(code) {
  // 检查是否包含 AA 编码的特征模式
  const pattern = /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]\s*\(/i;
  return pattern.test(code);
}

/**
 * 解码 AA 编码的 JavaScript
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
      result = "";
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
    text = eval(text);
    return text;
  } catch (e) {
    // if failed, try to use our custom eval. see: setTimeout, window.eval
    var evalfunc = Function;
    try {
      text = evalfunc(text);
      return text;
    } catch (e) {
      throw new Error("Failed to evaluate code: " + e.message);
    }
  }
}

/**
 * 使用 AA 解码器处理代码
 * 这个函数符合你主脚本期望的插件接口
 * @param {string} code - 要处理的代码
 * @returns {string|null} - 处理后的代码，如果不适用则返回 null
 */
async function plugin(code) {
  try {
    // 检查是否是 AA 编码
    if (!isAAEncoded(code)) {
      return null; // 不是 AA 编码，返回 null 表示不适用
    }
    
    console.log('进行 AA 解码...');
    const decoded = aadecode(code);
    return decoded;
  } catch (error) {
    console.error('AA 解码错误:', error.message);
    return null;
  }
}

// 导出符合你主脚本期望的接口
export default {
  plugin
};