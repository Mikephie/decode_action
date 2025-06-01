export function plugin(text) {
  const aaencodeRegex = /(\(ﾟДﾟ\)\s*\['_']\s*\()([\s\S]*?)(\)\s*\(\)\);?)/;

  text = text.trim();

  if (!aaencodeRegex.test(text)) {
    return text;
  }

  const decodingScript = text.replace(aaencodeRegex, '(function(){return $2})();');

  try {
    const decoded = eval(decodingScript);
    return typeof decoded === 'string' ? decoded : text;
  } catch (err) {
    throw new Error(`AADecode evaluation failed: ${err.message}`);
  }
}

export default { plugin };
