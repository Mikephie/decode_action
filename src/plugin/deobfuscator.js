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
    // Correctly resolve plugin directory relative to the current script's location
    const pluginDir = path.join(__dirname, 'plugins');

    try {
        const files = await fs.promises.readdir(pluginDir);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const pluginName = path.basename(file, '.js');
                // Construct the module path as a file URL for dynamic import
                const modulePath = new URL(path.join(pluginDir, file), import.meta.url).href;
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
        console.error(`❌ Error reading plugins directory at '${pluginDir}': ${err.message}`); // Log the problematic path
    }
    // Sort plugins to ensure a consistent order of application
    // For this specific case, aadecode -> aadecode2 -> jsbeautify is a logical order.
    plugins.sort((a, b) => {
        const order = { 'aadecode': 1, 'aadecode2': 2, 'jsbeautify': 3 };
        return (order[a.name] || 99) - (order[b.name] || 99);
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
                try {
                    const beforeProcessing = processed;
                    const result = plugin(processed);

                    if (typeof result === 'string' && result.trim() !== beforeProcessing.trim()) {
                        console.log(`🔁 Pass ${pass}: Plugin '${name}' applied successfully.`);
                        processed = result;
                        // Add plugin to used list only if it's new or if it's a beautifier (which can be applied multiple times)
                        if (!usedPlugins.includes(name) || name === 'jsbeautify') {
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
                    // Suppress "not encoded as aaencode" error for 'aadecode' in subsequent passes
                    // as this is expected if a previous pass already decoded it.
                    if (name === 'aadecode' && e.message.includes("not encoded as aaencode") && pass > 1) {
                         // console.log(`AADecode Debug: Plugin '${name}' did not apply (expected, already decoded).`);
                    } else {
                         console.error(`⚠️ Plugin '${name}' failed in pass ${pass}: ${e.message}`);
                    }
                }
            }

            if (!changedInThisPass) {
                console.log(`🛑 Pass ${pass}: No changes detected. Terminating iteration.`);
                break; // No changes in this pass, so stop
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
main();
