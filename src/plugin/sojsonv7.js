/**  For jsjiami.com.v7 (sojson v7) — ESM plugin, drop-in for src/plugin/sojsonv7.js
 *  Compatible with: decode_action (ESM), path layout:
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
    if (t.isEmptyStatement(ast.program.body[i])) {
      ast.program.body.splice(i, 1);
    } else {
      ++i;
    }
  }

  // 需要至少 [版本变量, 字符串表(声明), 主解码函数] 三段
  if (ast.program.body.length < 3) {
    console.log('Error: code too short');
    return false;
  }

  // 拆第一行：把声明里的多个 declarator 拆成多行，便于定位
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

  // 版本变量名：可能是变量声明，或是第一行调用赋给 global 的场景
  if (t.isVariableDeclaration(first_line)) {
    if (first_line.declarations.length) {
      var_version = first_line.declarations[0].id.name;
    }
  } else if (t.isCallExpression(first_line?.expression)) {
    let call_func = first_line.expression.callee?.name;
    let i = ast.program.body.length;
    let find = false;
    while (--i) {
      let part = ast.program.body[i];
      if (!t.isFunctionDeclaration(part) || part?.id?.name !== call_func) continue;
      if (find) {
        // 重复定义，移除
        ast.program.body[i] = t.emptyStatement();
        continue;
      }
      find = true;
      let obj = part.body.body[0]?.expression?.left;
      if (!obj || !t.isMemberExpression(obj) || obj.object?.name !== 'global') break;
      var_version = obj.property?.value;
      decrypt_code.push(part);
      ast.program.body[i] = t.emptyStatement();
      continue;
    }
  }
  if (!var_version) {
    console.error('Line 1 is not version variable!');
    return false;
  }
  console.info(`Version var: ${var_version}`);

  decrypt_code[0] = first_line;
  ast.program.body.shift();

  // 收集与版本变量相关的引用，识别字符串表（函数/变量）路径
  const refs = { string_var: null, string_path: null, def: [] };

  traverse(ast, {
    Identifier: (path) => {
      const name = path.node.name;
      if (name !== var_version) return;

      const up1 = path.parentPath;
      if (up1.isVariableDeclarator()) {
        refs.def.push(path);
        return;
      }

      if (up1.isArrayExpression()) {
        // 对应字符串表所在的“封闭函数/变量”
        let node_table = path.getFunctionParent();
        while (node_table.getFunctionParent()) node_table = node_table.getFunctionParent();

        let var_string_table = null;
        if (node_table.node.id) {
          var_string_table = node_table.node.id.name;
        } else {
          while (!node_table.isVariableDeclarator()) node_table = node_table.parentPath;
          var_string_table = node_table.node.id.name;
        }

        let valid = true;
        up1.traverse({
          MemberExpression(p) {
            valid = false;
            p.stop();
          },
        });

        if (valid) {
          refs.string_var = var_string_table;
          refs.string_path = node_table;
        } else {
          console.info(`Drop string table: ${var_string_table}`);
        }
        return;
      }

      if (up1.isAssignmentExpression() && path.key === 'left') {
        // 直接删这类无用赋值
        const up2 = up1.parentPath;
        up2.replaceWith(up2.node.left);
        return;
      }

      console.warn(`Unexpected ref var_version: ${up1}`);
    },
  });

  if (!refs.string_var) {
    console.error('Cannot find string table');
    return false;
  }

  // 识别主解码函数的封装（decrypt_val）并提取
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

  // 保存字符串表那段代码到解密序列，并从原处移除
  decrypt_code[1] = refs.string_path.isVariableDeclarator()
    ? t.variableDeclaration('var', [refs.string_path.node])
    : refs.string_path.node;
  refs.string_path.remove();

  // 遍历对字符串表的所有引用，定位 rotate 函数与主解码封装
  let cache = undefined;
  for (let bind of binds.referencePaths) {
    if (bind.findParent((p) => p.removed)) continue;

    const parent = bind.parentPath;
    if (parent.isCallExpression() && bind.listKey === 'arguments') {
      // 旋转/预处理函数
      cache = parent;
      continue;
    }

    if (parent.isSequenceExpression()) {
      // 旋转函数（序列表达式），直接放到解码前序列
      decrypt_code.push(t.expressionStatement(parent.node));
      const up2 = parent.parentPath;
      if (up2.isIfStatement()) up2.remove();
      else parent.remove();
      continue;
    }

    if (parent.isVariableDeclarator()) {
      // 主解码变量（函数包裹）
      let top = parent.getFunctionParent();
      while (top.getFunctionParent()) top = top.getFunctionParent();
      decrypt_code[2] = parse_main_call(top);
      decrypt_val = top.node.id.name;
      continue;
    }

    if (parent.isCallExpression() && !parent.node.arguments.length) {
      // 主解码变量（直接调用形式）
      if (!t.isVariableDeclarator(parent.parentPath.node)) continue;
      let top = parent.getFunctionParent();
      while (top.getFunctionParent()) top = top.getFunctionParent();
      decrypt_code[2] = parse_main_call(top);
      decrypt_val = top.node.id.name;
      continue;
    }

    if (parent.isExpressionStatement()) {
      parent.remove();
      continue;
    }

    console.warn(`Unexpected ref var_string_table: ${parent}`);
  }

  // 若 rotate function 还未加入解密序列，这里补上
  if (decrypt_code.length === 3 && cache) {
    if (cache.parentPath.isExpressionStatement()) {
      decrypt_code.push(cache.parent);
      cache = cache.parentPath;
    } else {
      decrypt_code.push(t.expressionStatement(cache.node));
    }
    cache.remove();
  }

  decrypt_path.parentPath.scope.crawl();

  if (!decrypt_val) {
    console.error('Cannot find decrypt variable');
    return false;
  }
  console.log(`Main call wrapper name: ${decrypt_val}`);

  // 运行解密序列，建立全局可执行环境
  const content_code = ast.program.body;
  ast.program.body = decrypt_code;
  const { code } = generator(ast, { compact: true });
  virtualGlobalEval(code);

  // 恢复原正文
  ast.program.body = content_code;

  // 将调用/成员解密为字面值
  function funToStr(path) {
    const tmp = path.toString();
    const value = virtualGlobalEval(tmp);
    path.replaceWith(t.valueToNode(value));
  }
  function memToStr(path) {
    const tmp = path.toString();
    const value = virtualGlobalEval(tmp);
    path.replaceWith(t.valueToNode(value));
  }

  function dfs(stk, item) {
    stk.push(item);
    const cur_val = item.name;
    console.log(`Enter sub ${stk.length}:${cur_val}`);

    let pfx = '';
    for (let parent of stk) pfx += parent.code + ';';
    virtualGlobalEval(pfx);

    let scope = item.path.scope;
    if (item.path.isFunctionDeclaration()) scope = item.path.parentPath.scope;

    const binding = scope.getBinding(cur_val);
    scope = binding.scope;
    const refs = binding.referencePaths;
    const refs_next = [];

    for (let ref of refs) {
      const parent = ref.parentPath;
      if (ref.key === 'init') {
        refs_next.push({ name: parent.node.id.name, path: parent, code: 'var ' + parent });
      } else if (ref.key === 'right') {
        refs_next.push({ name: parent.node.left.name, path: parent, code: 'var ' + parent });
      } else if (ref.key === 'object') {
        memToStr(parent);
      } else if (ref.key === 'callee') {
        funToStr(parent);
      } else {
        console.error('Unexpected reference');
      }
    }

    for (let ref of refs_next) dfs(stk, ref);

    scope.crawl();
    item.path.remove();
    scope.crawl();

    console.log(`Exit sub ${stk.length}:${cur_val}`);
    stk.pop();
  }

  const root = { name: decrypt_val, path: decrypt_path, code: '' };
  dfs([], root);
  return ast;
}

// ---------- Phase 2: flatten switch-based control flow ----------
function cleanSwitchCode1(path) {
  // while(true) { switch(arr[idx++]){ ...; continue; } break; }
  const node = path.node;
  if (!(t.isBooleanLiteral(node.test) || t.isUnaryExpression(node.test))) return;
  if (!(node.test.prefix || node.test.value)) return;
  if (!t.isBlockStatement(node.body)) return;

  const body = node.body.body;
  if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return;

  const swithStm = body[0];
  const arrName = swithStm.discriminant.object.name;
  const argName = swithStm.discriminant.property.argument.name;
  console.log(`扁平化还原: ${arrName}[${argName}]`);

  // 在 while 上方找拼接字符串
  let arr = [];
  path.getAllPrevSiblings().forEach((pre) => {
    const { declarations } = pre.node;
    const { id, init } = declarations[0] || {};
    if (!id) return;
    if (arrName === id.name) {
      arr = init.callee.object.value.split('|');
      pre.remove();
    }
    if (argName === id.name) pre.remove();
  });

  // 重建顺序
  const caseList = swithStm.cases;
  const resultBody = [];
  arr.map((targetIdx) => {
    let valid = true;
    targetIdx = parseInt(targetIdx);
    while (valid && targetIdx < caseList.length) {
      const targetBody = caseList[targetIdx].consequent;
      const test = caseList[targetIdx].test;
      if (!t.isStringLiteral(test) || parseInt(test.value) !== targetIdx) {
        console.log(`switch中出现乱序的序号: ${test.value}:${targetIdx}`);
      }
      for (let i = 0; i < targetBody.length; ++i) {
        const s = targetBody[i];
        if (t.isContinueStatement(s)) { valid = false; break; }
        if (t.isReturnStatement(s)) { valid = false; resultBody.push(s); break; }
        if (t.isBreakStatement(s)) { console.log(`switch中出现意外的break: ${arrName}[${argName}]`); }
        else { resultBody.push(s); }
      }
      targetIdx++;
    }
  });

  path.replaceInline(resultBody);
}

function cleanSwitchCode2(path) {
  // for(;;){ switch(arr[idx]){...; continue;} }
  const node = path.node;
  if (node.init || node.test || node.update) return;
  if (!t.isBlockStatement(node.body)) return;

  const body = node.body.body;
  if (!t.isSwitchStatement(body[0]) || !t.isMemberExpression(body[0].discriminant) || !t.isBreakStatement(body[1])) return;

  const swithStm = body[0];
  const arrName = swithStm.discriminant.object.name;
  const argName = swithStm.discriminant.property.argument.name;

  // 在 for 上方尝试复原数组
  let arr = null;
  for (let pre of path.getAllPrevSiblings()) {
    if (!pre.isVariableDeclaration()) continue;
    let test = '' + pre;
    try {
      arr = evalOneTime(test + `;${arrName}.join('|')`);
      arr = arr.split('|');
    } catch { /* ignore */ }
  }
  if (!Array.isArray(arr)) return;

  console.log(`扁平化还原: ${arrName}[${argName}]`);

  // 重建
  const caseMap = {};
  for (let item of swithStm.cases) {
    caseMap[item.test.value] = item.consequent;
  }

  const resultBody = [];
  arr.map((targetIdx) => {
    let valid = true;
    while (valid && targetIdx < arr.length) {
      const targetBody = caseMap[targetIdx];
      for (let i = 0; i < targetBody.length; ++i) {
        const s = targetBody[i];
        if (t.isContinueStatement(s)) { valid = false; break; }
        if (t.isReturnStatement(s)) { valid = false; resultBody.push(s); break; }
        if (t.isBreakStatement(s)) { console.log(`switch中出现意外的break: ${arrName}[${argName}]`); }
        else { resultBody.push(s); }
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
  console.info(`Remove decorator: ${decorator}`);
  const bind1 = up1.scope.getBinding(decorator);
  bind1?.path?.remove();

  if (up1.key === 'callee') {
    up1.parentPath.remove();
  } else if (up1.key === 'init') {
    const up2 = up1.parentPath;
    const call = up2.node.id.name;
    console.info(`Remove call: ${call}`);
    const bind2 = up2.scope.getBinding(call);
    up2.remove();
    for (let ref of bind2.referencePaths) {
      if (ref.findParent((p) => p.removed)) continue;
      if (ref.key === 'callee') {
        let rm = ref.parentPath;
        if (rm.key === 'expression') rm = rm.parentPath;
        rm.remove();
      } else {
        console.warn(`Unexpected ref key: ${ref.key}`);
      }
    }
  }
}

function unlockDebugger(path) {
  const decl_path = path.getFunctionParent()?.getFunctionParent();
  if (!decl_path) return;

  let valid = false;
  path.getFunctionParent().traverse({
    WhileStatement(p) {
      if (t.isBooleanLiteral(p.node.test) && p.node.test) valid = true;
    },
  });
  if (!valid) return;

  const name = decl_path.node.id.name;
  const bind = decl_path.scope.getBinding(name);
  console.info(`Debug test and inf-loop: ${name}`);

  for (let ref of bind.referencePaths) {
    if (ref.findParent((p) => p.removed)) continue;
    if (ref.listKey === 'arguments') {
      // setInterval
      let rm = ref.getFunctionParent().parentPath;
      if (rm.key === 'expression') rm = rm.parentPath;
      rm.remove();
    } else if (ref.key === 'callee') {
      let rm = ref.getFunctionParent();
      removeUniqueCall(rm);
    } else {
      console.warn(`Unexpected ref key: ${ref.key}`);
    }
  }
  decl_path.remove();
  path.stop();
}

function unlockConsole(path) {
  if (!t.isArrayExpression(path.node.init)) return;
  let pattern = 'log|warn|debug|info|error|exception|table|trace';
  let count = 0;
  for (let ele of path.node.init.elements) {
    if (~pattern.indexOf(ele.value)) { ++count; continue; }
    return;
  }
  if (count < 5) return;

  const left1 = path.getSibling(0);
  const code = generator(left1.node, { minified: true }).code;

  // 兼容多环境
  ['window', 'process', 'require', 'global'].forEach((key) => {
    if (code.indexOf(key) === -1) return;
  });

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
    ArrayExpression(item) {
      mask |= (1 << checkArray('' + item));
    },
  });

  if (mask & 0b11110) {
    console.info('Find domain lock');
    removeUniqueCall(rm);
  }
}

function unlockEnv(ast) {
  traverse(ast, { DebuggerStatement: unlockDebugger });
  traverse(ast, { VariableDeclarator: unlockConsole });
  traverse(ast, { StringLiteral: unlockLint });
  traverse(ast, { ArrayExpression: unlockDomainLock });
}

// ---------- Phase 4: readability & purification ----------
/** 把形如 A = function(a,b){return a+b} 的调用 A(x,y) 还原为 x + y */
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
  console.log(`拼接类函数: ${name}`);
}

function purifyCode(ast) {
  traverse(ast, { AssignmentExpression: purifyFunction });
  traverse(ast, calculateConstantExp);

  function FormatMember(path) {
    // obj['prop']['toString']()  =>  obj.prop.toString()
    const cur = path.node;
    if (!t.isStringLiteral(cur.property)) return;
    if (cur.computed === undefined || cur.computed !== true) return;
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
  // 若外层做了 pack/unpack，这里先处理
  let ret = PluginEval.unpack(code);
  let global_eval = false;
  if (ret) { global_eval = true; code = ret; }

  let ast;
  try {
    ast = parse(code, { errorRecovery: true });
  } catch (e) {
    console.error(`Cannot parse code: ${e.reasonCode}`);
    return null;
  }

  // 规范 return、去除 0x../八进制等显示信息
  traverse(ast, deleteIllegalReturn);
  traverse(ast, { StringLiteral: ({ node }) => { delete node.extra; } });
  traverse(ast, { NumericLiteral: ({ node }) => { delete node.extra; } });

  console.log('处理全局加密...');
  ast = decodeGlobal(ast);
  if (!ast) return null;

  console.log('处理代码块加密...');
  traverse(ast, parseControlFlowStorage);

  console.log('清理死代码...');
  ast = cleanDeadCode(ast);

  // 刷新一次 AST，清理注释并最小化转义
  ast = parse(generator(ast, { comments: false, jsescOption: { minimal: true } }).code);

  console.log('提高代码可读性...');
  purifyCode(ast);
  ast = parse(generator(ast, { comments: false }).code);

  console.log('解除环境限制...');
  unlockEnv(ast);

  console.log('净化完成');
  let out = generator(ast, { comments: false, jsescOption: { minimal: true } }).code;

  if (global_eval) out = PluginEval.pack(out);
  return out;
}
