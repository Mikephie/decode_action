// ============ plugin/aadecode.js ============
/**
 * AADecode 第一阶段 - 处理标准 aaencode 混淆
 */
export default function decodeAA(code) {
  // 检查是否包含AAEncode特征
  if (!/ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ/.test(code)) return code;
  
  console.log('[aadecode] 检测到AAEncode特征，开始解码...');
  
  try {
    // 方法1：捕获alert输出
    let result = '';
    const captureCode = `
      var alert = function(msg) { return msg; };
      var console = { log: function(msg) { return msg; } };
      ${code}
    `;
    
    try {
      result = eval(captureCode);
      if (result && typeof result === 'string') {
        console.log('[aadecode] 通过alert捕获到结果');
        return result;
      }
    } catch (e) {
      // 忽略这个错误，尝试下一个方法
    }
    
    // 方法2：分析构建的字符串
    if (code.includes('(ﾟДﾟ) [\'_\']') || code.includes('(ﾟДﾟ) ["_"]')) {
      try {
        // 创建一个安全的执行环境
        const sandbox = {};
        const func = new Function('sandbox', `
          with(sandbox) {
            ${code}
          }
        `);
        
        // 捕获alert输出
        let capturedOutput = '';
        sandbox.alert = function(msg) { capturedOutput = msg; };
        sandbox.console = { log: function(msg) { capturedOutput = msg; } };
        
        // 执行代码
        func(sandbox);
        
        if (capturedOutput) {
          console.log('[aadecode] 通过sandbox执行捕获到结果');
          return capturedOutput;
        }
        
        // 如果没有直接输出，尝试提取构建的字符串
        const setupMatch = code.match(/^[\s\S]+?(?=\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\()/);
        const exprMatch = code.match(/\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\(\s*\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\(([^)]+)\)\s*\([^)]+\)\s*\)/);
        
        if (setupMatch && exprMatch) {
          const setupCode = setupMatch[0];
          const expression = exprMatch[1];
          
          // 在新的作用域中执行
          const decodeFunc = new Function(`
            ${setupCode}
            return ${expression};
          `);
          
          const decodedString = decodeFunc();
          
          // 解析八进制转义序列
          if (decodedString && typeof decodedString === 'string' && decodedString.includes('\\')) {
            let finalResult = '';
            const parts = decodedString.split('\\');
            for (let i = 1; i < parts.length; i++) {
              if (parts[i] && /^\d{1,3}$/.test(parts[i])) {
                const charCode = parseInt(parts[i], 8);
                finalResult += String.fromCharCode(charCode);
              }
            }
            if (finalResult) {
              console.log('[aadecode] 成功解析八进制字符串');
              return finalResult;
            }
          }
        }
      } catch (e) {
        console.log('[aadecode] 方法2失败:', e.message);
      }
    }
    
    // 方法3：完整执行并捕获所有可能的输出
    try {
      // 使用Function构造器创建独立的执行环境
      let output = '';
      const executeCode = new Function(`
        let alert = function(msg) { return msg; };
        let console = { log: function(msg) { return msg; } };
        let document = { write: function(msg) { return msg; } };
        let result = '';
        
        try {
          ${code}
        } catch(e) {
          // 尝试捕获最后的alert调用
          if (e.message && e.message.includes('is not a function')) {
            // 可能是最后的结果
            const match = e.message.match(/(.+) is not a function/);
            if (match) result = match[1];
          }
        }
        
        return result || (typeof alert.lastCall !== 'undefined' ? alert.lastCall : '');
      `);
      
      output = executeCode();
      
      if (output) {
        console.log('[aadecode] 通过完整执行捕获到结果');
        return output;
      }
    } catch (e) {
      console.log('[aadecode] 方法3失败:', e.message);
    }
    
  } catch (e) {
    console.warn('[aadecode] 解码过程出错:', e.message);
  }
  
  return code;
}