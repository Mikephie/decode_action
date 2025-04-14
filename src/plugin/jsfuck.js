import { isKaomojiFuck, simpleFormat } from './common.js';

export function handle(code) {
  if (!isKaomojiFuck(code)) {
    return code;
  }

  console.log('检测到 JSFuck 或 Kaomoji 混淆，尝试解密...');

  try {
    // 方法 1: 直接使用 Function 执行，这适用于大多数 JSFuck 和一些 Kaomoji
    try {
      const result1 = Function('"use strict";return (' + code + ')')();
      if (typeof result1 === 'string' && result1.length > 0) {
        console.log('解密成功 (方法 1)');
        return result1;
      }
    } catch (e) {
      console.log('方法 1 失败:', e.message);
    }

    // 方法 2: 创建模拟环境执行，适用于一些需要 window 对象的 Kaomoji
    try {
      const fakeWindow = {};
      const fakeDocument = {};
      const fakeSelf = {};
      
      const evalCode = `
        (function(window, document, self) {
          return ${code}
        })(fakeWindow, fakeDocument, fakeSelf)
      `;
      
      const result2 = Function('"use strict";return (' + evalCode + ')')();
      if (typeof result2 === 'string' && result2.length > 0) {
        console.log('解密成功 (方法 2)');
        return result2;
      }
    } catch (e) {
      console.log('方法 2 失败:', e.message);
    }
    
    // 方法 3: 查找并提取 _() 函数调用的结果，这适用于某些 Kaomoji 格式
    const match = code.match(/\['_'\]\s*\(\s*\['_'\]\s*\((.*)\)\)/);
    if (match) {
      try {
        // 尝试提取内部字符串并直接评估
        const innerCode = 'return ' + match[1].replace(/\+/g, '');
        const result3 = Function(innerCode)();
        if (typeof result3 === 'string' && result3.length > 0) {
          console.log('解密成功 (方法 3)');
          return result3;
        }
      } catch (e) {
        console.log('方法 3 失败:', e.message);
      }
    }

    console.log('所有解密方法均失败，使用 simpleFormat 降级处理');
    return simpleFormat(code);
  } catch (e) {
    console.log('解密过程中出现未预期的错误:', e);
    console.log('使用 simpleFormat 降级处理');
    return simpleFormat(code);
  }
}

// ES Module export
export default {
  handle
};
