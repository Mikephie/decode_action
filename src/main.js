import fs from 'fs'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'

// ========= 动态导入插件模块 =========
// ========= 仅启用当前必要插件 =========
const modules = {
  kaomojifuck: await import('./plugin/kaomojifuck.js'),
  eval:         await import('./plugin/eval.js'),
  sojsonv7:     await import('./plugin/sojsonv7.js'),
  sojson:       await import('./plugin/sojson.js'),
  jsconfuser:   await import('./plugin/jsconfuser.js'),
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