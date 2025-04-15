// 这是 aadecode.js 文件的原始内容
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