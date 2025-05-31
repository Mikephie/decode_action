import fs from 'fs'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'

// ========= 动态导入插件模块 =========
// ========= 仅启用当前必要插件 =========
const modules = {
  const aadecodeModule = await import('./plugin/aadecode.js');
  const aadecode2Module = await import('./plugin/aadecode2.js');
}

// ========= 插件封装函数，兼容多种导出结构 =========
const Plugins = Object.entries(modules).map(([name, mod]) => {
  const pluginFn =
    typeof mod.default === 'function' ? mod.default :
    typeof mod.default?.plugin === 'function' ? mod.default.plugin :
    typeof mod.plugin === 'function' ? mod.plugin :
    null

  return { name, plugin: pluginFn }
}).filter(p => typeof p.plugin === 'function')

// ========= 参数处理 =========
let inputFile = 'input.js'
let outputFile = 'output.js'
let debugMode = false

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '-i') inputFile = process.argv[i + 1]
  if (process.argv[i] === '-o') outputFile = process.argv[i + 1]
  if (process.argv[i] === '-d') debugMode = true
}

console.log(`📥 输入文件: ${inputFile}`)
console.log(`📤 输出文件: ${outputFile}`)
if (debugMode) console.log('🐞 调试模式已启用，每轮输出将保存为 debug_passX.js')

// ========= 读取文件并初始化 =========
const source = fs.readFileSync(inputFile, 'utf8')
let processed = source
const usedPlugins = []
const maxPass = 10

// ========= 多轮插件执行流程 =========
for (let pass = 1; pass <= maxPass; pass++) {
  let changed = false

  for (const { name, plugin } of Plugins) {
    try {
      const result = plugin(processed)

      if (typeof result === 'string' && result.trim() !== processed.trim()) {
        console.log(`🔁 第 ${pass} 轮，插件 ${name} 处理成功`)
        processed = result
        usedPlugins.push(name)
        changed = true

        if (debugMode) {
          const debugFile = `debug_pass${pass}_${name}.js`
          fs.writeFileSync(debugFile, processed, 'utf8')
          console.log(`📄 已保存调试文件: ${debugFile}`)
        }

        break // 每轮仅使用一个插件，重新开始下一轮
      }
    } catch (e) {
      console.warn(`⚠️ 插件 ${name} 出错: ${e.message}`)
    }
  }

  if (!changed) {
    console.log(`🛑 第 ${pass} 轮无变化，终止迭代`)
    break
  }
}

// ========= 写入输出 =========
if (processed !== source) {
  const header = `// 解码时间: ${new Date().toLocaleString()}\n// 使用插件链: ${usedPlugins.join(' -> ')}`
  const finalCode = `${header}\n\n${processed}`

  fs.writeFileSync(outputFile, finalCode, 'utf8')
  console.log(`✅ 解码完成，插件链: ${usedPlugins.join(' -> ')}`)
  console.log(`📦 输出文件: ${outputFile}`)
} else {
  console.log('⚠️ 所有插件处理后代码无变化，未生成输出文件。')
}
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
