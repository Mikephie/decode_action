import { parse } from '@babel/parser'
import _generate from '@babel/generator'
const generator = _generate.default
import _traverse from '@babel/traverse'
const traverse = _traverse.default
import * as t from '@babel/types'

/**
 * 增强版解包函数 - 结合了AST分析和直接执行两种方法
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码或null
 */
function unpack(code) {
  // 方法1: 使用Babel AST分析
  try {
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
        t.isCallExpression(line.expression) &&
        line.expression.callee?.name === 'eval' &&
        line.expression.arguments.length === 1
      ) {
        // 提取eval的参数
        let evalArg = line.expression.arguments[0]
        
        // 如果参数是字符串字面量，直接返回内容
        if (t.isStringLiteral(evalArg)) {
          return evalArg.value
        }
        
        // 如果参数是表达式，尝试生成代码并评估
        if (t.isExpression(evalArg)) {
          let argCode = generator(evalArg, { minified: true }).code
          try {
            let result = eval(argCode)
            // 如果结果仍包含eval，递归解包
            if (typeof result === 'string' && (result.includes('eval(') || result.includes('eval ('))) {
              return unpack(result)
            }
            return result
          } catch (e) {
            console.warn('AST方法评估失败，尝试备用方法:', e)
          }
        }
        
        data = t.expressionStatement(line.expression.arguments[0])
        continue
      }
    }
    
    if (data) {
      let generatedCode = generator(data, { minified: true }).code
      return eval(generatedCode)
    }
  } catch (astError) {
    console.warn('AST解析失败，尝试备用方法:', astError)
  }
  
  // 方法2: 使用替换eval的方法（来自插件）
  try {
    if (!code.includes('eval(') && !code.includes('eval (')) {
      return null
    }
    
    // 替换eval为一个捕获函数
    let modifiedCode = code.replace(/eval\s*\(/g, '(function(x) { return x; })(')
    
    try {
      // 创建一个安全的执行环境
      const env = {
        window: {},
        document: {},
        navigator: { userAgent: "Mozilla/5.0" },
        location: {},
        console: console
      }
      
      // 执行代码
      const result = Function('window', 'document', 'navigator', 'location', 'console',
                            `return ${modifiedCode}`)(
                            env.window, env.document, env.navigator, env.location, env.console)
      
      // 如果结果是字符串且包含eval，递归解包
      if (typeof result === 'string') {
        if (result.includes('eval(') || result.includes('eval (')) {
          return unpack(result)
        }
        return result
      }
      
      return String(result)
    } catch (err) {
      console.log("执行替换eval的方法失败，尝试直接替换方法")
      
      // 尝试直接替换eval
      try {
        modifiedCode = code.replace(/eval\s*\(/g, '(')
        return modifiedCode
      } catch (replaceErr) {
        console.error("直接替换eval方法也失败:", replaceErr)
        return null
      }
    }
  } catch (error) {
    console.error("Eval解包发生错误:", error)
    return null
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
  return code.includes('eval(') || code.includes('eval (')
}

/**
 * 高级解包函数 - 处理多层嵌套的eval
 * @param {string} code - 要解包的代码
 * @param {number} maxDepth - 最大递归深度（默认10）
 * @returns {string|null} - 完全解包后的代码
 */
function deepUnpack(code, maxDepth = 10) {
  let result = code
  let depth = 0
  
  while (depth < maxDepth && detect(result)) {
    let unpacked = unpack(result)
    if (!unpacked || unpacked === result) {
      break
    }
    result = unpacked
    depth++
  }
  
  if (depth >= maxDepth) {
    console.warn(`达到最大解包深度 ${maxDepth}`)
  }
  
  return result
}

/**
 * 智能打包函数 - 带有eval包装选项
 * @param {string} code - 要打包的代码
 * @param {object} options - 打包选项
 * @returns {string} - 打包后的代码
 */
function smartPack(code, options = {}) {
  const {
    useEval = false,      // 是否使用eval包装
    minify = false,       // 是否压缩代码
    obfuscate = false     // 是否混淆（简单版本）
  } = options
  
  let packedCode = pack(code)
  
  if (minify) {
    let ast = parse(packedCode)
    packedCode = generator(ast, { minified: true }).code
  }
  
  if (useEval) {
    // 将代码转换为字符串并用eval包装
    let escapedCode = JSON.stringify(packedCode)
    packedCode = `eval(${escapedCode});`
  }
  
  if (obfuscate && useEval) {
    // 简单的混淆：将eval拆分
    packedCode = packedCode.replace('eval(', '["ev" + "al"][0](')
  }
  
  return packedCode
}

// 导出增强版模块
export default {
  unpack,
  pack,
  detect,
  deepUnpack,
  smartPack,
  
  // 兼容原始插件接口
  plugin: unpack
}
