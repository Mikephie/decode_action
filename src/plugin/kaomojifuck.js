export default function kaomojiFuckPlugin(code) {
  // 更稳健的 KaomojiFuck 特征匹配
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)

  if (!isKaomoji) return null

  try {
    const result = (new Function(code))()

    if (typeof result === 'string' && result.trim() !== code.trim()) {
      console.log(`[kaomoji] 解包成功，长度: ${result.length}`)
      return result
    }

    // 可选：非字符串返回 fallback null
    return null
  } catch (e) {
    console.warn(`[kaomoji] 执行失败: ${e.message}`)
    return null
  }
}