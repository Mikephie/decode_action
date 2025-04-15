// AADecode Plugin (ES Module)

/**
 * Decodes AA-encoded JavaScript
 * @param {string} code - The encoded string to decode
 * @returns {string|null} - The decoded string or null if failed
 */
function aadecode(code) {
  try {
    // Check if this is likely AA-encoded content
    if (!(code.includes('ﾟДﾟ') || code.includes('(ﾟΘﾟ)'))) {
      return null;
    }
    
    // Remove unnecessary parts of the encoded string
    code = code.replace(") ('_')", "");
    code = code.replace("(ﾟДﾟ) ['_'] (", "return ");
    
    // Create a function from the modified string and execute it
    const x = new Function(code);
    const r = x();
    
    return r;
  } catch (error) {
    console.error('AADecode error:', error);
    return null;
  }
}

/**
 * The main.js code creates objects like { name: 'aaencode', plugin: PluginAaencode.plugin }
 * and then calls plugin.plugin(), where plugin is PluginAaencode.plugin
 * So PluginAaencode.plugin needs to have a .plugin property that is a function
 */
function pluginFunction(code) {
  return aadecode(code);
}

// Add the plugin property to the plugin function itself
pluginFunction.plugin = function(code) {
  return aadecode(code);
};

// Export the plugin in the format expected by main.js
export default {
  plugin: pluginFunction
};
