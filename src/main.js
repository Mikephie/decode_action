import fs from 'fs';
import process from 'process';

// 动态导入插件模块
const commonModule = await import('./plugin/common.js');
const jjencodeModule = await import('./plugin/jjencode.js');
const sojsonModule = await import('./plugin/sojson.js');
const sojsonv7Module = await import('./plugin/sojsonv7.js');
const obfuscatorModule = await import('./plugin/obfuscator.js');
const awscModule = await import('./plugin/awsc.js');
const jsconfuserModule = await import('./plugin/jsconfuser.js');
const jsaaencodeModule = await import('./plugin/aaencode.js');
const evalModule = await import('./plugin/eval.js');
const beautifyModule = await import('./plugin/js-beautify.js');
const jsfuckModule = await import('./plugin/jsfuck.js');

// 尝试导入特殊处理插件（如果存在）
let directExecutionModule = null;
let rawExecutionModule = null;
let manualExtractorModule = null;

try {
  directExecutionModule = await import('./plugin/direct-execution.js');
  console.log('已加载备选的直接执行插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

try {
  rawExecutionModule = await import('./plugin/raw-execution.js');
  console.log('已加载特殊原始执行插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

try {
  manualExtractorModule = await import('./plugin/manual-extractor.js');
  console.log('已加载手动提取器插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

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
const beautify = beautifyModule.default || beautifyModule;
const PluginJsfuck = jsfuckModule.default || jsfuckModule;
const PluginDirectExecution = directExecutionModule?.default || directExecutionModule;
const PluginRawExecution = rawExecutionModule?.default || rawExecutionModule;
const PluginManualExtractor = manualExtractorModule?.default || manualExtractorModule;

// 参数读取
let encodeFile = 'input.js';
let decodeFile = 'output.js';
let forcePlugin = null;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '-i' && i + 1 < process.argv.length) encodeFile = process.argv[++i];
  else if (process.argv[i] === '-o' && i + 1 < process.argv.length) decodeFile = process.argv[++i];
  else if (process.argv[i] === '-p' && i + 1 < process.argv.length) forcePlugin = process.argv[++i];
}

console.log(`输入: ${encodeFile}`);
console.log(`输出: ${decodeFile}`);
if (forcePlugin) console.log(`强制使用插件: ${forcePlugin}`);

const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' });

let processedCode = sourceCode;
let pluginUsed = '';
let time;

// 特定插件强制处理
if (forcePlugin) {
  console.log(`按照要求强制使用插件: ${forcePlugin}`);
  
  try {
    switch (forcePlugin.toLowerCase()) {
      case 'jsfuck':
        processedCode = PluginJsfuck.handle(sourceCode);
        pluginUsed = 'jsfuck';
        break;
      case 'aaencode':
      case 'kaomoji':
        processedCode = PluginAaencode(sourceCode);
        pluginUsed = 'aaencode';
        break;
      case 'jjencode':
        processedCode = PluginJjencode(sourceCode);
        pluginUsed = 'jjencode';
        break;
      case 'eval':
        processedCode = PluginEval.unpack(sourceCode);
        pluginUsed = 'eval';
        break;
      case 'obfuscator':
        processedCode = PluginObfuscator(sourceCode);
        pluginUsed = 'obfuscator';
        break;
      case 'sojson':
        processedCode = PluginSojson(sourceCode);
        pluginUsed = 'sojson';
        break;
      case 'sojsonv7':
        processedCode = PluginSojsonV7(sourceCode);
        pluginUsed = 'sojsonv7';
        break;
      case 'jsconfuser':
        processedCode = PluginJsconfuser(sourceCode);
        pluginUsed = 'jsconfuser';
        break;
      case 'awsc':
        processedCode = PluginAwsc(sourceCode);
        pluginUsed = 'awsc';
        break;
      case 'direct':
        if (PluginDirectExecution) {
          processedCode = PluginDirectExecution.executeKaomoji(sourceCode);
          pluginUsed = 'direct-execution';
        } else {
          console.log('未找到直接执行插件，跳过');
        }
        break;
      case 'raw':
        if (PluginRawExecution) {
          processedCode = PluginRawExecution.executeRaw(sourceCode);
          pluginUsed = 'raw-execution';
        } else {
          console.log('未找到原始执行插件，跳过');
        }
        break;
      case 'manual':
        if (PluginManualExtractor) {
          processedCode = PluginManualExtractor.extractCode(sourceCode);
          pluginUsed = 'manual-extractor';
        } else {
          console.log('未找到手动提取器插件，跳过');
        }
        break;
      default:
        console.log(`未知插件: ${forcePlugin}，将正常执行解包流程`);
        forcePlugin = null;
    }
    
    if (processedCode && processedCode !== sourceCode) {
      console.log(`强制使用插件 ${pluginUsed} 成功`);
    } else {
      console.log(`强制使用插件 ${forcePlugin} 未产生不同结果，将尝试其他插件`);
      forcePlugin = null;
    }
  } catch (error) {
    console.error(`强制使用插件 ${forcePlugin} 时出错: ${error.message}`);
    forcePlugin = null;
  }
}

// 只有在未指定强制插件或强制插件失败时才执行自动检测流程
if (!forcePlugin || processedCode === sourceCode) {
  // 首先尝试 AAEncode/Kaomoji 解码
  if (/ﾟωﾟ|ﾟДﾟ|ﾟΘﾟ/.test(sourceCode)) {
    console.log('检测到 AAEncode/Kaomoji 混淆，尝试解密...');
    
    // 按优先级尝试不同方法解码
    const kaomoji_plugins = [
      { name: 'aaencode', handler: PluginAaencode, enabled: true },
      { name: 'jsfuck', handler: PluginJsfuck?.handle, enabled: true },
      { name: 'raw-execution', handler: PluginRawExecution?.executeRaw, enabled: !!PluginRawExecution },
      { name: 'direct-execution', handler: PluginDirectExecution?.executeKaomoji, enabled: !!PluginDirectExecution },
      { name: 'manual-extractor', handler: PluginManualExtractor?.extractCode, enabled: !!PluginManualExtractor }
    ].filter(plugin => plugin.enabled);
    
    // 尝试所有可用的插件
    for (const plugin of kaomoji_plugins) {
      try {
        console.log(`尝试使用 ${plugin.name} 插件解密...`);
        const result = plugin.handler(sourceCode);
        if (result && result !== sourceCode) {
          processedCode = result;
          pluginUsed = plugin.name;
          console.log(`使用 ${plugin.name} 插件解密成功`);
          break;
        }
      } catch (error) {
        console.error(`${plugin.name} 处理时发生错误: ${error.message}`);
      }
    }
  }
  // 跳过无需解包的脚本
  else if (PluginCommon.isNeverDecode(sourceCode)) {
    console.log('检测到无需解包的脚本，直接格式化...');
  } 
  // 尝试其他插件
  else {
    const plugins = [
      { name: 'obfuscator', plugin: PluginObfuscator },
      { name: 'eval', plugin: PluginEval.unpack },
      { name: 'sojsonv7', plugin: PluginSojsonV7 },
      { name: 'sojson', plugin: PluginSojson },
      { name: 'jsconfuser', plugin: PluginJsconfuser },
      { name: 'awsc', plugin: PluginAwsc },
      { name: 'jjencode', plugin: PluginJjencode },
    ];

    for (const plugin of plugins) {
      try {
        const code = plugin.plugin(processedCode);
        if (code && code !== processedCode) {
          processedCode = code;
          pluginUsed = plugin.name;
          console.log(`插件 ${plugin.name} 成功处理`);
          break;
        }
      } catch (error) {
        console.error(`插件 ${plugin.name} 处理时发生错误: ${error.message}`);
      }
    }
  }
}

if (processedCode !== sourceCode) {
  time = new Date();

  const header = [
    `// ${time.toISOString()}`,
    "// Base: https://github.com/echo094/decode-js",
    "// Modify: https://github.com/smallfawn/decode_action"
  ].join('\n');

  // 确保我们有一个有效的字符串进行格式化
  const finalCode = typeof processedCode === 'string' 
    ? await beautify.formatCode(processedCode)
    : String(processedCode);
    
  const outputCode = header + '\n\n' + finalCode;

  fs.writeFileSync(decodeFile, outputCode, 'utf-8');
  console.log(`使用插件 ${pluginUsed} 成功处理并写入文件 ${decodeFile}`);
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`);
}
