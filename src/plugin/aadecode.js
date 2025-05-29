// plugin/aadecode.js
import vm from 'vm';

/**
 * 判断字符串是否为典型 AAEncode 混淆格式
 * @param {string} code
 */
function looksLikeAAEncode(code) {
  return /ﾟωﾟ|'∀｀|｀・ω・'/.test(code) && /function/.test(code);
}

/**
 * 递归解码 AAEncode 脚本
 * @param {string} input
 * @param {number} depth
 * @returns {string|null}
 */
function decodeAAEncodeRecursive(input, depth = 0) {
  if (depth > 5) return null; // 防止死循环

  if (!looksLikeAAEncode(input)) return null;

  try {
    // 尝试在沙箱中运行该段代码，获取 return 的结果
    const sandbox = {};
    const script = new vm.Script(input, { timeout: 1000 });
    const context = vm.createContext(sandbox);
    const result = script.runInContext(context);

    if (typeof result === 'string') {
      // 如果返回结果仍然是 AAEncode 格式，继续递归
      const nested = decodeAAEncodeRecursive(result, depth + 1);
      return nested || result;
    }
  } catch (err) {
    return null;
  }

  return null;
}

/**
 * 最终插件导出函数
 * @param {string} source 输入源代码
 * @returns {string|null}
 */
export default function aadecode(source) {
  const result = decodeAAEncodeRecursive(source);
  return result || null;
}