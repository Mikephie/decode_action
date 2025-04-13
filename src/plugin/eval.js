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
    // 解析代码
    const ast = parse(code, { 
      sourceType: 'module', 
      plugins: ['jsx'] 
    });
    
    // 添加分组注释
    let configSection = false;
    let subscriberSection = false;
    let notifySection = false;
    let envFunctionSection = false;

    traverse(ast, {
      // 识别变量声明并添加注释
      VariableDeclaration(path) {
        const firstDecl = path.node.declarations[0];
        if (firstDecl) {
          // 基础配置变量分组
          if (['names', 'productName', 'productType', 'appVersion'].includes(firstDecl.id.name)) {
            if (!configSection) {
              path.addComment('leading', '基础配置变量', true);
              configSection = true;
            }
          }
          // Env函数定义
          else if (firstDecl.id.name === 'Env' && t.isFunctionExpression(firstDecl.init)) {
            path.addComment('leading', 'Env环境函数定义', true);
            envFunctionSection = true;
          }
        }
      },
      
      // 处理赋值表达式
      AssignmentExpression(path) {
        if (path.node.left.object?.name === 'obj' && path.node.left.property?.name === 'subscriber') {
          if (!subscriberSection) {
            path.addComment('leading', '订阅配置信息', true);
            subscriberSection = true;
          }
        }
      },
      
      // 处理函数调用
      CallExpression(path) {
        if (path.node.callee.property?.name === 'notify') {
          if (!notifySection) {
            path.addComment('leading', '通知配置', true);
            notifySection = true;
          }
        } else if (path.node.callee.name === '$done') {
          path.addComment('leading', '完成处理', true);
        }
      },
      
      // 美化对象表达式
      ObjectExpression(path) {
        // 为大型对象添加换行和缩进
        if (path.node.properties.length > 2) {
          path.node.properties.forEach(prop => {
            if (t.isObjectExpression(prop.value) && prop.value.properties.length > 0) {
              prop.value.extra = prop.value.extra || {};
              prop.value.extra.parenthesized = true;
            }
          });
        }
      }
    });
    
    // 生成格式化后的代码
    let formatted = generator(ast, {
      retainLines: false,
      comments: true,
      compact: false,
      indent: {
        style: '  ',
        adjustMultilineComment: true
      },
      jsescOption: {
        quotes: 'single'
      }
    }).code;
    
    // 后处理优化格式
    formatted = formatted
      // 确保分号后有换行
      .replace(/;(?!\n)/g, ';\n')
      
      // 确保花括号周围有适当的换行
      .replace(/{\s*(?!\n)/g, '{\n  ')
      .replace(/(?<!\n)\s*}/g, '\n}')
      
      // 优化对象表示
      .replace(/,\s*(?=\w)/g, ', ')
      .replace(/:\s*(?=\w)/g, ': ')
      
      // 减少多余的空行
      .replace(/\n{3,}/g, '\n\n')
      
      // 确保变量声明前有空行
      .replace(/(?<!\n\n)(let|var|const)\s+/g, '\n$1 ')
      
      // 美化注释
      .replace(/\/\/\s*([^\n]+)\n/g, '// $1\n')
      
      // 美化$done调用
      .replace(/\$done\(\{([^}]*)\}\);/g, (match, content) => {
        const trimmed = content.trim();
        return trimmed.length > 0 
          ? `$done({\n  ${trimmed.replace(/^\s+|\s+$/gm, '')}\n});`
          : `$done({});`;
      })
      
      // 美化数组
      .replace(/\[\s*\n\s*/g, '[\n  ')
      .replace(/\n\s*\]/g, '\n]')
      
      // 优化赋值操作符周围的空格
      .replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*/g, '$1 = ')
      
      // 确保逗号后有空格
      .replace(/,(?!\s)/g, ', ')
      
      // 删除行尾空格
      .replace(/\s+$/gm, '')
      
      // 删除仅包含空格的行
      .replace(/^\s+$/gm, '')
      
      // 优化订阅对象格式
      .replace(/subscriber\s*:\s*{([^}]*)}/gs, function(match, content) {
        return 'subscriber: {\n  ' + 
          content.trim()
            .replace(/,\s*(?=\w)/g, ',\n  ')
            .replace(/{\s*(?!\n)/g, '{\n    ')
            .replace(/(?<!\n)\s*}/g, '\n  }') +
          '\n}';
      });
    
    // 添加头部信息
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
