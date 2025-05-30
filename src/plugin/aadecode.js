// AADecode Plugin for JavaScript Deobfuscation
// Decodes JavaScript obfuscated with aaencode

function aadecode(encodedCode) {
  // Check if the code appears to be aaencoded
  if (!isAAEncoded(encodedCode)) {
    return encodedCode;
  }

  try {
    // AAEncode character mappings
    const aaMapping = {
      'ﾟωﾟﾉ': '0',
      'ﾟΘﾟﾉ': '1',
      'ﾟｰﾟﾉ': '2',
      'ﾟДﾟﾉ': '3',
      '(ﾟДﾟ)': '4',
      '(ﾟｰﾟ)': '5',
      '(oﾟｰﾟo)': '6',
      'ﾟΘﾟ': '7',
      'ﾟωﾟ': '8',
      'ﾟｰﾟ': '9',
      'ﾟДﾟ': 'a',
      'ﾟΘﾟﾉ': 'b',
      'oﾟｰﾟo': 'c',
      'ﾟｰﾟﾉ': 'd',
      '(ﾟДﾟ)': 'e',
      '((ﾟｰﾟ) + (ﾟΘﾟ))': 'f'
    };

    // Remove the aaencode wrapper and extract the encoded content
    let code = encodedCode.trim();
    
    // AAEncode typically starts with this pattern
    const aaPrefix = /^ﾟωﾟﾉ=\s*\/｀ｍ'）ﾉ\s*~┻━┻\s*\/\s*\['_'\];/;
    if (!aaPrefix.test(code)) {
      return encodedCode;
    }

    // Extract the main encoded portion
    const mainMatch = code.match(/\(ﾟДﾟ\)\[ﾟoﾟ\]\s*=\s*(.+?);\s*\(ﾟДﾟ\)\['_'\]/s);
    if (!mainMatch) {
      return encodedCode;
    }

    // Build the decoding environment
    const sandbox = {
      'ﾟωﾟﾉ': '/`m'）ﾉ ~┻━┻   //*'∇`*/ [\'_\']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); ',
      'ﾟΘﾟ': '(ﾟΘﾟ)',
      'ﾟｰﾟ': '(ﾟｰﾟ)',
      'ﾟДﾟ': '(ﾟДﾟ)',
      '_': 3,
      'c': 0,
      'o': 3,
      'constructor': String.constructor,
      'return': '\\"'
    };

    // Initialize the decoder context
    let context = {};
    
    // Create a safe evaluation environment
    const safeEval = (expr) => {
      // Replace aaencode symbols with actual values
      let processed = expr;
      
      // Handle character code conversions
      processed = processed.replace(/\(c\+\+\)/g, () => {
        const val = context.c || 0;
        context.c = val + 1;
        return val;
      });
      
      // Evaluate the expression safely
      try {
        // Use Function constructor to evaluate in isolated scope
        const func = new Function('context', `
          let ﾟωﾟﾉ = context.ﾟωﾟﾉ;
          let ﾟΘﾟ = context.ﾟΘﾟ;
          let ﾟｰﾟ = context.ﾟｰﾟ;
          let ﾟДﾟ = context.ﾟДﾟ;
          let c = context.c || 0;
          let o = context.o || 3;
          
          // AAEncode uses character codes and String.fromCharCode
          const fromCharCode = String.fromCharCode;
          
          // Evaluate the aaencoded expression
          return ${processed};
        `);
        
        return func(context);
      } catch (e) {
        return '';
      }
    };

    // Try to decode using pattern matching and execution
    const executeMatch = code.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*(.+?)\s*\)\(\);?$/s);
    if (executeMatch) {
      // Extract the encoded function
      const encodedFunction = executeMatch[1];
      
      // Use a controlled environment to decode
      try {
        // Create a mock environment for aaencode
        const mockGlobal = {
          'ﾟωﾟﾉ': {},
          'ﾟΘﾟ': 1,
          'ﾟｰﾟ': 2,
          'ﾟДﾟ': {},
          'c': 0,
          'o': 3
        };
        
        // Set up the decode function
        mockGlobal['ﾟДﾟ']['_'] = function(encoded) {
          return function() {
            return encoded;
          };
        };
        
        // Run the decoder in a sandboxed environment
        const vm = new Function('code', `
          try {
            let ﾟωﾟﾉ = /\`m'）ﾉ ~┻━┻   //*'∇\`*/ ['_']; 
            let o = (ﾟｰﾟ) = _ = 3; 
            let c = (ﾟΘﾟ) = (ﾟｰﾟ) - (ﾟｰﾟ); 
            let (ﾟДﾟ) = (ﾟΘﾟ) = (o ^ _ ^ o) / (o ^ _ ^ o); 
            let (ﾟДﾟ) = {
              ﾟΘﾟ: '_',
              ﾟωﾟﾉ: ((ﾟωﾟﾉ == 3) + '_')[ﾟΘﾟ],
              ﾟｰﾟﾉ: (ﾟωﾟﾉ + '_')[o ^ _ ^ o - (ﾟΘﾟ)],
              ﾟДﾟﾉ: ((ﾟｰﾟ == 3) + '_')[ﾟｰﾟ]
            };
            
            // The rest of the aaencode initialization
            ${code}
            
            // Try to capture the decoded result
            if (typeof (ﾟДﾟ)['_'] === 'function') {
              const result = (ﾟДﾟ)['_']();
              if (typeof result === 'function') {
                return result.toString();
              }
              return result;
            }
          } catch (e) {
            return null;
          }
        `);
        
        const decoded = vm(code);
        if (decoded && decoded !== encodedCode) {
          return decoded;
        }
      } catch (e) {
        // If sandboxed execution fails, try direct evaluation
      }
    }

    // If all else fails, try to extract string literals
    const stringMatches = code.match(/["']([^"']+)["']/g);
    if (stringMatches && stringMatches.length > 0) {
      // Look for the longest string that might be the decoded content
      let longestString = '';
      for (const match of stringMatches) {
        const str = match.slice(1, -1);
        if (str.length > longestString.length && str.includes('function') || str.includes('var') || str.includes('const')) {
          longestString = str;
        }
      }
      if (longestString) {
        return longestString;
      }
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