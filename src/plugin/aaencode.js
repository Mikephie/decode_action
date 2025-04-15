/**
 * ESM 模块：aaencode 解码器
 * 使用方式：
 *   import { decodeAAencoded } from './aaDecode.js';
 *   const decodedScript = decodeAAencoded(aaencodedString);
 *   console.log(decodedScript);
 */

/**
 * 解码 aaencoded 字符串
 * @param {string} aaencoded 输入的 aaencode 脚本
 * @returns {string} 解码后的脚本
 */
export function decodeAAencoded(aaencoded) {
  // 1) 预处理 - 去掉多余空格、换行
  let input = aaencoded
    .replace(/\s+/g, '')
    // 某些 aaencode 可能把 "document" 等注释在里面，这里可以酌情去掉
    .trim();

  /**
   * 注意：aaencode 的基本逻辑通常是把一连串奇怪的字符映射成二进制或八进制，
   *      然后合并成完整字符串，再通过 eval(...) 执行。
   * 
   * 典型映射关系：
   *    (ﾟΘﾟ) -> 0
   *    (ﾟｰﾟ) -> 1
   *    (o^_^o) -> 8
   *    (o^_^o) - (ﾟΘﾟ) -> 7   等等...
   * 
   * 实际上每个 aaencode 版本可能略有差异，但大同小异。
   * 我们可以用正则去匹配：
   *    /(ﾟΘﾟ)|(ﾟｰﾟ)|(o\^_\^o)|.../g
   * 然后在回调里做映射，把它变成 "0" "1" "7" "8" 之类，再组装成 ASCII。
   * 
   * 下方是一个通用的 decode 实现，可以应对大多数 aaencode。
   */

  // 2) 先匹配出 "eval(eval('...'))('_');" 这部分内部的真正字符串（如果存在）
  //    有些 aadecode 是:  (ﾟДﾟ)[ﾟoﾟ]('大段内容')('_');
  //    也可能是直接 eval( "大段内容" );
  //    此处用一个尽量宽松的正则，只要捕获到里面那段字符串即可。
  const matchInside = input.match(
    /\(ﾟДﾟ\)\[['"]_['"]\]\s*\(\s*\(ﾟДﾟ\)\[['"]_['"]\]\s*\((.*?)\)\)\('_'\);?/
  );

  // 如果没匹配到，可能是另一种写法 - 就略做兼容
  let coreCode = '';
  if (matchInside) {
    coreCode = matchInside[1];
  } else {
    // 有些 aaencode 是在最后通过 ... ( '_') 来执行，这里简化处理
    // 如果整段就是一个立即执行的表达式，也可以直接拿它本身
    coreCode = input;
  }

  // 3) 把核心大段的 (ﾟｰﾟ) / (ﾟΘﾟ) / (o^_^o) 等各种符号映射成二进制或八进制

  /**
   * 这里举例一个常见的做法： 先把所有 (ﾟΘﾟ) 替换成 '0'；(ﾟｰﾟ) 替换成 '1'；等等
   * 但不少场景里，还要观察加减乘除出现的地方——(o^_^o) - (ﾟΘﾟ) 之类可能表示 '7'
   * 
   * 你可以针对常见的 “(o^_^o) + (o^_^o)” => '16' / '8' / '88' 之类做处理。
   * 
   * 因为不同 aaencode 的书写方式并不完全统一，这里给出一个参考思路的正则替换。
   */

  let binStr = coreCode
    // 先把所有空格 / 加号 / 括号 / 运算符等拿掉，化简成最小表达
    // 但要注意不能破坏 (ﾟΘﾟ) 这样的结构
    .replace(/\+/g, '')
    .replace(/[\(\)]/g, '')
    .replace(/^\s+|\s+$/g, '');

  // 典型替换：把 (ﾟｰﾟ) => '1'；(ﾟΘﾟ) => '0'；(o^_^o) => '8' 等
  // 这里只是示例，具体需根据实际 aaencode 的写法来：
  binStr = binStr
    .replace(/ﾟｰﾟ/g, '1')
    .replace(/ﾟΘﾟ/g, '0')
    .replace(/o\^_\^o/g, '8')
    .replace(/ー/g, '-'); // 可能有些符号是减号

  // 有时也见到 (o^_^o) - (ﾟΘﾟ) => '7' 之类，这里可再行处理：
  binStr = binStr
    .replace(/8-0/g, '7')
    .replace(/8-1/g, '7'); 
    // 仅仅演示，实际要仔细区分

  // 这样会变成一串类似 '72 101 118 97 108' 等数值，还要从八进制或十进制转成字符
  // 你需要根据实际 aaencode 的“进制”来判断。最常见的是它构造了八进制 ASCII，如 \NNN 的写法。
  // 
  // 这里为了演示，简单假设它直接拼出十进制 ASCII——
  // 真实情况你要先看一下生成的字符像不像 72/101/108 (HEL...) 这样
  // 如果看不懂，可以挨个 print 出来调试

  // 分割成可识别的数字 token，这里演示用正则按非数字拆分
  const tokens = binStr.split(/[^0-9]+/).filter(Boolean);

  // 然后把每个数字从 10 进制转成字符
  let decoded = tokens.map(num => {
    const n = parseInt(num, 10);
    return n ? String.fromCharCode(n) : '';
  }).join('');

  // 如果你的 aaencode 其实使用的是类似八进制，还需 parseInt(num, 8)
  // 如果还带有 \xNN 这种结构，你还要另外 .replace(/\\x([0-9A-Fa-f]{2})/g, ...) 解码

  // 4) decoded 现在基本就是一段 JavaScript 原始脚本，如果想直接运行可以再 eval(decoded)
  //    这里我们就把它返回：
  return decoded;
}