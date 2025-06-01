export function plugin(text) {
  const aaencodeRegex = /(ﾟωﾟ|ﾟДﾟ|ﾟｰﾟ|ﾟΘﾟ)[\s\S]+\('_'\)\s*\(\s*\);?/;

  text = text.trim();

  if (!aaencodeRegex.test(text)) {
    return text;
  }

  const decodingScript = `(function(){return ${text}})();`;

  try {
    const decoded = eval(decodingScript);
    return typeof decoded === 'string' ? decoded : text;
  } catch (err) {
    throw new Error(`AADecode evaluation failed: ${err.message}`);
  }
}

export default { plugin };
