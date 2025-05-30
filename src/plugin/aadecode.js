// AADecode Plugin
export default function PluginAAdecode(sourceCode) {
  // 检查是否包含 AAEncode 特征
  if (!sourceCode.includes('ﾟωﾟﾉ') || !sourceCode.includes('ﾟДﾟ')) {
    return sourceCode;
  }
  
  console.log('AADecode: 检测到 AAEncode 代码');
  
  try {
    // 提取 AAEncode 内容
    let aaContent = sourceCode;
    
    // 如果在字符串变量中
    const stringMatch = sourceCode.match(/(?:var|let|const)\s+\w+\s*=\s*["']([^"']+)["']/s);
    if (stringMatch && stringMatch[1].includes('ﾟωﾟﾉ')) {
      aaContent = stringMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
      console.log('AADecode: 从字符串变量中提取');
    }
    
    // 解码 AAEncode
    const decoded = decodeAAEncode(aaContent);
    
    if (decoded) {
      console.log('AADecode: 解码成功:', decoded);
      // 直接返回解码后的内容，格式为 alert("内容")
      return `alert("${decoded}")`;
    }
    
    console.log('AADecode: 解码失败，返回原代码');
    return sourceCode;
    
  } catch (error) {
    console.error('AADecode 错误:', error);
    return sourceCode;
  }
}

function decodeAAEncode(text) {
  try {
    // 方法1: 使用 Function 构造器创建隔离环境
    let result = '';
    
    const sandbox = new Function(`
      let capturedValue = '';
      
      // 重写 alert 函数来捕获输出
      function alert(msg) {
        capturedValue = msg;
        return msg;
      }
      
      // 设置全局 alert
      this.alert = alert;
      global.alert = alert;
      window.alert = alert;
      
      try {
        // 执行 AAEncode 代码
        ${text}
      } catch (e) {
        // 忽略执行中的错误
      }
      
      return capturedValue;
    `);
    
    result = sandbox.call({});
    
    if (result) {
      return result;
    }
    
    // 方法2: 直接在当前环境执行
    let captured = '';
    const originalAlert = global.alert;
    
    // 临时替换 alert
    global.alert = function(msg) {
      captured = msg;
      return msg;
    };
    
    try {
      // 使用 eval 执行 AAEncode 代码
      eval(text);
    } catch (e) {
      console.log('AADecode: 执行时出错（这是正常的）:', e.message);
    } finally {
      // 恢复原始 alert
      global.alert = originalAlert;
    }
    
    if (captured) {
      return captured;
    }
    
    // 方法3: 创建完全隔离的执行环境
    try {
      const vm = require('vm');
      const context = {
        alert: function(msg) {
          result = msg;
        },
        capturedResult: ''
      };
      
      vm.createContext(context);
      vm.runInContext(text + '; capturedResult = typeof alert !== "undefined" ? alert.lastCall : "";', context);
      
      if (context.capturedResult) {
        return context.capturedResult;
      }
    } catch (e) {
      // VM 方法可能不可用
      console.log('AADecode: VM 方法不可用');
    }
    
    return null;
    
  } catch (error) {
    console.error('AADecode decodeAAEncode 错误:', error);
    return null;
  }
}