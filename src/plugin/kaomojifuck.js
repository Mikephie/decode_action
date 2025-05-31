export default function kaomojiFuckPlugin(code) {
  if (!/ﾟ[\wﾟ]+\s*=/.test(code)) return null // 快速检测

  try {
    const result = (new Function(code))()
    if (typeof result === 'string') return result
    return code
  } catch (e) {
    return null
  }
}