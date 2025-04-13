/**
 * JSFuck 解密插件 (decode-js 专用)
 * Author: Mikephie
 */

export function handle(code) {
  const detectPattern = /^[\s\n]*[\[\]\(\)\!\+]{10,}[\s\S]*$/;

  if (!detectPattern.test(code)) {
    return code;
  }

  try {
    console.log('检测到 JSFuck 混淆代码，开始尝试解密...');

    const fakeWindow = {};
    const fakeEval = (payload) => {
      return payload;
    };

    const evalCode = `
      (function(window, self) {
        return ${code}
      })(Object.create(null), Object.create(null))
    `;

    const result = Function('"use strict";return (' + evalCode + ')')();

    if (typeof result === 'string' && result.length > 0) {
      console.log('JSFuck 解密成功');
      return result;
    }
  } catch (e) {
    console.log('JSFuck 解密失败:', e);
  }

  return code;
}

export default {
  handle
};
