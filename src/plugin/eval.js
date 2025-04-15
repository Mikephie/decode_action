// Babel Eval Plugin (ES Module)
import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

/**
 * Simple unpack function that replaces eval with a fake eval to capture the code
 * @param {string} packedCode - Input code to unpack
 * @returns {string|null} - Unpacked code or null if failed
 */
function unpack(packedCode) {
  let unpacked = '';
  const fakeEval = (code) => {
    unpacked = code;
    return code;
  };

  const modifiedCode = packedCode.replace(/eval\s*\(/, 'fakeEval(');

  try {
    const func = new Function('fakeEval', 'String', 'RegExp', modifiedCode);
    func(fakeEval, String, RegExp);
    return unpacked;
  } catch (e) {
    console.log('解包错误:', e);
    return null;
  }
}

/**
 * Recursively unpacks code with multiple layers of eval
 * @param {string} code - Code to unpack
 * @param {number} depth - Current recursion depth
 * @returns {string} - Fully unpacked code or original if failed
 */
function recursiveUnpack(code, depth = 0) {
  if (depth > 10) return code;
  console.log(`进行第 ${depth + 1} 层解包...`);

  try {
    let result = unpack(code);
    if (result && result !== code) {
      if (result.includes('eval(')) {
        return recursiveUnpack(result, depth + 1);
      }
      return result;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }

  return code;
}

/**
 * The unpack property is actually a function directly
 * The main.js code creates objects like { name: 'eval', plugin: PluginEval.unpack }
 * and then calls plugin.plugin(), where plugin is PluginEval.unpack
 * So PluginEval.unpack needs to have a .plugin property that is a function
 */
recursiveUnpack.plugin = function(code) {
  return recursiveUnpack(code);
};

// Export the plugin in the format expected by main.js
export default {
  unpack: recursiveUnpack
};
