import { isKaomojiFuck, simpleFormat } from './common.js'

export function handle(code) {
  if (!isKaomojiFuck(code)) return code;

  console.log('检测到 JSFuck / Kaomoji 混淆，尝试解密...');

  try {
    const result = Function('"use strict";return (' + code + ')')();
    if (typeof result === 'string' && result.length > 0) {
      console.log('JSFuck 解密成功');
      return result;
    }
  } catch (e) {
    console.log(`JSFuck 解密失败: ${e.message}，fallback 原始 code`);
    return code;
  }

  return code;
}

export default {
  handle
}
