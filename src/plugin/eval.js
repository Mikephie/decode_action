/**
 * Eval2 - 处理 EMS/P.A.C.K.E.R 格式的 eval(function(p,a,c,k,e,d){...}) 混淆
 */
import vm from 'vm';

/**
 * 检测是否为 EMS/P.A.C.K.E.R 格式
 */
function detect(code) {
  return /^\s*eval\(function\(p,a,c,k,e,d\)/.test(code.trim());
}

/**
 * 解混淆函数，使用 vm 安全执行
 */
function unpack(code, depth = 0) {
  if (depth > 5) {
    console.warn('[eval2] 达到最大递归深度');
    return code;
  }

  try {
    console.log(`[eval2] 第 ${depth + 1} 层 EMS 解包中...`);

    const sandbox = {};
    vm.createContext(sandbox);
    const result = vm.runInContext(code, sandbox, { timeout: 500 });

    if (typeof result === 'string') {
      // 递归判断下一层是否还是 EMS
      if (detect(result)) {
        return unpack(result, depth + 1);
      }
      return result;
    }

    if (typeof result === 'function') return result.toString();
    return String(result);
  } catch (e) {
    console.warn('[eval2] 解包失败:', e.message);
    return code;
  }
}

/**
 * 插件接口
 */
function plugin(code) {
  return unpack(code);
}

export default {
  name: 'eval2',
  description: '解密 EMS / P.A.C.K.E.R 格式的 eval(function(p,a,c,k,e,d){...})',
  detect,
  unpack,
  plugin,
  priority: 40 // 高于 eval 的优先级
};