import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

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

function formatCode(code) {
  try {
    const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });

    let hasBaseConfig = false;

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
        }
      },
      CallExpression(path) {
        if (path.node.callee.property?.name === 'notify') {
          path.addComment('leading', ' 通知配置');
        }
      },
    });

    let formatted = generator(ast, {
      retainLines: false,
      comments: true,
      compact: false,
      indent: { style: '  ' },
    }).code;

    formatted = formatted
      .replace(/;/g, ';\n')
      .replace(/([{}])/g, '$1\n')
      .replace(/,\s*/g, ', ')
      .replace(/:\s*/g, ': ')
      .replace(/\n{2,}/g, '\n\n')
      .replace(/(let|var|const)\s+/g, '\n$1 ')
      .replace(/\/\/\s*([^\n]+)\n/g, '// $1\n')
      .replace(/\$done\(\{\s*(.*?)\s*\}\);/g, '\n$done({ $1 });\n')
      .replace(/\{\n+/g, '{\n')
      .replace(/\[\s*\n\s*/g, '[\n  ')
      .replace(/\n\s*\]/g, '\n]')
      .replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*/g, '$1 = ')
      .replace(/,\s*([^\s])/g, ', $1')
      .replace(/\s+$/gm, '')
      .replace(/^\s+$/gm, '');

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

export default {
  unpack: recursiveUnpack,
  formatCode,
};
