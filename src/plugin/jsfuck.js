// plugin/jsfuck.js

import { isKaomojiFuck, simpleFormat } from './common.js';

export function handle(code) {
  if (!isKaomojiFuck(code)) {
    return code;
  }

  console.log('检测到 JSFuck 或 Kaomoji 混淆，尝试解密...');

  try {
    const fakeWindow = {};
    const fakeEval = (payload) => payload;

    const evalCode = `
      (function(window, self) {
        return ${code}
      })(Object.create(null), Object.create(null))
    `;

    const result = Function('"use strict";return (' + evalCode + ')')();

    if (typeof result === 'string' && result.length > 0) {
      console.log('解密成功');
      return result;
    }
  } catch (e) {
    console.log('解密失败，自动使用 simpleFormat 降级处理:', e.message);
    return simpleFormat(code);
  }

  return code;
}

export default {
  handle
};
