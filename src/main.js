// deobfuscator.js - Main script for multi-pass JavaScript deobfuscation (ES Module)

import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url'; // Import fileURLToPath for path resolution

// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========= Dynamic Import Plugins =========
const loadPlugins = async () => {
    const plugins = [];
    // FIX: Based on the screenshot, the plugin files (aadecode.js, aadecode2.js, etc.)
    // are located directly inside the 'src/plugin/' directory.
    // So, if 'main.js' is in 'src/', 'actualPluginDir' should point to 'src/plugin/'.
    const actualPluginDir = path.join(__dirname, 'plugin'); // CORRECTED PATH to the directory containing plugin .js files

    try {
        const files = await fs.promises.readdir(actualPluginDir);
        for (const file of files) {
            // Only load .js files and exclude files like 'aadecode-2.js' if 'aadecode.js' exists
            // Also exclude 'main.js' itself if it somehow ends up in the plugin directory
            if (file.endsWith('.js') && !file.includes('-2.js') && !file.includes('main')) { 
                const pluginName = path.basename(file, '.js');
                // Construct the module path as a file URL for dynamic import
                const modulePath = new URL(path.join(actualPluginDir, file), import.meta.url).href;
                try {
                    const mod = await import(modulePath);
                    // Handle various export structures (default export, named 'plugin' export)
                    const pluginFn =
                        typeof mod.default === 'function' ? mod.default :
                        typeof mod.plugin === 'function' ? mod.plugin :
                        null;

                    if (pluginFn) {
                        plugins.push({ name: pluginName, plugin: pluginFn });
                    } else {
                        console.warn(`⚠️ Plugin '${pluginName}' from '${file}' does not export a function as default or named 'plugin'.`);
                    }
                } catch (importError) {
                    console.error(`❌ Failed to load plugin '${pluginName}' from '${file}': ${importError.message}`);
                }
            }
        }
    } catch (err) {
        // Log the problematic path to help the user identify the issue
        console.error(`❌ Error reading plugins directory at '${actualPluginDir}': ${err.message}`); 
    }
    // Sort plugins to ensure a consistent order of application
    // Prioritize deobfuscation plugins, then formatting.
    plugins.sort((a, b) => {
        const order = { 'aadecode': 1, 'aadecode2': 2, 'jsbeautify': 99 }; // jsbeautify should run last
        const orderA = order[a.name] || 50; // Default order for other plugins
        const orderB = order[b.name] || 50;
        
        if (orderA !== orderB) {
            return orderA - orderB;
        }
        // For plugins with the same priority, sort alphabetically
        return a.name.localeCompare(b.name);
    });

    return plugins;
};

// ========= Main CLI Function =========
async function main() {
    const args = process.argv.slice(2);

    let inputFile = 'input.js';
    let outputFile = 'output.js';
    let debugMode = false;
    let showHelp = false;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-i' && args[i + 1]) {
            inputFile = args[++i];
        } else if (args[i] === '-o' && args[i + 1]) {
            outputFile = args[++i];
        } else if (args[i] === '-d') {
            debugMode = true;
        } else if (args[i] === '-h' || args[i] === '--help') {
            showHelp = true;
        }
    }

    if (showHelp) {
        console.log(`
JavaScript Deobfuscator (Multi-Pass ES Module)

Usage:
  node deobfuscator.js -i <input_file> -o <output_file> [-d]
  node deobfuscator.js -h, --help

Options:
  -i <input_file>   Specify the input JavaScript file (e.g., encoded.js).
  -o <output_file>  Specify the output file for decoded JavaScript (e.g., decoded.js).
  -d                Enable debug mode to log intermediate steps.
  -h, --help        Show this help message.

Example:
  node deobfuscator.js -i obfuscated.js -o clean.js -d
`);
        process.exit(0);
    }

    console.log('JavaScript Deobfuscator');
    console.log('============================');
    console.log(`Input file:  ${inputFile}`);
    console.log(`Output file: ${outputFile}`);
    if (debugMode) console.log('🐞 Debug mode enabled: detailed logs will be printed.');
    console.log('');

    try {
        // Check if input file exists
        if (!fs.existsSync(inputFile)) {
            throw new Error(`Input file not found: ${inputFile}`);
        }

        console.log('Reading input file...');
        const source = fs.readFileSync(inputFile, 'utf8');
        let processed = source;
        const usedPlugins = [];
        const maxPass = 10; // Max iterations to prevent infinite loops

        const plugins = await loadPlugins();
        if (plugins.length === 0) {
            console.warn('⚠️ No plugins loaded. Decoding will not occur.');
            fs.writeFileSync(outputFile, source, 'utf8'); // Write original content if no plugins
            console.log(`Original content written to: ${outputFile}`);
            process.exit(0);
        }
        console.log(`Loaded plugins: ${plugins.map(p => p.name).join(', ')}`);
        console.log('Starting multi-pass decoding process...');

        for (let pass = 1; pass <= maxPass; pass++) {
            let changedInThisPass = false; // Track if *any* plugin made a change in this pass

            for (const { name, plugin } of plugins) {
                const isBeautifyPlugin = (name === 'jsbeautify');
                
                // Skip beautify plugin in early passes if no actual deobfuscation has occurred yet
                // Or if it's not the last pass and no significant changes happened in this pass yet
                if (isBeautifyPlugin && pass < maxPass && !changedInThisPass && usedPlugins.length === 0) {
                    continue; 
                }

                try {
                    const beforeProcessing = processed;
                    const result = plugin(processed);

                    if (typeof result === 'string' && result.trim() !== beforeProcessing.trim()) {
                        console.log(`🔁 Pass ${pass}: Plugin '${name}' applied successfully.`);
                        processed = result;
                        // Add plugin to used list only if it's new or if it's a beautifier (which can be applied multiple times)
                        if (!usedPlugins.includes(name) || isBeautifyPlugin) {
                           usedPlugins.push(name);
                        }
                        changedInThisPass = true; // Mark that a change occurred

                        if (debugMode) {
                            console.log(`Debug: Intermediate state after pass ${pass} with '${name}' (length: ${processed.length})`);
                            // Optionally save intermediate files in debug mode
                            // fs.writeFileSync(`${outputFile}.debug_pass${pass}_${name}.js`, processed, 'utf8');
                        }
                        // Continue to apply other plugins in the same pass.
                        // The outer loop will restart if changedInThisPass is true.
                    }
                } catch (e) {
                    // Define common "expected" error messages for plugins that might not apply
                    const expectedErrors = [
                        "not encoded as aaencode", // For aadecode
                        "Preamble or Postamble not found", // For aadecode
                        "did not return a string", // If a decoder expects a string but gets something else
                        "Unexpected parent type", // Common from AST parsers if input is not JS or malformed
                        "Cannot parse code", // Common from parsers
                        "Missing semicolon", // Common from parsers
                        "The number of code blocks is incorrect!" // Specific to some block-based deobfuscators
                    ];

                    const isExpectedError = expectedErrors.some(errText => e.message.includes(errText));

                    if (isExpectedError && !isBeautifyPlugin) { // Don't log expected errors for deobfuscators
                         // console.log(`Debug: Plugin '${name}' did not apply (expected error: ${e.message}).`);
                    } else {
                         console.error(`⚠️ Plugin '${name}' failed in pass ${pass}: ${e.message}`);
                    }
                }
            }

            // If no deobfuscation plugin made a change, but beautify ran, and it's not the last pass,
            // we might want to continue for one more pass if beautify made a change,
            // but generally, we stop if deobfuscation is stuck.
            if (!changedInThisPass && pass > 1) { // Stop if no changes in this pass (after first pass)
                console.log(`🛑 Pass ${pass}: No changes detected. Terminating iteration.`);
                break; 
            } else if (!changedInThisPass && pass === 1 && plugins.length > 0) {
                // Special case for first pass: if no plugin changed anything, stop early
                console.log(`🛑 Pass ${pass}: No changes detected in the first pass. Terminating iteration.`);
                break;
            }
        }

        // Final beautification pass if any deobfuscation occurred and beautify is available
        const finalBeautifyPlugin = plugins.find(p => p.name === 'jsbeautify');
        if (finalBeautifyPlugin && processed.trim() !== source.trim()) {
            try {
                const beforeFinalBeautify = processed;
                const finalBeautified = finalBeautifyPlugin.plugin(processed);
                if (finalBeautified.trim() !== beforeFinalBeautify.trim()) {
                    processed = finalBeautified;
                    if (!usedPlugins.includes('jsbeautify')) {
                        usedPlugins.push('jsbeautify');
                    }
                    console.log(`✨ Final pass: 'jsbeautify' applied for final formatting.`);
                }
            } catch (e) {
                console.warn(`⚠️ Final beautification failed: ${e.message}`);
            }
        }


        // ========= Write Output =========
        if (processed.trim() !== source.trim()) {
            const header = `// Decoded Time: ${new Date().toLocaleString()}\n// Plugins Used: ${usedPlugins.join(' -> ')}`;
            const finalCode = `${header}\n\n${processed}`;

            fs.writeFileSync(outputFile, finalCode, 'utf8');
            console.log(`\n✅ Decoding complete! Plugin chain: ${usedPlugins.join(' -> ')}`);
            console.log(`📦 Output written to: ${outputFile}`);
            console.log(`Decoded length: ${processed.length} characters`);
        } else {
            console.log('⚠️ All plugins processed, but code remained unchanged. No output file generated.');
            console.log('Original content written to: output.js'); // Indicate that original content is written to output.js
            fs.writeFileSync(outputFile, source, 'utf8');
        }

    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        if (error.code === 'ENOENT') {
            console.error('Please ensure the input file exists and the path is correct.');
        }
        process.exit(1);
    }
}

// Run the main function
