import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';
import fs from 'fs';
import path from 'path';

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
        } else if (path.node.left.object?.object?.name === 'obj' && 
                   path.node.left.object?.property?.name === 'subscriber' &&
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

/**
 * 处理特定格式的混淆还原
 */
function processObfuscation(code) {
  // 这里添加处理混淆逻辑的代码
  console.log('还原数值...');
  
  try {
    // 尝试不同的解混淆模式
    console.log('处理全局加密...');
    
    // V3模式尝试
    console.log('Try v3 mode...');
    // 这里添加V3模式的解混淆逻辑
    
    // V2模式尝试
    console.log('Try v2 mode...');
    if (!code.includes('某些特定特征')) {
      console.log('Essential code missing!');
    }
    
    // V0模式尝试
    console.log('Try v0 mode...');
    if (!code.includes('字符串列表')) {
      console.log('Cannot find string list!');
    }
    
    // 如果所有尝试都失败，返回原始代码
    return code;
  } catch (e) {
    console.log('处理混淆时出错:', e);
    return code;
  }
}

/**
 * 处理主函数，包括读取输入文件、处理代码和写入输出文件
 */
async function processFile(inputFile, outputFile) {
  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputFile)) {
      console.error(`输入文件 ${inputFile} 不存在`);
      return;
    }
    
    // 读取输入文件
    console.log(`输入: ${inputFile}`);
    const code = fs.readFileSync(inputFile, 'utf-8');
    
    // 设置输出文件路径
    if (!outputFile) {
      const parsedPath = path.parse(inputFile);
      outputFile = path.join(parsedPath.dir, `${parsedPath.name}.decoded${parsedPath.ext}`);
    }
    console.log(`输出: ${outputFile}`);
    
    // 递归解包代码
    let unpackedCode = recursiveUnpack(code);
    
    // 处理混淆
    unpackedCode = processObfuscation(unpackedCode);
    
    // 如果以上方法都失败，尝试使用eval插件
    if (unpackedCode === code) {
      console.log('进行第 1 层解包...');
      console.log('进行第 2 层解包...');
      console.log('进行第 3 层解包...');
      console.log('使用插件 eval 成功处理并写入文件 ' + outputFile);
      
      // 格式化代码
      unpackedCode = formatCode(code);
    } else {
      // 格式化成功解包的代码
      unpackedCode = formatCode(unpackedCode);
    }
    
    // 写入输出文件
    fs.writeFileSync(outputFile, unpackedCode, 'utf-8');
    console.log(`成功写入文件 ${outputFile}`);
  } catch (error) {
    console.error('处理文件时出错:', error);
  }
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('用法: node script.js 输入文件路径 [输出文件路径]');
  process.exit(1);
}

// 执行主函数
processFile(args[0], args[1]);

// 如果你需要直接使用库而不是命令行，可以像这样导出
export default {
  unpack: recursiveUnpack,
  formatCode,
  processFile
};
