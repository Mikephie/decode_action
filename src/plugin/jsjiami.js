import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import generator from '@babel/generator'

// 动态运行环境
function getStringTableRuntime(code) {
  // 尝试提取整个 _0x1715 函数定义和执行
  const fnBodyMatch = code.match(/function _0x1715\s*\(\)\s*{([\s\S]+?)};?/)
  if (fnBodyMatch) {
    try {
      // 还原 _0xodH，防止全局变量污染
      let _0xodH = 'jsjiami.com.v7'
      let table = null
      // eval 只执行字符串表相关，不跑危险部分
      eval('table = (' + fnBodyMatch[1].replace(/return;/, 'return undefined;') + ';_0x1715());')
      if (Array.isArray(table)) return table
    } catch (e) {}
  }
  return null
}

// 静态提取
function getStringTableStatic(code) {
  // 查找 function _0x1715(){...return(function(){return[...]})()}
  const arrMatch = code.match(/return\s*\(\s*function\s*\(\)\s*{\s*return\s*(\[[\s\S]+?\])\s*;\s*}\s*\)\(\s*\)/)
  if (arrMatch && arrMatch[1]) {
    try {
      return eval(arrMatch[1])
    } catch (e) {}
  }
  return null
}

// 主插件
export default function jsjiamiPlugin(code) {
  // 一定要包含 jsjiami.com.v7 和 _0x1e61 调用
  if (!/jsjiami\.com\.v7/.test(code) || !/_0x1e61/.test(code)) return code

  let stringTable = getStringTableStatic(code)
  if (!stringTable) stringTable = getStringTableRuntime(code)

  if (!Array.isArray(stringTable)) {
    console.log('[jsjiami] 没获得字符串表')
    return code
  }

  // AST 查找所有 _0x1e61(a,b) 还原
  let ast = parse(code)
  let count = 0
  traverse(ast, {
    CallExpression(path) {
      if (
        t.isIdentifier(path.node.callee, { name: '_0x1e61' }) &&
        path.node.arguments.length >= 1 &&
        (t.isNumericLiteral(path.node.arguments[0]) || t.isStringLiteral(path.node.arguments[0]))
      ) {
        // 只处理 _0x1e61(x, y) 形式
        let idx = path.node.arguments[0].value
        // jsjiami 有偏移量，这里直接静态猜
        if (typeof idx === 'string' && /^0x/.test(idx)) {
          idx = parseInt(idx, 16)
        }
        if (typeof idx === 'number' && idx < stringTable.length) {
          path.replaceWith(t.stringLiteral(String(stringTable[idx])))
          count++
        }
      }
    }
  })

  // 一轮未替换任何，说明已解完
  if (!count) {
    return code
  }

  // 输出已还原的代码
  return generator(ast, { jsescOption: { minimal: true } }).code
}