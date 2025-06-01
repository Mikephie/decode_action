import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
import * as t from '@babel/types'
import _generator from '@babel/generator'
const traverse = _traverse.default
const generator = _generator.default

// 动态执行 AST 中 function 拿到字符串表
function getStringTable(ast, fnName) {
  let fnCode = ''
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.id && path.node.id.name === fnName) {
        fnCode = generator(path.node).code
        path.stop()
      }
    },
    VariableDeclarator(path) {
      if (path.node.id && path.node.id.name === fnName && t.isFunctionExpression(path.node.init)) {
        fnCode = 'var ' + generator(path.node).code
        path.stop()
      }
    }
  })
  // 用 Function 动态运行获取
  let table = []
  try {
    // 处理全局依赖变量（如 _0xodH），eval 可安全用在 node 侧
    let code = fnCode + `\n;(${fnName})()`
    table = eval(code)
  } catch (e) {
    table = []
  }
  return table
}

// 插件主体
export default function jsjiamiPlugin(code) {
  if (!code.includes('jsjiami.com.v7')) return code
  let ast = parse(code)
  // 找所有以 _0x 开头的字符串索引函数
  let indexerName = null
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isCallExpression(path.node.init) && path.node.id.name.startsWith('_0x')) {
        indexerName = path.node.id.name
      }
      // 兼容 const _0xc3dd0a=_0x1e61;
      if (t.isIdentifier(path.node.init) && path.node.id.name.startsWith('_0x') && path.node.init.name.startsWith('_0x')) {
        indexerName = path.node.init.name
      }
    }
  })
  // 找到字符串表函数名
  let stringTableFn = null
  traverse(ast, {
    FunctionDeclaration(path) {
      // 返回超长数组的函数
      let found = false
      path.traverse({
        ReturnStatement(subPath) {
          const arr = subPath.node.argument
          if (t.isArrayExpression(arr) && arr.elements.length > 10) {
            found = true
          }
        }
      })
      if (found) {
        stringTableFn = path.node.id.name
        path.stop()
      }
    }
  })
  // 兜底再找一遍变量函数
  if (!stringTableFn) {
    traverse(ast, {
      VariableDeclarator(path) {
        if (t.isFunctionExpression(path.node.init) && path.node.id.name.startsWith('_0x')) {
          stringTableFn = path.node.id.name
          path.stop()
        }
      }
    })
  }
  if (!indexerName || !stringTableFn) return code
  // 动态执行拿到字符串表
  const stringTable = getStringTable(ast, stringTableFn)
  if (!Array.isArray(stringTable) || stringTable.length < 10) return code

  // 还原混淆字符串
  traverse(ast, {
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee, { name: indexerName })) {
        const [arg, arg2] = path.node.arguments
        if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
          const idx = typeof arg.value === 'string' ? parseInt(arg.value) : arg.value
          // 二参适配
          const value = stringTable[idx]
          if (typeof value === 'string') {
            path.replaceWith(t.stringLiteral(value))
          }
        }
      }
    }
  })

  // 可选：删除字符串表函数声明，去冗余
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.id.name === stringTableFn) path.remove()
    }
  })
  // 清理冗余 jsjiami 标记
  traverse(ast, {
    VariableDeclarator(path) {
      if (t.isStringLiteral(path.node.init) && /jsjiami\.com\.v7/.test(path.node.init.value)) path.remove()
    }
  })

  return generator(ast, { jsescOption: { minimal: true } }).code
}