// src/plugins/aaencode.js

const { VM } = require('vm2');

/**
 * 判断是否为 AAEncode 混淆
 * @param {string} code - 输入待判断的源码
 * @returns {boolean}
 */
function isAAEncode(code) {
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜/.test(code);
}

/**
 * 解密 AAEncode 混淆代码
 * @param {string} code - 输入的混淆源码
 * @returns {string|null} - 解密后的源码，失败返回 null
 */
function decodeAAencode(code) {
  if (!isAAEncode(code)) return null;

  try {
    const vm = new VM({
      timeout: 1000,
      sandbox: {},
    });

    const result = vm.run(code);

    return typeof result === 'string' ? result : null;
  } catch (err) {
    console.error('[AAEncode] 解密失败:', err.message);
    return null;
  }
}

module.exports = decodeAAencode;
