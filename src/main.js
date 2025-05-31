import fs from 'fs'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'

// 动态引入插件模块
const modules = {
  aadecode: await import('./plugin/aadecode.js'),
  aadecode2: await import('./plugin/aadecode2.js'),
  kaomojifuck: await import('./plugin/kaomojifuck.js'),
  eval: await import('./plugin/eval.js'),
  obfuscator: await import('./plugin/obfuscator.js'),
  sojsonv7: await import('./plugin/sojsonv7.js'),
  sojson: await import('./plugin/sojson.js'),
  jsconfuser: await import('./plugin/jsconfuser.js'),
  awsc: await import('./plugin/awsc.js'),
  jjencode: await import('./plugin/jjencode.js'),
  common: await import('./plugin/common.js'),
}

// 处理默认导出兼容
const Plugins = Object.entries(modules).map(([name, mod]) => ({
  name,
  plugin: mod.default || mod,
}))

// 处理命令行参数
let inputFile = 'input.js'
let outputFile = 'output.js'

for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i] === '-i') inputFile = process.argv[i + 1]
  if (process.argv[i] === '-o') outputFile = process.argv[i + 1]
}

console.log(`输入文件: ${inputFile}`)
console.log(`输出文件: ${outputFile}`)

let source = fs.readFileSync(inputFile, 'utf8')
let processed = source
let pluginUsed = null

// 尝试插件逐个解码
for (const { name, plugin } of Plugins) {
  if (processed.includes('smEcV')) break // 特定标识可跳过

  try {
    const result = plugin(processed)
    if (typeof result === 'string' && result !== processed) {
      processed = result
      pluginUsed = name
      break
    }
  } catch (e) {
    console.warn(`插件 ${name} 处理出错: ${e.message}`)
  }
}

// 判断是否有变化并输出结果
if (processed !== source) {
  const header = `// 解码时间: ${new Date().toLocaleString()}\n// 使用插件: ${pluginUsed}`
  const finalCode = `${header}\n\n${processed}`

  fs.writeFileSync(outputFile, finalCode, 'utf8')
  console.log(`✅ 解码完成，使用插件: ${pluginUsed}`)
  console.log(`📄 已写入: ${outputFile}`)
} else {
  console.log('⚠️ 所有插件处理后代码无变化，未生成输出文件。')
}