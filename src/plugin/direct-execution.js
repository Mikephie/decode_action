// 这个文件作为备选方案，如果其他方法都失败了
// 需要保存为 plugin/direct-execution.js

import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// 使用临时文件和 Node.js 直接执行混淆代码
export function executeKaomoji(code) {
  try {
    console.log('[DirectExecution] 尝试通过临时文件和 Node.js 直接执行 Kaomoji 代码');
    
    // 创建一个包装脚本，捕获执行结果
    const wrapperCode = `
      // 捕获可能的结果
      let _captured_result = '';
      
      // 重写 Function.prototype._
      Function.prototype._ = function(arg) {
        _captured_result = arg;
        return this;
      };
      
      // 执行混淆代码
      ${code}
      
      // 输出结果到 stdout
      if (typeof _captured_result === 'string') {
        console.log('RESULT_START');
        console.log(_captured_result);
        console.log('RESULT_END');
      }
    `;
    
    // 保存到临时文件
    const tempFile = path.join(process.cwd(), 'temp_kaomoji_execute.js');
    fs.writeFileSync(tempFile, wrapperCode);
    
    // 执行临时文件并捕获输出
    const output = execSync(`node ${tempFile}`, { encoding: 'utf-8' });
    
    // 删除临时文件
    fs.unlinkSync(tempFile);
    
    // 从输出中提取结果
    const resultMatch = output.match(/RESULT_START\n([\s\S]*?)\nRESULT_END/);
    if (resultMatch && resultMatch[1]) {
      console.log('[DirectExecution] 成功获取结果');
      return resultMatch[1];
    }
    
    console.log('[DirectExecution] 执行成功但未捕获到结果');
    return null;
  } catch (error) {
    console.error('[DirectExecution] 执行失败:', error.message);
    return null;
  }
}

// ES Module export format
export default {
  executeKaomoji
};
