import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * Dean Edwards Packer解包函数
 * @param {string} code - 打包的代码
 * @returns {object|null} - 返回解包参数对象或null
 */
function unpackDeanEdwardsPacker(code) {
  // 匹配Dean Edwards Packer的模式
  const packerPattern = /eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*d\s*\)\s*\{[\s\S]*?\}\s*\(\s*'([\s\S]*?)'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'([\s\S]*?)'\s*\.split\s*\(\s*'([^']+)'\s*\)\s*,\s*(\d+)\s*,\s*\{\s*\}\s*\)\s*\)/;
  
  const match = code.match(packerPattern);
  if (!match) return null;
  
  return {
    payload: match[1],
    radix: parseInt(match[2]),
    count: parseInt(match[3]),
    words: match[4].split(match[5]),
    countCheck: parseInt(match[6])
  };
}

/**
 * 执行Dean Edwards解包算法
 * @param {object} params - 解包参数
 * @returns {string} - 解包后的代码
 */
function executeDeanEdwardsUnpacker(params) {
  const { payload, radix, count, words } = params;
  
  // Dean Edwards的解码函数
  const decode = function(c) {
    c = parseInt(c, radix);
    return (c < radix ? '' : decode(Math.floor(c / radix))) + 
           ((c = c % radix) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
  };
  
  // 构建替换字典
  const dictionary = {};
  for (let i = 0; i < count; i++) {
    const key = decode(i);
    dictionary[key] = words[i] || key;
  }
  
  // 执行替换
  let unpacked = payload;
  for (let i = count - 1; i >= 0; i--) {
    const key = decode(i);
    if (dictionary[key]) {
      const regex = new RegExp('\\b' + key + '\\b', 'g');
      unpacked = unpacked.replace(regex, dictionary[key]);
    }
  }
  
  return unpacked;
}

/**
 * 解包eval加密的代码 - 增强版
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function unpack(code) {
  try {
    // 如果不包含eval，直接返回null
    if (!code.includes('eval')) {
      return null;
    }
    
    console.log('[eval]尝试检测是否为 eval 加密');
    console.log('[eval]检测到 eval 加密，正在解密...');
    const startTime = Date.now();
    
    // 检查是否是Dean Edwards Packer
    const packerParams = unpackDeanEdwardsPacker(code);
    if (packerParams) {
      try {
        let result = executeDeanEdwardsUnpacker(packerParams);
        
        // 如果结果仍包含eval，递归解包
        if (result && result.includes('eval')) {
          result = unpack(result);
        }
        
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      } catch (e) {
        console.log('[eval]Dean Edwards解包失败，尝试其他方法');
      }
    }
    
    // 方法2: 使用VM模块执行（Node.js环境）
    try {
      const vm = require('vm');
      let result = null;
      
      // 创建沙箱环境
      const sandbox = {
        eval: function(code) {
          result = code;
          return code;
        },
        String: String,
        parseInt: parseInt,
        RegExp: RegExp,
        console: console
      };
      
      // 在沙箱中执行代码
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { timeout: 5000 });
      
      if (result) {
        // 如果结果仍包含eval，递归解包
        if (typeof result === 'string' && result.includes('eval')) {
          result = unpack(result);
        }
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    } catch (vmError) {
      // VM方法失败，尝试其他方法
    }
    
    // 方法3: 使用Function构造器
    try {
      let result = null;
      
      // 替换eval为捕获函数
      const modifiedCode = code.replace(/\beval\b/g, '(function(x) { result = x; return x; })');
      
      // 创建全局捕获变量
      global.__evalCapture = null;
      
      // 执行修改后的代码
      const func = new Function('result', 'String', 'parseInt', 'RegExp', `
        let result = null;
        ${modifiedCode}
        return result;
      `);
      
      result = func(null, String, parseInt, RegExp);
      
      if (result) {
        // 如果结果仍包含eval，递归解包
        if (typeof result === 'string' && result.includes('eval')) {
          result = unpack(result);
        }
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    } catch (funcError) {
      // Function方法失败
    }
    
    // 方法4: 使用Babel AST分析
    try {
      let ast = parse(code, { 
        errorRecovery: true,
        sourceType: 'script'
      });
      
      let result = null;
      
      traverse(ast, {
        CallExpression(path) {
          if (path.node.callee.name === 'eval') {
            const arg = path.node.arguments[0];
            
            // 处理函数调用表达式
            if (t.isCallExpression(arg)) {
              try {
                // 生成整个eval调用的代码
                const evalCode = generator(path.node).code;
                // 使用Function执行并捕获结果
                const func = new Function('return ' + evalCode.replace(/^eval\(/, '('));
                result = func();
                path.stop();
              } catch (e) {
                // 继续尝试
              }
            }
            // 处理字符串字面量
            else if (t.isStringLiteral(arg)) {
              result = arg.value;
              path.stop();
            }
          }
        }
      });
      
      if (result) {
        // 如果结果仍包含eval，递归解包
        if (typeof result === 'string' && result.includes('eval')) {
          result = unpack(result);
        }
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    } catch (astError) {
      // AST方法失败
    }
    
    console.log('[eval]所有解密方法都失败了');
    return null;
    
  } catch (error) {
    console.error('[eval]Eval解包发生错误:', error);
    return null;
  }
}

/**
 * 打包函数 - 将代码包装在IIFE中
 * @param {string} code - 要打包的代码
 * @returns {string} - 打包后的代码
 */
function pack(code) {
  let ast1 = parse('(function(){}())')
  let ast2 = parse(code)
  traverse(ast1, {
    FunctionExpression(path) {
      let body = t.blockStatement(ast2.program.body)
      path.replaceWith(t.functionExpression(null, [], body))
      path.stop()
    },
  })
  return generator(ast1, { minified: false }).code
}

/**
 * 检测代码是否包含eval调用
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否包含eval
 */
function detect(code) {
  return code.includes('eval');
}

// 导出模块
export default {
  unpack,
  pack,
  detect,
  // 兼容插件接口
  plugin: unpack
}