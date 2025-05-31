export default function kaomojiFuckPlugin(code) {
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)
  if (!isKaomoji) return null

  try {
    // 提取 _['']("payload")('_') 中的 payload
    const match = code.match(/_'\]\(\s*["'`](.*?)["'`]\s*\)/)
    if (match && match[1]) {
      const payload = match[1]
      console.log(`[kaomoji] ✅ 提取成功，eval 参数长度: ${payload.length}`)
      return `eval("${payload}")`
    }
  } catch (e) {
    console.warn(`[kaomoji] ❌ 提取失败: ${e.message}`)
  }

  return null
}