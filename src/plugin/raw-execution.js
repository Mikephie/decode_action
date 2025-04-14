import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 处理有语法错误的 Kaomoji 脚本的特殊方法
export function executeRaw(code) {
  try {
    console.log('[RawExecution] 尝试特殊方法执行有问题的 Kaomoji 代码');
    
    // 首先尝试修复常见错误
    let fixedCode = code;
    
    // 修复 ﾟωﾟi iﾉ==3 这种语法错误
    fixedCode = fixedCode.replace(/ﾟωﾟi iﾉ==3/g, '"ﾟωﾟi iﾉ==3"');
    
    // 保存修复后的代码
    const tempFixedFile = path.join(process.cwd(), 'temp_fixed_kaomoji.js');
    fs.writeFileSync(tempFixedFile, fixedCode);
    
    // 创建一个专门的执行脚本
    const executeScript = `
    const fs = require('fs');
    const path = require('path');

    // 读取修复后的代码
    const fixedCode = fs.readFileSync('${tempFixedFile.replace(/\\/g, '\\\\')}', 'utf-8');
    
    // 创建一个骨架结构，模拟执行环境
    try {
      // 创建全局变量作为结果容器
      global._captured_result = null;
      
      // 重新定义 Function.prototype._
      const originalFunctionPrototype_ = Function.prototype._;
      Function.prototype._ = function(arg) {
        // 捕获传递给方法的参数
        global._captured_result = arg;
        return this;
      };
      
      // 执行代码
      eval(fixedCode);
      
      // 如果 _captured_result 有内容，打印出来
      if (typeof global._captured_result === 'string') {
        console.log("RESULT_START");
        console.log(global._captured_result);
        console.log("RESULT_END");
      } else {
        console.log("NO_RESULT_CAPTURED");
      }
      
      // 恢复原始方法
      if (originalFunctionPrototype_) {
        Function.prototype._ = originalFunctionPrototype_;
      } else {
        delete Function.prototype._;
      }
    } catch (error) {
      console.error('执行错误:', error);
    }
    `;
    
    // 保存执行脚本
    const executorFile = path.join(process.cwd(), 'kaomoji_executor.js');
    fs.writeFileSync(executorFile, executeScript);
    
    // 执行并捕获输出
    const output = execSync(`node ${executorFile}`, { encoding: 'utf-8' });
    
    // 清理临时文件
    try {
      fs.unlinkSync(tempFixedFile);
      fs.unlinkSync(executorFile);
    } catch (cleanupError) {
      console.error('清理临时文件失败:', cleanupError);
    }
    
    // 从输出中提取结果
    const resultMatch = output.match(/RESULT_START\n([\s\S]*?)\nRESULT_END/);
    if (resultMatch && resultMatch[1]) {
      console.log('[RawExecution] 成功获取解密结果');
      return resultMatch[1];
    }
    
    console.log('[RawExecution] 执行成功但未捕获到结果');
    
    // 如果没有捕获到结果，尝试另一种方法：直接从源码中提取一些可能有意义的片段
    const extractedMatch = code.match(/\['_'\]\s*\(\s*\['_'\]\s*\(([\s\S]+?)\)\)/);
    if (extractedMatch) {
      console.log('[RawExecution] 尝试从源码中提取有意义的部分');
      
      // 提取内部字符串形式的代码
      const innerParts = extractedMatch[1]
        .replace(/\+/g, '')
        .replace(/\(ﾟΘﾟ\)/g, "'a'")
        .replace(/\(ﾟｰﾟ\)/g, "'b'")
        .replace(/\(c\^_\^o\)/g, "'c'")
        .replace(/\(o\^_\^o\)/g, "'d'")
        .replace(/\(ﾟДﾟ\)/g, "'e'");
      
      // 尝试直接返回这部分内容
      return `/* 无法完全解密，以下是提取的内容片段：*/\n\n${innerParts}`;
    }
    
    return null;
  } catch (error) {
    console.error('[RawExecution] 执行失败:', error.message);
    return null;
  }
}

export default {
  executeRaw
};
