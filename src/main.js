import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

// ==== 绝对路径处理，适配ESM ====
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ==== 导入插件 ====
const aadecodeModule = await import(path.join(__dirname, 'plugin', 'aadecode.js'))
const aadecode = typeof aadecodeModule.default === 'function' ? aadecodeModule.default : aadecodeModule

// ==== 读取输入文件 ====
const inputFile = process.argv[2] || 'input.js'
const outputFile = process.argv[3] || 'output.js'

console.log(`📥 输入文件: ${inputFile}`)
console.log(`📤 输出文件: ${outputFile}`)

const code = fs.readFileSync(inputFile, 'utf8')
const result = aadecode(code)

// ==== 写入输出 ====
if (result !== code) {
  fs.writeFileSync(outputFile, result, 'utf8')
  console.log('✅ 解码成功，输出文件:', outputFile)
  console.log('✉️ 明文内容:', result)
} else {
  console.log('⚠️ 解码失败或内容无变化。')
}