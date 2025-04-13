/**
 * js-beautify插件 - 代码美化工具
 * 可以作为独立插件使用，确保所有代码都经过格式化
 */

import fs from 'fs';
import { execSync } from 'child_process';

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
 * 简单的备用格式化函数，用于js-beautify失败时
 * @param {string} code 要格式化的代码
 * @returns {string} 格式化后的代码
 */
function simpleFormat(code) {
  // 在分号后添加换行
  code = code.replace(/;/g, ';\n');
  
  // 在左花括号后添加换行
  code = code.replace(/{/g, '{\n');
  
  // 在右花括号前添加换行
  code = code.replace(/}/g, '\n}');
  
  // 缩进代码块
  const lines = code.split('\n');
  let indent = 0;
  const formattedLines = lines.map(line => {
    let result = line;
    
    // 减少缩进级别
    if (line.includes('}')) {
      indent = Math.max(0, indent - 1);
    }
    
    // 添加缩进
    if (indent > 0) {
      result = '  '.repeat(indent) + result;
    }
    
    // 增加缩进级别
    if (line.includes('{')) {
      indent++;
    }
    
    return result;
  });
  
  // 减少多余空行
  let formatted = formattedLines.join('\n');
  formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return formatted;
}

/**
 * 使用js-beautify格式化代码
 * @param {string} code 要格式化的代码
 * @returns {Promise<string>} 格式化后的代码
 */
async function formatCode(code) {
  // 确保js-beautify已安装
  if (!(await ensureBeautifyInstalled())) {
    console.log('js-beautify安装失败，将使用简单格式化');
    return simpleFormat(code);
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
    console.log('使用js-beautify格式化代码...');
    const beautified = beautify(code, options);
    
    // 检查格式化效果
    const originalLines = code.split('\n').length;
    const beautifiedLines = beautified.split('\n').length;
    
    console.log(`格式化前: ${originalLines}行`);
    console.log(`格式化后: ${beautifiedLines}行`);
    
    if (beautifiedLines <= originalLines && originalLines === 1) {
      console.log('js-beautify格式化可能失败，尝试使用备用格式化');
      return simpleFormat(code);
    }
    
    console.log('代码格式化完成');
    return beautified;
  } catch (e) {
    console.error('格式化代码时出错:', e);
    console.log('使用备用格式化方法');
    return simpleFormat(code);
  }
}

/**
 * 处理文件的主函数
 * @param {string} inputFile 输入文件路径
 * @param {string} outputFile 输出文件路径
 * @returns {Promise<boolean>} 是否成功处理
 */
async function process(inputFile, outputFile) {
  console.log(`使用beautify插件格式化文件: ${inputFile}`);
  
  try {
    // 读取输入文件
    const inputCode = fs.readFileSync(inputFile, 'utf8');
    
    // 1. 格式化代码（自动安装js-beautify）
    const formatted = await formatCode(inputCode);
    
    // 2. 添加代码段注释
    const commented = addSectionComments(formatted);
    
    // 3. 添加头部信息
    const finalCode = 
      `// Generated at ${new Date().toISOString()}\n` +
      '// Base: https://github.com/echo094/decode-js\n' +
      '// Modify: https://github.com/smallfawn/decode_action\n' +
      '// Formatted with js-beautify\n\n' +
      commented;
    
    // 4. 写入输出文件
    fs.writeFileSync(outputFile, finalCode, 'utf8');
    console.log(`使用插件 beautify 成功格式化并写入文件 ${outputFile}`);
    
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
    console.log('用法: node beautify.js <input.js> <output.js>');
    return;
  }
  
  const inputFile = args[0];
  const outputFile = args[1];
  
  await process(inputFile, outputFile);
}

// 执行main函数
main().catch(console.error);

// 导出模块
export {
  ensureBeautifyInstalled,
  formatCode,
  addSectionComments,
  simpleFormat,
  process
};

// 默认导出
export default {
  ensureBeautifyInstalled,
  formatCode,
  addSectionComments,
  simpleFormat,
  process
};
