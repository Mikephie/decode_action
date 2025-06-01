// plugins/aadecode.js - AAEncode Decoder Plugin (ES Module)

// AADecode - Decode encoded-as-aaencode JavaScript program.
// Adapted for Node.js ES Module environment.
const AADecode = {
    decode: function(text) {
        // Standard AAEncode preambles and postambles
        var evalPreamble = "(\uFF9F\u0414\uFF9F) ['_'] ( (\uFF9F\u0414\uFF9F) ['_'] (";
        var evalPostamble = ") (\uFF9F\u0398\uFF9F)) ('_');";

        // strip beginning/ending space.
        text = text.replace(/^\s*/, "").replace(/\s*$/, "");

        // returns empty text for empty input.
        if (/^\s*$/.test(text)) {
            return "";
        }

        // Attempt to strip leading multi-line comments
        let cleanedText = text.replace(/^\/\*[\s\S]*?\*\/\s*/, '');
        // console.log("AADecode Debug: Text after stripping comments (start):", cleanedText.substring(0, Math.min(cleanedText.length, 100)) + (cleanedText.length > 100 ? "..." : ""));

        // Find the actual start and end of the AAEncode block
        const preambleIndex = cleanedText.indexOf(evalPreamble);
        const postambleIndex = cleanedText.lastIndexOf(evalPostamble);

        // console.log("AADecode Debug: evalPreamble:", evalPreamble);
        // console.log("AADecode Debug: evalPostamble:", evalPostamble);
        // console.log("AADecode Debug: preambleIndex:", preambleIndex);
        // console.log("AADecode Debug: postambleIndex:", postambleIndex);

        // Check if the AAEncode structure exists and is valid
        if (preambleIndex === -1 || postambleIndex === -1 || postambleIndex < preambleIndex) {
            throw new Error("Given code is not encoded as aaencode. (Preamble or Postamble not found, or structure is invalid)");
        }

        // Replace the outermost eval/execution wrappers with return wrappers
        let modifiedScript = cleanedText;

        // This effectively changes `(function(){...})()` to `return (...)`
        modifiedScript = modifiedScript.replace(evalPreamble, "return (");
        modifiedScript = modifiedScript.replace(evalPostamble, ");");

        // console.log("AADecode Debug: Generated modifiedScript for evaluation:", modifiedScript);

        let decodedValue;
        try {
            // Node.js's vm module or direct Function constructor can be used.
            // For simple string return, Function constructor is sufficient and simpler.
            decodedValue = new Function(modifiedScript)();
            // console.log("AADecode Debug: AAEncode decodedValue type:", typeof decodedValue);
            // console.log("AADecode Debug: AAEncode decodedValue:", decodedValue);
        } catch (e) {
            throw new Error(`Execution error during AAEncode decoding: ${e.message}. Script was: ${modifiedScript.substring(0, 200)}...`);
        }

        if (typeof decodedValue !== 'string') {
            throw new Error(`AADecode did not return a string. Expected string, got ${typeof decodedValue}. Value: ${decodedValue}. This might indicate an issue or a different encoding.`);
        }
        return decodedValue;
    }
};

export default AADecode.decode;
