// src/plugin/aaencode.js

import { VM } from 'vm2';

/**
 * 判断是否为 AAEncode 混淆
 * @param {string} code
 * @returns {boolean}
 */
function isAAEncode(code) {
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜/.test(code);
}

/**
 * 解密 AAEncode 混淆代码
 * @param {string} code
 * @returns {string|null}
 */
export default function decodeAAencode(code) {
  if (!isAAEncode(code)) return null;

  try {
    const vm = new VM({ timeout: 1000 });
    const result = vm.run(code);
    return typeof result === 'string' ? result : null;
  } catch (err) {
    console.error('[AAEncode] 解密失败:', err.message);
    return null;
  }
}
