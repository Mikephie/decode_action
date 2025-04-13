import beautify from 'js-beautify';

export async function ensureBeautifyInstalled() {
  console.log('已检测到 js-beautify 模块');
  return true;
}

export function simpleFormat(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

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

export async function formatCode(code) {
  try {
    const options = {
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 2,
      preserve_newlines: true,
      end_with_newline: true
    };

    console.log('使用 js-beautify 格式化代码...');
    const formatted = beautify.js(code, options);
    return formatted;
  } catch (e) {
    console.error('js-beautify 格式化失败:', e);
    return simpleFormat(code);
  }
}

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

export default {
  ensureBeautifyInstalled,
  simpleFormat,
  addSectionComments,
  formatCode,
  process
};
