import { simpleFormat } from './common.js';

/**
 * 检测是否为 jsjiami.com.v7 加密脚本
 * @param {string} code 
 * @returns {boolean}
 */
function detect(code) {
  return typeof code === 'string' && code.includes('jsjiami.com.v7');
}

/**
 * 解密 jsjiami v7 混淆脚本
 * 提取 $done({ body }) 中的真实数据
 * @param {string} code 
 * @returns {string}
 */
export async function handle(code) {
  if (!detect(code)) return code;

  console.log('[jsjiami] 检测到 jsjiami.com.v7 混淆，尝试解密...');

  try {
    let result = null;

    const vm = await import('vm');

    const sandbox = {
      $response: { body: '{}' },
      $done: function (res) {
        if (res && typeof res.body === 'string') {
          result = res.body;
        }
      },
      console
    };

    const context = vm.createContext(sandbox);

    try {
      vm.runInContext(code, context, { timeout: 3000 });
    } catch (e) {
      console.warn('[jsjiami] VM 执行出错:', e.message);
    }

    if (result && result.length > 0) {
      console.log('[jsjiami] 解密成功，已提取 $done.body');
      return result;
    } else {
      console.warn('[jsjiami] 未能提取到 $done.body，降级处理');
      return simpleFormat(code);
    }
  } catch (err) {
    console.error('[jsjiami] 解密失败:', err.message);
    return simpleFormat(code);
  }
}

export default {
  detect,
  handle
};