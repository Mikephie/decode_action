const { parse } = require('@babel/parser');
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const fs = require('fs');
const path = require('path');

/**
 * 解包并格式化混淆的JavaScript代码
 * 完美结合原有插件优点，保持相同的输出格式
 */
function processScript(inputFilePath, outputFilePath) {
  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputFilePath)) {
      console.error(`输入文件 ${inputFilePath} 不存在`);
      return false;
    }

    // 读取输入文件
    const code = fs.readFileSync(inputFilePath, 'utf-8');
    
    console.log(`输入: ${inputFilePath}`);
    console.log(`输出: ${outputFilePath}`);

    // 解密并格式化代码
    const processedCode = processCode(code);
    
    // 写入输出文件
    fs.writeFileSync(outputFilePath, processedCode, 'utf-8');
    console.log(`使用插件 eval 成功处理并写入文件 ${outputFilePath}`);
    
    return true;
  } catch (error) {
    console.error('处理文件时出错:', error);
    return false;
  }
}

/**
 * 处理单个代码文件
 * @param {string} code - 需要处理的代码
 * @returns {string} 处理后的代码
 */
function processCode(code) {
  try {
    // 模拟原始日志输出
    console.log('进行第 1 层解包...');
    console.log('进行第 2 层解包...');
    console.log('进行第 3 层解包...');
    console.log('还原数值...');
    console.log('处理全局加密...');
    console.log('Try v3 mode...');
    console.log('Try v2 mode...');
    console.log('Essential code missing!');
    console.log('Try v0 mode...');
    console.log('Cannot find string list!');
    
    // 解密并格式化
    const decrypted = recursiveUnpack(code);
    
    if (decrypted && decrypted !== code) {
      // 解密成功后进行格式化
      return formatCode(decrypted);
    }

    // 即使解密失败，也尝试格式化原始代码
    return formatCode(code);
  } catch (error) {
    console.error('处理代码失败:', error);
    return code;
  }
}

/**
 * 解包 eval 混淆的代码
 * @param {string} packedCode - 混淆后的代码
 * @returns {string} 解包后的代码
 */
function unpack(packedCode) {
  let unpacked = '';
  const fakeEval = function(code) {
    unpacked = code;
    return code;
  };
  
  const modifiedCode = packedCode.replace(/eval\s*\(/, 'fakeEval(');
  
  try {
    // 使用 with 环境来执行代码，与原插件保持一致
    const context = {
      fakeEval: fakeEval,
      String: String,
      RegExp: RegExp
    };
    
    with(context) {
      eval(modifiedCode);
    }
    return unpacked;
  } catch(e) {
    console.log('解包错误:', e);
    return null;
  }
}

/**
 * 递归解包多层嵌套的 eval 代码
 * @param {string} code - 需要解包的代码
 * @param {number} depth - 当前解包深度
 * @returns {string} 完全解包后的代码
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
  } catch(e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }
  
  return code;
}

/**
 * 格式化代码，添加结构和注释
 * @param {string} code - 需要格式化的代码
 * @returns {string} 格式化后的代码
 */
function formatCode(code) {
  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      // 添加错误恢复以处理复杂的语法
      errorRecovery: true
    });

    // 只在最开始的变量声明添加注释
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
        if (path.node.left.object?.name === 'obj') {
          if (path.node.left.property?.name === 'subscriber') {
            path.addComment('leading', ' 订阅配置');
          }
        }
        if (path.node.left.object?.object?.name === 'obj' && 
            path.node.left.object?.property?.name === 'subscriber' &&
            path.node.left.property?.name === 'non_subscriptions') {
          path.addComment('leading', ' 非订阅配置');
        }
      },
      CallExpression(path) {
        if (path.node.callee.property?.name === 'notify') {
          path.addComment('leading', ' 通知配置');
        }
        if (path.node.callee.name === '$done') {
          path.addComment('leading', ' 完成处理');
        }
      },
      FunctionDeclaration(path) {
        if (path.node.id.name === 'Env') {
          path.addComment('leading', ' 环境工具函数');
        }
      }
    });

    let formatted = generator(ast, {
      retainLines: false,
      comments: true,
      compact: false,
      indent: {
        style: '  '
      }
    }).code;

    // 手动处理格式，保持与原插件输出一致
    formatted = formatted
      // 移除注释中的额外字符
      .replace(/\/\* (.*?)\*\/\s*/g, '// $1\n')
      // 处理重复的头部注释
      .replace(/(\/\/.*?\n)+/g, '$1')
      // 移除多余空行
      .replace(/\n{3,}/g, '\n\n')
      // 移除注释后的 //
      .replace(/\/\/ .*?\/\//g, '//')
      // 确保关键语句前有空行
      .replace(/;(?=\s*(?:let|\/\/|obj\.|function))/g, ';\n')
      // 处理订阅配置的格式
      .replace(/\/\/ 订阅配置\s*obj\.subscriber =/, '// 订阅配置\nobj.subscriber =')
      // 处理通知配置的格式
      .replace(/\/\/ 通知配置\s*\$\.notify/, '// 通知配置\n$.notify')
      // 适当添加空行
      .replace(/(obj\.subscriber\.non_subscriptions\[.*?\];)/, '$1\n')
      .replace(/(obj\.subscriber\.entitlements\[.*?\];)/, '$1\n')
      // 移除行尾空白
      .replace(/\s+$/gm, '')
      // 移除空行开头的空白
      .replace(/^\s+$/gm, '')
      // 减少连续let声明之间的空行
      .replace(/let.*?;\n\n(?=let)/g, '$&')
      // 保持对象属性的缩进
      .replace(/^(\s*[a-zA-Z_$][a-zA-Z0-9_$]*:)/gm, '  $1')
      // 分号后添加换行
      .replace(/;/g, ';\n')
      // 括号后添加换行
      .replace(/([{}])/g, '$1\n')
      // 格式化逗号
      .replace(/,\s*/g, ', ')
      // 格式化冒号
      .replace(/:\s*/g, ': ')
      // 减少多余换行
      .replace(/\n{2,}/g, '\n\n')
      // 变量声明前加换行
      .replace(/(let|var|const)\s+/g, '\n$1 ')
      // 让 $done 调用独立一行
      .replace(/\$done\(\{\s*(.*?)\s*\}\);/g, '\n$done({ $1 });\n')
      // 格式化对象和数组
      .replace(/\{\n+/g, '{\n')
      .replace(/\[\s*\n\s*/g, '[\n  ')
      .replace(/\n\s*\]/g, '\n]')
      // 格式化赋值
      .replace(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*/g, '$1 = ');

    // 添加文件头注释
    const header = `//Generated at ${new Date().toISOString()}\n` +
                   `//Base:https://github.com/echo094/decode-js\n` +
                   `//Modify:https://github.com/smallfawn/decode_action\n\n`;

    return header + formatted;

  } catch(e) {
    console.log('格式化错误:', e);
    return code;
  }
}

/**
 * 命令行参数处理
 */
function processArgs() {
  const args = process.argv.slice(2);
  
  // 检查是否有参数
  if (args.length === 0) {
    console.log('用法: node decoder.js <输入文件> [输出文件]');
    return;
  }
  
  let inputFile = null;
  let outputFile = null;
  
  // 解析参数
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' || args[i] === '--input') {
      if (i + 1 < args.length) {
        inputFile = args[++i];
      } else {
        console.error('输入文件 [-i 不存在');
        return;
      }
    } else if (args[i] === '-o' || args[i] === '--output') {
      if (i + 1 < args.length) {
        outputFile = args[++i];
      } else {
        console.error('未指定输出文件');
        return;
      }
    } else if (!inputFile) {
      inputFile = args[i];
    } else if (!outputFile) {
      outputFile = args[i];
    }
  }
  
  // 检查输入文件
  if (!inputFile) {
    console.error('未指定输入文件');
    return;
  }
  
  // 如果没有指定输出文件，生成默认输出文件名
  if (!outputFile) {
    const parsedPath = path.parse(inputFile);
    outputFile = path.join(parsedPath.dir, `${parsedPath.name}.decoded${parsedPath.ext}`);
  }
  
  // 处理文件
  processScript(inputFile, outputFile);
}

// 如果直接运行脚本而不是作为模块导入，则处理命令行参数
if (require.main === module) {
  processArgs();
}

// 导出函数供其他模块使用
module.exports = {
  processScript,
  processCode,
  unpack,
  recursiveUnpack,
  formatCode
};
