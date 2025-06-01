// plugins/aadecode.js - AAEncode Decoder Plugin (ES Module)

import vm from 'vm'; // Add this import for sandboxing

const AADecode = {
    decode: function(text) {
        // AAEncode typically defines variables like ﾟДﾟ, ﾟωﾟﾉ, etc., which are then used
        // to construct and execute the final string.
        // We need to capture the string that would be executed, not just let it run.

        // strip beginning/ending space.
        text = text.replace(/^\s*/, "").replace(/\s*$/, "");
        if (/^\s*$/.test(text)) {
            return "";
        }

        // Attempt to strip leading multi-line comments (assuming they are at the very beginning)
        let cleanedText = text.replace(/^\/\*[\s\S]*?\*\/\s*/, '');
        // console.log("AADecode Debug: Text after stripping comments (start):", cleanedText.substring(0, Math.min(cleanedText.length, 100)) + (cleanedText.length > 100 ? "..." : ""));

        // Check if it looks like an AAEncode structure for full execution interception.
        // This is a heuristic based on the user's provided sample, which includes initial var defs.
        const aaencodeIndicator = "ﾟωﾟﾉ="; // Common start for this AAEncode variant's definitions
        const aaencodeEndIndicator = ") ('_');"; // Common end for the outermost execution

        if (!cleanedText.startsWith(aaencodeIndicator) || !cleanedText.endsWith(aaencodeEndIndicator)) {
            // If it doesn't match this variant's start/end, it's not the AAEncode type this decoder handles.
            // Throw an error so other plugins can try, or the main script knows it's not AAEncode.
            throw new Error("Given code is not recognized as the specific AAEncode variant for full execution interception.");
        }

        let capturedCode = null;

        // Create a new VM context to run the obfuscated code in isolation
        // and to intercept 'eval' and 'Function' calls.
        const context = vm.createContext({
            // Mock common global objects if the code expects them (optional but good for robustness)
            console: { 
                log: (...args) => { /* console.log('SANDBOX_LOG:', ...args); */ },
                warn: (...args) => { /* console.warn('SANDBOX_WARN:', ...args); */ },
                error: (...args) => { /* console.error('SANDBOX_ERROR:', ...args); */ }
            },
            window: {}, // Mock window object for browser-like environments
            document: {}, // Mock document object
            // Add mock for $response and $done for QuantumultX/Surge scripts
            $response: {
                body: '{}' // Provide a dummy JSON body to prevent JSON.parse errors
            },
            $done: (obj) => {
                // If $done is called, it usually means the script finished its work.
                // We might capture the final body if it's relevant, but for deobfuscation,
                // we're primarily interested in eval/Function calls.
                // console.log('SANDBOX_$DONE called with:', obj);
            },
            // Overriding eval and Function to capture the deobfuscated string
            eval: (code) => {
                // If eval is called, capture the code. Assume the first string-like eval is the decoded one.
                if (typeof code === 'string' && capturedCode === null) {
                    capturedCode = code;
                    // Prevent further execution of the captured code within this context
                    // By returning a non-executable value or throwing a controlled error,
                    // we stop the sandbox from actually running the captured code.
                    throw new Error("DEOBFUSCATION_CAPTURED"); // Use a unique error to break out
                }
                return undefined; // Prevent other eval calls from running uncontrolled
            },
            Function: function(...args) {
                // If Function constructor is called, capture the body of the function.
                // The last argument is usually the function body.
                const funcBody = args[args.length - 1];
                if (typeof funcBody === 'string' && capturedCode === null) {
                    capturedCode = funcBody;
                    // Throw an error to stop execution within the sandbox once captured
                    throw new Error("DEOBFUSCATION_CAPTURED");
                }
                // Return a dummy function to prevent actual execution within the sandbox
                return function() {}; 
            },
            // The obfuscated code itself defines variables like ﾟДﾟ.
            // By running the entire `cleanedText`, these variables will be defined by the script itself
            // within the sandbox. No need to pre-define them here.
        });

        try {
            // Run the entire obfuscated code in the sandboxed context
            vm.runInContext(cleanedText, context);
        } catch (e) {
            if (e.message === "DEOBFUSCATION_CAPTURED") {
                // This is our expected "success" state
                // console.log("AADecode Debug: Code successfully captured.");
            } else {
                throw new Error(`Sandbox execution error during AAEncode decoding: ${e.message}`);
            }
        }

        if (capturedCode === null) {
            throw new Error("AAEncode decoding failed: No code captured from eval/Function calls. It might be a different variant or executed directly without calling eval/Function.");
        }

        // `aadecode2` will handle octal/unicode escapes, so we just return the captured string.
        return capturedCode;
    }
};

export default AADecode.decode;
