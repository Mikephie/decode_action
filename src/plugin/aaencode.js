
import fs from 'fs';

// jamtg 的原始解码函数
function aadecode(text) {
  var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  var decodePostamble = ") ());";

  text = text.replace(/^\s*/, "").replace(/\s*$/, "");
  if (/^\s*$/.test(text)) return "";
  if (text.lastIndexOf(evalPreamble) < 0) throw new Error("Not AAEncoded");
  
  if (text.lastIndexOf(evalPostamble) >= 0) {
    text = text.replace(evalPreamble, decodePreamble);
    text = text.replace(evalPostamble, decodePostamble);
  }
  
  var matches = /\(c\^_\^o\)/.exec(text);
  if (matches != null) {
    var advanced = true;
    var charcode = 2;
  } else {
    var advanced = false;
  }
  
  if (advanced) {
    // 高级解码逻辑
    // ...和原始代码相同
  }
  
  try {
    return eval(text);
  } catch (e) {
    try {
      return Function(text)();
    } catch (e) {
      throw new Error("Failed to decode: " + e.message);
    }
  }
}

// 读取文件
const encoded = fs.readFileSync('input.js', 'utf8');

try {
  // 直接解码并输出
  const decoded = aadecode(encoded);
  console.log(decoded); // 直接输出到控制台
  fs.writeFileSync('direct_output.js', decoded); // 直接保存
} catch (error) {
  console.error('解码错误:', error.message);
}