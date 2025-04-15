/**
 * 直接执行 AA 解码器
 * 使用浏览器兼容的环境执行 AA 编码
 */

import fs from 'fs';
import vm from 'vm';

// 读取输入文件
const inputFile = process.argv[2] || 'input.js';
const outputFile = process.argv[3] || 'output_direct.js';

try {
  const aaCode = fs.readFileSync(inputFile, 'utf8');

  // 创建一个模拟浏览器环境的上下文
  const browserContext = {
    window: {},
    document: {},
    navigator: { userAgent: 'Node.js AA Decoder' },
    console: console,
    // 为浏览器环境提供一些函数
    atob: (str) => Buffer.from(str, 'base64').toString('binary'),
    btoa: (str) => Buffer.from(str, 'binary').toString('base64'),
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    result: null  // 将存储解码结果
  };

  // 添加一些浏览器属性
  browserContext.window.window = browserContext.window;
  browserContext.window.document = browserContext.document;
  browserContext.window.navigator = browserContext.navigator;
  browserContext.window.console = browserContext.console;

  // 准备解码脚本
  // 修改 AA 编码为直接返回解码结果，而不是执行它
  let decodingScript = aaCode;
  
  // 将 AA 编码修改为可捕获结果的形式
  decodingScript = decodingScript.replace(/\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*['"]_['"]\s*\)\s*;?\s*$/, ");");
  decodingScript = decodingScript.replace(/\(ﾟДﾟ\)\s*\[\s*['"]_['"]\s*\]\s*\(/, "result = (");
  
  // 包装在 try-catch 中
  decodingScript = `
    try {
      ${decodingScript}
      console.log('AA 解码执行成功');
    } catch (error) {
      console.error('AA 解码执行错误:', error.message);
    }
  `;

  // 在虚拟机中执行解码
  console.log('开始直接执行 AA 解码...');
  vm.createContext(browserContext);
  vm.runInContext(decodingScript, browserContext);

  // 检查解码结果
  if (browserContext.result) {
    console.log('成功获取解码结果');
    fs.writeFileSync(outputFile, browserContext.result);
    console.log(`解码结果已保存到 ${outputFile}`);
  } else {
    console.log('未能获取解码结果，尝试备用方法...');
    
    // 备用方法：将代码转换为可评估的形式
    const modifiedCode = `
      function aadecode() {
        ${aaCode.replace(/\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*['"]_['"]\s*\)\s*;?\s*$/, ")")}
        return eval((ﾟДﾟ) ['_'] ((ﾟДﾟ) ['_'] ()));
      }
      result = aadecode();
    `;
    
    try {
      vm.runInContext(modifiedCode, browserContext);
      if (browserContext.result) {
        console.log('备用方法成功获取解码结果');
        fs.writeFileSync(outputFile, browserContext.result);
        console.log(`解码结果已保存到 ${outputFile}`);
      } else {
        console.log('所有方法均未获取到解码结果');
      }
    } catch (backupError) {
      console.error('备用方法执行失败:', backupError.message);
    }
  }
} catch (error) {
  console.error('解码过程出错:', error.message);
}