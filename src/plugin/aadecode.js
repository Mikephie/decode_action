// plugin/aadecode.js
// AADecode Plugin - Official implementation
// Decodes JavaScript encoded with AAEncode (Japanese emoticons)

export default function aadecode(text) {
    const evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
    const decodePreamble = "( (\uFF9F\u0414\uFF9F) ['_'] (";
    const evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";
    const decodePostamble = ") ());";
    
    // Strip beginning/ending space
    text = text.replace(/^\s*/, "").replace(/\s*$/, "");
    
    // Return original if empty
    if (/^\s*$/.test(text)) {
        return text;
    }
    
    // Check if it is encoded
    if (text.lastIndexOf(evalPreamble) < 0) {
        // Not AAEncoded, return original
        return text;
    }
    
    if (text.lastIndexOf(evalPostamble) !== text.length - evalPostamble.length) {
        // Not properly AAEncoded, return original
        return text;
    }
    
    try {
        // Replace the eval wrapper with a return wrapper
        const decodingScript = text.replace(evalPreamble, decodePreamble)
                                   .replace(evalPostamble, decodePostamble);
        
        // Evaluate and return the decoded result
        return eval(decodingScript);
    } catch (e) {
        console.warn('AADecode evaluation failed:', e.message);
        // Return original text if decoding fails
        return text;
    }
}
