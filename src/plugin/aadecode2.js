import coreDecode from './aadecode-core.js';

export default function (code) {
  let previous = code;
  for (let i = 0; i < 5; i++) {
    try {
      const result = coreDecode(previous);
      if (typeof result !== 'string' || result === previous) break;
      previous = result;
    } catch {
      break;
    }
  }
  return previous;
}