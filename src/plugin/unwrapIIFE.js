import { parse } from '@babel/parser'
import generator from '@babel/generator'
import * as t from '@babel/types'

export default function unwrapIIFE(code) {
  let ast
  try {
    ast = parse(code, { errorRecovery: true })
  } catch (e) {
    return code // 不是有效JS直接跳过
  }
  let changed = false
  while (
    ast.program.body.length === 1 &&
    t.isExpressionStatement(ast.program.body[0]) &&
    t.isCallExpression(ast.program.body[0].expression) &&
    t.isFunctionExpression(ast.program.body[0].expression.callee)
  ) {
    // 剥掉最外层IIFE，把函数体内容还原到顶层
    ast.program.body = ast.program.body[0].expression.callee.body.body
    changed = true
  }
  return changed ? generator.default(ast).code : code
}