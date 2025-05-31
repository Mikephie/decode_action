export default function kaomojiFuckPlugin(code) {
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)
  if (!isKaomoji) return null

  try {
    let captured = null

    // 拦截 `_` 调用的 payload
    const sandbox = {
      _: function(input) {
        captured = input
        return input
      }
    }

    const proxy = new Proxy(sandbox, {
      has: () => true,
      get: (target, key) => {
        if (key in target) return target[key]
        return () => undefined // 返回 dummy 函数，防止执行失败
      }
    })

    // 关键点：**只执行到 (ﾟДﾟ)['_'](...)('_')，不真正运行 payload**
    const fn = new Function('with(this) { ' + code + ' }')
    fn.call(proxy)

    if (typeof captured === 'string') {
      console.log(`[kaomoji] ✅ 捕获 eval 内容，长度: ${captured.length}`)
      return captured
    }
  } catch (e) {
    console.warn(`[kaomoji] ❌ 执行失败: ${e.message}`)
  }

  return null
}