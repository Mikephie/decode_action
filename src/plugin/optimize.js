import { parse } from '@babel/parser'
import generator from '@babel/generator'
import traverse from '@babel/traverse'
import deleteUnreachableCode from '../visitor/delete-unreachable-code.js'
import deleteNestedBlocks from '../visitor/delete-nested-blocks.js'
import calculateConstantExp from '../visitor/calculate-constant-exp.js'
import calculateRString from '../visitor/calculate-rstring.js'

export function optimize(code) {
  let ast
  try {
    ast = parse(code, { errorRecovery: true })
  } catch (e) {
    console.error(`optimize parse error: ${e.reasonCode}`)
    return code
  }

  traverse(ast, deleteUnreachableCode)
  traverse(ast, deleteNestedBlocks)
  traverse(ast, calculateConstantExp)
  traverse(ast, calculateRString)

  return generator.default(ast).code
}
