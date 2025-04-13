/**
 * js-beautify插件 - ES Module 写法
 * 专用于decode-js项目
 */

import fs from 'fs';
import { execSync } from 'child_process';

/**
 * 检查是否安装 js-beautify
 */
export async function ensureBeautifyInstalled() {
  try {
    await import('js-beautify');
    console.log('已检测到 js-beautify 模块');
    return true;
  } catch (e) {
    console.log('未检测到 js-beautify，尝试自动安装...');
    try {
      execSync('npm install js-beautify --save', { stdio: 'inherit' });
      console.log('js-beautify 安装成功');
      return true;
    } catch (err) {
      console.error('自动安装 js-beautify 失败，请手动执行: npm install js-beautify --save');
      return false;
    }
  }
}

/**
 * 备用简单格式化
 */
export function simpleFormat(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

/**
 * 添加代码段注释
 */
export function addSectionComments(code) {
  const sections = [
    { pattern: /^\s*let\s+(names|productName|productType|appVersion)/m, comment: '// 基础配置变量' },
    { pattern: /^\s*obj\.subscriber\s*=/m, comment: '// 订阅配置信息' },
    { pattern: /^\s*\$\.notify\(/m, comment: '// 通知配置' },
    { pattern: /^\s*\$done\(/m, comment: '// 完成处理' },
    { pattern: /^\s*function\s+Env\s*\(/m, comment: '// Env环境函数定义' }
  ];

  let lines = code.split('\n');
  sections.forEach(section => {
    for (let i = 0; i < lines.length; i++) {
      if (section.pattern.test(lines[i])) {
        if (i === 0 || (i > 0 && !lines[i - 1].includes(section.comment))) {
          lines.splice(i, 0, section.comment);
          i++;
        }
        break;
      }
    }
  });

  return lines.join('\n');
}

/**
 * 格式化主函数
 */
export async function formatCode(code) {
  if (!(await ensureBeautifyInstalled())) {
    console.log('使用 simpleFormat 格式化');
    return simpleFormat(code);
  }

  try {
    const beautifyModule = await import('js-beautify');
    const beautify = beautifyModule.js;

    const options = {
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 2,
      preserve_newlines: true,
      end_with_newline: true
    };

    console.log('使用 js-beautify 格式化代码...');
    const formatted = beautify(code, options);

    if (formatted.split('\n').length <= code.split('\n').length && code.split('\n').length === 1) {
      console.log('js-beautify 效果不理想，使用 simpleFormat');
      return simpleFormat(code);
    }

    return formatted;
  } catch (e) {
    console.error('js-beautify 格式化失败:', e);
    return simpleFormat(code);
  }
}

/**
 * 整个处理流程
 */
export async function process(inputFile, outputFile) {
  console.log(`使用 beautify 格式化文件: ${inputFile}`);
  const code = fs.readFileSync(inputFile, 'utf8');
  const formatted = await formatCode(code);
  const commented = addSectionComments(formatted);

  const header = [
    `// Generated at ${new Date().toISOString()}`,
    '// Base: https://github.com/echo094/decode-js',
    '// Modify: https://github.com/smallfawn/decode_action',
    '// Formatted with js-beautify',
    ''
  ].join('\n');

  fs.writeFileSync(outputFile, header + commented, 'utf8');
  console.log(`beautify 格式化完成，已写入: ${outputFile}`);
}

/**
 * 默认导出
 */
export default {
  ensureBeautifyInstalled,
  simpleFormat,
  addSectionComments,
  formatCode,
  process
};
