import { simpleFormat } from './common.js'

/**
 * 递归解包 eval 包裹代码
 */
export function unpack(code) {
  let unpacked = ''
  const fakeEval = (payload) => {
    unpacked = payload
    return payload
  }

  const safeCode = code.replace(/eval\s*\(/, 'fakeEval(')

  try {
    const func = new Function('fakeEval', 'String', 'RegExp', safeCode)
    func(fakeEval, String, RegExp)

    if (unpacked && unpacked !== code) {
      console.log('eval.js 解包成功')
      return unpacked
    }

    console.log('eval.js 解包失败 fallback')
    return code
  } catch (e) {
    console.log(`eval.js 解包异常: ${e.message} fallback`)
    return code
  }
}

export default {
  unpack
}
