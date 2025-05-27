import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * 解包eval加密的代码 - 增强版
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null（解包失败时）
 */
function unpack(code) {
  try {
    // 如果不包含eval，直接返回null
    if (!code.includes('eval(') && !code.includes('eval (')) {
      return null;
    }
    
    console.log('[eval]尝试检测是否为 eval 加密');
    console.log('[eval]检测到 eval 加密，正在解密...');
    const startTime = Date.now();
    
    // 方法1: 使用Babel AST精确分析
    try {
      let ast = parse(code, { 
        errorRecovery: true,
        sourceType: 'script',
        plugins: ['jsx', 'typescript']
      })
      
      let evalFound = false;
      let result = null;
      
      // 遍历AST查找eval调用
      traverse(ast, {
        CallExpression(path) {
          if (path.node.callee.name === 'eval' && path.node.arguments.length > 0) {
            evalFound = true;
            const arg = path.node.arguments[0];
            
            // 如果参数是字符串字面量
            if (t.isStringLiteral(arg)) {
              result = arg.value;
              path.stop();
            }
            // 如果参数是模板字面量
            else if (t.isTemplateLiteral(arg) && arg.quasis.length === 1) {
              result = arg.quasis[0].value.cooked;
              path.stop();
            }
            // 如果参数是表达式
            else {
              try {
                // 生成参数代码并评估
                const argCode = generator(arg).code;
                result = eval(argCode);
                path.stop();
              } catch (e) {
                // 继续尝试其他方法
              }
            }
          }
        }
      });
      
      if (result) {
        // 如果结果仍包含eval，递归解包
        if (typeof result === 'string' && (result.includes('eval(') || result.includes('eval ('))) {
          result = unpack(result);
        }
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    } catch (astError) {
      // AST方法失败，尝试下一个方法
      console.log('[eval]AST方法失败，尝试替换方法');
    }
    
    // 方法2: 使用替换eval的方法
    try {
      // 创建一个捕获eval参数的函数
      let capturedValue = null;
      
      // 替换eval为捕获函数
      const modifiedCode = code.replace(/eval\s*\(/g, '(function(x) { capturedValue = x; return x; })(');
      
      // 创建安全的执行环境
      const sandbox = {
        eval: function(x) { capturedValue = x; return x; },
        window: {},
        document: {},
        navigator: { userAgent: "Mozilla/5.0" },
        location: {},
        console: console,
        capturedValue: null
      };
      
      // 使用Function构造器执行代码
      try {
        const fn = new Function(...Object.keys(sandbox), modifiedCode);
        fn(...Object.values(sandbox));
        
        if (capturedValue !== null) {
          // 如果捕获的值还包含eval，递归解包
          if (typeof capturedValue === 'string' && (capturedValue.includes('eval(') || capturedValue.includes('eval ('))) {
            capturedValue = unpack(capturedValue);
          }
          const endTime = Date.now();
          console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
          return capturedValue;
        }
      } catch (execError) {
        // 执行失败，尝试更简单的方法
      }
    } catch (replaceError) {
      // 替换方法失败
    }
    
    // 方法3: 简单的正则提取
    try {
      // 匹配 eval("...") 或 eval('...') 模式
      const evalMatch = code.match(/eval\s*\(\s*["'`]([\s\S]*?)["'`]\s*\)/);
      if (evalMatch && evalMatch[1]) {
        let extracted = evalMatch[1];
        // 处理转义字符
        extracted = extracted
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\'/g, "'")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, '\\');
        
        const endTime = Date.now();
        console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return extracted;
      }
    } catch (regexError) {
      // 正则方法失败
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
  return code.includes('eval(') || code.includes('eval (');
}

// 导出模块
export default {
  unpack,
  pack,
  detect,
  // 兼容插件接口
  plugin: unpack
}
