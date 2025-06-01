// plugins/aadecode.js - AAEncode Decoder Plugin (ES Module)
// Adapted from Java AADecoder (https://www.scribd.com/document/764750109/AADecoder)

const HEX_HASH_MARKER = "(oﾟｰﾟo)+ ";
const BLOCK_START_MARKER = "(ﾟДﾟ)[ﾟεﾟ]+";
// Adjusted AA_PREFIX to be more flexible with whitespace and the optional comment part
// The original Java code removes /*´∇｀*/ before checking prefix/suffix.
// We'll define a more robust regex for prefix matching.
const AA_PREFIX_REGEX = /^ﾟωﾟﾉ= \/｀ｍ´）ﾉ ~┻━┻\s*(?:\/\*´∇｀\*\/)?\s*\[\'_'\\];\s*o=\(ﾟｰﾟ\)\s*=_=3;\s*c=\(ﾟΘﾟ\)\s*=\(ﾟｰﾟ\)-\(ﾟｰﾟ\);\s*/;
const AA_SUFFIX = "(ﾟДﾟ)[ﾟoﾟ]) (ﾟΘﾟ)) ('_');";

// Mappings from AAEncode byte patterns to their numerical values (0-15)
const BYTES = [
    "(c^_^o)", // 0
    "(ﾟΘﾟ)",   // 1
    "((o^_^o) - (ﾟΘﾟ))", // 2
    "(o^_^o)", // 3
    "(ﾟｰﾟ)",   // 4
    "((ﾟｰﾟ) + (ﾟΘﾟ))", // 5
    "((o^_^o) +(o^_^o))", // 6
    "((ﾟｰﾟ) + (o^_^o))", // 7
    "((ﾟｰﾟ) + (ﾟｰﾟ))",   // 8
    "((ﾟｰﾟ) + (ﾟｰﾟ) + (ﾟΘﾟ))", // 9
    "(ﾟДﾟ) .ﾟωﾟﾉ", // 10 (A)
    "(ﾟДﾟ) .ﾟΘﾟﾉ", // 11 (B)
    "(ﾟДﾟ) ['c']", // 12 (C)
    "(ﾟДﾟ) .ﾟｰﾟﾉ", // 13 (D)
    "(ﾟДﾟ) .ﾟДﾟﾉ", // 14 (E)
    "(ﾟДﾟ) [ﾟΘﾟ]"  // 15 (F)
];

// --- Helper Functions (ported from Java) ---

/**
 * Gets a pattern match from the input string.
 * @param {string} pattern - The regex pattern.
 * @param {string} input - The string to search in.
 * @param {number} group - The capture group to return.
 * @returns {string|null} The matched group or null.
 */
function getPatternMatch(pattern, input, group) {
    // Ensure regex is treated as multiline and dotall if needed, but for single-line match, 's' flag is not essential in JS regex for '.'
    const matcher = new RegExp(pattern, 'i').exec(input); 
    if (matcher && matcher[group] !== undefined) {
        return matcher[group];
    }
    return null;
}

/**
 * Custom math expression evaluator (simplified port from Java).
 * Handles basic arithmetic ops and bitwise NOT.
 * @param {string} str - The expression string.
 * @returns {number} The evaluated number.
 * @throws {Error} On parse or unknown function error.
 */
function evalExpression(str) {
    let pos = -1, ch;

    function nextChar() {
        ch = (++pos < str.length) ? str.charCodeAt(pos) : -1;
    }

    function eat(charToEat) {
        while (ch === 32 /* space */) { // Skip spaces
            nextChar();
        }
        if (ch === charToEat) {
            nextChar();
            return true;
        }
        return false;
    }

    function parse() {
        nextChar();
        let x = parseExpression();
        if (pos < str.length) {
            throw new Error("Unexpected char: " + String.fromCharCode(ch) + " at pos " + pos + " in " + str);
        }
        return x;
    }

    // expression = term | expression `+` term | expression `-` term
    function parseExpression() {
        let x = parseTerm();
        for (; ; ) {
            if (eat('+')) {
                x += parseTerm(); // addition
            } else if (eat('-')) {
                x -= parseTerm(); // subtraction
            } else {
                return x;
            }
        }
    }

    // term = factor | term `*` factor | term `/` factor
    function parseTerm() {
        let x = parseFactor();
        for (; ; ) {
            if (eat('*')) {
                x *= parseFactor(); // multiplication
            } else if (eat('/')) {
                x /= parseFactor(); // division
            } else {
                return x;
            }
        }
    }

    // factor = `+` factor | `-` factor | `(` expression `)` | number | factor `^` factor | `~` factor
    function parseFactor() {
        if (eat('+')) {
            return parseFactor(); // unary plus
        }
        if (eat('-')) {
            return -parseFactor(); // unary minus
        }
        if (eat('~')) {
            // JavaScript bitwise NOT operates on 32-bit signed integers.
            return ~Math.floor(parseFactor()); 
        }

        let x;
        let startPos = pos;

        if (eat('(')) { // parentheses
            x = parseExpression();
            eat(')'); // Ensure matching parenthesis
        } else if ((ch >= 48 /* '0' */ && ch <= 57 /* '9' */) || ch === 46 /* '.' */) { // numbers
            while ((ch >= 48 /* '0' */ && ch <= 57 /* '9' */) || ch === 46 /* '.' */) {
                nextChar();
            }
            x = parseFloat(str.substring(startPos, pos));
        } else {
            throw new Error("Unexpected char: " + String.fromCharCode(ch) + " at pos " + pos + " in " + str);
        }

        if (eat('^')) {
            x = Math.pow(x, parseFactor()); // exponentiation
        }
        return x;
    }

    return parse();
}

/**
 * Decodes an encoded block by replacing patterns with numbers and evaluating expressions.
 * @param {string} encodedBlock - The AAEncode block.
 * @param {number} radix - The numerical base (8 or 16).
 * @returns {string} The decoded numerical string.
 * @throws {Error} On bad decoding.
 */
function decodeBlock(encodedBlock, radix) {
    let currentBlock = encodedBlock;
    for (let i = 0; i < BYTES.length; i++) {
        // Replace all occurrences of the byte pattern with its number
        // Use a global regex replacement to ensure all instances are covered
        currentBlock = currentBlock.replace(new RegExp(escapeRegExp(BYTES[i]), 'g'), String(i));
    }

    const expressions = [];
    let braceCount = 0;
    let currentExp = "";

    for (let i = 0; i < currentBlock.length; i++) {
        const c = currentBlock.charAt(i);
        if (c === '(') {
            if (currentExp.length > 0 && braceCount === 0) {
                expressions.push(currentExp);
                currentExp = "";
            }
            braceCount++;
            currentExp += c;
        } else if (c === ')') {
            braceCount--;
            currentExp += c;
        } else if (c === ' ') { // Space as a potential delimiter
            if (braceCount === 0) {
                // Java's specific delimiter heuristic: space after a '+'
                // Java code checks `i > 0 && c == ' ' && encodedBlock.charAt(i - 1) == '+'`
                // This means: if current char is space, and previous char was '+', and not inside braces.
                if (i > 0 && currentBlock.charAt(i - 1) === '+') { 
                    if (currentExp.length > 0) {
                        expressions.push(currentExp);
                        currentExp = "";
                    }
                } else { // Standard space delimiter if not that specific '+ ' case
                    if (currentExp.length > 0) {
                        expressions.push(currentExp);
                        currentExp = "";
                    }
                }
            } else {
                currentExp += c; // Space inside braces is part of expression
            }
        } else { // Any other character (including '+')
            currentExp += c;
        }
    }
    
    if (currentExp.length > 0) {
        expressions.push(currentExp);
    }

    let resultNumString = "";
    for (let expression of expressions) {
        expression = expression.trim();
        // Remove trailing '+' if it's a delimiter from Java's split logic
        if (expression.endsWith('+') && !expression.endsWith('++') && !expression.endsWith('--') && !expression.endsWith('*-') && !expression.endsWith('/-') && !expression.endsWith('^-')) { // Avoid removing if it's an operator
             expression = expression.substring(0, expression.length - 1);
        }

        if (expression.length === 0) continue; // Skip empty expressions

        let evaluatedValue;
        try {
            evaluatedValue = evalExpression(expression);
        } catch (e) {
            throw new Error(`Failed to evaluate expression '${expression}' in radix ${radix}: ${e.message}`);
        }
        
        resultNumString += Math.floor(evaluatedValue).toString(radix);
    }
    
    return resultNumString;
}

/**
 * Escapes a string for use in a regular expression.
 * @param {string} string - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


// --- Main AAEncode Decoder Function ---
const AADecode = {
    decode: function(js) {
        // Remove Java-specific /*´∇｀*/ comment marker before processing
        js = js.replace(/\/\*´∇｀\*\//g, ""); 
        
        // trim whitespace
        js = js.replace(/^\s+|\s+$/g, ""); 

        // Check if it's AAEncoded using our specific prefix/suffix
        // Use the regex for prefix matching
        const prefixMatch = js.match(AA_PREFIX_REGEX);
        if (!prefixMatch || prefixMatch.index !== 0) { // Ensure it matches at the very beginning
            throw new Error("Given code does not start with expected AAEncode prefix.");
        }
        
        // Check suffix
        if (!js.endsWith(AA_SUFFIX)) {
            throw new Error("Given code does not end with expected AAEncode suffix.");
        }

        // Extract the main data payload (between (ﾟДﾟ)[ﾟoﾟ]+ and the final character before the suffix)
        // This regex now accounts for the dynamic prefix length by finding the suffix first.
        // We need to find the part between `(ﾟДﾟ)[ﾟoﾟ]+` and `(ﾟДﾟ)[ﾟoﾟ])`
        // The `data` in Java is `js.substring(start, end)` where start is `(ﾟДﾟ)[ﾟoﾟ]+`
        // The Java code extracts `data` from `(ﾟДﾟ)[ﾟoﾟ]+ (.+?) (ﾟДﾟ)[ﾟoﾟ])`
        // So we need to find the content between the first `(ﾟДﾟ)[ﾟoﾟ]+` and the last `(ﾟДﾟ)[ﾟoﾟ])`
        
        const dataBlockStartMarker = "(ﾟДﾟ)[ﾟoﾟ]+ "; // Note the space
        const dataBlockEndMarker = "(ﾟДﾟ)[ﾟoﾟ])";

        const dataStartIndex = js.indexOf(dataBlockStartMarker);
        const dataEndIndex = js.lastIndexOf(dataBlockEndMarker);

        if (dataStartIndex === -1 || dataEndIndex === -1 || dataStartIndex >= dataEndIndex) {
            throw new Error("AAEncode data block markers not found or invalid structure.");
        }

        // Extract the raw data string that contains all the encoded blocks
        let data = js.substring(dataStartIndex + dataBlockStartMarker.length, dataEndIndex);

        let out = "";
        while (data.length > 0) {
            // Check for BLOCK_START_MARKER
            if (!data.startsWith(BLOCK_START_MARKER)) {
                throw new Error("No AAEncode block start marker found in data: " + data.substring(0, Math.min(data.length, 50)) + "...");
            }
            data = data.substring(BLOCK_START_MARKER.length);

            let encodedBlock = null;
            let nextBlockIndex = data.indexOf(BLOCK_START_MARKER);

            if (nextBlockIndex === -1) {
                encodedBlock = data; // Last block
                data = "";
            } else {
                encodedBlock = data.substring(0, nextBlockIndex);
                data = data.substring(encodedBlock.length);
            }

            let radix = 8;
            if (encodedBlock.startsWith(HEX_HASH_MARKER)) {
                encodedBlock = encodedBlock.substring(HEX_HASH_MARKER.length);
                radix = 16;
            }

            const uniCodeNumString = decodeBlock(encodedBlock, radix);
            if (uniCodeNumString.length === 0) { // isEmpty check
                throw new Error("Bad decoding for block: " + encodedBlock.substring(0, Math.min(encodedBlock.length, 50)) + "...");
            }
            
            // Convert the numerical string (e.g., "65" or "41") to its character representation
            // The Java code uses `Integer.parseInt(uniCodeNumString, radix)` to get the char code.
            // `uniCodeNumString` is the complete numerical representation for ONE character.
            out += String.fromCharCode(parseInt(uniCodeNumString, radix));
        }

        return out;
    }
};

export default AADecode.decode;
