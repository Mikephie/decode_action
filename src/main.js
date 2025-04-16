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
const aadecodeModule = await import('./plugin/aadecode.js');
const evalModule = await import('./plugin/eval.js');
const beautifyModule = await import('./plugin/js-beautify.js');
const jsfuckModule = await import('./plugin/jsfuck.js');
const jsjiamiModule = await import('./plugin/jsjiami.js');

// 提取 default 导出
const PluginCommon = commonModule.default || commonModule;
const PluginJjencode = jjencodeModule.default || jjencodeModule;
const PluginSojson = sojsonModule.default || sojsonModule;
const PluginSojsonV7 = sojsonv7Module.default || sojsonv7Module;
const PluginObfuscator = obfuscatorModule.default || obfuscatorModule;
const PluginAwsc = awscModule.default || awscModule;
const PluginJsconfuser = jsconfuserModule.default || jsconfuserModule;
const PluginAadecode = aadecodeModule.default || aadecodeModule;
const PluginEval = evalModule.default || evalModule;
const beautify = beautifyModule.default || beautifyModule;
const PluginJsfuck = jsfuckModule.default || jsfuckModule;
const PluginJsjiami = jsfuckModule.default || jsjiamiModule;

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
  { name: 'jsjiami', plugin: PluginJsjiami.handle },
  { name: 'eval', plugin: PluginEval.unpack },
  { name: 'aadecode', plugin: PluginAadecode.plugin },
  { name: 'obfuscator', plugin: PluginObfuscator.plugin },
  { name: 'jsfuck', plugin: PluginJsfuck.handle },
  { name: 'sojsonv7', plugin: PluginSojsonV7.plugin },
  { name: 'sojson', plugin: PluginSojson.plugin },
  { name: 'jsconfuser', plugin: PluginJsconfuser.plugin },
  { name: 'awsc', plugin: PluginAwsc.plugin },
  { name: 'jjencode', plugin: PluginJjencode.plugin },
];

for (const plugin of plugins) {
  if (sourceCode.includes('smEcV')) break;

  try {
    const code = await plugin.plugin(processedCode);
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

  const finalCode = await beautify.formatCode(processedCode);
  const outputCode = header + '\n' + finalCode;

  fs.writeFile(decodeFile, outputCode, (err) => {
    if (err) throw err;
    console.log(`使用插件 ${pluginUsed} 成功处理并格式化写入文件 ${decodeFile}`);
  });
} else {
  console.log('所有插件处理后的代码与原代码一致，未写入文件。');
}
