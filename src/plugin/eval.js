/**
 * eval插件 - 集成自动安装js-beautify功能
 * 可以集成到您现有的eval解包插件中
 */

// 引入必要的模块
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

// 原有的eval解包功能（示例，请替换为您的实际代码）
function unpackEval(code, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) return code;
  console.log(`进行第 ${depth + 1} 层解包...`);
  
  try {
    // 这里是您原有的解包逻辑
    // ...
    
    // 示例解包逻辑（替换为您实际的代码）
    let unpacked = '';
    const fakeEval = (code) => {
      unpacked = code;
      return code;
    };
    
    const modifiedCode = code.replace(/eval\s*\(/, 'fakeEval(');
    
    const func = new Function('fakeEval', 'String', 'RegExp', modifiedCode);
    func(fakeEval, String, RegExp);
    
    if (unpacked && unpacked !== code) {
      if (unpacked.includes('eval(')) {
        return unpackEval(unpacked, depth + 1, maxDepth);
      }
      return unpacked;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }
  
  return code;
}

// 检查是否已安装js-beautify，如果没有则自动安装
function ensureBeautifyInstalled() {
  try {
    // 尝试加载js-beautify
    require.resolve('js-beautify');
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
      console.error('安装js-beautify失败，尝试使用cnpm...');
      
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

// 格式化JavaScript代码
function formatWithBeautify(code) {
  // 确保js-beautify已安装
  if (!ensureBeautifyInstalled()) {
    console.log('由于js-beautify未安装，将返回未格式化的代码');
    return code;
  }
  
  // 加载js-beautify库
  const beautify = require('js-beautify').js;
  
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
  try {
    console.log('开始格式化代码...');
    const beautified = beautify(code, options);
    console.log('代码格式化完成');
    return beautified;
  } catch (e) {
    console.error('格式化代码时出错:', e);
    return code;
  }
}

// 添加代码段注释
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

// 完整的eval插件流程
function evalPlugin(inputFile, outputFile) {
  console.log(`使用eval插件处理文件: ${inputFile}`);
  
  try {
    // 读取输入文件
    const inputCode = fs.readFileSync(inputFile, 'utf8');
    
    // 1. 解包代码
    console.log('开始解包代码...');
    const unpacked = unpackEval(inputCode);
    console.log('解包完成');
    
    // 2. 格式化代码（自动安装js-beautify）
    const formatted = formatWithBeautify(unpacked);
    
    // 3. 添加代码段注释
    const commented = addSectionComments(formatted);
    
    // 4. 添加头部信息
    const finalCode = 
      `// Generated at ${new Date().toISOString()}\n` +
      '// Processed with eval plugin and js-beautify\n\n' +
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

// CLI入口
function main() {
  // 处理命令行参数
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('用法: node eval-plugin.js <input.js> <output.js>');
    return;
  }
  
  const inputFile = args[0];
  const outputFile = args[1];
  
  evalPlugin(inputFile, outputFile);
}

// 如果直接运行此脚本，则执行main函数
if (require.main === module) {
  main();
} else {
  // 导出为模块使用
  export {
  unpackEval,
  ensureBeautifyInstalled,
  formatWithBeautify,
  addSectionComments,
  evalPlugin
};
}

/**
 * 集成说明：
 * 
 * 1. 将本文件中的ensureBeautifyInstalled和formatWithBeautify函数
 *    复制到您的eval插件实现中
 * 
 * 2. 在您的插件处理流程最后，解包完成后，添加格式化步骤：
 * 
 *    // 原来的代码
 *    const unpacked = unpackEval(inputCode);
 *    fs.writeFileSync(outputFile, unpacked, 'utf8');
 *    
 *    // 改为
 *    const unpacked = unpackEval(inputCode);
 *    const formatted = formatWithBeautify(unpacked);
 *    fs.writeFileSync(outputFile, formatted, 'utf8');
 * 
 * 3. 如果需要，还可以添加注释段落标记
 *    const commented = addSectionComments(formatted);
 *    fs.writeFileSync(outputFile, commented, 'utf8');
 */
