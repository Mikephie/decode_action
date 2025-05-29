/**
 * Eval - 处理一般eval字符串包裹的解包器
 * 用于处理 eval("var a = ...") 等形式的代码
 */

/**
 * 检测是否为普通 eval 包裹的代码
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否匹配
 */
function detect(code) {
  // 去掉注释和字符串中的干扰，避免误判
  const stripped = code
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // 移除注释
    .replace(/(['"`])(?:(?!\1)[^\\]|\\.)*\1/g, ''); // 移除字符串
  return /\beval\s*\(/.test(stripped);
}

/**
 * 递归解包 eval 包裹的代码
 * @param {string} code - 要解包的代码
 * @param {number} [depth=0] - 当前递归深度
 * @returns {string|null} - 解包后的代码
 */
function unpack(code, depth = 0) {
  if (depth > 5) {
    console.warn('[eval] 达到最大递归深度，停止解包');
    return code;
  }

  try {
    if (!detect(code)) {
      return null;
    }

    console.log(`[eval] 检测到普通 eval 包裹代码，开始第 ${depth + 1} 层解包`);

    // 替换 eval(...) 为 捕获表达式
    const modifiedCode = code.replace(/eval\s*\(/g, '(function(x){return x})(');

    // 安全执行 eval，提取出真实代码
    let result = Function('window', 'document', 'navigator', 'location',
      `return ${modifiedCode}`)(
        {}, {}, { userAgent: 'Mozilla/5.0' }, {}
      );

    if (typeof result === 'string') {
      if (detect(result)) {
        return unpack(result, depth + 1);
      }
      return result;
    }

    return String(result);
  } catch (err) {
    console.warn('[eval] 捕获执行失败，尝试粗暴替换');

    try {
      // 粗暴替换 eval(...) => (...)
      const modified = code.replace(/eval\s*\(/g, '(');
      return modified;
    } catch (e) {
      console.error('[eval] 粗暴替换失败:', e);
      return code;
    }
  }
}

/**
 * 插件接口
 */
function plugin(code) {
  return unpack(code);
}

// 导出插件
export default {
  detect,
  unpack,
  plugin,
  name: 'eval',
  description: '普通eval字符串解包器',
  priority: 50 // 优先级低于 eval2
}