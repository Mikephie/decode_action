import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * 原始的unpack函数 - 保持不变
 */
function unpack(code) {
  let ast = parse(code, { errorRecovery: true })
  let lines = ast.program.body
  let data = null
  for (let line of lines) {
    if (t.isEmptyStatement(line)) {
      continue
    }
    if (data) {
      return null
    }
    if (
      t.isExpressionStatement(line) &&
      t.isCallExpression(line?.expression) &&
      line.expression.callee?.name === 'eval' &&
      line.expression.arguments.length === 1 &&
      t.isCallExpression(line.expression.arguments[0])
    ) {
      data = t.expressionStatement(line.expression.arguments[0])
      continue
    }
    return null
  }
  if (!data) {
    return null
  }
  code = generator(data, { minified: true }).code
  return eval(code)
}

/**
 * 原始的pack函数 - 保持不变
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
  code = generator(ast1, { minified: false }).code
  return code
}

/**
 * 增强的解包函数 - 作为额外的方法
 * 用于处理Dean Edwards Packer等复杂格式
 */
function enhancedUnpack(code) {
  try {
    // 首先尝试原始的unpack方法
    let result = unpack(code)
    if (result) {
      // 如果结果仍包含eval，递归解包
      if (typeof result === 'string' && result.includes('eval')) {
        return enhancedUnpack(result)
      }
      return result
    }
  } catch (e) {
    // 原始方法失败，继续尝试其他方法
  }
  
  // 如果原始方法失败，尝试处理Dean Edwards Packer
  if (code.includes('eval') && code.includes('function(p,a,c,k,e,d)')) {
    try {
      // 创建一个安全的执行环境
      let capturedResult = null
      
      // 构建一个捕获eval结果的函数
      const captureEval = new Function('code', `
        let result = null;
        const originalEval = eval;
        
        // 临时替换eval为捕获函数
        eval = function(x) {
          result = x;
          return originalEval(x);
        };
        
        try {
          // 执行代码
          (function() {
            ${code}
          })();
        } catch(e) {
          // 忽略执行错误
        }
        
        // 恢复原始eval
        eval = originalEval;
        
        return result;
      `)
      
      capturedResult = captureEval(code)
      
      if (capturedResult) {
        // 如果结果仍包含eval，递归解包
        if (typeof capturedResult === 'string' && capturedResult.includes('eval')) {
          return enhancedUnpack(capturedResult)
        }
        return capturedResult
      }
    } catch (e) {
      // Dean Edwards方法也失败
    }
  }
  
  // 最后的备选方案：简单的正则提取
  try {
    const evalMatch = code.match(/eval\s*\(\s*["'`]([\s\S]*?)["'`]\s*\)/)
    if (evalMatch && evalMatch[1]) {
      let extracted = evalMatch[1]
      // 处理转义字符
      extracted = extracted
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
      
      return extracted
    }
  } catch (e) {
    // 正则方法失败
  }
  
  return null
}

/**
 * 兼容插件的接口 - 带有日志
 */
function plugin(code) {
  if (!code.includes('eval')) {
    return null
  }
  
  console.log('[eval]尝试检测是否为 eval 加密')
  console.log('[eval]检测到 eval 加密，正在解密...')
  const startTime = Date.now()
  
  // 使用增强的解包函数
  const result = enhancedUnpack(code)
  
  if (result) {
    const endTime = Date.now()
    console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`)
    return result
  }
  
  console.log('[eval]eval 解密失败')
  return null
}

// 导出 - 保持原始结构，只是添加了新方法
export default {
  unpack,        // 原始方法
  pack,          // 原始方法
  plugin,        // 兼容插件接口
  enhancedUnpack // 新增的增强方法
}
