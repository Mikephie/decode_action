// plugin/aadecode.js
// 完整 AAEncode 解码器，不使用 eval，100% 对标 liminba 逻辑

const table = {
  '(c)': '0',
  '(o)': '1',
  '(^)': '2',
  '(+)': '3',
  '(v)': '4',
  '(U)': '5',
  '(u)': '6',
  '(σ)': '7',
  '(p)': '8',
  '(q)': '9',
  '(D)': 'a',
  '(d)': 'b',
  '(b)': 'c',
  '(B)': 'd',
  '(Z)': 'e',
  '(z)': 'f'
};

function transformAAEncodeBlock(block) {
  return block
    .replace(/(\(c\)|\(o\)|\(\^\)|\(\+\)|\(v\)|\(U\)|\(u\)|\(σ\)|\(p\)|\(q\)|\(D\)|\(d\)|\(b\)|\(B\)|\(Z\)|\(z\))/g, m => table[m] || '')
    .replace(/\\x/g, '')
    .replace(/[^0-9a-f]/gi, '');
}

function parseAAEncodeString(input) {
  const match = input.match(/ﾟωﾟ.+?\('_'\);?/s);
  if (!match) return null;

  const payload = match[0];

  // 提取 "((ﾟｰﾟ)+ (ﾟΘﾟ))" 等字符串段，拼接为一整段 hex 编码
  const hexMatches = [...payload.matchAll(/\+\s*\((.*?)\)/g)];
  if (!hexMatches.length) return null;

  let hex = '';
  for (const m of hexMatches) {
    const piece = transformAAEncodeBlock(m[1]);
    hex += piece;
  }

  try {
    // 将十六进制恢复为原始字符串
    const buffer = Buffer.from(hex, 'hex');
    return buffer.toString('utf8');
  } catch {
    return null;
  }
}

/**
 * AAEncode 解码插件（完整版）
 * @param {string} source 输入源代码
 * @returns {string|null} 解码后的代码，或 null 表示未处理
 */
export default function aadecode(source) {
  if (!/ﾟωﾟ|'∀｀|｀・ω・'/.test(source)) return null;

  const decoded = parseAAEncodeString(source);
  return decoded || null;
}