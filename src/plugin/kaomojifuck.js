export default function kaomojiFuckPlugin(code) {
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)
  if (!isKaomoji) return null

  try {
    let captured = null

    // 注入 sandbox：定义 eval 模拟函数 "_"
    const sandbox = {
      '_': function(input) {
        captured = input
        return input
      }
    }

    // 安全地构造 Proxy，避免 undefined 函数异常
    const fakeGlobal = new Proxy(sandbox, {
      has: () => true,
      get: (target, key) => {
        if (key in target) return target[key]
        // 返回一个 dummy 函数避免调用时报错
        return () => undefined
      }
    })

    // 使用 with(this) 执行代码（模拟全局变量环境）
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