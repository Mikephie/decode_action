/**
 * 直接集成 jamtg 的 AA 解码器到插件系统
 * 确保导出格式完全符合你的主脚本期望
 */

// 这是 jamtg 的原始解码函数，没有任何修改
function jamtgAAdecode(text) {
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
    return eval(text);
  } catch (e) {
    // if failed, try to use our custom eval. see: setTimeout, window.eval
    var evalfunc = Function;
    try {
      return evalfunc(text);
    } catch (e) {
      throw new Error("Failed to evaluate code: " + e.message);
    }
  }
}

// 检查代码是否是 AA 编码
function isAAEncoded(code) {
  return code.includes("ﾟωﾟﾉ") || code.includes("(ﾟДﾟ)");
}

// 插件接口 - 确保命名为 plugin，符合你的插件系统期望
async function plugin(code) {
  // 首先检查是否是 AA 编码
  if (!isAAEncoded(code)) {
    console.log("不是 AA 编码，跳过处理");
    return null;
  }
  
  try {
    console.log("使用 jamtg 的原始函数进行 AA 解码...");
    const result = jamtgAAdecode(code);
    
    if (result && result !== code) {
      console.log("AA 解码成功");
      return result;
    } else {
      console.log("解码结果与输入相同，可能不是 AA 编码");
      return null;
    }
  } catch (error) {
    console.error("AA 解码错误:", error.message);
    return null;
  }
}

// 导出插件，确保格式正确
// ESM 格式导出
export default { plugin };

// 如果你的主脚本使用 CommonJS 格式，取消下面的注释
// module.exports = { plugin };