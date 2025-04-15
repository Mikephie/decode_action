/**
 * 极简 AA 解码插件
 * 确保完全兼容主脚本的格式
 */

// 核心解码函数
function decode(text) {
  try {
    // 检查是否是 AA 编码
    if (!text.includes("ﾟωﾟ") && !text.includes("(ﾟДﾟ)")) {
      return null;
    }

    // 替换尾部执行部分
    text = text.replace(/\)\s*\(\s*ﾟΘﾟ\s*\)\s*\(\s*['"]_['"]\s*\)\s*;?\s*$/, ")");
    
    // 添加 return 语句
    text = text.replace(/\(ﾟДﾟ\)\s*\[\s*['"]_['"]\s*\]\s*\(/, "return (");
    
    // 创建函数并执行
    const fn = new Function(text);
    return fn();
  } catch (error) {
    console.error("解码错误:", error.message);
    return null;
  }
}

// 符合主脚本接口的插件函数
async function plugin(code) {
  console.log("尝试 AA 解码...");
  const result = decode(code);
  if (result && result !== code) {
    console.log("AA 解码成功");
    return result;
  }
  console.log("AA 解码失败或无变化");
  return null;
}

// 导出插件
export default { plugin };