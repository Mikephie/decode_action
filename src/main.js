// 初始解包执行流程
let currentCode = sourceCode
let finalPluginUsed = ''

while (true) {
  let changed = false

  for (const plugin of plugins) {
    try {
      const newCode = plugin.plugin(currentCode)

      if (newCode && newCode !== currentCode) {
        console.log(`插件 ${plugin.name} 解包成功，继续解包...`)
        currentCode = newCode
        finalPluginUsed += plugin.name + ' → '
        changed = true
        break // 一旦有插件处理成功，重头开始执行插件链
      }
    } catch (error) {
      console.error(`插件 ${plugin.name} 处理时发生错误: ${error.message}`)
    }
  }

  if (!changed) {
    break // 没有插件继续解包，退出循环
  }
}

processedCode = currentCode
pluginUsed = finalPluginUsed ? finalPluginUsed.slice(0, -3) : '未识别'

// smEcV 判断直接做输出优化逻辑
if (processedCode.indexOf('smEcV') !== -1) {
  console.log('检测到特殊标志 smEcV，可能是加固代码或不需要解包')
}

// 判断是否需要写入文件
if (processedCode !== sourceCode) {
  time = new Date()

  const header = [
    `//${time}`,
    "//Base:https://github.com/echo094/decode-js",
    "//Modify:https://github.com/smallfawn/decode_action"
  ].join('\n')

  const finalCode = await beautify.formatCode(processedCode)

  const outputCode = header + '\n' + finalCode

  fs.writeFile(decodeFile, outputCode, (err) => {
    if (err) throw err
    console.log(`使用插件链 ${pluginUsed} 成功处理并格式化写入文件 ${decodeFile}`)
  })
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`)
}
