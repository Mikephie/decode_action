import fs from 'fs'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'

// 动态导入插件模块
const modules = {
  kaomojifuck: await import('./plugin/kaomojifuck.js'),   // ✅ 第一优先，识别外层 JSFuck/颜文字 eval 构造器
  eval:         await import('./plugin/eval.js'),         // ✅ 第二优先，负责执行第一步结果（eval字符串）

  // 🔁 混合解包常见嵌套顺序
  sojsonv7:     await import('./plugin/sojsonv7.js'),
  sojson:       await import('./plugin/sojson.js'),
  jsconfuser:   await import('./plugin/jsconfuser.js'),
  obfuscator:   await import('./plugin/obfuscator.js'),

  // 🔎 启发式、结构型混淆解包器
  awsc:         await import('./plugin/awsc.js'),
  jjencode:     await import('./plugin/jjencode.js'),
  aadecode:     await import('./plugin/aadecode.js'),
  aadecode2:    await import('./plugin/aadecode2.js'),

  // 🧩 通用/兜底插件（放最后）
  common:       await import('./plugin/common.js'),
}

// 兼容插件导出
const Plugins = Object.entries(modules).map(([name, mod]) => ({
  name,
  plugin: mod.default || mod,
}))

// 参数处理
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
if (debugMode) console.log('🐞 调试模式开启，每轮输出保存为 debug_passX.js')

// 读取源文件
let source = fs.readFileSync(inputFile, 'utf8')
let processed = source
const usedPlugins = []

// 多轮递归解码
let changed = false
const maxPass = 10

for (let pass = 1; pass <= maxPass; pass++) {
  changed = false

  for (const { name, plugin } of Plugins) {
    try {
      const result = plugin(processed)
      if (result && typeof result === 'string' && result.trim() !== processed.trim()) {
        console.log(`🔁 第 ${pass} 轮，插件 ${name} 处理成功`)
        processed = result
        usedPlugins.push(name)
        changed = true

        if (debugMode) {
          const debugFile = `debug_pass${pass}_${name}.js`
          fs.writeFileSync(debugFile, processed, 'utf8')
          console.log(`📄 已输出调试文件: ${debugFile}`)
        }

        break // 每轮只用一个插件
      }
    } catch (e) {
      console.warn(`⚠️ 插件 ${name} 出错: ${e.message}`)
    }
  }

  if (!changed) {
    console.log(`🚫 第 ${pass} 轮无插件生效，结束迭代`)
    break
  }
}

// 写入最终输出
if (processed !== source) {
  const header = `// 解码时间: ${new Date().toLocaleString()}\n// 使用插件链: ${usedPlugins.join(' -> ')}`
  const finalCode = `${header}\n\n${processed}`

  fs.writeFileSync(outputFile, finalCode, 'utf8')
  console.log(`✅ 解码完成，插件链: ${usedPlugins.join(' -> ')}`)
  console.log(`📄 输出文件已写入: ${outputFile}`)
} else {
  console.log('⚠️ 所有插件处理后代码无变化，未生成输出文件。')
}