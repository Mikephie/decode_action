function executeFullAADecode(encodedText) {
  // This function sets up all the required AA variables and executes the code
  // in a controlled environment to capture the result
  
  try {
    // Try a direct string extraction approach first
    const alertMatch = encodedText.match(/alert\s*\(\s*['"]([^'"]+)['"]\s*\)/);
    if (alertMatch) {
      return alertMatch[1];
    }
    
    // Handle common pattern where alert or console.log is the payload
    const evalMatch = encodedText.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
    if (evalMatch) {
      // This is a common AA pattern - try to extract the payload directly
      return "Extracted content from AA pattern: " + evalMatch[1];
    }
    
    // Safe execution wrapper to avoid syntax errors
    const sandbox = `
      try {
        // Define core AA variables
        var ﾟωﾟﾉ = /｀ｍ'）ﾉ ~┻━┻ //*'∇｀*/ ['_'];
        var _ﾟωﾟﾉo = 3;
        var o = 3;
        var c = 0;
        var ﾟΘﾟ = 1;
        var ﾟｰﾟ = 2;
        var ﾟДﾟ = 3;
        var ﾟεﾟ = 4;
        
        // Define AA objects with safe methods
        ﾟДﾟ = {'ﾟΘﾟ': '1', 'ﾟωﾟ': '2', 'ﾟДﾟﾉ': '3', 'c': 'c', 'o': 'o', '_': '_'};
        ﾟДﾟ['_'] = function(x) { return x; };
        
        // Capture function
        var output = '';
        function alert(x) { output = x; return x; }
        function console_log(x) { output = x; return x; }
        
        // Replace problematic expressions
        var code = \`${encodedText.replace(/\\/g, '\\\\').replace(/\`/g, '\\`')}\`;
        
        // Sanitize the code - replace known problematic patterns
        code = code.replace(/ﾟωﾟﾉ\\s*=\\s*\\/｀ｍ'）ﾉ\\s*~┻━┻/g, 'ﾟωﾟﾉ = /｀ｍ'）ﾉ ~┻━┻');
        code = code.replace(/\\(o\\^_\\^o\\)\\s*=\\s*\\(o\\^_\\^o\\)\\s*\\/\\s*\\(o\\^_\\^o\\)/g, '(o^_^o) = 1');
        code = code.replace(/\\(ﾟДﾟ\\)\\s*=\\s*\\(\\(o\\^_\\^o\\)\\s*==\\s*\\(o\\^_\\^o\\)\\)/g, '(ﾟДﾟ) = true');
        
        // Execute with alert capture
        eval(code);
        
        return output || "Successful execution but no output captured";
      } catch(e) {
        return "Error: " + e.message;
      }
    `;
    
    // Execute in a safer way
    const result = new Function('return ' + sandbox)();
    
    // If we got a valid result, return it
    if (result && typeof result === 'string' && !result.startsWith('Error:')) {
      return result;
    }
    
    throw new Error(result || "Execution failed");
  } catch (e) {
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
  try {
    // First try the clean approach from the second implementation
    var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    var decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    var decodePostamble = ") ());";

    // Strip beginning/ending space
    const cleanedText = encodedText.replace(/^\s*/, "").replace(/\s*$/, "");

    // Check if it matches the expected pattern
    const hasEvalPattern = cleanedText.includes(evalPreamble) && 
                           cleanedText.includes(evalPostamble);
    
    if (hasEvalPattern) {
      // Replace the eval pattern with a decode pattern
      var decodingScript = cleanedText.replace(evalPreamble, decodePreamble)
                                   .replace(evalPostamble, decodePostamble);
      
      try {
        // Try a direct eval with careful execution
        const result = evalSafely(decodingScript);
        if (result && typeof result === 'string') {
          return result;
        }
      } catch (e) {
        console.log("Direct eval failed:", e.message);
      }
    }
    
    // Try to find and extract the eval section
    const evalSectionMatch = encodedText.match(/\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/);
    if (evalSectionMatch) {
      return "Eval section found: " + evalSectionMatch[1];
    }
    
    // Try a safer string extraction approach
    const stringMatch = encodedText.match(/['"]([^'"]+)['"]/);
    if (stringMatch && stringMatch[1].length > 10) {
      return stringMatch[1];
    }
    
    // Try direct pattern search for common outputs
    const alertMatch = encodedText.match(/alert\s*\(\s*['"]([^'"]+)['"]\s*\)/);
    if (alertMatch) {
      return alertMatch[1];
    }
    
    // If all else fails, try the full execution
    return executeFullAADecode(encodedText);
  } catch (e) {
    console.log("Error in directDecode:", e.message);
    // If pattern replacement fails, try full execution
    return executeFullAADecode(encodedText);
  }
}

function evalSafely(code) {
  try {
    // Create a safer evaluation context
    const sandbox = `
      try {
        var result = '';
        var alert = function(msg) { result = msg; return msg; };
        var console = { 
          log: function(msg) { result = msg; return msg; },
          error: function() {},
          warn: function() {}
        };
        
        ${code}
        
        return result;
      } catch(e) {
        return "Error: " + e.message;
      }
    `;
    
    return new Function('return ' + sandbox)();
  } catch (e) {
    throw e;
  }
}

function fallbackDecode(encodedText) {
  // Try a direct string extraction approach first
  const stringMatch = encodedText.match(/["']([^"']{10,})["']/);
  if (stringMatch) {
    return stringMatch[1];
  }
  
  try {
    // Try a completely different approach using regex to find the payload
    const stringPatterns = [
      /alert\s*\(\s*["']([^"']+)["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']+)["']\s*\)/,
      /document\.write\s*\(\s*["']([^"']+)["']\s*\)/,
      /["']([^"']{10,})["']/
    ];
    
    for (const pattern of stringPatterns) {
      const match = encodedText.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // Try a simpler sandbox with just string extraction
    const sandbox = `
      (function() {
        // Just try to extract strings
        var matches = [];
        var code = ${JSON.stringify(encodedText)};
        
        // Find all strings
        var stringMatches = code.match(/["']([^"']{5,})["']/g) || [];
        
        // Find the longest string (usually the payload)
        var longestString = '';
        for (var i = 0; i < stringMatches.length; i++) {
          var str = stringMatches[i].slice(1, -1); // Remove quotes
          if (str.length > longestString.length) {
            longestString = str;
          }
        }
        
        if (longestString) {
          return longestString;
        }
        
        // If no strings found, look for character codes
        var charCodeMatches = code.match(/String\\.fromCharCode\\(([^)]+)\\)/g) || [];
        if (charCodeMatches.length) {
          return "Found character codes: " + charCodeMatches[0];
        }
        
        return "";
      })();
    `;
    
    try {
      const result = new Function('return ' + sandbox)();
      if (result && result.length > 0) {
        return result;
      }
    } catch (e) {
      console.log("Fallback sandbox error:", e.message);
    }
    
    // Try the simplest approach with a clean slate
    try {
      // Simply extract any suspicious looking content
      const aaPatterns = [
        // Look for common payload markers
        /\(ﾟДﾟ\)\['_'\]\s*\(\s*\(ﾟДﾟ\)\['_'\]\s*\(([^)]+)\)\s*\(ﾟΘﾟ\)\s*\)\s*\('_'\)/,
        // Look for character codes
        /String\.fromCharCode\(([^)]+)\)/,
        // Look for any eval
        /eval\s*\(\s*(['"])([^'"]*)['"]\s*\)/
      ];
      
      for (const pattern of aaPatterns) {
        const match = encodedText.match(pattern);
        if (match && match[1]) {
          return "Extracted pattern content: " + match[1];
        }
      }
      
      return "No decodable content found";
    } catch (e) {
      console.log("Simple pattern extraction error:", e.message);
      return "";
    }
  } catch (e) {
    console.log("Fallback decode error:", e);
    return "";
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
  
  // Accept any result that doesn't have AA encoding characters
  const hasAAChars = /ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ|o\^_\^o|c\^_\^o/.test(result);
  
  // Accept any result that looks like it contains meaningful content
  const hasContent = result.length > 5 && 
                     !/^Error:/.test(result) && 
                     !/^Extracted pattern content:/.test(result) &&
                     !/^No decodable content found$/.test(result);
  
  return !hasAAChars && hasContent;
}

// Export the plugin function
export default function PluginAAdecode(sourceCode) {
  // Additional direct string extraction before plugin logic
  try {
    // For common cases, try direct string extraction first
    const directPatterns = [
      /alert\s*\(\s*["']([^"']{5,})["']\s*\)/,
      /console\.log\s*\(\s*["']([^"']{5,})["']\s*\)/,
      /["']([^"']{20,})["']/  // Long strings are often the payload
    ];
    
    for (const pattern of directPatterns) {
      const match = sourceCode.match(pattern);
      if (match && match[1] && match[1].length > 5) {
        console.log('AADecode: Direct string extraction successful');
        return match[1];
      }
    }
  } catch (e) {
    console.log('AADecode: Direct extraction failed, continuing with full decode');
  }
  
  return aadecode(sourceCode);
}