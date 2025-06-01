import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import generator from '@babel/generator'

// 1. 判断特征
function isJsjiami(code) {
  return code.includes("jsjiami.com.v7") && code.includes("function _0x1e61") && code.includes("function _0x1715")
}

// 2. 提取字符串表
function extractTable(code) {
  // 提取 function _0x1715() { ... }
  const m = code.match(/function\s+_0x1715[^{]*\{([\s\S]*?)\}\s*;/)
  if (!m) return null
  let funcSrc = "var _0xodH='jsjiami.com.v7';" + "\nfunction _0x1715{" + m[1] + "};"
  // node中支持 eval function 语法，部分平台要 function _0x1715() {}
  funcSrc = code.match(/function\s+_0x1715\s*\(\)\s*\{([\s\S]*?)\}/)
    ? "var _0xodH='jsjiami.com.v7';" + "\n" + m[0]
    : funcSrc
  try {
    // 沙箱执行取到字符串表
    let _0x1715
    eval(funcSrc + '\n_0x1715 = _0x1715();')
    if (Array.isArray(_0x1715)) return _0x1715
  } catch (e) {
    // 提取失败
    return null
  }
  return null
}

// 3. 识别索引器名字
function findIndexerName(code) {
  // 一般 const _0xc3dd0a = _0x1e61;
  const m = code.match(/const\s+(_0x\w+)\s*=\s*_0x1e61/)
  return m ? m[1] : null
}

// 4. 还原所有索引器调用
function restoreObfuscated(ast, indexerName, stringTable) {
  if (!indexerName || !Array.isArray(stringTable)) return
  traverse(ast, {
    CallExpression(path) {
      if (
        t.isIdentifier(path.node.callee, { name: indexerName }) &&
        path.node.arguments.length >= 1
      ) {
        // 支持 _0xc3dd0a(0xeb, ...) 也支持 _0xc3dd0a('0xeb', ...)
        let idx = path.node.arguments[0]
        if (t.isNumericLiteral(idx)) {
          let val = stringTable[idx.value - 0xdd] // 0xdd 是实际的偏移
          if (typeof val === "string") path.replaceWith(t.stringLiteral(val))
        } else if (t.isStringLiteral(idx)) {
          let n = parseInt(idx.value, 16)
          if (!isNaN(n)) {
            let val = stringTable[n - 0xdd]
            if (typeof val === "string") path.replaceWith(t.stringLiteral(val))
          }
        }
      }
    }
  })
}

// 主插件入口
export default function jsjiamiPlugin(code) {
  if (!isJsjiami(code)) return code
  const stringTable = extractTable(code)
  if (!stringTable) {
    console.log('[jsjiami] 没获得字符串表')
    return code
  }
  const indexerName = findIndexerName(code)
  if (!indexerName) {
    console.log('[jsjiami] 没找到索引函数名')
    return code
  }
  let ast = parse(code)
  restoreObfuscated(ast, indexerName, stringTable)
  return generator(ast, { jsescOption: { minimal: true } }).code
}