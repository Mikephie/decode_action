// plugins/aadecode.js - AAEncode Decoder Plugin (ES Module)
// Adapted from Java AADecoder (https://github.com/madushan1000/jdtrunk/blob/00b2e9b3b18124ed39ece74b24afe6f08007b23f/src/org/jdownloader/encoding/AADecoder.java)

const HEX_HASH_MARKER = "(oﾟｰﾟo)+ ";
const BLOCK_START_MARKER = "(ﾟДﾟ)[ﾟεﾟ]+";
const AA_PREFIX = "ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻   //*´∇｀*/ ['_']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); ";
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
    const matcher = new RegExp(pattern, 'i').exec(input); // 'i' for CASE_INSENSITIVE, 's' for DOTALL (handled by regex engine default/node: ^[\s\S]$)
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
        currentBlock = currentBlock.split(BYTES[i]).join(String(i));
    }

    const expressions = [];
    let braceCount = 0;
    let currentExp = "";

    for (let i = 0; i < currentBlock.length; i++) {
        const c = currentBlock.charAt(i);
        if (c === '(') {
            if (currentExp.length > 0 && braceCount === 0) {
                // If we encounter an opening brace and we are at the top level,
                // and we have a non-empty expression, add it.
                expressions.push(currentExp);
                currentExp = "";
            }
            braceCount++;
            currentExp += c;
        } else if (c === ')') {
            braceCount--;
            currentExp += c;
        } else if (c === ' ') {
            // Space as a delimiter (only when braceCount is 0, indicating end of top-level expression)
            if (braceCount === 0) {
                if (currentExp.length > 0) {
                    expressions.push(currentExp);
                    currentExp = "";
                }
            } else {
                currentExp += c; // Inside braces, spaces are part of the expression
            }
        } else if (c === '+') { // Handle plus as a potential delimiter
            currentExp += c;
            // If braceCount is 0 and the next char is not a space, it might be a block end if followed by space.
            // Or if it's the end of a block.
            if (braceCount === 0 && (i + 1 < currentBlock.length && currentBlock.charAt(i + 1) === ' ')) {
                // This is a heuristic adapted from Java, sometimes '+' followed by space delimits.
                // We'll let the expression parsing handle it mostly.
            }
        } else {
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
        if (expression.endsWith('+') && !expression.endsWith('++')) { // Avoid removing '++'
            expression = expression.substring(0, expression.length - 1);
        }

        if (expression.length === 0) continue; // Skip empty expressions

        let evaluatedValue;
        try {
            evaluatedValue = evalExpression(expression); // Use our custom eval
        } catch (e) {
            throw new Error(`Failed to evaluate expression '${expression}': ${e.message}`);
        }
        
        // Convert the evaluated number to a string in the specified radix
        // This is typically the number that forms the character code.
        resultNumString += Math.floor(evaluatedValue).toString(radix);
    }
    
    return resultNumString;
}


// --- Main AAEncode Decoder Function ---
const AADecode = {
    decode: function(js) {
        // Remove Java-specific /*´∇｀*/ comment marker
        js = js.replace(/\/\*´∇｀\*\//g, ""); // Use global regex to remove all occurrences
        
        // trim whitespace
        js = js.replace(/^\s+|\s+$/g, ""); // Use global regex for full trim

        // Check if it's AAEncoded using our specific prefix/suffix
        if (!js.startsWith(AA_PREFIX)) {
            throw new Error("Given code does not start with expected AAEncode prefix.");
        }
        if (!js.endsWith(AA_SUFFIX)) {
            throw new Error("Given code does not end with expected AAEncode suffix.");
        }

        // Extract the main data payload (between (ﾟДﾟ)[ﾟoﾟ]+ and the final character before the suffix)
        // Regex: literal `(ﾟДﾟ)[ﾟoﾟ]+ ` (escaped in regex), then capture everything `(.+)`, then literal `(ﾟДﾟ)[ﾟoﾟ])`
        const dataMatchPattern = "\\(ﾟДﾟ\\)\\[ﾟoﾟ\\]\\+ (.+?)\\(ﾟДﾟ\\)\\[ﾟoﾟ\\]\\)";
        let data = getPatternMatch(dataMatchPattern, js, 1);

        if (!data) {
            throw new Error("AAEncode data block not found within the expected pattern.");
        }

        let out = "";
        while (data.length > 0) {
            // Check for BLOCK_START_MARKER
            if (!data.startsWith(BLOCK_START_MARKER)) {
                throw new Error("No AAEncode block start marker found: " + data.substring(0, 50) + "...");
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
                throw new Error("Bad decoding for block: " + encodedBlock.substring(0, 50) + "...");
            }
            
            // Convert the numerical string (e.g., "65" or "41") to its character representation
            // We need to parse it as an integer from the accumulated uniCodeNumString in base `radix`.
            // The Java code builds `uniCodeNumString` across *multiple* expressions within a block,
            // so we need to ensure this character conversion logic is correct.
            // The Java `Integer.parseInt(uniCodeNumString, radix)` is critical.
            // It suggests `uniCodeNumString` for *each character* is produced by `decodeBlock`.
            // Re-reading Java: `out += Character.toString((char) Integer.parseInt(uniCodeNumString, radix));`
            // This means `decodeBlock` returns a single character's numerical string representation.

            // The issue is that decodeBlock currently returns the *concatenated* numerical string for the block.
            // Let's adjust decodeBlock to return an array of number strings or parse it differently.
            // For now, we'll assume decodeBlock returns a string of concatenated hex/octal digits.
            // We need to parse these digits into characters. This is the role of AADecode2 after all.

            // Let's ensure decodeBlock returns the actual number, and then convert to char.
            // Re-evaluating `decodeBlock` output from Java: `ret += Integer.toString((int) eval(expression), radix);`
            // This means each expression corresponds to a *digit* in the Unicode char.
            // No, `uniCodeNumString` is the *concatenated string* of digits for one *character*.
            // Example: `uniCodeNumString = "123"` (octal), then `(char)Integer.parseInt("123", 8)`.

            // This means `decodeBlock` should output the complete numerical string for ONE character.
            // Let's make decodeBlock return the parsed int value, and then convert to char.
            // NO, `decodeBlock` is correct in returning the `ret` string like "41" for 'A' (hex).
            // The actual character conversion happens here: `Character.toString((char) Integer.parseInt(uniCodeNumString, radix))`
            out += String.fromCharCode(parseInt(uniCodeNumString, radix));

            // console.log("AADecode Debug: Decoded char: " + out[out.length - 1]);
        }

        return out;
    }
};

export default AADecode.decode;
