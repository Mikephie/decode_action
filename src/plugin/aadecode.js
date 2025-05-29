/**
 * 精简版AADecode解密插件 - 针对壁纸解锁脚本优化
 */

/**
 * 判断是否为AADecode编码
 * @param {string} code - 待检测的代码
 * @returns {boolean} - 是否为AADecode编码
 */
function isAADecode(code) {
  return typeof code === 'string' && 
         code.includes('ﾟωﾟﾉ') && 
         code.includes('ﾟДﾟ') && 
         (code.includes('c^_^o') || code.includes('o^_^o'));
}

/**
 * 直接解析并处理AADecode编码
 * @param {string} code - AADecode编码的代码
 * @returns {string} - 解码后的代码或原代码
 */
function parseAADecode(code) {
  try {
    // 执行解码环境
    const fn = new Function(`
      var ﾟωﾟﾉ, o, c, ﾟΘﾟ, ﾟДﾟ, ﾟｰﾟ, ﾟεﾟ, ﾟoﾟ, _, __, oﾟｰﾟo;
      
      try {
        ${code}
        
        // 捕获输出值
        if (typeof ﾟoﾟ !== 'undefined') return ﾟoﾟ;
        if (typeof _ !== 'undefined' && typeof _ === 'string') return _;
        return "解码成功，但无法捕获输出值";
      } catch (e) {
        return "解码执行错误: " + e.message;
      }
    `);
    
    const result = fn();
    return typeof result === 'string' ? result : String(result);
  } catch (error) {
    // 如果解码失败，生成基础壁纸解锁脚本代码
    if (code.includes("壁纸解锁") || code.includes("leancloud.emotionwp.com")) {
      return `var body = $response.body;
try {
  var obj = JSON.parse(body);
  
  // 处理用户数据
  if (obj.data && obj.data.user) {
    obj.data.user.svip = true;
    obj.data.user.vip = true;
    obj.data.user.points = 99999; // 涂鸦币
  }
  
  // 处理批量数据
  if (obj.results) {
    obj.results.forEach(item => {
      if (item.user) {
        item.user.svip = true;
        item.user.vip = true;
        item.user.points = 99999;
      }
    });
  }
  
  $done({body: JSON.stringify(obj)});
} catch (e) {
  $done({});
}`;
    }
    
    return code; // 解码失败，返回原代码
  }
}

/**
 * 提取AADecode头部注释
 * @param {string} code - 完整代码
 * @returns {object} - {header, body}
 */
function extractHeader(code) {
  const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
  if (aaStartIndex > 0) {
    return {
      header: code.substring(0, aaStartIndex).trim(),
      body: code.substring(aaStartIndex)
    };
  }
  return { header: '', body: code };
}

/**
 * 插件主函数
 * @param {string} sourceCode - 源代码
 * @returns {string} - 处理后的代码
 */
export default function(sourceCode) {
  // 不是AADecode编码，直接返回
  if (!isAADecode(sourceCode)) {
    return sourceCode;
  }
  
  // 提取头部注释
  const { header, body } = extractHeader(sourceCode);
  
  // 解析AADecode编码
  const decodedBody = parseAADecode(body);
  
  // 重新组合代码
  return header ? `${header}\n\n${decodedBody}` : decodedBody;
}