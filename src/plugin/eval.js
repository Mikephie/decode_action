import PluginEval from './plugin-eval.js';

// Use as a function
const deobfuscated = PluginEval(obfuscatedCode);

// Or use the specific methods
const result = PluginEval.recursiveUnpack(obfuscatedCode);
console.log("Unpacked " + result.layers + " layers");
