/**  For jsjiami.com.v7 (sojson v7) — ESM plugin, drop-in for src/plugin/sojsonv7.js
 *  Layout assumptions:
 *    - ./eval.js
 *    - ../visitor/{calculate-constant-exp,delete-illegal-return,delete-unused-var,parse-control-flow-storage,prune-if-branch,split-sequence}.js
 */

import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

import ivm from 'isolated-vm';
import PluginEval from './eval.js';

import calculateConstantExp from '../visitor/calculate-constant-exp.js';
import deleteIllegalReturn from '../visitor/delete-illegal-return.js';
import deleteUnusedVar from '../visitor/delete-unused-var.js';
import parseControlFlowStorage from '../visitor/parse-control-flow-storage.js';
import pruneIfBranch from '../visitor/prune-if-branch.js';
import splitSequence from '../visitor/split-sequence.js';

// ---------- isolated-vm helpers ----------
const isolate = new ivm.Isolate();
const globalContext = isolate.createContextSync();

function virtualGlobalEval(jsStr) {
  return globalContext.evalSync(String(jsStr));
}

function evalOneTime(str) {
  const vm = new ivm.Isolate();
  const ret = vm.createContextSync().evalSync(String(str));
  vm.dispose();
  return ret;
}

// ---------- Phase 1: decode global (version + string table + main decrypt func) ----------
function decodeGlobal(ast) {
  // 清理空语句
  let i = 0;
  while (i < ast.program.body.length) {
    if (t.isEmptyStatement(ast.program.body[i])) ast.program.body.splice(i, 1);
    else ++i;
  }
  if (ast.program.body.length < 3) return false;

  // 把第一行的多 declarator 拆开
  traverse(ast, {
    Program(path) {
      path.stop();
      const l1 = path.get('body.0');
      if (!l1.isVariableDeclaration()) return;
      const defs = l1.node.declarations;
      const kind = l1.node.kind;
      for (let i = defs.length - 1; i; --i) {
        l1.insertAfter(t.VariableDeclaration(kind, [defs[i]]));
        l1.get(`declarations.${i}`).remove();
      }
      l1.scope.crawl();
    },
  });

  let decrypt_code = [t.emptyStatement(), t.emptyStatement(), t.emptyStatement()];
  const first_line = ast.program.body[0];
  let var_version;

  if (t.isVariableDeclaration(first_line)) {
    if (first_line.declarations.length) var_version = first_line.declarations[0].id.name;
  } else if (t.isExpressionStatement(first_line) && t.isCallExpression(first_line.expression)) {
    const call_func = first_line.expression.callee?.name;
    let j = ast.program.body.length;
    let found = false;
    while (--j) {
      const part = ast.program.body[j];
      if (!t.isFunctionDeclaration(part) || part?.id?.name !== call_func) continue;
      if (found) { ast.program.body[j] = t.emptyStatement(); continue; }
      found = true;
      const obj = part.body.body[0]?.expression?.left;
      if (!obj || !t.isMemberExpression(obj) || obj.object?.name !== 'global') break;
      var_version = obj.property?.value;
      decrypt_code.push(part);
      ast.program.body[j] = t.emptyStatement();
    }
  }
  if (!var_version) return false;

  decrypt_code[0] = first_line;
  ast.program.body.shift();

  // 定位字符串表
  const refs = { string_var: null, string_path: null, def: [] };

  traverse(ast, {
    Identifier(path) {
      if (path.node.name !== var_version) return;
      const up1 = path.parentPath;

      if (up1.isVariableDeclarator()) { refs.def.push(path); return; }

      if (up1.isArrayExpression()) {
        let node_table = path.getFunctionParent();
        while (node_table.getFunctionParent()) node_table = node_table.getFunctionParent();

        let var_string_table = null;
        if (node_table.node.id) var_string_table = node_table.node.id.name;
        else {
          while (!node_table.isVariableDeclarator()) node_table = node_table.parentPath;
          var_string_table = node_table.node.id.name;
        }

        let valid = true;
        up1.traverse({ MemberExpression(p){ valid = false; p.stop(); } });

        if (valid) { refs.string_var = var_string_table; refs.string_path = node_table; }
        return;
      }

      if (up1.isAssignmentExpression() && path.key === 'left') {
        const up2 = up1.parentPath;
        up2.replaceWith(up2.node.left);
        return;
      }
    },
  });

  if (!refs.string_var) return false;

  // 保存字符串表代码并移除
  decrypt_code[1] = refs.string_path.isVariableDeclarator()
    ? t.variableDeclaration('var', [refs.string_path.node])
    : refs.string_path.node;
  refs.string_path.remove();

  // 找主解码封装
  let decrypt_val;
  let decrypt_path;
  const binds = refs.string_path.scope.getBinding(refs.string_var);

  function parse_main_call(path) {
    decrypt_path = path;
    const node = path.node;
    const copy = t.functionDeclaration(node.id, node.params, node.body);
    node.body = t.blockStatement([]);
    return copy;
  }

  let cache = undefined;
  for (let bind of binds.referencePaths) {
    if (bind.findParent(p => p.removed)) continue;

    const parent = bind.parentPath;
    if (parent.isCallExpression() && bind.listKey === 'arguments') { cache = parent; continue; }

    if (parent.isSequenceExpression()) {
      decrypt_code.push(t.expressionStatement(parent.node));
      const up2 = parent.parentPath;
      if (up2.isIfStatement()) up2.remove(); else parent.remove();
      continue;
    }

    if (parent.isVariableDeclarator()) {
      let top = parent.getFunctionParent();
      while (top.getFunctionParent()) top = top.getFunctionParent();
      decrypt_code[2] = parse_main_call(top);
      decrypt_val = top.node.id.name;
      continue;
    }

    if (parent.isCallExpression() && !parent.node.arguments.length) {
      if (!t.isVariableDeclarator(parent.parentPath.node)) continue;
      let top = parent.getFunctionParent();
      while (top.getFunctionParent()) top = top.getFunctionParent();
      decrypt_code[2] = parse_main_call(top);
      decrypt_val = top.node.id.name;
      continue;
    }

    if (parent.isExpressionStatement()) { parent.remove(); continue; }
  }

  if (decrypt_code.length === 3 && cache) {
    if (cache.parentPath.isExpressionStatement()) decrypt_code.push(cache.parent);
    else decrypt_code.push(t.expressionStatement(cache.node));
    cache.remove();
  }

  decrypt_path.parentPath.scope.crawl();
  if (!decrypt_val) return false;

  // 运行解密序列于隔离全局
  const content_body = ast.program.body;
  ast.program.body = decrypt_code;
  const { code } = generator(ast, { compact: true });
  virtualGlobalEval(code);
  ast.program.body = content_body;

  // 调用解密
  function funToStr(path) {
    const value = virtualGlobalEval(path.toString());
    path.replaceWith(t.valueToNode(value));
  }
  function memToStr(path) {
    const value = virtualGlobalEval(path.toString());
    path.replaceWith(t.valueToNode(value));
  }

  function dfs(stack, item) {
    stack.push(item);
    const cur = item.name;

    // 执行至当前子环境
    let pfx = '';
    for (let parent of stack) pfx += parent.code + ';';
    virtualGlobalEval(pfx);

    let scope = item.path.scope;
    if (item.path.isFunctionDeclaration()) scope = item.path.parentPath.scope;
    const binding = scope.getBinding(cur);
    scope = binding.scope;
    const refs = binding.referencePaths;
    const next = [];

    for (let ref of refs) {
      const parent = ref.parentPath;
      if (ref.key === 'init') {
        next.push({ name: parent.node.id.name, path: parent, code: 'var ' + parent });
      } else if (ref.key === 'right') {
        next.push({ name: parent.node.left.name, path: parent, code: 'var ' + parent });
      } else if (ref.key === 'object') {
        memToStr(parent);
      } else if (ref.key === 'callee') {
        funToStr(parent);
      }
    }

    for (let ref of next) dfs(stack, ref);

    scope.crawl();
    item.path.remove();
    scope.crawl();
    stack.pop();
  }

  const root = { name: decrypt_val, path: decrypt_path, code: '' };
  dfs([], root);
  return ast;
}

// ---------- Phase 2: flatten switch-based control flow ----------
function cleanSwitchCode1(path) {
  const node = path.node;
  if (!(t.isBooleanLiteral(node.test) || t.isUnaryExpression(node.test))) return;
  if (!(node.test.prefix || node.test.value)) return;
  if (!t.isBlockStatement(node.body)) return;

  const body = node.body.body;
  if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return;

  const sw = body[0];
  const arrName = sw.discriminant.object.name;
  const argName = sw.discriminant.property.argument.name;

  // 复原数组
  let arr = [];
  path.getAllPrevSiblings().forEach((pre) => {
    if (!pre.isVariableDeclaration()) return;
    const { declarations } = pre.node;
    const { id, init } = declarations[0] || {};
    if (!id) return;
    if (arrName === id.name) { arr = init.callee.object.value.split('|'); pre.remove(); }
    if (argName === id.name) pre.remove();
  });

  const caseList = sw.cases;
  const resultBody = [];
  arr.map((idx) => {
    let valid = true;
    let targetIdx = parseInt(idx);
    while (valid && targetIdx < caseList.length) {
      const targetBody = caseList[targetIdx].consequent;
      for (let i = 0; i < targetBody.length; ++i) {
        const s = targetBody[i];
        if (t.isContinueStatement(s)) { valid = false; break; }
        if (t.isReturnStatement(s)) { valid = false; resultBody.push(s); break; }
        if (!t.isBreakStatement(s)) resultBody.push(s);
      }
      targetIdx++;
    }
  });

  path.replaceInline(resultBody);
}

function cleanSwitchCode2(path) {
  const node = path.node;
  if (node.init || node.test || node.update) return;
  if (!t.isBlockStatement(node.body)) return;

  const body = node.body.body;
  if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return;

  const sw = body[0];
  const arrName = sw.discriminant.object.name;
  const argName = sw.discriminant.property.argument.name;

  let arr = null;
  for (let pre of path.getAllPrevSiblings()) {
    if (!pre.isVariableDeclaration()) continue;
    const test = '' + pre;
    try {
      arr = evalOneTime(test + `;${arrName}.join('|')`).split('|');
    } catch {}
  }
  if (!Array.isArray(arr)) return;

  const caseMap = {};
  for (let item of sw.cases) caseMap[item.test.value] = item.consequent;

  const resultBody = [];
  arr.map((idx) => {
    let valid = true;
    let targetIdx = parseInt(idx);
    while (valid && targetIdx < arr.length) {
      const targetBody = caseMap[targetIdx];
      for (let i = 0; i < targetBody.length; ++i) {
        const s = targetBody[i];
        if (t.isContinueStatement(s)) { valid = false; break; }
        if (t.isReturnStatement(s)) { valid = false; resultBody.push(s); break; }
        if (!t.isBreakStatement(s)) resultBody.push(s);
      }
      targetIdx++;
    }
  });

  path.replaceInline(resultBody);
}

function cleanDeadCode(ast) {
  traverse(ast, calculateConstantExp);
  traverse(ast, pruneIfBranch);
  traverse(ast, { WhileStatement: { exit: cleanSwitchCode1 } });
  traverse(ast, { ForStatement: { exit: cleanSwitchCode2 } });
  return ast;
}

// ---------- Phase 3: unlock anti-debug/console/lint/domain-lock ----------
function removeUniqueCall(path) {
  const up1 = path.parentPath;
  const decorator = up1.node.callee.name;
  const bind1 = up1.scope.getBinding(decorator);
  bind1?.path?.remove();

  if (up1.key === 'callee') {
    up1.parentPath.remove();
  } else if (up1.key === 'init') {
    const up2 = up1.parentPath;
    const call = up2.node.id.name;
    const bind2 = up2.scope.getBinding(call);
    up2.remove();
    for (let ref of bind2.referencePaths) {
      if (ref.findParent((p) => p.removed)) continue;
      if (ref.key === 'callee') {
        let rm = ref.parentPath;
        if (rm.key === 'expression') rm = rm.parentPath;
        rm.remove();
      }
    }
  }
}

function unlockDebugger(path) {
  const decl_path = path.getFunctionParent()?.getFunctionParent();
  if (!decl_path) return;

  let valid = false;
  path.getFunctionParent().traverse({
    WhileStatement(p) { if (t.isBooleanLiteral(p.node.test) && p.node.test) valid = true; },
  });
  if (!valid) return;

  const name = decl_path.node.id.name;
  const bind = decl_path.scope.getBinding(name);

  for (let ref of bind.referencePaths) {
    if (ref.findParent((p) => p.removed)) continue;
    if (ref.listKey === 'arguments') {
      let rm = ref.getFunctionParent().parentPath;
      if (rm.key === 'expression') rm = rm.parentPath;
      rm.remove();
    } else if (ref.key === 'callee') {
      let rm = ref.getFunctionParent();
      removeUniqueCall(rm);
    }
  }
  decl_path.remove();
  path.stop();
}

function unlockConsole(path) {
  if (!t.isArrayExpression(path.node.init)) return;
  const pattern = 'log|warn|debug|info|error|exception|table|trace';
  let count = 0;
  for (let ele of path.node.init.elements) {
    if (~pattern.indexOf(ele.value)) { ++count; continue; }
    return;
  }
  if (count < 5) return;

  const rm = path.getFunctionParent();
  removeUniqueCall(rm);
}

function unlockLint(path) {
  if (path.findParent((up) => up.removed)) return;
  if (path.node.value !== '(((.+)+)+)+$') return;
  const rm = path.getFunctionParent();
  removeUniqueCall(rm);
}

function unlockDomainLock(path) {
  const array_list = [
    '[7,116,5,101,3,117,0,100]',
    '[5,110,0,100]',
    '[7,110,0,108]',
    '[7,101,0,104]',
  ];
  const checkArray = (node) => {
    const trim = node.split(' ').join('');
    for (let i = 0; i < 4; ++i) if (array_list[i] === trim) return i + 1;
    return 0;
  };

  if (path.findParent((up) => up.removed)) return;

  let mask = 1 << checkArray('' + path);
  if (mask === 1) return;

  let rm = path.getFunctionParent();
  rm.traverse({
    ArrayExpression(item) { mask |= (1 << checkArray('' + item)); },
  });

  if (mask & 0b11110) removeUniqueCall(rm);
}

function unlockEnv(ast) {
  traverse(ast, { DebuggerStatement: unlockDebugger });
  traverse(ast, { VariableDeclarator: unlockConsole });
  traverse(ast, { StringLiteral: unlockLint });
  traverse(ast, { ArrayExpression: unlockDomainLock });
}

// ---------- Phase 4: readability & purification ----------
function purifyFunction(path) {
  const left = path.get('left');
  const right = path.get('right');
  if (!left.isIdentifier() || !right.isFunctionExpression()) return;

  const name = left.node.name;
  const params = right.node.params;
  if (params.length !== 2) return;

  const [p1, p2] = params.map((p) => p.name);
  if (right.node.body.body.length !== 1) return;

  const retStmt = right.node.body.body[0];
  if (!t.isReturnStatement(retStmt)) return;
  if (!t.isBinaryExpression(retStmt.argument, { operator: '+' })) return;

  if (retStmt.argument.left?.name !== p1 || retStmt.argument.right?.name !== p2) return;

  const fnPath = path.getFunctionParent() || path.scope.path;
  fnPath.traverse({
    CallExpression(_path) {
      const callee = _path.node.callee;
      if (!t.isIdentifier(callee, { name })) return;
      const args = _path.node.arguments;
      _path.replaceWith(t.binaryExpression('+', args[0], args[1]));
    },
  });

  path.remove();
}

function purifyCode(ast) {
  traverse(ast, { AssignmentExpression: purifyFunction });
  traverse(ast, calculateConstantExp);

  function FormatMember(path) {
    const cur = path.node;
    if (!t.isStringLiteral(cur.property)) return;
    if (cur.computed !== true) return;
    if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(cur.property.value)) return;
    cur.property = t.identifier(cur.property.value);
    cur.computed = false;
  }
  traverse(ast, { MemberExpression: FormatMember });

  traverse(ast, splitSequence);
  traverse(ast, { EmptyStatement: (path) => path.remove() });
  traverse(ast, deleteUnusedVar);
}

// ---------- Plugin entry ----------
export default function (code) {
  // 可能被 pack 过，先尝试解包
  let ret = PluginEval.unpack(code);
  let global_eval = false;
  if (ret) { global_eval = true; code = ret; }

  let ast;
  try {
    ast = parse(code, { errorRecovery: true });
  } catch (e) {
    console.error(`Cannot parse code: ${e.reasonCode || e.message}`);
    return null;
  }

  // 规范 return、清 extra
  traverse(ast, deleteIllegalReturn);
  traverse(ast, { StringLiteral: ({ node }) => { delete node.extra; } });
  traverse(ast, { NumericLiteral: ({ node }) => { delete node.extra; } });

  // 全局解壳
  ast = decodeGlobal(ast);
  if (!ast) return null;

  // 代码块解壳 + 清理
  traverse(ast, parseControlFlowStorage);
  ast = cleanDeadCode(ast);

  // 刷新一次 AST，清注释并最小化转义
  ast = parse(generator(ast, { comments: false, jsescOption: { minimal: true } }).code);

  // 提升可读性
  purifyCode(ast);
  ast = parse(generator(ast, { comments: false }).code);

  // 解除环境限制
  unlockEnv(ast);

  let out = generator(ast, { comments: false, jsescOption: { minimal: true } }).code;
  if (global_eval) out = PluginEval.pack(out);
  return out;
}
