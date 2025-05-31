export default function kaomojiFuckPlugin(code) {
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)
  if (!isKaomoji) return null

  try {
    let captured = null

    // 注入 sandbox 中的 '_' 函数，捕获被传入的字符串
    const sandbox = {
      ['_']: function(input) {
        captured = input
        return input
      }
    }

    const handler = {
      has: () => true,
      get: (_, key) => sandbox[key] || (() => key)
    }

    const fakeGlobal = new Proxy({}, handler)

    // 执行 kaomoji 构造函数，实际只提取 eval 参数
    const fn = new Function('with(this) { ' + code + ' }')
    fn.call(fakeGlobal)

    if (typeof captured === 'string') {
      console.log(`[kaomoji] ✅ 解包成功，捕获长度: ${captured.length}`)
      return captured
    }
  } catch (e) {
    console.warn(`[kaomoji] ❌ 执行失败: ${e.message}`)
  }

  return null
}