// plugins/jsjiami_v7.js
// 更稳的 jsjiami v7 解码：支持别名、两种函数声明形式；仅执行解码器和字符串表；
// 成功把 f(数字, "key") 文字化，移除解码器/字符串表；失败返回 null 让上游兜底。
import ivm from "isolated-vm";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default || _traverse;
import * as t from "@babel/types";
import gen from "@babel/generator";
const generate = (ast, opts) => (gen.default || gen)(ast, opts);

const MAX_SRC_LEN = 2_000_000;

export default async function jsjiamiV7(input) {
  const text = String(input);
  if (!/jsjiami\.com\.v7|encode_version\s*=\s*['"]jsjiami\.com\.v7['"]/i.test(text)) {
    return null;
  }

  // 限长解析
  let ast;
  try {
    ast = parse(text.length > MAX_SRC_LEN ? text.slice(0, MAX_SRC_LEN) : text, {
      sourceType: "unambiguous",
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      plugins: ["jsx", "classProperties", "optionalChaining", "dynamicImport"],
    });
  } catch {
    return stripShellKeepMarker(text);
  }

  // 1) 收集所有 "callee( 数字 , 字符串 )" 的调用点，统计频率最高者为候选解码器
  const callSites = [];
  const freq = new Map();
  traverse(ast, {
    CallExpression(path) {
      const { callee, arguments: args } = path.node;
      if (
        t.isIdentifier(callee) &&
        args.length === 2 &&
        t.isNumericLiteral(args[0]) &&
        isStaticString(args[1])
      ) {
        const name = callee.name;
        callSites.push({ path, name, idxNode: args[0], keyNode: args[1] });
        freq.set(name, (freq.get(name) || 0) + 1);
      }
    },
  });
  if (callSites.length === 0) return stripShellKeepMarker(text);
  let candidate = [...freq.entries()].sort((a, b) => b[1] - a[1])[0][0];

  // 2) 解析别名链（如 const _0xc3dd0a = _0x1e61;）
  const aliasTarget = resolveAliasTarget(ast, candidate);
  const decoderName = aliasTarget || candidate;

  // 3) 尝试在源码中抓取：
  //    - 解码器（function dec(...) 或 dec = function(...)）
  //    - 常见字符串表函数（_0x1715 或形如 function _0x[0-9a-f]{3,}\(\) 返回数组的）
  const bootParts = [];
  const preface = [
    `var _0xodH = "jsjiami.com.v7";`,
    `var window = {}; var self = {}; var globalThis = global;`,
  ].join("\n");
  bootParts.push(preface);

  // 字符串表：优先 _0x1715；否则找第一个 "function _0x????()" 体内有 "return [" 的函数
  const tableName = findStringTableName(text) || "_0x1715";
  const tableSrc = extractFuncAny(text, tableName);
  if (tableSrc) bootParts.push(tableSrc);

  // 解码器
  const decoderSrc = extractFuncAny(text, decoderName);
  if (!decoderSrc) return null; // 让外层把它当作 decoder-not-found
  bootParts.push(decoderSrc);

  // 如果候选名是别名，补上别名赋值（确保 __dec 调用候选名也可用）
  if (candidate !== decoderName) {
    bootParts.push(`var ${candidate} = ${decoderName};`);
  }

  // 暴露解码桥
  bootParts.push(`
    global.__dec = function(i, k) {
      try { return ${decoderName}(i, k); } catch (e) { return null; }
    };
  `);

  const bootCode = bootParts.join("\n");

  // 4) 启动沙箱
  let isolate, context;
  try {
    isolate = new ivm.Isolate({ memoryLimit: 64 });
    context = await isolate.createContext();
    const jail = context.global;
    await jail.set("global", jail.derefInto());
    const script = await isolate.compileScript(bootCode, { filename: "jjv7-boot.js" });
    await script.run(context, { timeout: 500 });
  } catch {
    if (context) await context.release();
    if (isolate) isolate.dispose();
    return stripShellKeepMarker(text);
  }

  // 5) 在完整 AST 中把 candidate(数,"key") 调用替换成字面量
  const fullAst = parse(text, {
    sourceType: "unambiguous",
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    plugins: ["jsx", "classProperties", "optionalChaining", "dynamicImport"],
  });

  const jobs = [];
  traverse(fullAst, {
    CallExpression(path) {
      const { callee, arguments: args } = path.node;
      if (
        t.isIdentifier(callee) &&
        (callee.name === candidate || callee.name === decoderName) &&
        args.length === 2 &&
        t.isNumericLiteral(args[0]) &&
        isStaticString(args[1])
      ) {
        jobs.push({
          path,
          i: args[0].value,
          k: evalStaticString(args[1]),
        });
      }
    },
  });

  let replaced = 0;
  for (const j of jobs) {
    try {
      const val = await context.eval(`__dec(${j.i}, ${JSON.stringify(j.k)})`, { timeout: 120 });
      if (typeof val === "string") {
        j.path.replaceWith(t.stringLiteral(val));
        replaced++;
      }
    } catch {
      // 忽略个别失败
    }
  }

  // 6) 清理：去掉解码器/字符串表（两种声明形态都处理）
  traverse(fullAst, {
    FunctionDeclaration(path) {
      const n = path.node.id?.name;
      if (n === decoderName || n === tableName) path.remove();
    },
    VariableDeclarator(path) {
      const id = path.node.id;
      if (!t.isIdentifier(id)) return;
      const n = id.name;
      if (n === decoderName || n === candidate || n === tableName || /^encode_version$|^_0xodH$/.test(n)) {
        const decl = path.findParent((p) => p.isVariableDeclaration());
        if (decl && decl.node.declarations.length === 1) decl.remove();
        else path.remove();
      }
    },
  });

  const out = generate(fullAst, { retainLines: false, compact: false }).code;

  await context.release();
  isolate.dispose();

  if (replaced === 0) return stripShellKeepMarker(text);
  return out;
}

/* ===== 工具函数 ===== */
function isStaticString(node) {
  return (
    t.isStringLiteral(node) ||
    (t.isTemplateLiteral(node) && node.expressions.length === 0)
  );
}
function evalStaticString(node) {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isTemplateLiteral(node)) {
    return node.quasis.map((q) => q.value.cooked ?? q.value.raw).join("");
  }
  return "";
}

function resolveAliasTarget(ast, name) {
  let target = null;
  traverse(ast, {
    VariableDeclarator(p) {
      const id = p.node.id;
      if (t.isIdentifier(id) && id.name === name) {
        const init = p.node.init;
        if (t.isIdentifier(init)) {
          target = init.name;
        }
      }
    },
  });
  return target;
}

// 同时支持两种声明：function NAME(...) 与 NAME = function(...)
function extractFuncAny(code, name) {
  const byDecl = extractByBalancedBraces(code, new RegExp(`\\bfunction\\s+${escapeReg(name)}\\s*\\(`, "m"));
  if (byDecl) return byDecl;
  const byAssign = extractByBalancedBraces(code, new RegExp(`\\b${escapeReg(name)}\\s*=\\s*function\\s*\\(`, "m"));
  return byAssign;
}

function findStringTableName(code) {
  // 优先常见 _0x1715；否则找 function _0x????() 且函数体中包含 'return [' 或 '.concat('
  if (/function\s+_0x1715\s*\(/.test(code)) return "_0x1715";
  const m = code.match(/function\s+(_0x[0-9a-fA-F]{3,})\s*\(/);
  if (!m) return null;
  const name = m[1];
  const body = extractFuncAny(code, name) || "";
  if (/return\s*\[/.test(body) || /\.concat\s*\(/.test(body)) return name;
  return null;
}

function extractByBalancedBraces(code, startRe) {
  const m = code.match(startRe);
  if (!m) return null;
  const start = m.index;
  // 找到第一个 '{'
  const braceStart = code.indexOf("{", start);
  if (braceStart < 0) return null;
  let depth = 0;
  for (let i = braceStart; i < code.length; i++) {
    const ch = code[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return code.slice(start, i + 1);
      }
    }
  }
  return null;
}
function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripShellKeepMarker(input) {
  let code = String(input);
  code = code.replace(
    /;?\s*var\s+encode_version\s*=\s*['"]jsjiami\.com\.v7['"];?/i,
    (m) => m
  );
  code = code.replace(
    /try\s*\{[\s\S]{0,800}?\}\s*catch\s*\([^)]+\)\s*\{\s*\};?/g,
    "/* [strip:try-catch-self-check] */"
  );
  code = code.replace(
    /if\s*\(\!?\s*function\s*\([\w, ]*\)\s*\{[\s\S]{0,2000}?\}\s*\(\)\)\s*;?/g,
    "/* [strip:dead-wrapper] */"
  );
  return code;
}
