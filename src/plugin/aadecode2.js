// plugins/aadecode2.js - Octal/Unicode Escape Decoder Plugin (ES Module)

const AADecode2 = {
    decode: function(text) {
        let changed = false;
        // Regex to find double-quoted string literals that might contain escapes.
        // It specifically looks for backslashes within the string that are part of escape sequences.
        // This is more robust than just looking for any backslash.
        const escapedStringRegex = /"(?:[^"\\]|\\.)*?\\(?:[0-7]{1,3}|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\}|[\s\S])(?:[^"\\]|\\.)*?"/g;

        let newText = text;
        let match;
        let replacements = []; // Store replacements to avoid issues with exec() and string modification

        // Collect all matches and their unescaped versions
        while ((match = escapedStringRegex.exec(newText)) !== null) {
            const fullMatch = match[0]; // The entire matched string literal, e.g., "\166\141\162"
            try {
                // JSON.parse is the most reliable way to unescape JavaScript string literals.
                // It handles octal, hex, unicode, and standard escapes correctly.
                const unescaped = JSON.parse(fullMatch);
                // Store the replacement: original string and its unescaped, re-quoted version
                replacements.push({ original: fullMatch, replacement: JSON.stringify(unescaped) });
                changed = true;
                // console.log(`AADecode2 Debug: Unescaped string literal: ${fullMatch} -> ${JSON.stringify(unescaped)}`);
            } catch (e) {
                // console.warn(`AADecode2 Warning: Failed to JSON.parse string literal '${fullMatch}': ${e.message}`);
                // Fallback to direct Function evaluation for complex cases if JSON.parse fails
                try {
                    const fallbackUnescaped = new Function(`return ${fullMatch}`)();
                    if (typeof fallbackUnescaped === 'string') {
                        replacements.push({ original: fullMatch, replacement: JSON.stringify(fallbackUnescaped) });
                        changed = true;
                        // console.log(`AADecode2 Debug: Fallback unescape successful for '${fullMatch}'.`);
                    }
                } catch (fallbackE) {
                    // console.warn(`AADecode2 Warning: Fallback unescape also failed for '${fullMatch}': ${fallbackE.message}`);
                }
            }
        }

        // Apply all replacements. Iterate backwards to avoid index issues if replacements overlap
        // or affect indices of subsequent matches (though regex.exec handles this by moving lastIndex).
        // A simpler approach for multiple non-overlapping replacements is fine.
        for (const rep of replacements) {
            // Use a global regex to replace all occurrences of this specific original string
            // This assumes the original string literal is unique enough not to replace other parts of code.
            // For true robustness, an AST-based approach would be better.
            newText = newText.split(rep.original).join(rep.replacement);
        }


        // After unescaping all string literals, check if the entire text is now a simple `return "..."`
        // If so, and it was previously an escaped string, we can extract the inner content.
        const finalReturnMatch = newText.match(/^return\s*("((?:[^"\\]|\\.)*)")\s*;?$/s);
        if (finalReturnMatch && finalReturnMatch[1]) {
            try {
                const finalUnescaped = JSON.parse(finalReturnMatch[1]);
                if (typeof finalUnescaped === 'string') {
                    // console.log("AADecode2 Debug: Final return statement unescaped.");
                    return finalUnescaped;
                }
            } catch (e) {
                // console.warn(`AADecode2 Warning: Failed to JSON.parse final return string: ${e.message}`);
            }
        }

        if (changed) {
            return newText;
        }
        return text; // No change if no escaped strings were found or unescaped successfully
    }
};

export default AADecode2.decode;
