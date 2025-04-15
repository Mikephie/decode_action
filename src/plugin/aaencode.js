import { VM } from 'vm2';

function isAAEncode(code) {
  return /ﾟωﾟ|｀;´|´_ゝ`|＞＜|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ|o\^_\^o|c\^_\^o/.test(code);
}

function sandboxEval(encodeCode) {
  const vm = new VM({
    timeout: 3000,
    sandbox: {
      console: {
        log: () => {},
        error: () => {},
        warn: () => {}
      }
    }
  });
  try {
    return vm.run(encodeCode);
  } catch (error) {
    console.error('[AAEncode] VM 执行失败:', error.message);
    return null;
  }
}

export default function handle(sourceCode) {
  if (!isAAEncode(sourceCode)) {
    return sourceCode;
  }

  console.log('[AAEncode] 检测到混淆脚本，尝试解密...');

  // 包裹执行环境
  const wrappedCode = `
    var result = "";
    function print(text) { result += text; }
    ${sourceCode}
    result;
  `;

  const decoded = sandboxEval(wrappedCode);

  if (decoded && decoded.length > 20) {
    console.log('[AAEncode] 解密成功，返回解密结果');
    return decoded;
  }

  console.log('[AAEncode] 解密失败或无变化');
  return sourceCode;
}