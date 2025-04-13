import { parse } from '@babel/parser'
import generator from '@babel/generator'
import traverse from '@babel/traverse'
import * as t from '@babel/types'

export function formatCode(code) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  })

  traverse(ast, {
    VariableDeclaration(path) {
      const firstDecl = path.node.declarations[0]
      if (firstDecl && ['names', 'productName', 'productType'].includes(firstDecl.id.name)) {
        path.addComment('leading', ' 基础配置变量')
      }
    },
    AssignmentExpression(path) {
      if (path.node.left.object?.name === 'obj' && path.node.left.property?.name === 'subscriber') {
        path.addComment('leading', ' 订阅配置')
      }
    },
    CallExpression(path) {
      if (path.node.callee.property?.name === 'notify') {
        path.addComment('leading', ' 通知配置')
      }
    },
  })

  let formatted = generator.default(ast, {
    retainLines: false,
    comments: true,
    compact: false,
    indent: { style: '  ' },
  }).code

  formatted = formatted
    .replace(/\/\* (.*?)\*\/\s*/g, '// $1\n')
    .replace(/(\/\/.*?\n)+/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\/\/ .*?\/\//g, '//')
    .replace(/;(?=\s*(?:let|\/\/|obj\.|function))/g, ';\n')
    .replace(/\/\/ 订阅配置\s*obj\.subscriber =/, '// 订阅配置\nobj.subscriber =')
    .replace(/\/\/ 通知配置\s*\$\.notify/, '// 通知配置\n$.notify')
    .replace(/(obj\.subscriber\.non_subscriptions\[.*?\];)/, '$1\n')
    .replace(/(obj\.subscriber\.entitlements\[.*?\];)/, '$1\n')
    .replace(/\s+$/gm, '')
    .replace(/^\s+$/gm, '')
    .replace(/let.*?;\n\n(?=let)/g, '$&')
    .replace(/^(\s*[a-zA-Z_$][a-zA-Z0-9_$]*:)/gm, '  $1')

  const header = `//Generated at ${new Date().toISOString()}\n//Base:https://github.com/echo094/decode-js\n//Modify:https://github.com/smallfawn/decode_action\n\n`

  return header + formatted
}
