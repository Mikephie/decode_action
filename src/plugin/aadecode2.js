// plugin/aadecode2.js
// AADecode2 Plugin - Alternative implementation with pattern matching
// Handles edge cases and variations of AAEncode

export default function aadecode2(text) {
    // Check if text contains AAEncode emoticons
    if (!text.includes('ﾟωﾟﾉ') && !text.includes('ﾟДﾟ') && !text.includes('ﾟΘﾟ')) {
        return text; // Not AAEncoded
    }
    
    try {
        // Method 1: Try to capture output from alert/console.log/document.write
        let capturedOutput = '';
        
        // Create a safe execution environment
        const sandbox = {
            alert: (msg) => { capturedOutput = String(msg); },
            console: { log: (msg) => { capturedOutput = String(msg); } },
            document: { write: (msg) => { capturedOutput = String(msg); } },
            window: {},
            global: {}
        };
        
        // Wrap the code to execute in sandbox context
        const wrappedCode = `
            (function() {
                let alert = (msg) => { return msg; };
                let console = { log: (msg) => { return msg; } };
                let document = { write: (msg) => { return msg; } };
                
                try {
                    ${text}
                } catch(e) {
                    // Ignore execution errors
                }
                
                return typeof capturedOutput !== 'undefined' ? capturedOutput : '';
            })()
        `;
        
        // Try to execute and capture output
        const func = new Function('capturedOutput', wrappedCode);
        const result = func(capturedOutput);
        
        if (result && typeof result === 'string' && result.trim()) {
            return result;
        }
        
        // Method 2: Pattern extraction for encoded strings
        // Look for patterns like \xxx (octal encoded characters)
        const octalPattern = /\\(\d{1,3})/g;
        const matches = text.match(octalPattern);
        
        if (matches && matches.length > 10) {
            // Try to decode octal values
            let decoded = '';
            matches.forEach(match => {
                const octalValue = parseInt(match.slice(1), 8);
                if (octalValue >= 32 && octalValue <= 126) {
                    decoded += String.fromCharCode(octalValue);
                }
            });
            
            if (decoded.length > 5) {
                return decoded;
            }
        }
        
        // Method 3: Look for string literals that might be the decoded content
        const stringPattern = /["']([^"']{10,})["']/g;
        let stringMatch;
        const possibleDecodedStrings = [];
        
        while ((stringMatch = stringPattern.exec(text)) !== null) {
            const content = stringMatch[1];
            // Check if it's not emoticon-based
            if (!content.includes('ﾟ') && /[a-zA-Z]/.test(content)) {
                possibleDecodedStrings.push(content);
            }
        }
        
        if (possibleDecodedStrings.length > 0) {
            // Return the longest non-emoticon string found
            return possibleDecodedStrings.reduce((a, b) => a.length > b.length ? a : b);
        }
        
        // If all methods fail, return original
        return text;
        
    } catch (error) {
        console.warn('AADecode2 processing error:', error.message);
        return text;
    }
}
