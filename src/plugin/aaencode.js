import { VM } from 'vm2';

/**
 * 判断是否为 AAEncode 混淆
 */
function isAAEncode(code) {
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜/.test(code);
}

/**
 * 自动执行沙盒解码
 */
function sandboxEval(code) {
  const vm = new VM({
    timeout: 1000,
    sandbox: {},
  });

  return vm.run(code);
}

/**
 * 自动递归解码 AAEncode
 */
export default function decodeAAencode(code) {
  if (!isAAEncode(code)) return null;

  try {
    let result = sandboxEval(code);

    while (typeof result !== 'string') {
      result = sandboxEval(result);
    }

    return result;
  } catch (err) {
    console.error('[AAEncode] 解密失败:', err.message);
    return null;
  }
}
