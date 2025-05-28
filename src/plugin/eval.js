import * as dean from './strategies/deanPacker.js';
import * as base from './strategies/baseEval.js';

function detect(code) {
  return dean.detect(code) || base.detect(code);
}

function unpack(code) {
  if (dean.detect(code)) {
    const deanResult = dean.unpack(code);
    if (deanResult && deanResult !== code) {
      return deanResult;
    }
  }

  if (base.detect(code)) {
    const baseResult = base.unpack(code);
    if (baseResult && baseResult !== code) {
      return baseResult;
    }
  }

  return null;
}

export default {
  name: 'eval',
  description: '多策略 eval 解包插件 (Dean 优先)',
  priority: 90,
  detect,
  unpack,
  plugin: unpack
};