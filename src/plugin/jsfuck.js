import { isKaomojiFuck, simpleFormat } from './common.js'

/**
 * JSFuck / Kaomoji 解密处理
 * 必须尝试解密，失败 fallback 原代码
 */
export function handle(code) {
  if (!isKaomojiFuck(code)) {
    return code
  }

  console.log('检测到 JSFuck / Kaomoji 混淆，开始尝试解密...')

  try {
    const evalCode = `
      (function(window, self) {
        return ${code}
      })(Object.create(null), Object.create(null))
    `

    const result = Function('"use strict";return (' + evalCode + ')')()

    if (typeof result === 'string' && result.length > 0) {
      console.log('jsfuck.js 解密成功')
      return result
    }

    console.log('jsfuck.js 解密失败 fallback')
    return code
  } catch (e) {
    console.log(`jsfuck.js 解密异常: ${e.message} fallback`)
    return code
  }
}

export default {
  handle
}
