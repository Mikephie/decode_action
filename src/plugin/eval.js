function balanceCode(code, startIndex) {
  // ... (parenthesis and brace balancing logic)
}

function unpackInner(innerCode) {
  // ... (handles nested eval calls with mocked environment)
}

function plugin(code) {
  try {
    if (!/eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/.test(code)) {
      console.log('No matching eval pattern found');
      return null;
    }
    const modifiedCode = balanceCode(
      code.replace(
        /eval\s*\(\s*function\s*\(\w+,\w+,\w+,\w+,\w+,\w+\)\s*{/,
        '(function($fn){ return $fn('
      ),
      code.indexOf('{')
    );
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
    console.log('Deobfuscated result type:', typeof result);
    console.log('Deobfuscated result snippet:', String(result).slice(0, 100) + '...');
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
  plugin
};