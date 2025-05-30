// ./plugin/aadecode.js
// AADecode - Decode JavaScript that has been encoded with aaencode format

/**
 * AADecode implementation for the decode-js framework
 * Compatible with ESM modules
 */

/**
 * Detects if the input code is aaencoded
 * @param {string} code - Input code to check
 * @returns {boolean} - True if code appears to be aaencoded
 */
function isAAEncoded(code) {
  if (typeof code !== 'string' || !code.trim()) {
    return false;
  }
  
  // Common patterns in aaencoded content
  const patterns = [
    /ﾟωﾟﾉ= \/｀ｍ'）ﾉ ~┻━┻/,
    /\(ﾟДﾟ\) \['_'\]/,
    /\(ﾟΘﾟ\)/,
    /\(o\^_\^o\)/
  ];
  
  return patterns.some(pattern => pattern.test(code));
}

/**
 * Decodes aaencoded JavaScript
 * @param {string} code - The encoded JavaScript to decode
 * @returns {string} - Decoded JavaScript code or original code if not aaencoded
 */
export default function aadecode(code) {
  // Skip processing if not aaencoded
  if (!isAAEncoded(code)) {
    return code;
  }

  try {
    // Clean the code
    const encodedText = code.replace(/\/\*'∇｀\*\//g, '').trim();
    
    // Check if it's valid aaencoded content
    const evalPreamble = "(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (";
    const evalPostamble = ") (ﾟΘﾟ)) ('_');";
    
    if (encodedText.lastIndexOf(evalPreamble) < 0 || 
        encodedText.lastIndexOf(evalPostamble) !== encodedText.length - evalPostamble.length) {
      console.log("代码不是有效的 aaencode 格式");
      return code;
    }
    
    // Transform for decoding
    const decodePreamble = "( (ﾟДﾟ) ['_'] (";
    const decodePostamble = ") ());";
    
    const decodingScript = encodedText
      .replace(evalPreamble, decodePreamble)
      .replace(evalPostamble, decodePostamble);
    
    // Use eval to decode - necessary for this specific encoding method
    // eslint-disable-next-line no-eval
    const decodedCode = eval(decodingScript);
    
    console.log("AADecode 解码成功");
    return decodedCode;
  } catch (error) {
    console.error(`AADecode 解码错误: ${error.message}`);
    return code; // Return original code on error
  }
}

// Export named functions for potential direct usage
export { isAAEncoded };