/**
 * AADecode 插件 - 处理 aaencode 混淆
 */
function decodeAA(code) {
  if (!/ﾟωﾟ|ﾟΘﾟ|ﾟｰﾟ|ﾟДﾟ/.test(code)) return code;
  
  console.log('[aadecode] 检测到AAEncode特征，开始解码...');
  
  try {
    // 使用Function构造器创建独立执行环境
    const decoder = new Function(`
      var ﾟωﾟﾉ, o, c, ﾟΘﾟ, ﾟｰﾟ, ﾟДﾟ, ﾟεﾟ, ﾟoﾟ, oﾟｰﾟo;
      var _result = '';
      var alert = function(msg) { _result = String(msg); };
      var console = { log: function(msg) { _result = String(msg); } };
      
      try {
        ${code}
      } catch(e) {
        // AAEncode执行解码后的字符串时会报错
        // 从错误信息提取结果
        if (e.message) {
          var match = e.message.match(/([\\w]+) is not defined/);
          if (match) _result = match[1];
        }
      }
      
      return _result;
    `);
    
    const result = decoder();
    if (result) {
      console.log('[aadecode] 解码成功:', result);
      return result;
    }
  } catch (e) {
    console.warn('[aadecode] 解码失败:', e.message);
  }
  
  return code;
}

export default decodeAA;
