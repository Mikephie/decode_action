import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

/**
 * Unpacks code that has been packed with an eval function
 * @param {string} packedCode - The packed JS code
 * @returns {string} The unpacked code
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
 * Formats the decoded JavaScript code with proper structure and styling
 * @param {string} code - The code to format
 * @returns {string} The formatted code
 */
function formatCode(code) {
  try {
    // Parse the code into an AST
    const ast = parse(code, { 
      sourceType: 'module', 
      plugins: ['jsx'],
      // Add error recovery for more robust parsing
      errorRecovery: true 
    });

    let hasBaseConfig = false;

    // Add code sections as comments
    traverse(ast, {
      VariableDeclaration(path) {
        const firstDecl = path.node.declarations[0];
        if (firstDecl && ['names', 'productName', 'productType'].includes(firstDecl.id.name)) {
          if (!hasBaseConfig) {
            path.addComment('leading', ' 基础配置变量');
            hasBaseConfig = true;
          }
        }
      },
      AssignmentExpression(path) {
        if (path.node.left.object?.name === 'obj' && path.node.left.property?.name === 'subscriber') {
          path.addComment('leading', ' 订阅配置');
        } else if (path.node.left.object?.name === 'obj' && 
                  path.node.left.property?.name === 'non_subscriptions') {
          path.addComment('leading', ' 非订阅配置');
        }
      },
      CallExpression(path) {
        if (path.node.callee.property?.name === 'notify') {
          path.addComment('leading', ' 通知配置');
        } else if (path.node.callee.name === '$done') {
          path.addComment('leading', ' 完成处理');
        }
      },
      FunctionDeclaration(path) {
        if (path.node.id.name === 'Env') {
          path.addComment('leading', ' 环境工具函数');
        }
      }
    });

    // Generate code from the modified AST
    let formatted = generator(ast, {
      retainLines: false,
      comments: true,
      compact: false,
      indent: { style: '  ' },
      jsescOption: { minimal: true } // For better string formatting
    }).code;

    // Apply additional formatting
    formatted = formatted
      // Add newlines after semicolons
      .replace(/;/g, ';\n')
      // Add newlines after braces
      .replace(/([{}])/g, '$1\n')
      // Format commas
      .replace(/,\s*/g, ', ')
      // Format colons
      .replace(/:\s*/g, ': ')
      // Remove multiple consecutive newlines
      .replace(/\n{3,}/g, '\n\n')
      // Format variable declarations
      .replace(/(let|var|const)\s+/g, '\n$1 ')
      // Format comments
      .replace(/\/\/\s*([^\n]+)\n/g, '// $1\n')
      // Format $done calls
      .replace(/\$done\(\{\s*(.*?)\s*\}\);/g, '\n$done({ $1 });\n')
      // Format braces
      .replace(/\{\n+/g, '{\n')
      // Format arrays
      .replace(/\[\s*\n\s*/g, '[\n  ')
      .replace(/\n\s*\]/g, '\n]')
      // Format assignments
      .replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*/g, '$1 = ')
      // Format commas
      .replace(/,\s*([^\s])/g, ', $1')
      // Remove trailing whitespace
      .replace(/\s+$/gm, '')
      // Remove empty lines
      .replace(/^\s+$/gm, '')
      // Improve object formatting
      .replace(/\{\s*([^{}]*?)\s*\}/g, (match, content) => {
        if (content.includes('\n')) return match;
        return '{ ' + content.trim() + ' }';
      });

    // Generate header
    const header =
      `// Generated at ${new Date().toISOString()}\n` +
      '// Base: https://github.com/echo094/decode-js\n' +
      '// Modify: https://github.com/smallfawn/decode_action\n\n';

    return header + formatted;
  } catch (e) {
    console.log('格式化错误:', e);
    return code;
  }
}

/**
 * Recursively unpacks code that might have multiple layers of packing
 * @param {string} code - The potentially packed code
 * @param {number} depth - Current recursion depth
 * @returns {string} The fully unpacked code
 */
function recursiveUnpack(code, depth = 0) {
  if (depth > 10) return code; // Prevent infinite recursion
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

export default {
  unpack: recursiveUnpack,
  formatCode,
};
