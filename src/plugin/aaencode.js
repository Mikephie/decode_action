import { VM } from 'vm2';

function isAAEncode(code) {
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜/.test(code);
}

function sandboxEval(code) {
  const vm = new VM({
    timeout: 1000,
    sandbox: {},
  });
  return vm.run(code);
}

export default function decodeAAencode(code) {
  if (!isAAEncode(code)) return null;

  try {
    let result = sandboxEval(code);

    let maxDepth = 5;
    while (typeof result !== 'string' && maxDepth--) {
      result = sandboxEval(result);
    }

    if (typeof result === 'string') {
      return result;
    }

    return null;
  } catch (err) {
    console.error('[AAEncode] 解密失败:', err.message);
    return null;
  }
}
