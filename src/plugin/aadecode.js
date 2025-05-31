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
    if (code.includes('(ﾟДﾟ) [\'_\']')) {
      // 提取执行部分之前的所有代码
      const setupMatch = code.match(/^[\s\S]+?(?=\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\()/);
      if (setupMatch) {
        const setupCode = setupMatch[0];
        
        // 提取要执行的表达式
        const exprMatch = code.match(/\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\(\s*\(ﾟДﾟ\)\s*\[['"]_['"]\]\s*\(([^)]+)\)\s*\([^)]+\)\s*\)/);
        if (exprMatch) {
          const expression = exprMatch[1];
          
          // 执行setup代码并计算表达式
          eval(setupCode);
          const decodedString = eval(expression);
          
          // 解析八进制转义序列
          if (decodedString && decodedString.includes('\\')) {
            let finalResult = '';
            const parts = decodedString.split('\\');
            for (let i = 1; i < parts.length; i++) {
              if (parts[i]) {
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
      }
    }
    
    // 方法3：完整执行并捕获所有可能的输出
    const sandbox = {
      _output: '',
      alert: function(msg) { this._output = msg; },
      console: { log: function(msg) { sandbox._output = msg; } },
      document: { write: function(msg) { sandbox._output = msg; } }
    };
    
    const sandboxCode = `
      (function(alert, console, document) {
        ${code}
      })(sandbox.alert.bind(sandbox), sandbox.console, sandbox.document);
    `;
    
    eval(sandboxCode);
    
    if (sandbox._output) {
      console.log('[aadecode] 通过沙箱执行捕获到结果');
      return sandbox._output;
    }
    
  } catch (e) {
    console.warn('[aadecode] 解码过程出错:', e.message);
  }
  
  return code;
}