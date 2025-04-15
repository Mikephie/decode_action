// AADecode Plugin (ES Module)
/**
 * Decodes AA-encoded JavaScript
 * AADecode is a JavaScript obfuscation technique that encodes JavaScript code
 * into Japanese-style ASCII art
 * 
 * @param {string} t - The encoded string to decode
 * @returns {string} - The decoded string
 */
function aadecode(t) {
  // Remove unnecessary parts of the encoded string
  t = t.replace(") ('_')", "");
  t = t.replace("(ﾟДﾟ) ['_'] (", "return ");
  
  // Create a function from the modified string and execute it
  const x = new Function(t);
  const r = x();
  
  return r;
}

// Export the function
export { aadecode };
export default aadecode;
