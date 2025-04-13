import fs from 'fs'
import process from 'process'

// 动态导入插件
const pluginList = [
  'obfuscator',
  'sojsonv7',
  'sojson',
  'jsconfuser',
  'awsc',
  'jjencode',
  'aaencode',
  'optimize', // AST 逻辑优化
  'common'    // 格式美化 beautify
]

// 命令行参数处理
let encodeFile = 'input.js'
let decodeFile = 'output.js'

for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i] === '-i') {
    encodeFile = process.argv[i + 1]
  } else if (process.argv[i] === '-o') {
    decodeFile = process.argv[i + 1]
  }
}

console.log(`输入: ${encodeFile}`)
console.log(`输出: ${decodeFile}`)

const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' })

let processedCode = sourceCode
let pluginUsed = ''
let time

for (const name of pluginList) {
  if (sourceCode.indexOf('smEcV') !== -1) break

  const module = await import(`./plugin/${name}.js`)
  const plugin = module.default || module

  try {
    const code = plugin.handle
      ? plugin.handle(sourceCode)  // 解包插件
      : plugin.optimize
        ? plugin.optimize(sourceCode)  // optimize 逻辑优化
        : plugin.formatCode(sourceCode)  // common 格式美化

    if (code && code !== processedCode) {
      processedCode = code
      pluginUsed = name
      break
    }
  } catch (e) {
    console.error(`插件 ${name} 处理时发生错误: ${e.message}`)
  }
}

if (processedCode !== sourceCode) {
  time = new Date()
  const header = [
    `//${time}`,
    "//Base:https://github.com/echo094/decode-js",
    "//Modify:https://github.com/smallfawn/decode_action"
  ].join('\n')

  const outputCode = header + '\n' + processedCode

  fs.writeFile(decodeFile, outputCode, (err) => {
    if (err) throw err
    console.log(`使用插件 ${pluginUsed} 成功处理并写入文件 ${decodeFile}`)
  })
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`)
}
