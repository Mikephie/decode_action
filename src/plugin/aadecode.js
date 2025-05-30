import coreDecode from './aadecode-core.js';

export default function (code) {
  try {
    const result = coreDecode(code);
    return typeof result === 'string' ? result : code;
  } catch {
    return code;
  }
}