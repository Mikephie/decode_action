// AADecode Plugin for JavaScript Deobfuscation
// Decodes JavaScript obfuscated with aaencode

function aadecode(encodedCode) {
  // Check if the code appears to be aaencoded
  if (!isAAEncoded(encodedCode)) {
    return encodedCode;
  }

  try {
    // Extract the aaencoded part from the code
    let code = encodedCode;
    
    // Check if the aaencode is assigned to a variable
    const varAssignMatch = code.match(/var\s+\w+\s*=\s*"([^"]+)"/);
    if (varAssignMatch) {
      code = varAssignMatch[1];
      // Unescape the string
      code = code.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    
    // Check for the typical aaencode pattern
    const aaencodePattern = /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/;
    if (!aaencodePattern.test(code)) {
      return encodedCode;
    }

    // Try to decode by executing the aaencode in a sandbox
    try {
      // Create a sandboxed environment for execution
      const sandbox = `
        (function() {
          ${code}
          
          // aaencode typically creates alert() calls, capture them
          const results = [];
          const originalAlert = typeof alert !== 'undefined' ? alert : null;
          
          // Override alert to capture output
          if (typeof window !== 'undefined') {
            window.alert = function(msg) { results.push(msg); };
          }
          if (typeof global !== 'undefined') {
            global.alert = function(msg) { results.push(msg); };
          }
          const alert = function(msg) { results.push(msg); };
          
          // Try to find and execute the decoded function
          try {
            // AAEncode usually calls (ﾟДﾟ)['_'] with the encoded data
            if (typeof ﾟДﾟ !== 'undefined' && ﾟДﾟ['_']) {
              const func = ﾟДﾟ['_'];
              if (typeof func === 'function') {
                // Execute the function to trigger alert
                func();
              }
            }
          } catch (e) {}
          
          // Restore original alert if it existed
          if (originalAlert) {
            if (typeof window !== 'undefined') window.alert = originalAlert;
            if (typeof global !== 'undefined') global.alert = originalAlert;
          }
          
          return results.join('');
        })();
      `;
      
      const decoded = eval(sandbox);
      if (decoded && decoded !== '') {
        return decoded;
      }
    } catch (e) {
      console.error('AADecode sandbox execution failed:', e.message);
    }
    
    // Alternative approach: manually decode the aaencode
    try {
      // Execute the initialization code safely
      const initCode = code.substring(0, code.indexOf('(ﾟДﾟ) [\'_\']'));
      eval(initCode);
      
      // Extract the encoded data
      const dataMatch = code.match(/\(ﾟДﾟ\)\s*\['_'\]\s*\(\s*\(ﾟДﾟ\)\s*\['_'\]\s*\(([\s\S]+?)\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\('_'\)/);
      if (dataMatch) {
        const encodedData = dataMatch[1];
        
        // Build the character from the encoded data
        let result = '';
        const charCodes = encodedData.split('+').map(part => {
          part = part.trim();
          if (part.match(/^\(ﾟДﾟ\)\[ﾟεﾟ\]/)) {
            // This represents a backslash
            return '\\';
          } else if (part.match(/^\(ﾟДﾟ\)\[ﾟoﾟ\]/)) {
            // This represents a quote
            return '"';
          } else if (part.match(/^\([\s\S]+\)$/)) {
            // This is an expression to evaluate
            try {
              return eval(part);
            } catch (e) {
              return '';
            }
          } else {
            // Direct evaluation
            try {
              return eval(part);
            } catch (e) {
              return '';
            }
          }
        });
        
        // Convert character codes to string
        for (let i = 0; i < charCodes.length; i++) {
          if (typeof charCodes[i] === 'number') {
            result += String.fromCharCode(charCodes[i]);
          } else if (typeof charCodes[i] === 'string') {
            result += charCodes[i];
          }
        }
        
        if (result) {
          return result;
        }
      }
    } catch (e) {
      console.error('Manual AADecode failed:', e.message);
    }

    return encodedCode;
  } catch (error) {
    console.error('AADecode 解码错误:', error.message);
    return encodedCode;
  }
}

function isAAEncoded(code) {
  // Check for characteristic aaencode patterns
  const aaPatterns = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/,
    /\(ﾟДﾟ\)\[ﾟoﾟ\]/,
    /\(ﾟДﾟ\)\['_'\]/,
    /ﾟΘﾟ/,
    /ﾟｰﾟ/,
    /ﾟДﾟ/
  ];
  
  // Check if it's in a string variable
  const stringPattern = /["'].*ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ.*["']/;
  if (stringPattern.test(code)) {
    return true;
  }
  
  // Count how many patterns match
  let matches = 0;
  for (const pattern of aaPatterns) {
    if (pattern.test(code)) {
      matches++;
    }
  }
  
  // If at least 3 patterns match, it's likely aaencoded
  return matches >= 3;
}

// Export the plugin function
export default function PluginAAdecode(sourceCode) {
  return aadecode(sourceCode);
}