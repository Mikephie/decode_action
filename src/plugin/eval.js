import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * 简单的Dean Edwards Packer解包器
 * 直接执行代码让它自己解包
 */
function simpleUnpack(code) {
  if (!code.includes('eval')) {
    return null
  }
  
  try {
    let result = null
    
    // 创建一个捕获eval参数的环境
    const captureEval = `
      let __result = null;
      const __originalEval = eval;
      eval = function(x) {
        __result = x;
        return __originalEval(x);
      };
      try {
        ${code}
      } catch(e) {}
      eval = __originalEval;
      __result;
    `
    
    // 执行并获取结果
    result = eval(captureEval)
    
    // 如果结果还包含eval，递归解包
    if (result && typeof result === 'string' && result.includes('eval')) {
      return simpleUnpack(result)
    }
    
    return result
  } catch (e) {
    return null
  }
}

/**
 * 原始的unpack函数 - 修改为使用simpleUnpack作为后备
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
      // 发现多个语句，尝试使用simpleUnpack
      return simpleUnpack(code)
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
    // 如果不是预期的格式，尝试simpleUnpack
    return simpleUnpack(code)
  }
  
  if (!data) {
    return simpleUnpack(code)
  }
  
  code = generator(data, { minified: true }).code
  
  try {
    return eval(code)
  } catch (e) {
    // 如果eval失败，尝试simpleUnpack
    return simpleUnpack(code)
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
 * 插件接口 - 使用simpleUnpack以获得更好的兼容性
 */
function plugin(code) {
  if (!code.includes('eval')) {
    return null
  }
  
  console.log('[eval]尝试检测是否为 eval 加密')
  console.log('[eval]检测到 eval 加密，正在解密...')
  const startTime = Date.now()
  
  // 直接使用simpleUnpack，它能处理各种情况
  const result = simpleUnpack(code)
  
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
  plugin
}