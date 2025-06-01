import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import generate from '@babel/generator'

export default function jsjiamiPlugin(code) {
  if (!code.includes('jsjiami.com.v7')) return code;

  // 1. 提取 _0x1715 函数源码
  const fnMatch = code.match(/function\s+_0x1715[^{]*\{[\s\S]*?\}\s*;/);
  if (!fnMatch) {
    console.log('[jsjiami] 未找到字符串表函数');
    return code;
  }
  // 2. 准备变量（防止没定义 _0xodH）
  let evalContext = "globalThis._0xodH='jsjiami.com.v7';";
  evalContext += "globalThis._0x1715=undefined;";
  evalContext += fnMatch[0];

  try {
    eval(evalContext);
  } catch(e) {
    console.log('[jsjiami] eval 字符串表失败:', e);
    return code;
  }
  if (typeof globalThis._0x1715 !== 'function') {
    console.log('[jsjiami] 字符串表函数无效');
    return code;
  }
  const stringTable = globalThis._0x1715();

  // 3. AST 扫描还原所有 _0x1e61(a, b) 调用（第一个参数是数字）
  let ast = parse(code, { errorRecovery: true });
  let hits = 0;
  traverse(ast, {
    CallExpression(path) {
      if (
        t.isIdentifier(path.node.callee, { name: '_0x1e61' }) &&
        (t.isNumericLiteral(path.node.arguments[0]) || t.isStringLiteral(path.node.arguments[0]))
      ) {
        const idx = t.isNumericLiteral(path.node.arguments[0])
          ? path.node.arguments[0].value
          : parseInt(path.node.arguments[0].value);
        // 第二参数是密钥，但可选，不必管
        if (typeof stringTable[idx] === 'string') {
          path.replaceWith(t.stringLiteral(stringTable[idx]));
          hits++;
        }
      }
    }
  });
  if (!hits) {
    console.log('[jsjiami] 没找到任何混淆调用');
    return code;
  }
  return generate(ast, { jsescOption: { minimal: true } }).code;
}