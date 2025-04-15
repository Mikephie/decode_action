// Babel Eval Plugin (ES Module)
import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

/**
 * Plugin function for unpacking eval-based obfuscation
 * @param {string} code - Input code to unpack
 * @returns {string|null} - Unpacked code or null if not applicable
 */
async function plugin(code) {
  try {
    let ast = parse(code, { errorRecovery: true });
    let lines = ast.program.body;
    let data = null;
    
    for (let line of lines) {
      if (t.isEmptyStatement(line)) {
        continue;
      }
      if (data) {
        return null;
      }
      if (
        t.isCallExpression(line?.expression) &&
        line.expression.callee?.name === 'eval' &&
        line.expression.arguments.length === 1 &&
        t.isCallExpression(line.expression.arguments[0])
      ) {
        data = t.expressionStatement(line.expression.arguments[0]);
        continue;
      }
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    code = generator(data, { minified: true }).code;
    return eval(code);
  } catch (error) {
    console.error('Error in eval unpack:', error);
    return null;
  }
}

/**
 * Packs code into a function expression
 * @param {string} code - The code to pack
 * @returns {string} - The packed code
 */
function pack(code) {
  let ast1 = parse('(function(){}())');
  let ast2 = parse(code);
  
  traverse(ast1, {
    FunctionExpression(path) {
      let body = t.blockStatement(ast2.program.body);
      path.replaceWith(t.functionExpression(null, [], body));
      path.stop();
    },
  });
  
  code = generator(ast1, { minified: false }).code;
  return code;
}

// The main plugin export structured to be used in your application
const unpack = plugin;

export default { 
  plugin,
  unpack,
  pack
};
