import fs from 'fs';
import process from 'process';

// 动态导入 ESM 插件模块
const commonModule = await import('./plugin/common.js');
const jjencodeModule = await import('./plugin/jjencode.js');
const sojsonModule = await import('./plugin/sojson.js');
const sojsonv7Module = await import('./plugin/sojsonv7.js');
const obfuscatorModule = await import('./plugin/obfuscator.js');
const awscModule = await import('./plugin/awsc.js');
const jsconfuserModule = await import('./plugin/jsconfuser.js');
const jsaaencodeModule = await import('./plugin/aaencode.js');
const evalModule = await import('./plugin/eval.js');
const beautifyModule = await import('./plugin/js-beautify.js'); // <-- 引入格式化模块

// 提取 default 导出
const PluginCommon = commonModule.default || commonModule;
const PluginJjencode = jjencodeModule.default || jjencodeModule;
const PluginSojson = sojsonModule.default || sojsonModule;
const PluginSojsonV7 = sojsonv7Module.default || sojsonv7Module;
const PluginObfuscator = obfuscatorModule.default || obfuscatorModule;
const PluginAwsc = awscModule.default || awscModule;
const PluginJsconfuser = jsconfuserModule.default || jsconfuserModule;
const PluginAaencode = jsaaencodeModule.default || jsaaencodeModule;
const PluginEval = evalModule.default || evalModule;
const beautify = beautifyModule.default || beautifyModule;  // <-- 提取 js-beautify

// 读取命令行参数
let encodeFile = 'input.js';
let decodeFile = 'output.js';

for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i] === '-i') {
    encodeFile = process.argv[i + 1];
  } else if (process.argv[i] === '-o') {
    decodeFile = process.argv[i + 1];
  }
}

console.log(`输入: ${encodeFile}`);
console.log(`输出: ${decodeFile}`);

// 读取源代码
const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' });

let processedCode = sourceCode;
let pluginUsed = '';
let time;

// 插件顺序执行
const plugins = [
  { name: 'obfuscator', plugin: PluginObfuscator },
  { name: 'eval', plugin: PluginEval.unpack },
  { name: 'sojsonv7', plugin: PluginSojsonV7 },
  { name: 'sojson', plugin: PluginSojson },
  { name: 'jsconfuser', plugin: PluginJsconfuser },
  { name: 'awsc', plugin: PluginAwsc },
  { name: 'jjencode', plugin: PluginJjencode },
  { name: 'aaencode', plugin: PluginAaencode },
  { name: 'common', plugin: PluginCommon },
];

for (const plugin of plugins) {
  if (sourceCode.indexOf('smEcV') !== -1) {
    break;
  }

  try {
    const code = plugin.plugin(sourceCode);
    if (code && code !== processedCode) {
      processedCode = code;
      pluginUsed = plugin.name;
      break;
    }
  } catch (error) {
    console.error(`插件 ${plugin.name} 处理时发生错误: ${error.message}`);
  }
}

// 处理结果
if (processedCode !== sourceCode) {
  time = new Date();

  const header = [
    `//${time}`,
    "//Base:https://github.com/echo094/decode-js",
    "//Modify:https://github.com/smallfawn/decode_action"
  ].join('\n');

  // 最后一步执行 js-beautify 格式化
  const finalCode = await beautify.formatCode(processedCode); // <-- 正确调用

  const outputCode = header + '\n' + finalCode;

  fs.writeFile(decodeFile, outputCode, (err) => {
    if (err) throw err;
    console.log(`使用插件 ${pluginUsed} 成功处理并格式化写入文件 ${decodeFile}`);
  });
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`);
}
