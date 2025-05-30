// AADecode 核心模块 - 只提供 decode 函数
// 来源于 @cat_in_136 原版实现，做了模块封装

function decode(text) {
  const evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  const decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  const evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  const decodePostamble = ") ());";

  text = text.trim();

  if (text === "") return "";

  if (text.lastIndexOf(evalPreamble) < 0 || !text.endsWith(evalPostamble)) {
    throw new Error("Not AAEncoded script.");
  }

  const decodingScript = text
    .replace(evalPreamble, decodePreamble)
    .replace(evalPostamble, decodePostamble);

  return eval(decodingScript);
}

export default decode;