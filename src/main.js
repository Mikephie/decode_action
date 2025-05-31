import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

// 兼容 ESM 路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ===== 读取命令行参数 =====
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('用法: node main.js input.js output.js')
  process.exit(1)
}
const inputFile = args[0]
const outputFile = args[1]

// ===== 导入 aadecode 插件 =====
const aadecodeModule = await import(path.join(__dirname, 'plugin', 'aadecode.js'))
const aadecode = typeof aadecodeModule.default === 'function' ? aadecodeModule.default : aadecodeModule

console.log(`📥 输入文件: ${inputFile}`)
console.log(`📤 输出文件: ${outputFile}`)

// ===== 读取输入内容 =====
const code = fs.readFileSync(inputFile, 'utf8')
const result = aadecode(code)

// ===== 写入输出 =====
if (result !== code) {
  fs.writeFileSync(outputFile, result, 'utf8')
  console.log('✅ 解码成功，输出文件:', outputFile)
  console.log('✉️ 明文内容:', result)
} else {
  console.log('⚠️ 解码失败或内容无变化。')
}