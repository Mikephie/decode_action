
import AADecoder from './aadecoder.js'; // 确保正确导入AADecoder类

/**
 * 解码AAEncode混淆的JavaScript代码
 * @param {string} code - 要解码的代码
 * @returns {string|null} - 解码结果或失败时返回null
 */
function decodeAAencode(code) {
  try {
    // 检查是否是AAEncode
    if (!/ﾟωﾟﾉ\s*=/.test(code)) {
      return null;
    }
    
    // 根据AADecoder的实现选择一种方法
    
    // 方法1: 如果AADecoder是一个提供静态方法的类
    return AADecoder.decode(code);
    
    // 方法2: 如果AADecoder需要实例化（取消注释以启用）
    // const decoder = new AADecoder();
    // return decoder.decode(code);
  } catch (error) {
    console.error('[AAEncode] 处理时发生错误:', error.message);
    return null;
  }
}

// 导出解码函数
export default decodeAAencode;