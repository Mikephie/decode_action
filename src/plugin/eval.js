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

    // 下面插入你的原始正则链美化处理（保留你自定义的所有处理）
    formatted = formatted
      .replace(/;\s*/g, ';\n')
      .replace(/({|})\s*/g, '$1\n')
      .replace(/,\s*/g, ', ')
      .replace(/:\s*/g, ': ')
      .replace(/\n{2,}/g, '\n\n')
      .replace(/(let|var|const)\s+/g, '\n$1 ')
      .replace(/\/\/\s*([^\n]+)\n/g, '// $1\n') // 注释优化示例
      .replace(/\n{3,}/g, '\n\n')
      .replace(/(\$done\(\{.*?\}\);)/, '\n$1\n') // $done前后换行优化
      .replace(/({)\s*\n+/g, '{\n') // 花括号后紧跟换行优化
      .replace(/\[\s*\n\s*/g, '[\n  ') // 数组内换行与缩进优化
      .replace(/\n\s*\]/g, '\n]')    // 数组结尾缩进优化
      .replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*/g, '$1 = ') // 等号左右空格统一
      .replace(/,([^\s])/g, ', $1') // 逗号后空格优化
      .replace(/\n{3,}/g, '\n\n')   // 连续空行压缩
      .replace(/\s+$/gm, '')        // 移除行尾空格
      .replace(/^\s+$/gm, '')       // 移除空行空白

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
