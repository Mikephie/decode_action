import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
import * as t from '@babel/types'
import _generator from '@babel/generator'
const traverse = _traverse.default
const generator = _generator.default

function getStringTableFromCode(code) {
  let table = []
  try {
    // 将 _0x1715 暴露到 globalThis
    let sandboxed = code.replace(
      /(jsjiami\.com\.v7)/g,
      '$1\n;globalThis._0x1715=_0x1715;'
    )
    globalThis._0x1715 = undefined
    eval(sandboxed)
    if (typeof globalThis._0x1715 === 'function') {
      table = globalThis._0x1715()
    }
  } catch (e) {}
  return table
}

export default function jsjiamiPlugin(code) {
  if (!code.includes('jsjiami.com.v7')) {
    console.log('[jsjiami] 没检测到混淆标记，跳过');
    return code
  }
  let ast = parse(code)
  let indexerName = null
  // 查找索引函数
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isIdentifier(path.node.init) && path.node.init.name.startsWith('_0x') && path.node.id.name.startsWith('_0x')) {
        indexerName = path.node.init.name
      }
      if (t.isCallExpression(path.node.init) && path.node.id.name.startsWith('_0x')) {
        indexerName = path.node.id.name
      }
    }
  })
  if (!indexerName) {
    console.log('[jsjiami] 没识别到索引函数名');
    return code
  }
  // 获取字符串表
  const stringTable = getStringTableFromCode(code)
  if (!Array.isArray(stringTable) || stringTable.length < 10) {
    console.log('[jsjiami] 没获得字符串表');
    return code
  }
  // 还原混淆字符串
  let replaced = false
  traverse(ast, {
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee, { name: indexerName })) {
        const [arg] = path.node.arguments
        if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
          const idx = typeof arg.value === 'string' ? parseInt(arg.value) : arg.value
          const value = stringTable[idx]
          if (typeof value === 'string') {
            path.replaceWith(t.stringLiteral(value))
            replaced = true
          }
        }
      }
    }
  })
  if (!replaced) {
    console.log('[jsjiami] 没有还原出任何字符串');
    return code
  }
  // 输出新代码
  return generator(ast, { jsescOption: { minimal: true } }).code
}