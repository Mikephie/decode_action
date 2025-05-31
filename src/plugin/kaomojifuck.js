export default function kaomojiFuckPlugin(code) {
  const isKaomoji = /ﾟ[\wﾟ]+\s*=/.test(code) || /[(ﾟДﾟ)]\s*\['_'\]/.test(code)
  if (!isKaomoji) return null

  try {
    let captured = null

    // 拦截 `_` 函数，捕获参数（即 payload）
    const sandbox = {
      '_': function(input) {
        captured = input
        return