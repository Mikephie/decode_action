import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ===== 兼容 ESM 路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ===== 命令行参数处理 =====
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('用法: node main.js input.js output.js')
  process.exit(1)
}
const inputFile = args[0]
const outputFile = args[1]

// ===== 读取输入文件 =====
if (!fs.existsSync(inputFile)) {
  console.error(`❌ 输入文件不存在: ${inputFile}`)
  process.exit(2)
}
const code = fs.readFileSync(inputFile, 'utf8')

// ===== 动态导入插件 =====
const aadecodeModule = await import(path.join(__dirname, 'plugin', 'aadecode.js'))
const aadecode = typeof aadecodeModule.default === 'function' ? aadecodeModule.default : aadecodeModule

// ===== 调用插件解包 =====
const result = aadecode(code)

// ===== 写入输出 =====
if (result !== code) {
  fs.writeFileSync(outputFile, result, 'utf8')
  console.log('✅ 解码成功，输出文件:', outputFile)
  console.log('✉️ 明文内容:\n' + result)
} else {
  console.log('⚠️ 解码失败或内容无变化。')
}