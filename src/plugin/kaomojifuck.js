export default function kaomojiFuckPlugin(code) {
  if (!code.includes('(ﾟДﾟ)') || !code.includes("['_']")) return null

  try {
    let captured = null

    // sandbox: 提供 _ 拦截调用
    const sandbox = {
      _: function(input) {
        captured = input
        return input
      }
    }

    // fallback 变量都用空函数处理
    const proxy = new Proxy(sandbox, {
      has: () => true,
      get: () => () => undefined
    })

    const fn = new Function('with(this) { ' + code + ' }')
    fn.call(proxy)

    if (typeof captured === 'string') {
      console.log(`[kaomoji] ✅ 成功捕获 eval 字符串，长度: ${captured.length}`)
      return captured
    }

    return null
  } catch (e) {
    console.warn(`[kaomoji] ❌ 执行失败: ${e.message}`)
    return null
  }
}