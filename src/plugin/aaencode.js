/**
 * 增强版AAEncode解密插件
 * 用于解密使用日语颜文字(Kaomoji)混淆的JavaScript
 * 支持多种变体和模式
 */

import { VM } from 'vm2';

/**
 * 检测脚本是否为AAEncode混淆
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否为AAEncode混淆
 */
function isAAEncode(code) {
  if (typeof code !== 'string') return false;
  
  // 基本特征检测 - AAEncode通常包含特定的颜文字模式
  const hasBasicPattern = /ﾟωﾟﾉ\s*=/.test(code) || 
                         (/ﾟДﾟ/.test(code) && /ﾟΘﾟ/.test(code));
  
  // 结构特征检测 - 典型的AAEncode有特定的函数调用模式
  const hasStructurePattern = /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]/.test(code) || 
                             /\(ﾟДﾟ\)\s*\[\s*ﾟoﾟ\s*\]/.test(code);
  
  return hasBasicPattern && hasStructurePattern;
}

/**
 * 提取AAEncode混淆中最终执行的字符串
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 提取的字符串或null
 */
function extractFinalString(code) {
  // 尝试多种模式匹配
  const patterns = [
    // 模式1: 标准AAEncode结尾模式
    /\(ﾟДﾟ\)\s*\[\s*ﾟoﾟ\s*\]\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 模式2: Function._调用模式
    /\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\]\s*\(\s*\(ﾟДﾟ\)\s*\[\s*['"]?_['"]?\s*\][^)]*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/,
    
    // 模式3: 简单的结尾字符串模式
    /\(['"]([^'"]+)['"]\)\s*;?\s*$/,
    
    // 模式4: 另一种Function._调用变体
    /\(ﾟДﾟ\)\s*\[\s*'_'\s*\]\s*\([^)]+\)\s*\(ﾟΘﾟ\)\)\s*\(\s*['"]([^"']+)['"]\s*\)/
  ];
  
  for (const pattern of patterns) {
    try {
      const match = code.match(pattern);
      if (match && match[1] && match[1].length > 0) {
        return match[1];
      }
    } catch (e) {
      // 忽略单个正则匹配错误，继续尝试其他模式
      console.error(`[AADecode] 模式匹配错误: ${e.message}`);
    }
  }
  
  return null;
}

/**
 * 使用修改过的沙箱环境执行AAEncode代码
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 执行结果或null
 */
function executeInSandbox(code) {
  try {
    // 创建一个安全的VM2沙箱
    const vm = new VM({
      timeout: 5000,
      sandbox: {
        console: {
          log: () => {},
          error: () => {},
          warn: () => {}
        }
      }
    });
    
    // 修改代码以捕获结果
    const modifiedCode = `
      (function() {
        // 设置捕获变量
        let result = null;
        
        // 修改Function和eval来捕获结果
        const originalFunction = Function;
        const originalEval = eval;
        
        // 替换eval函数
        eval = function(str) {
          if (typeof str === 'string') {
            result = str;
          }
          return str;
        };
        
        // 替换Function.prototype._方法
        Function.prototype._ = function(str) {
          if (typeof str === 'string') {
            result = str;
          }
          return this;
        };
        
        // 包装AAEncode代码
        try {
          ${code}
        } catch(e) {
          // 忽略执行错误
        }
        
        // 返回捕获的结果
        return result;
      })()
    `;
    
    return vm.run(modifiedCode);
  } catch (e) {
    console.error(`[AADecode] 沙箱执行错误: ${e.message}`);
    return null;
  }
}

/**
 * 通过替换关键部分来解码AAEncode
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 解码结果或null
 */
function decodeByReplacement(code) {
  try {
    // 替换最终执行部分，从而捕获要执行的字符串
    const modifiedCode = code.replace(
      /\(ﾟДﾟ\)\s*\[\s*ﾟoﾟ\s*\]\s*\)\s*\(\s*ﾟΘﾟ\s*\)\s*\)\s*\(\s*['"](.+?)['"]\s*\)/g,
      "return '$1';"
    );
    
    if (modifiedCode !== code) {
      // 如果代码被成功修改，创建一个函数来执行它
      const vm = new VM({
        timeout: 3000,
        sandbox: {}
      });
      
      const wrappedCode = `
        (function() {
          try {
            ${modifiedCode}
          } catch(e) {
            return null;
          }
        })()
      `;
      
      return vm.run(wrappedCode);
    }
  } catch (e) {
    console.error(`[AADecode] 替换解码错误: ${e.message}`);
  }
  
  return null;
}

/**
 * 使用Function.prototype._补丁方法解码
 * @param {string} code - AAEncode混淆代码
 * @returns {string|null} - 解码结果或null
 */
function decodeWithFunctionPatch(code) {
  try {
    const patchedCode = `
      (function() {
        // 创建捕获变量
        var capturedResult = null;
        
        // 给Function.prototype打补丁
        Function.prototype._ = function(str) {
          capturedResult = str;
          return this;
        };
        
        // 执行原始代码
        try {
          ${code}
        } catch(e) {
          // 忽略错误
        }
        
        return capturedResult;
      })()
    `;
    
    const vm = new VM({
      timeout: 3000,
      sandbox: {}
    });
    
    return vm.run(patchedCode);
  } catch (e) {
    console.error(`[AADecode] Function补丁错误: ${e.message}`);
    return null;
  }
}

/**
 * 主解码函数 - 尝试多种方法解码AAEncode
 * @param {string} code - 要解码的代码
 * @returns {string|null} - 解码后的代码或null
 */
function decodeAAencode(code) {
  if (!code || typeof code !== 'string') {
    console.log('[AADecode] 无效的输入');
    return null;
  }
  
  // 检查是否为AAEncode
  if (!isAAEncode(code)) {
    console.log('[AADecode] 不是AAEncode混淆的代码');
    return null;
  }
  
  console.log('[AADecode] 检测到AAEncode混淆，开始解密...');
  
  try {
    // 方法1: 直接从代码中提取最终字符串
    const extractedString = extractFinalString(code);
    if (extractedString) {
      console.log('[AADecode] 通过模式匹配成功提取字符串');
      return extractedString;
    }
    
    // 方法2: 通过替换关键部分解码
    const replacementResult = decodeByReplacement(code);
    if (replacementResult && typeof replacementResult === 'string' && replacementResult.length > 0) {
      console.log('[AADecode] 通过替换方法成功解码');
      return replacementResult;
    }
    
    // 方法3: 在沙箱中执行并捕获结果
    const sandboxResult = executeInSandbox(code);
    if (sandboxResult && typeof sandboxResult === 'string' && sandboxResult.length > 0) {
      console.log('[AADecode] 通过沙箱执行成功解码');
      return sandboxResult;
    }
    
    // 方法4: 使用Function.prototype._补丁
    const patchResult = decodeWithFunctionPatch(code);
    if (patchResult && typeof patchResult === 'string' && patchResult.length > 0) {
      console.log('[AADecode] 通过Function原型补丁成功解码');
      return patchResult;
    }
    
    console.log('[AADecode] 所有解码方法均失败');
    return null;
  } catch (error) {
    console.error('[AADecode] 解码过程中发生错误:', error);
    return null;
  }
}

// 导出解码函数
export default decodeAAencode;
