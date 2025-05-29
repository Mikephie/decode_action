import fs from 'fs';

// Helper function to balance parentheses and braces
function balanceCode(code, startIndex) {
  let openBraces = 0, openParens = 0, inString = false, quoteChar = '';
  let i = startIndex;
  while (i < code.length) {
    if (code[i] === '"' || code[i] === "'") {
      if (!inString) {
        inString = true;
        quoteChar = code[i];
      } else if (code[i] === quoteChar && code[i - 1] !== '\\') {
        inString = false;
      }
    }
    if (!inString) {
      if (code[i] === '{') openBraces++;
      if (code[i] === '}') openBraces--;
      if (code[i] === '(') openParens++;
      if (code[i] === ')') openParens--;
    }
    if (openBraces === 0 && openParens === 0 && i > startIndex) {
      return code.slice(0, i + 1);
    }
    i++;
  }
  return code;
}

// Helper function to handle nested eval calls
function unpackInner(innerCode) {
  try {
    if (!/eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/.test(innerCode)) {
      console.log('No inner eval pattern found');
      return innerCode;
    }

    const modifiedInnerCode = balanceCode(
      innerCode.replace(
        /eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/,
        '(function($fn){ return $fn('
      ),
      innerCode.indexOf('{')
    );

    const innerWrappedCode = `
      (function(){
        const captured = [];
        const $loon = undefined, $n = undefined, $o = undefined;
        const $notify = (...args) => console.log('Notify:', ...args);
        const $done = (obj) => obj;
        const $task = { fetch: () => Promise.resolve({}) };
        const $httpClient = { get: () => {}, post: () => {}, put: () => {} };
        const $persistentStore = { write: () => {}, read: () => {} };
        const $request = { body: '{}' };
        const $t = (obj) => console.log('Done:', obj);
        const $ = { request: {}, response: {} };
        const $X = { m: (...args) => console.log('Notify X:', ...args) };
        const $S = { F: () => {}, D: () => {} };
        const $10 = { '1A': () => {}, '1B': () => {} };
        const JSON = globalThis.JSON;
        const String = globalThis.String;
        const RegExp = globalThis.RegExp;
        const console = globalThis.console;

        const $fn = function() {
          return (${modifiedInnerCode});
        };
        try {
          const result = $fn();
          console.log('Inner eval result type:', typeof result);
          return result;
        } catch (e) {
          console.error('Inner unpack error:', e.message, e.stack);
          return null;
        }
      })()
    `;

    const innerResult = eval(innerWrappedCode);
    if (typeof innerResult === 'string' && innerResult.includes('eval(')) {
      console.log('Detected nested eval in inner code, recursing...');
      return unpackInner(innerResult);
    }
    return typeof innerResult === 'string' ? innerResult : String(innerResult);
  } catch (e) {
    console.error('Inner unpack failed:', e.message, e.stack);
    return null;
  }
}

// Main unpack function (renamed from plugin to unpack)
function unpack(code) {
  try {
    // Detect eval pattern
    if (!/eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/.test(code)) {
      console.log('No matching eval pattern found');
      return null;
    }

    // Replace eval with callable function
    const modifiedCode = balanceCode(
      code.replace(
        /eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/,
        '(function($fn){ return $fn('
      ),
      code.indexOf('{')
    );

    // Wrap code with mocked environment
    const wrappedCode = `
      (function(){
        const captured = [];
        const $loon = undefined, $n = undefined, $o = undefined;
        const $notify = (...args) => console.log('Notify:', ...args);
        const $done = (obj) => obj;
        const $task = { fetch: () => Promise.resolve({}) };
        const $httpClient = { get: () => {}, post: () => {}, put: () => {} };
        const $persistentStore = { write: () => {}, read: () => {} };
        const $request = { body: '{}' };
        const $t = (obj) => console.log('Done:', obj);
        const $ = { request: {}, response: {} };
        const $X = { m: (...args) => console.log('Notify X:', ...args) };
        const $S = { F: () => {}, D: () => {} };
        const $10 = { '1A': () => {}, '1B': () => {} };
        const JSON = globalThis.JSON;
        const String = globalThis.String;
        const RegExp = globalThis.RegExp;
        const console = globalThis.console;

        const $fn = function() {
          return (${modifiedCode});
        };
        try {
          const result = $fn();
          console.log('Outer eval result type:', typeof result);
          return result;
        } catch (e) {
          console.error('Outer eval error:', e.message, e.stack);
          return null;
        }
      })()
    `;

    console.log('Executing wrapped code...');
    const result = eval(wrappedCode);

    // Log intermediate result
    console.log('Deobfuscated result type:', typeof result);
    console.log('Deobfuscated result snippet:', String(result).slice(0, 100) + '...');

    // Handle nested eval
    if (typeof result === 'string' && result.includes('eval(')) {
      console.log('Detected nested eval, recursing...');
      return unpackInner(result);
    }

    return typeof result === 'string' ? result : String(result);
  } catch (e) {
    console.error('[eval] 解包失败:', e.message, e.stack);
    return null;
  }
}

export default {
  detect(code) {
    return /eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/.test(code);
  },
  unpack
};