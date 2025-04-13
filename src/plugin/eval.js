import { isKaomojiFuck, simpleFormat } from './common.js'

export function unpack(code) {
  if (isKaomojiFuck(code)) {
    console.log('检测到 Kaomoji / JSFuck 混淆代码，eval 解包跳过！直接返回原始代码')
    return code;
  }

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
      console.log('eval 解包成功')
      return unpacked
    }

    console.log('eval 解包失败，自动 fallback 原始 code')
    return code;
  } catch (e) {
    console.log(`eval 解包异常: ${e.message}，fallback 原始 code`)
    return code;
  }
}

export default {
  unpack
}
