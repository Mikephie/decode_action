import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
import * as t from '@babel/types'
import generator from '@babel/generator'
const traverse = _traverse.default

// 检测是否 jsjiami.com.v7 混淆
function isJsjiamiV7(code) {
  return code.includes('jsjiami.com.v7')
}

// AST 查找混淆主函数
function findIndexer(ast) {
  let indexerName = null, stringTable = null
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isStringLiteral(path.node.init) && /jsjiami\.com\.v7/.test(path.node.init.value)) {
        // 找到了
        indexerName = null
        // 尝试往下找"解密函数"
        path.parentPath.container.forEach(decl => {
          if (t.isVariableDeclarator(decl) && decl.id.name.startsWith('_0x')) {
            indexerName = decl.id.name
          }
        })
      }
    }
  })
  // 找字符串表
  traverse(ast, {
    FunctionDeclaration(path) {
      // 一般字符串表由一个大数组和"return [ ... ]"函数返回
      path.traverse({
        ReturnStatement(subPath) {
          const arr = subPath.node.argument
          if (t.isArrayExpression(arr) && arr.elements.length > 10) {
            stringTable = arr.elements.map(e => e.value)
          }
        }
      })
    }
  })
  return { indexerName, stringTable }
}

// 解混淆索引函数
function buildIndexerFunc(stringTable) {
  return function(idx) {
    // 兼容传字符串数字
    const i = typeof idx === 'string' ? parseInt(idx) : idx
    return stringTable[i]
  }
}

// 还原所有混淆访问
function restoreObfuscatedStrings(ast, indexerName, stringTable) {
  if (!indexerName || !stringTable) return
  const indexer = buildIndexerFunc(stringTable)
  traverse(ast, {
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee, { name: indexerName })) {
        const [arg] = path.node.arguments
        if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
          // 用索引器还原
          const value = indexer(arg.value)
          path.replaceWith(t.stringLiteral(value))
        }
      }
    }
  })
}

// 主插件导出
export default function jsjiamiPlugin(code) {
  if (!isJsjiamiV7(code)) return code
  let ast = parse(code)
  const { indexerName, stringTable } = findIndexer(ast)
  if (!indexerName || !stringTable) {
    // 兜底，无法处理时返回原文
    return code
  }
  restoreObfuscatedStrings(ast, indexerName, stringTable)
  // 清理未用变量
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isStringLiteral(path.node.init) && /jsjiami\.com\.v7/.test(path.node.init.value)) {
        path.remove()
      }
    }
  })
  // 重新生成
  return generator(ast, { jsescOption: { minimal: true } }).code
}