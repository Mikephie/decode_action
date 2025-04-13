import fs from 'fs';
import process from 'process';

// Dynamically import ESM modules
const commonModule = await import('./plugin/common.js');
const jjencodeModule = await import('./plugin/jjencode.js');
const sojsonModule = await import('./plugin/sojson.js');
const sojsonv7Module = await import('./plugin/sojsonv7.js');
const obfuscatorModule = await import('./plugin/obfuscator.js');
const awscModule = await import('./plugin/awsc.js');
const jsconfuserModule = await import('./plugin/jsconfuser.js');
const jsaaencodeModule = await import('./plugin/aaencode.js');
const evalModule = await import('./plugin/eval.js'); // <-- 添加这行

// Provide default exports if necessary
const PluginCommon = commonModule.default || commonModule;
const PluginJjencode = jjencodeModule.default || jjencodeModule;
const PluginSojson = sojsonModule.default || sojsonModule;
const PluginSojsonV7 = sojsonv7Module.default || sojsonv7Module;
const PluginObfuscator = obfuscatorModule.default || obfuscatorModule;
const PluginAwsc = awscModule.default || awscModule;
const PluginJsconfuser = jsconfuserModule.default || jsconfuserModule;
const PluginAaencode = jsaaencodeModule.default || jsaaencodeModule;
const PluginEval = evalModule.default || evalModule; // <-- 添加这行

// Read command-line arguments
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

// Read source code
const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' });

let processedCode = sourceCode;
let pluginUsed = '';
let time;

// Try plugins in sequence until the processed code differs from the original
const plugins = [
  { name: 'obfuscator', plugin: PluginObfuscator },
  { name: 'eval', plugin: PluginEval.unpack }, // <-- eval插件放在合适的位置
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

// Check if processed code differs from source code
if (processedCode !== sourceCode) {
  time = new Date();
  const header = [
    `//${time}`,
    "//Base:https://github.com/echo094/decode-js",
    "//Modify:https://github.com/smallfawn/decode_action"
  ].join('\n');

  const outputCode = header + '\n' + processedCode;

  fs.writeFile(decodeFile, outputCode, (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`使用插件 ${pluginUsed} 成功处理并写入文件 ${decodeFile}`);
    }
  });
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`);
}
