/**
 * 完整版eval解包插件 - ES模块版
 * 包含自动安装js-beautify和代码格式化功能
 */

// 引入必要的模块
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 解包eval加密的代码
 * @param {string} code 要解包的代码
 * @param {number} depth 当前解包深度
 * @param {number} maxDepth 最大解包深度
 * @returns {string} 解包后的代码
 */
function unpack(code, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return code;
  console.log(`进行第 ${depth + 1} 层解包...`);
  
  let unpacked = '';
  const fakeEval = (code) => {
    unpacked = code;
    return code;
  };
  
  try {
    // 替换eval调用
    const modifiedCode = code.replace(/eval\s*\(/, 'fakeEval(');
    
    // 安全执行
    const func = new Function('fakeEval', 'String', 'RegExp', modifiedCode);
    func(fakeEval, String, RegExp);
    
    if (unpacked && unpacked !== code) {
      if (unpacked.includes('eval(')) {
        return unpack(unpacked, depth + 1, maxDepth);
      }
      return unpacked;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }
  
  return code;
}

/**
 * 检查是否已安装js-beautify，如果没有则自动安装
 * @returns {Promise<boolean>} 是否成功安装
 */
async function ensureBeautifyInstalled() {
  try {
    // 尝试动态导入js-beautify
    await import('js-beautify');
    console.log('已检测到js-beautify库');
    return true;
  } catch (e) {
    console.log('未检测到js-beautify库，正在自动安装...');
    
    try {
      // 使用npm安装js-beautify
      execSync('npm install js-beautify --save', { stdio: 'inherit' });
      console.log('js-beautify库安装成功');
      return true;
    } catch (installError) {
      try {
        // 尝试使用cnpm（中国镜像）
        execSync('cnpm install js-beautify --save', { stdio: 'inherit' });
        console.log('使用cnpm安装js-beautify成功');
        return true;
      } catch (cnpmError) {
        try {
          // 尝试使用yarn
          execSync('yarn add js-beautify', { stdio: 'inherit' });
          console.log('使用yarn安装js-beautify成功');
          return true;
        } catch (yarnError) {
          console.error('安装失败，请手动安装js-beautify库: npm install js-beautify --save');
          return false;
        }
      }
    }
  }
}

/**
 * 使用js-beautify格式化代码
 * @param {string} code 要格式化的代码
 * @returns {Promise<string>} 格式化后的代码
 */
async function formatCode(code) {
  // 确保js-beautify已安装
  if (!(await ensureBeautifyInstalled())) {
    console.log('由于js-beautify未安装，将返回未格式化的代码');
    return code;
  }
  
  try {
    // 动态导入js-beautify
    const beautifyModule = await import('js-beautify');
    const beautify = beautifyModule.js;
    
    // 格式化选项
    const options = {
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse,preserve-inline',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: true,
      wrap_line_length: 0,
      indent_empty_lines: false,
      comma_first: false
    };
    
    // 执行格式化
    console.log('开始格式化代码...');
    const beautified = beautify(code, options);
    console.log('代码格式化完成');
    return beautified;
  } catch (e) {
    console.error('格式化代码时出错:', e);
    return code;
  }
}

/**
 * 添加代码段注释
 * @param {string} code 要添加注释的代码
 * @returns {string} 添加注释后的代码
 */
function addSectionComments(code) {
  // 定义需要识别的代码段
  const sections = [
    { pattern: /^\s*let\s+(names|productName|productType|appVersion)/m, comment: '// 基础配置变量' },
    { pattern: /^\s*obj\.subscriber\s*=/m, comment: '// 订阅配置信息' },
    { pattern: /^\s*\$\.notify\(/m, comment: '// 通知配置' },
    { pattern: /^\s*\$done\(/m, comment: '// 完成处理' },
    { pattern: /^\s*function\s+Env\s*\(/m, comment: '// Env环境函数定义' }
  ];
  
  // 分割代码为行
  let lines = code.split('\n');
  
  // 遍历每个部分，找到匹配并添加注释
  sections.forEach(section => {
    for (let i = 0; i < lines.length; i++) {
      if (section.pattern.test(lines[i])) {
        // 确保只添加一次注释
        if (i === 0 || (i > 0 && !lines[i-1].includes(section.comment))) {
          // 检查前面是否已有空行
          if (i > 0 && lines[i-1].trim() !== '') {
            lines.splice(i, 0, '', section.comment);
            i += 2; // 调整索引，因为我们插入了两行
          } else {
            lines.splice(i, 0, section.comment);
            i++; // 调整索引，因为我们插入了一行
          }
        }
        break; // 找到第一个匹配就停止
      }
    }
  });
  
  return lines.join('\n');
}

/**
 * 处理文件的主函数
 * @param {string} inputFile 输入文件路径
 * @param {string} outputFile 输出文件路径
 * @returns {Promise<boolean>} 是否成功处理
 */
async function process(inputFile, outputFile) {
  console.log(`使用eval插件处理文件: ${inputFile}`);
  
  try {
    // 读取输入文件
    const inputCode = fs.readFileSync(inputFile, 'utf8');
    
    // 1. 解包代码
    console.log('开始解包代码...');
    const unpacked = unpack(inputCode);
    console.log('解包完成');
    
    // 2. 格式化代码（自动安装js-beautify）
    const formatted = await formatCode(unpacked);
    
    // 3. 添加代码段注释
    const commented = addSectionComments(formatted);
    
    // 4. 添加头部信息
    const finalCode = 
      `// Generated at ${new Date().toISOString()}\n` +
      '// Base: https://github.com/echo094/decode-js\n' +
      '// Modify: https://github.com/smallfawn/decode_action\n' +
      '// Formatted with js-beautify\n\n' +
      commented;
    
    // 5. 写入输出文件
    fs.writeFileSync(outputFile, finalCode, 'utf8');
    console.log(`使用插件 eval 成功处理并写入文件 ${outputFile}`);
    
    return true;
  } catch (e) {
    console.error('处理失败:', e);
    return false;
  }
}

/**
 * CLI入口函数
 */
async function main() {
  // 处理命令行参数
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('用法: node eval.js <input.js> <output.js>');
    return;
  }
  
  const inputFile = args[0];
  const outputFile = args[1];
  
  await process(inputFile, outputFile);
}

// 如果直接运行此脚本，则执行main函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// 导出模块
export {
  unpack,
  ensureBeautifyInstalled,
  formatCode,
  addSectionComments,
  process
};

// 默认导出
export default {
  unpack,
  ensureBeautifyInstalled,
  formatCode,
  addSectionComments,
  process
};
