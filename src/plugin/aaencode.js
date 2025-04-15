// aaencodeDecoder.mjs

export function aaDecode(encoded) {
  if (!encoded.match(/^ﾟωﾟ.+\('_'\);?$/)) {
    throw new Error('Provided code is not valid AAEncode encoding');
  }

  const evalPreamble = 'return ';
  encoded = encoded.replace(/^ﾟωﾟ.+\('_'\);?/, '');

  const decodeMap = {
    '(c^_^o)': '0',
    '(ﾟΘﾟ)': '1',
    '((o^_^o)-(ﾟΘﾟ))': '2',
    '(o^_^o)': '3',
    '(ﾟｰﾟ)': '4',
    '((ﾟｰﾟ)+(ﾟΘﾟ))': '5',
    '((o^_^o)+(o^_^o))': '6',
    '((ﾟｰﾟ)+(o^_^o))': '7',
    '((ﾟｰﾟ)+(ﾟｰﾟ))': '8',
    '((ﾟｰﾟ)+(ﾟｰﾟ)+(ﾟΘﾟ))': '9'
  };

  const regex = /\(c\^_\^o\)|\(ﾟΘﾟ\)|\(o\^_\^o\)|\(ﾟｰﾟ\)|\(\(o\^_\^o\)-\(ﾟΘﾟ\)\)|\(\(ﾟｰﾟ\)\+\(ﾟΘﾟ\)\)|\(\(o\^_\^o\)\+\(o\^_\^o\)\)|\(\(ﾟｰﾟ\)\+\(o\^_\^o\)\)|\(\(ﾟｰﾟ\)\+\(ﾟｰﾟ\)\)|\(\(ﾟｰﾟ\)\+\(ﾟｰﾟ\)\+\(ﾟΘﾟ\)\)/g;

  let decoded = encoded.replace(regex, match => decodeMap[match]);

  decoded = decoded.replace(/\+/g, '');

  const js = decoded.replace(/_/, evalPreamble);

  try {
    return (new Function(js))();
  } catch (e) {
    throw new Error('Decoding failed: ' + e.message);
  }
}

// Usage Example
// import { aaDecode } from './aaencodeDecoder.mjs';
// const encodedCode = "AAEncode 编码的字符串";
// const decodedCode = aaDecode(encodedCode);
// console.log(decodedCode);
