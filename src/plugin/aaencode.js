/**
 * AA 解码器 - 基于 jamtg/aaencode-and-aadecode 实现
 * https://github.com/jamtg/aaencode-and-aadecode
 * 
 * 只包含解码功能的简化版本
 */

/**
 * 解码 AA 编码的 JavaScript
 * @param {string} text - AA 编码的字符串
 * @returns {string} - 解码后的 JavaScript 代码
 */
export function aadecode(text) {
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
}