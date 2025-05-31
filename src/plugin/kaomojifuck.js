export default function aadecode(code) {
  if (!/ﾟωﾟﾉ=/.test(code)) return null

  try {
    // 提取 (ﾟДﾟ)['_']("alert(...)")('_') 中的 "alert(...)"
    const match = code.match(/\['_'\]\((.*?)\)\s*\(.*?\)/)
    if (!match) return null

    const encoded = match[1]
    const fn = new Function(`return ${encoded}`)
    const result = fn()

    if (typeof result === 'string') {
      console.log(`[aadecode] ✅ 解码成功，长度: ${result.length}`)
      return result
    }
  } catch (e) {
    console.warn(`[aadecode] ❌ 解码失败: ${e.message}`)
  }

  return null
}