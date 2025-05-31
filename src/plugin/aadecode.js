/**
 * AADecode Plugin - 第一层 aaencode 解码器
 * https://github.com/cat-in-136/ (原始算法作者)
 */
function decode(text) {
  const evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  const decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  const evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  const decodePostamble = ") ());";

  text = text.trim();
  if (!text || text.indexOf(evalPreamble) < 0 || !text.endsWith(evalPostamble)) {
    return text;
  }

  const decodingScript = text
    .replace(evalPreamble, decodePreamble)
    .replace(evalPostamble, decodePostamble);

  try {
    return eval(decodingScript);
  } catch (e) {
    console.warn('[aadecode] 解码失败:', e.message);
    return text;
  }
}

export default decode;