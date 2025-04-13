const { parse } = require('@babel/parser')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const { formatCode } = require('./common.js')
const { optimize } = require('./optimize.js')

const name = 'eval'

function safeUnpack(code) {
  let unpacked = ''
  const fakeEval = function (input) {
    unpacked = input
    return input
  }
  try {
    const modifiedCode = code.replace(/eval\s*\(/, 'fakeEval(')
    const context = { fakeEval, String, RegExp }

    const contextKeys = Object.keys(context)
    const contextValues = Object.values(context)

    const runner = new Function(...contextKeys, modifiedCode)
    runner(...contextValues)

    return unpacked
  } catch {
    return null
  }
}

function recursiveUnpack(code, depth = 0) {
  if (depth > 10) return code
  const result = safeUnpack(code)
  if (result && result !== code) {
    if (result.includes('eval(')) {
      return recursiveUnpack(result, depth + 1)
    }
    return result
  }
  return code
}

function simpleUnpack(code) {
  const ast = parse(code, { errorRecovery: true })
  const lines = ast.program.body
  let data = null
  for (const line of lines) {
    if (t.isEmptyStatement(line)) continue
    if (data) return null
    if (
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
  if (!data) return null
  return eval(generator(data, { minified: true }).code)
}

function handle(code) {
  try {
    const result = recursiveUnpack(code)
    if (result && result !== code) {
      console.log(`[${name}] 使用 recursiveUnpack 解包成功`)
      return formatCode(optimize(result))
    }

    const fallback = simpleUnpack(code)
    if (fallback) {
      console.log(`[${name}] 使用 simpleUnpack 解包成功`)
      return formatCode(optimize(fallback))
    }

    console.log(`[${name}] 解包失败，返回 null`)
    return null
  } catch (e) {
    console.log(`[${name}] 解包异常:`, e)
    return null
  }
}

module.exports = {
  name,
  handle
}

// 兼容 ES Module 导入
module.exports.default = module.exports
