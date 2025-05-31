/**
 * AADecode 终极版 - 使用 vm 模块
 */
import vm from 'vm';

function decodeAA(code) {
  if (!/ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ/.test(code)) return code;
  
  console.log('[aadecode] 检测到AAEncode特征，开始解码...');
  
  try {
    // 创建沙箱环境
    let capturedOutput = '';
    const sandbox = {
      alert: (msg) => { capturedOutput = String(msg); },
      console: { log: (msg) => { capturedOutput = String(msg); } }
    };
    
    // 创建上下文
    const context = vm.createContext(sandbox);
    
    // 执行代码
    try {
      vm.runInContext(code, context);
    } catch (e) {
      // 从错误信息提取结果
      if (e.message && e.message.includes('is not defined')) {
        const match = e.message.match(/(\w+) is not defined/);
        if (match) capturedOutput = match[1];
      }
    }
    
    if (capturedOutput) {
      console.log('[aadecode] 解码成功:', capturedOutput);
      return capturedOutput;
    }
  } catch (e) {
    console.warn('[aadecode] 解码失败:', e.message);
  }
  
  return code;
}

export default decodeAA;