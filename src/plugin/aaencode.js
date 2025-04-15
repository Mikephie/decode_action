/**
 * ESM 模块：模拟“网页端”宽松处理的 aaencode 解码器
 *
 * 用法：
 *   import { autoCleanAndDecodeAa } from './aaDecodeAutoClean.js';
 *   const decodedScript = autoCleanAndDecodeAa(aaencodedString);
 *   console.log(decodedScript);
 *
 * 注意：
 *   - 只是示例，不一定涵盖所有奇怪字符/写法。
 *   - 如果仍不能解，需要自行补充更全面的清理或匹配逻辑。
 */

export function autoCleanAndDecodeAa(inputCode) {
  // 1) 先把原文按行拆分，去掉常见代理配置/注释行
  let lines = inputCode.split(/\r?\n/);

  // 常见要过滤的行/关键词：
  const blockList = [
    '[rewrite_local]',
    '[mitm]',
    'hostname',
    '$response',
    '$done',
    '$request'
  ];

  // 保留对 aaencode 解码有用的行，去掉配置信息、明显无关行
  lines = lines.filter(line => {
    // 如果 line 中有 blockList 里任何关键词，就排除
    const lower = line.toLowerCase();
    return !blockList.some(k => lower.includes(k));
  });

  // 2) 把行合并回一整个字符串
  let code = lines.join('\n');

  // 3) 去除一些常见的 “花哨全角符号” 或注释
  //    示例：｀, ～, ┻, ━, ´, …, 等等
  //    你可根据需要再加
  const suspiciousUnicode = /[｀～┻━…´]/g;
  code = code.replace(suspiciousUnicode, '');

  // 也可以把类似 `//*` 开头到 `*/` 之间的注释整个干掉：
  code = code.replace(/\/\/\*[^]*?\*\//g, '');

  // 4) 去除多余空白
  code = code.replace(/\s+/g, ' ').trim();

  // 5) 现在再尝试用“aaencode解析”——
  //    这里给出一个非常简易的解析，分两步：
  //    A) 看能否捕获 “(ﾟДﾟ)[ﾟoﾟ]( 'xxx' )('_');” 这种模式
  //    B) 如果没捕获到，就尝试更基础的 (ﾟΘﾟ)->0, (ﾟｰﾟ)->1, (o^_^o)->8 替换
  //       然后看能否组装出 ASCII

  // 5A) 捕获内层字符串:
  //    例如： (ﾟДﾟ)[ﾟωﾟﾉ]((ﾟДﾟ)[ﾟωﾟﾉ]('alert("Hello!")'))('_');
  //    这里用简化正则: /\(ﾟДﾟ\)\[\S+?\]\(\(ﾟДﾟ\)\[\S+?\]\('([^']*)'\)\)\('_'\)/
  //    可能能抓到 `'alert("Hello!")'`
  const mainMatch = code.match(/\(ﾟДﾟ\)\[\S+?\]\(\(ﾟДﾟ\)\[\S+?\]\('([^']*)'\)\)\('_'\)/);

  if (mainMatch) {
    // 如果匹配到，就返回提取到的那段字符串
    return mainMatch[1];
  }

  // 5B) 若没匹配到，就做“字符替换”。
  let replaced = code;

  // 先把运算符 +() 去掉
  replaced = replaced.replace(/[+\(\)]/g, '');

  // 替换 (ﾟｰﾟ)->1, (ﾟΘﾟ)->0, (o^_^o)->8, ... 
  replaced = replaced
    .replace(/\(ﾟｰﾟ\)/g, '1')
    .replace(/\(ﾟΘﾟ\)/g, '0')
    .replace(/\(o\^_\^o\)/g, '8')
    .replace(/ー/g, '-'); // 可能出现

  // 再把 "8-0" => "7", "8-1" => "7" 之类
  replaced = replaced
    .replace(/8-0/g, '7')
    .replace(/8-1/g, '7');

  // 现在 replaced 可能像 "72 101 108 108 111 40 ..." 或 "7269108111..." 
  // 这就需要你再细化逻辑：本示例只演示“按非数字拆分”
  const tokens = replaced.split(/[^0-9]+/).filter(Boolean);

  // 假设它们是10进制 ASCII
  let resultArr = tokens.map(num => {
    const n = parseInt(num, 10);
    return n ? String.fromCharCode(n) : '';
  });
  let result = resultArr.join('');

  // 如果 result 依然是空或看不懂，就原文返回
  if (!result.trim()) {
    result = code; // 表示未成功
  }

  return result;
}