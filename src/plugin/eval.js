import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * 修改后的unpack函数 - 支持更多格式但保持原始逻辑
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
    
    // 检查是否是表达式语句
    if (t.isExpressionStatement(line)) {
      // 检查是否是eval调用
      if (
        t.isCallExpression(line.expression) &&
        line.expression.callee?.name === 'eval' &&
        line.expression.arguments.length === 1
      ) {
        const arg = line.expression.arguments[0]
        
        // 原始逻辑：处理eval(function(){}())格式
        if (t.isCallExpression(arg)) {
          data = t.expressionStatement(arg)
          continue
        }
        
        // 新增：处理eval("string")格式
        if (t.isStringLiteral(arg)) {
          try {
            // 尝试递归解包字符串内容
            const innerResult = unpack(arg.value)
            if (innerResult) {
              return innerResult
            }
            // 如果递归失败，直接返回字符串内容
            return arg.value
          } catch (e) {
            return arg.value
          }
        }
      }
    }
    
    // 如果不匹配任何模式，返回null
    return null
  }
  
  if (!data) {
    return null
  }
  
  // 生成代码并执行
  try {
    const code = generator(data, { minified: true }).code
    
    // 对于Dean Edwards Packer，我们需要执行它
    if (code.includes('function(p,a,c,k,e,d)')) {
      // 创建一个安全的执行环境来捕获结果
      let result = null
      const sandbox = {
        eval: function(x) { result = x; return x },
        String: String,
        parseInt: parseInt,
        RegExp: RegExp
      }
      
      // 使用Function构造器在沙箱中执行
      const func = new Function(...Object.keys(sandbox), `
        let result = null;
        ${code.replace(/eval\s*\(/, 'result = (')}
        return result;
      `)
      
      result = func(...Object.values(sandbox))
      
      // 如果结果还包含eval，递归解包
      if (result && typeof result === 'string' && result.includes('eval')) {
        return unpack(result)
      }
      
      return result
    }
    
    // 对于其他情况，直接eval
    const result = eval(code)
    
    // 如果结果是字符串且包含eval，递归解包
    if (typeof result === 'string' && result.includes('eval')) {
      return unpack(result)
    }
    
    return result
  } catch (e) {
    // 如果执行失败，尝试返回生成的代码
    const code = generator(data, { minified: true }).code
    return code
  }
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
 * 检测函数
 */
function detect(code) {
  return code.includes('eval')
}

/**
 * 插件接口
 */
function plugin(code) {
  if (!detect(code)) {
    return null
  }
  
  console.log('[eval]尝试检测是否为 eval 加密')
  console.log('[eval]检测到 eval 加密，正在解密...')
  const startTime = Date.now()
  
  const result = unpack(code)
  
  if (result) {
    const endTime = Date.now()
    console.log(`[eval]eval 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`)
    console.log('解密成功，正在格式化代码...')
    console.log('格式化完成，使用了 eval 插件解密')
    return result
  }
  
  console.log('[eval]eval 解密失败')
  return null
}

// 导出
export default {
  unpack,
  pack,
  detect,
  plugin
}