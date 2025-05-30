export default function (code) {
  if (!/ﾟωﾟ|･ﾟ･|｀;'|==3|@_@|\/\*.*\*\//.test(code)) return code;

  try {
    const context = {
      console: {
        log: (...args) => args.join(' ')
      }
    };
    const fn = new Function('with(this) { return ' + code + '}');
    const result = fn.call(context);
    if (typeof result === 'string') return result;
    if (typeof result === 'function') return result.toString();
  } catch (e) {
    console.warn('[jsfuck] 执行失败:', e.message);
  }
  return code;
}