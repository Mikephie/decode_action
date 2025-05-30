function executeFullAADecode(encodedText) {
  // This function sets up all the required AA variables and executes the code
  // in a controlled environment to capture the result
  
  let capturedOutput = '';
  
  const sandbox = `
    (function() {
      // Set up the initial AA environment
      var ﾟωﾟﾉ = /｀ｍ'）ﾉ ~┻━┻ //*'∇｀*/ ['_'];
      var o = _ﾟωﾟﾉo = (o^_^o) = (ﾟΘﾟ) = (^_^o) = ｡*ﾟ = '3';
      var c = (o^_^o) - (ﾟΘﾟ);
      var ﾟДﾟ = ((o^_^o) == (o^_^o)) ? (o^_^o)/(o^_^o) : (ﾟｰﾟ) = (o^_^o)-(ﾟΘﾟ);
      var ﾟДﾉﾟ = ((ﾟДﾟ) + (ﾟДﾟ)-(ﾟΘﾟ));
      var ﾟεﾟ = (ﾟΘﾟ)+(ﾟДﾉﾟ);
      var ﾟｰﾟ = (ﾟДﾟ)+(ﾟΘﾟ);
      var ﾟДﾟ = (o^_^o) * (o^_^o);
      var ﾟoﾟ = '\\\\';
      var ﾟεﾟﾉ = '/';
      
      // Define AA objects
      (ﾟДﾟ) = {
        ﾟΘﾟ: '1',
        ﾟωﾟﾉ: ((ﾟωﾟﾉ==3) +'_') [ﾟΘﾟ],
        ﾟｰﾟﾉ: (ﾟωﾟﾉ + '_')[o^_^o -(ﾟΘﾟ)],
        ﾟДﾟﾉ: ((ﾟｰﾟ==3) +'_')[ﾟｰﾟ]
      };
      
      (ﾟДﾟ)[ﾟΘﾟ] = ((ﾟωﾟﾉ==3) +'_') [c^_^o];
      (ﾟДﾟ)['c'] = ((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ) ];
      (ﾟДﾟ)['o'] = ((ﾟДﾟ)+'_') [ﾟΘﾟ];
      
      // Create decoding function
      (ﾟoﾟ) = (ﾟДﾟ)['c']+(ﾟДﾟ)['o']+(ﾟωﾟﾉ +'_')[ﾟΘﾟ]+ ((ﾟωﾟﾉ==3) +'_') [ﾟｰﾟ] + ((ﾟДﾟ) +'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ ((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+((ﾟｰﾟ==3) +'_') [(ﾟｰﾟ) - (ﾟΘﾟ)]+(ﾟДﾟ)['c']+((ﾟДﾟ)+'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ (ﾟДﾟ)['o']+((ﾟｰﾟ==3) +'_') [ﾟΘﾟ];
      
      // Set up capture functions
      var capturedOutput = '';
      var alert = function(msg) { capturedOutput = msg; return msg; };
      var console = { 
        log: function(msg) { capturedOutput = msg; return msg; },
        error: function() {},
        warn: function() {}
      };
      
      // Execute the aaencoded script
      try {
        ${encodedText}
        return capturedOutput;
      } catch(e) {
        console.log('Execution error:', e);
        return '';
      }
    })();
  `;
  
  try {
    // Use Function constructor for safer eval
    const func = new Function(sandbox);
    return func();
  } catch (e) {
    console.log('AADecode: Full execution failed:', e);
    throw e;
  }
}/**
 * AADecode Plugin - Decodes JavaScript obfuscated with aaencode
 * 
 * This plugin combines robust detection with efficient decoding methods
 * to handle various forms of aaencoded JavaScript.
 */

function aadecode(sourceCode) {
  // Quick check for AA encoding characteristics
  if (!hasAAEncodeCharacteristics(sourceCode)) {
    console.log('AADecode: Not aaencoded, skipping...');
    return sourceCode;
  }

  console.log('AADecode: Detected aaencode, starting decoding...');
  
  try {
    // Extract the encoded content
    const aaencodedContent = extractAAEncodedContent(sourceCode);
    if (!aaencodedContent) {
      console.log('AADecode: Failed to extract aaencoded content');
      return sourceCode;
    }
    
    console.log('AADecode: Extracted content of length:', aaencodedContent.length);
    
    // Try the most reliable full execution method first
    try {
      console.log('AADecode: Trying full execution method...');
      const decoded = executeFullAADecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Full execution successful');
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Full execution failed:', e.message);
    }
    
    // Try direct decode method next
    try {
      console.log('AADecode: Trying direct decode method...');
      const decoded = directDecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Direct decode successful');
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Direct decode failed:', e.message);
    }
    
    // Try fallback methods if previous methods fail
    try {
      console.log('AADecode: Trying fallback decode method...');
      const decoded = fallbackDecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Fallback decode successful');
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Fallback decode failed:', e.message);
    }
    
    // Try pattern extraction as last resort
    try {
      console.log('AADecode: Trying pattern extraction method...');
      const decoded = patternExtractDecode(aaencodedContent);
      if (decoded && isValidResult(decoded)) {
        console.log('AADecode: Pattern extraction successful');
        return decoded;
      }
    } catch (e) {
      console.log('AADecode: Pattern extraction failed:', e.message);
    }
    
    console.log('AADecode: All decoding methods failed');
    return sourceCode;
  } catch (error) {
    console.error('AADecode: Plugin error:', error);
    return sourceCode;
  }
}

function hasAAEncodeCharacteristics(code) {
  // Check for aaencode signatures
  const signatures = [
    /ﾟωﾟﾉ\s*=\s*\/｀ｍ'）ﾉ\s*~┻━┻/, // Core pattern
    /\(ﾟДﾟ\)\['_'\]/, // Common structure
    /\(c\^_\^o\)/, // Character codes
    /\(o\^_\^o\)/ // Character codes
  ];
  
  for (const pattern of signatures) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // Check for high density of AA characters
  const aaChars = ['ﾟωﾟ', 'ﾟΘﾟ', 'ﾟｰﾟ', 'ﾟДﾟ', '┻━┻', '^_^'];
  let charCount = 0;
  
  for (const char of aaChars) {
    if (code.includes(char)) {
      charCount++;
    }
  }
  
  // If we have at least 3 characteristic AA patterns, it's likely aaencoded
  return charCount >= 3;
}

function extractAAEncodedContent(sourceCode) {
  // Look for the complete encoded block
  const fullMatch = sourceCode.match(/ﾟωﾟﾉ[\s\S]+?\)\s*\(\s*['"]_['"]\s*\)\s*;/);
  if (fullMatch) {
    return fullMatch[0];
  }
  
  // Look for the pattern in a string assignment
  const stringMatch = sourceCode.match(/["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/);
  if (stringMatch) {
    return stringMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // Try to extract from variable assignment
  const varMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*["']([^"']*ﾟωﾟﾉ[\s\S]*?[^"']*)["']/);
  if (varMatch) {
    return varMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  
  // If we can't find a well-defined block, return the whole source
  return sourceCode;
}

function directDecode(encodedText) {
  // Based on the second implementation approach
  var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
  var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
  var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
  var decodePostamble = ") ());";

  // Strip beginning/ending space
  encodedText = encodedText.replace(/^\s*/, "").replace(/\s*$/, "");

  // Check if it matches the expected pattern
  const hasEvalPattern = encodedText.includes(evalPreamble) && 
                         encodedText.includes(evalPostamble);
  
  if (!hasEvalPattern) {
    // If not matching the specific pattern, try a full execution approach
    return executeFullAADecode(encodedText);
  }

  // Replace the eval pattern with a decode pattern
  var decodingScript = encodedText.replace(evalPreamble, decodePreamble)
                               .replace(evalPostamble, decodePostamble);
  
  // Use a safer approach to evaluate
  try {
    return evaluateSafely(decodingScript);
  } catch (e) {
    // If pattern replacement fails, try full execution
    return executeFullAADecode(encodedText);
  }
}

function fallbackDecode(encodedText) {
  // Create a more complete environment with AA-specific variables
  try {
    // Try the most complete approach first
    const fullResult = executeFullAADecode(encodedText);
    if (fullResult && fullResult !== '') {
      return fullResult;
    }
    
    // If that fails, try a simpler sandbox
    const sandbox = `
      (function() {
        // Set up basic AA environment
        var ﾟωﾟﾉ = /｀ｍ'）ﾉ ~┻━┻ //*'∇｀*/ ['_'];
        var ﾟΘﾟ = '1';
        var ﾟｰﾟ = '2';
        var ﾟДﾟ = '3';
        var o = '3';
        var c = '0';
        
        // Capture function outputs
        var capturedOutput = '';
        var alert = function(msg) { capturedOutput = msg; return msg; };
        var console = { 
          log: function(msg) { capturedOutput = msg; return msg; },
          error: function() {},
          warn: function() {}
        };
        
        // Try each decoding pattern
        try {
          // Look for the common alert pattern
          var match = ${JSON.stringify(encodedText)}.match(/alert\\s*\\(\\s*["']([^"']+)["']\\s*\\)/);
          if (match) {
            return match[1];
          }
          
          // Execute and see if we get a result
          ${encodedText}
          return capturedOutput;
        } catch(e) {
          // Try extracting from the pattern
          try {
            var pattern = ${JSON.stringify(encodedText)}.match(/\\(ﾟДﾟ\\)\\['_'\\]\\s*\\(\\s*\\(ﾟДﾟ\\)\\['_'\\]\\s*\\((.+?)\\)\\s*\\(ﾟΘﾟ\\)\\s*\\)\\s*\\('_'\\)/);
            if (pattern) {
              return "Potential hidden message in aaencode pattern: " + pattern[1];
            }
          } catch(e2) {}
          
          return '';
        }
      })();
    `;
    
    // Use Function constructor for safer eval
    const func = new Function(sandbox);
    const result = func();
    
    return result || '';
  } catch (e) {
    console.log('AADecode: Fallback decode error:', e);
    return '';
  }
}

function patternExtractDecode(encodedText) {
  // Try to extract from alert pattern
  const alertMatch = encodedText.match(/alert\s*\(\s*["']([^"']+)["']\s*\)/);
  if (alertMatch) {
    return alertMatch[1];
  }
  
  // Look for strings in the pattern
  const stringMatch = encodedText.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\((.+?)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
  if (!stringMatch) {
    return null;
  }
  
  // Try to manually decode character codes
  const encoded = stringMatch[1];
  const charCodes = [];
  
  // Extract character codes based on common patterns
  const codeChunks = encoded.split('+');
  for (const chunk of codeChunks) {
    const trimmed = chunk.trim();
    
    // Map common patterns to character codes
    if (trimmed.includes('(ﾟΘﾟ)')) {
      charCodes.push(1); // Typically 1
    } else if (trimmed.includes('(ﾟｰﾟ)')) {
      charCodes.push(2); // Typically 2
    } else if (trimmed.includes('(o^_^o)')) {
      charCodes.push(3); // Typically 3
    } else if (trimmed.includes('(c^_^o)')) {
      charCodes.push(0); // Typically 0
    } else {
      // Try to evaluate numeric expressions
      try {
        const normalized = trimmed
          .replace(/\(ﾟΘﾟ\)/g, '1')
          .replace(/\(ﾟｰﾟ\)/g, '2')
          .replace(/\(o\^_\^o\)/g, '3')
          .replace(/\(c\^_\^o\)/g, '0');
          
        const evaluated = eval(normalized);
        if (typeof evaluated === 'number') {
          charCodes.push(evaluated);
        }
      } catch (e) {
        // Skip if we can't evaluate
      }
    }
  }
  
  // Convert character codes to string
  return charCodes.map(code => String.fromCharCode(code)).join('');
}

function evaluateSafely(code) {
  // Create a sandbox to capture alert or console.log output
  let capturedOutput = '';
  
  // Save original functions
  const originalAlert = global.alert;
  const originalConsoleLog = console.log;
  
  // Override with capturing functions
  global.alert = function(msg) { 
    capturedOutput = msg;
    return msg;
  };
  
  console.log = function(msg) {
    capturedOutput = msg;
    return msg;
  };
  
  try {
    // Evaluate the code
    const result = eval(code);
    
    // Prefer captured output if available, otherwise return eval result
    return capturedOutput || result;
  } catch (e) {
    throw e;
  } finally {
    // Restore original functions
    global.alert = originalAlert;
    console.log = originalConsoleLog;
  }
}

function isValidResult(result) {
  if (!result || typeof result !== 'string') {
    return false;
  }
  
  // Check for valid JS structure or meaningful output
  return (
    // No remaining AA encode characters
    !result.includes('ﾟωﾟ') && 
    !result.includes('ﾟДﾟ') &&
    
    // Has some valid JS structure
    (
      result.includes('function') || 
      result.includes('var ') || 
      result.includes('let ') || 
      result.includes('const ') ||
      result.includes('return') ||
      result.includes('alert(') ||
      result.includes('console.log(')
    )
  );
}

// Export the plugin function
export default function PluginAAdecode(sourceCode) {
  return aadecode(sourceCode);
}