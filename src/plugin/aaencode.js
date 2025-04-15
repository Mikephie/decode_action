/**
 * 修复后的 AA 解码器插件 - 兼容主脚本的接口要求
 * 基于 jamtg/aaencode-and-aadecode
 * 修复了 "result is not defined" 错误
 */

/**
 * 检测字符串是否是 AA 编码
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否是 AA 编码
 */
function isAAEncoded(code) {
  if (!code || typeof code !== 'string') {
    return false;
  }
  
  // 检查是否包含 AA 编码的特征模式
  const patterns = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ´）ﾉ/i,
    /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]\s*\(/i,
    /\(ﾟΘﾟ\)/i
  ];
  
  return patterns.some(pattern => pattern.test(code));
}

/**
 * 解码 AA 编码的 JavaScript
 * @param {string} text - AA 编码的字符串
 * @returns {string} - 解码后的 JavaScript 代码
 */
function aadecode(text) {
  // 尝试使用简单的替换方法解码
  try {
    var removedSoFar = 0;
    var lastRemovedLength = -1;
    
    while (lastRemovedLength != removedSoFar) {
      lastRemovedLength = removedSoFar;
      removedSoFar = 0;
      text = text.replace(/ﾟωﾟﾉ\s*=\s*\/｀ｍ´）ﾉ\s*～\s*┻━┻\s*\/\s*\.\s*\[\s*_\s*\]\s*;\s*o\s*=\s*\(\s*ﾟｰﾟ\s*\)\s*=\s*_\s*=\s*3\s*;\s*c\s*=\s*\(\s*ﾟΘﾟ\s*\)\s*=\s*\(\s*ﾟｰﾟ\s*\)\s*-\s*\(\s*ﾟｰﾟ\s*\)/g, function(match) {
        removedSoFar += match.length;
        return "";
      });
    }
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟoﾟ\]\)\s*\(ﾟΘﾟ\)\s*\(\s*\'\_\'\s*\)/g, function(match) {
      return "";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟoﾟ\]\)$/g, function(match) {
      return "";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟεﾟ\]\s*=\s*\(ﾟДﾟ\)\[\'c\'\]/g, function(match) {
      return "";
    });
    
    text = text.replace(/\(\s*\(\s*ﾟДﾟ\s*\)\s*\[\s*ﾟεﾟ\s*\]\s*\(\s*\(\s*ﾟДﾟ\s*\)\s*\[\s*\'\s*\.\s*\'\s*\]\s*\(\s*\(\s*ﾟｰﾟ\s*\)\s*\(\s*\(\s*o\^\s*\_\^\s*o\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*\(\s*ﾟｰﾟ\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*ﾟДﾟ\s*\)\s*\[\s*\'\s*\.\s*\'\s*\]\s*\)\s*\)\s*\)/g, function(match) {
      return "";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟεﾟ\]/g, function(match) {
      return "";
    });
    
    text = text.replace(/\+/g, function(match) {
      return "";
    });
    
    text = text.replace(/\(c\^\_\^o\)/g, function(match) {
      return "0";
    });
    
    text = text.replace(/\(ﾟΘﾟ\)/g, function(match) {
      return "1";
    });
    
    text = text.replace(/\(\(o\^\_\^o\)\s*-\s*\(ﾟΘﾟ\)\)/g, function(match) {
      return "2";
    });
    
    text = text.replace(/\(o\^\_\^o\)/g, function(match) {
      return "3";
    });
    
    text = text.replace(/\(ﾟｰﾟ\)/g, function(match) {
      return "4";
    });
    
    text = text.replace(/\(\(ﾟｰﾟ\)\s*\+\s*\(ﾟΘﾟ\)\)/g, function(match) {
      return "5";
    });
    
    text = text.replace(/\(\(o\^\_\^o\)\s*\+\s*\(o\^\_\^o\)\)/g, function(match) {
      return "6";
    });
    
    text = text.replace(/\(\(ﾟｰﾟ\)\s*\+\s*\(o\^\_\^o\)\)/g, function(match) {
      return "7";
    });
    
    text = text.replace(/\(\(ﾟｰﾟ\)\s*\+\s*\(ﾟｰﾟ\)\)/g, function(match) {
      return "8";
    });
    
    text = text.replace(/\(\(ﾟｰﾟ\)\s*\+\s*\(ﾟｰﾟ\)\s*\+\s*\(ﾟΘﾟ\)\)/g, function(match) {
      return "9";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟΘﾟ\]/g, function(match) {
      return "a";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[\'c\'\]/g, function(match) {
      return "c";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟｰﾟ\]/g, function(match) {
      return "e";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟДﾟ\]/g, function(match) {
      return "d";
    });
    
    text = text.replace(/\(oﾟｰﾟo\)/g, function(match) {
      return "u";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\.c/g, function(match) {
      return "c";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\.o/g, function(match) {
      return "o";
    });
    
    text = text.replace(/\(ﾟｰﾟ\)\.c/g, function(match) {
      return "c";
    });
    
    text = text.replace(/\(ﾟｰﾟ\)\.o/g, function(match) {
      return "o";
    });
    
    text = text.replace(/\(ﾟΘﾟ\)\.c/g, function(match) {
      return "c";
    });
    
    text = text.replace(/\(ﾟΘﾟ\)\.o/g, function(match) {
      return "o";
    });
    
    text = text.replace(/\(ﾟｰﾟ\)o\(ﾟΘﾟ\)/g, function(match) {
      return "e";
    });
    
    text = text.replace(/\(o\^\_\^o\)o\(ﾟΘﾟ\)/g, function(match) {
      return "e";
    });
    
    text = text.replace(/\(\(ﾟｰﾟ\)\(\(o\^\_\^o\)\(ﾟΘﾟ\)\)\)/g, function(match) {
      return "e";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[\'\_\'\]/g, function(match) {
      return "f";
    });
    
    text = text.replace(/\(ﾟДﾟ\)\[ﾟεﾟ\]\s*\+/g, function(match) {
      return "\\";
    });
    
    return text;
  } catch (simpleError) {
    console.error('简单替换方法失败:', simpleError.message);
    
    // 如果简单替换方法失败，尝试更复杂的方法
    try {
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
          let result = ""; // 修复：定义 result 变量
          for (var i = 0; i < value.length; i++) {
            result += String.fromCharCode(value.charCodeAt(i) - charcode);
          }
          return result;
        }
        
        // decode string
        function _decode_value(value) {
          let result = ""; // 修复：定义 result 变量
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
        // 使用安全的方式执行 eval
        const safeEval = new Function('return ' + text);
        return safeEval();
      } catch (evalError) {
        console.error('eval 方法失败:', evalError.message);
        throw evalError;
      }
    } catch (complexError) {
      console.error('复杂方法也失败:', complexError.message);
      
      // 最后尝试最简单的替换方法
      text = text.replace("\) \('_'\)", "");
      text = text.replace("\(ﾟДﾟ\) \['_'\] \(", "return ");
      
      try {
        const finalFunc = new Function(text);
        return finalFunc();
      } catch (finalError) {
        console.error('最终尝试也失败:', finalError.message);
        throw finalError;
      }
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
      console.log('不是 AA 编码格式，跳过处理');
      return null; // 不是 AA 编码，返回 null 表示不适用
    }
    
    console.log('进行 AA 解码...');
    const decoded = aadecode(code);
    
    if (decoded && decoded !== code) {
      console.log('AA 解码成功');
      return decoded;
    } else {
      console.log('AA 解码未产生变化，返回 null');
      return null;
    }
  } catch (error) {
    console.error('AA 解码错误:', error.message);
    // 发生错误时仍然返回 null，让其他插件尝试处理
    return null;
  }
}

// 导出符合你主脚本期望的接口
export default {
  plugin
};