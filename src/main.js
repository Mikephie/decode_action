import fs from 'fs';
import process from 'process';
import path from 'path';

function getPluginsConfig() {
  // 动态读取插件顺序，支持热更新
  return JSON.parse(fs.readFileSync('./config/plugins.json', 'utf-8'));
}

// 动态加载所有插件
async function loadPlugins() {
  const names = getPluginsConfig();
  const plugins = [];
  for (const name of names) {
    try {
      const mod = await import(`./plugin/${name}.js`);
      const plugin = mod.default || mod;
      plugins.push({ name, plugin });
    } catch (e) {
      console.error(`加载插件 ${name} 失败: ${e.message}`);
    }
  }
  return plugins;
}

// 命令行参数处理
let encodeFile = 'input.js', decodeFile = 'output.js';
for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i] === '-i') encodeFile = process.argv[i + 1];
  if (process.argv[i] === '-o') decodeFile = process.argv[i + 1];
}
console.log(`输入: ${encodeFile}`);
console.log(`输出: ${decodeFile}`);

// 主流程
async function main() {
  const plugins = await loadPlugins();
  const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' });
  let processedCode = sourceCode;
  let pluginUsed = '';

  for (const { name, plugin } of plugins) {
    try {
      const code = plugin(processedCode);
      if (code && code !== processedCode) {
        processedCode = code;
        pluginUsed = name;
        break;
      }
    } catch (error) {
      console.error(`插件 ${name} 处理时发生错误: ${error.message}`);
    }
  }

  if (processedCode !== sourceCode) {
    const time = new Date();
    const header = `//${time.toISOString()}\n//解密脚本在此\n`;
    const outputCode = header + processedCode;
    fs.writeFileSync(decodeFile, outputCode);
    console.log(`使用插件 ${pluginUsed} 成功处理并写入文件 ${decodeFile}`);
  } else {
    console.log('所有插件处理后的代码与原代码一致，未写入文件。');
  }
}

main();