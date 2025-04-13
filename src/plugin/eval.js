import { parse } from '@babel/parser'
import generator from '@babel/generator'
import * as t from '@babel/types'
import { formatCode } from './common.js'
import { optimize } from './optimize.js'

export const name = 'eval'

export function handle(code) {
  function safeUnpack(code) {
    let unpacked = ''
    const fakeEval = function (code) {
      unpacked = code
      return code
    }
    const modifiedCode = code.replace(/eval\s*\(/, 'fakeEval(')
    const context = { fakeEval, String, RegExp }
    try {
      with (context) {
        eval(modifiedCode)
      }
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
    return eval(generator.default(data, { minified: true }).code)
  }

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
