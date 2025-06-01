import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import process from 'process';

// Dynamically import ESM modules
const evalModule = await import('./plugin/eval.js');
const aadecodeModule = await import('./plugin/aadecode.js');
const aadecode2Module = await import('./plugin/aadecode2.js');
const commonModule = await import('./plugin/common.js');
const jjencodeModule = await import('./plugin/jjencode.js');
const sojsonModule = await import('./plugin/sojson.js');
const sojsonv7Module = await import('./plugin/sojsonv7.js');
const obfuscatorModule = await import('./plugin/obfuscator.js');
const awscModule = await import('./plugin/awsc.js');
const jsconfuserModule = await import('./plugin/jsconfuser.js');

// Provide default exports if necessary
const PluginAAdecode = aadecodeModule.default || aadecodeModule;
const PluginAAdecode2 = aadecode2Module.default || aadecode2Module;
const PluginEval = evalModule.default || evalModule;
const PluginCommon = commonModule.default || commonModule;
const PluginJjencode = jjencodeModule.default || jjencodeModule;
const PluginSojson = sojsonModule.default || sojsonModule;
const PluginSojsonV7 = sojsonv7Module.default || sojsonv7Module;
const PluginObfuscator = obfuscatorModule.default || obfuscatorModule;
const PluginAwsc = awscModule.default || awscModule;
const PluginJsconfuser = jsconfuserModule.default || jsconfuserModule;
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
  { name: 'aadecode', plugin: PluginAAdecode }, // 👈 插入 aadecode 插件
  { name: 'aadecode2', plugin: PluginAAdecode2 }, // 👈 插入 aadecode2 插件
  { name: 'eval', plugin: PluginEval }, // 👈 插入 eval 插件
  { name: 'obfuscator', plugin: PluginObfuscator },
  { name: 'sojsonv7', plugin: PluginSojsonV7 },
  { name: 'sojson', plugin: PluginSojson },
  { name: 'jsconfuser', plugin: PluginJsconfuser },
  { name: 'awsc', plugin: PluginAwsc },
  { name: 'jjencode', plugin: PluginJjencode },
  { name: 'common', plugin: PluginCommon }, // Use common plugin last
];

for (const plugin of plugins) {
  // Check for specific string in sourceCode to break early
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
    "//解密脚本在此"
  ].join('\n');

  // Combine header and processed code
  const outputCode = header + '\n' + processedCode;

  // Write to file
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
