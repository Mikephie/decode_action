// plugin/jsfuck.js
export default function decodeJSFuck(code) {
  // 检测是否为 JSFuck 混淆代码
  const jsfuckPattern = /^[\[\]\(\)\!\+]+$/;
  if (!jsfuckPattern.test(code.replace(/\s+/g, ''))) {
    return null;
  }

  try {
    // 使用 Function 构造函数安全地解析代码
    const decoded = Function(`"use strict"; return (${code})`)();
    return typeof decoded === 'string' ? decoded : null;
  } catch (e) {
    console.error('JSFuck 解密失败:', e);
    return null;
  }
}
