// AADecode Plugin
export default function(sourceCode) {
  // 检查是否包含 AAEncode 特征
  if (!sourceCode.includes('ﾟωﾟﾉ') || !sourceCode.includes('ﾟДﾟ')) {
    return sourceCode;
  }
  
  console.log('AADecode: 检测到 AAEncode 代码');
  
  try {
    // 提取内容
    let aaEncodeContent = sourceCode;
    
    // 检查是否在字符串变量中（如 var hello = "..."）
    const stringMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*"([^"]+)"/s);
    if (stringMatch && stringMatch[1].includes('ﾟωﾟﾉ')) {
      // 解码转义字符
      aaEncodeContent = stringMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
      console.log('AADecode: 从字符串变量中提取');
    }
    
    // 创建一个安全的执行环境
    const decoder = `
      (function() {
        let decodedResult = '';
        
        // 模拟 alert 函数
        const alert = function(msg) {
          decodedResult = msg;
          return msg;
        };
        
        // 模拟浏览器环境
        const window = { alert: alert };
        const document = {};
        
        try {
          // 执行 AAEncode 代码
          ${aaEncodeContent}
        } catch (e) {
          // 忽略执行错误
        }
        
        return decodedResult;
      })()
    `;
    
    // 尝试执行解码
    let result = '';
    try {
      result = eval(decoder);
      console.log('AADecode: 执行成功');
    } catch (e) {
      console.log('AADecode: 执行失败，尝试直接 eval');
      
      // 备用方法：直接执行
      const oldAlert = global.alert;
      let captured = '';
      global.alert = (msg) => { captured = msg; };
      
      try {
        eval(aaEncodeContent);
        result = captured;
      } catch (e2) {
        console.log('AADecode: 直接执行也失败:', e2.message);
      }
      
      global.alert = oldAlert;
    }
    
    // 检查结果
    if (result) {
      console.log('AADecode: 解码成功，结果:', result);
      // 如果结果不包含 alert，添加它
      if (!result.includes('alert')) {
        return `alert("${result}")`;
      }
      return result;
    }
    
    console.log('AADecode: 无法解码，返回原代码');
    return sourceCode;
    
  } catch (error) {
    console.error('AADecode 插件错误:', error);
    return sourceCode;
  }
}