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

  const context = { fakeEval, String, RegExp };

  try {
    with (context) {
      eval(modifiedCode);
    }
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
      .replace(/\/\* (.*?)\*\/\s*/g, '// $1\n')
      .replace(/(\/\/.*?\n)+/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\/\/ .*?\/\//g, '//')
      .replace(/;(?=\s*(?:let|\/\/|obj\.|function))/g, ';\n')
      .replace(/\/\/ 订阅配置\s*obj\.subscriber =/, '// 订阅配置\nobj.subscriber =')
      .replace(/\/\/ 通知配置\s*\$\.notify/, '// 通知配置\n$.notify')
      .replace(/(obj\.subscriber\.non_subscriptions\[.*?\];)/, '$1\n')
      .replace(/(obj\.subscriber\.entitlements\[.*?\];)/, '$1\n')
      .replace(/\s+$/gm, '')
      .replace(/^\s+$/gm, '')
      .replace(/let.*?;\n\n(?=let)/g, '$&')
      .replace(/^(\s*[a-zA-Z_$][a-zA-Z0-9_$]*:)/gm, '  $1');

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

export default function(code) {
  try {
    const decrypted = recursiveUnpack(code);
    if (decrypted && decrypted !== code) {
      return formatCode(decrypted);
    }
    return code;
  } catch (error) {
    console.error('part2ai 处理失败:', error);
    return code;
  }
}
