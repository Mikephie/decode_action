/**
 * Eval2 - 专门处理Dean Edwards Packer格式的解包器
 * 用于处理 eval(function(p,a,c,k,e,d){...}(...)) 格式
 */

/**
 * 检测是否是Dean Edwards Packer格式
 * @param {string} code - 要检测的代码
 * @returns {boolean} - 是否匹配
 */
function detect(code) {
  // 检测特征：eval + function(p,a,c,k,e,d)
  return code.includes('eval') && 
         code.includes('function(p,a,c,k,e,d)') &&
         code.includes('.split(') &&
         code.includes('toString(36)');
}

/**
 * 解包Dean Edwards Packer
 * @param {string} code - 要解包的代码
 * @returns {string|null} - 解包后的代码
 */
function unpack(code) {
  try {
    console.log('[eval2]尝试检测是否为 Dean Edwards Packer 加密');
    
    if (!detect(code)) {
      return null;
    }
    
    console.log('[eval2]检测到 Dean Edwards Packer 加密，正在解密...');
    const startTime = Date.now();
    
    let result = null;
    
    // 方法1：直接执行捕获
    try {
      // 创建捕获eval结果的代码
      const captureCode = `
        (function() {
          let __captured = null;
          const __originalEval = eval;
          
          // 临时替换eval
          eval = function(x) {
            __captured = x;
            return __originalEval(x);
          };
          
          try {
            ${code}
          } catch(e) {
            // 忽略执行错误
          }
          
          // 恢复eval
          eval = __originalEval;
          
          return __captured;
        })()
      `;
      
      result = eval(captureCode);
      
      // 如果结果还包含eval，递归解包
      if (result && typeof result === 'string') {
        // 检查是否还是Dean Edwards格式
        if (detect(result)) {
          result = unpack(result);
        }
        // 如果是其他eval格式，保留结果，让其他插件处理
        else if (result.includes('eval')) {
          // 返回结果，让系统尝试其他插件
          const endTime = Date.now();
          console.log(`[eval2]Dean Edwards Packer 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
          console.log('[eval2]检测到内部还有其他格式的eval，交给其他插件处理');
          return result;
        }
      }
      
      if (result) {
        const endTime = Date.now();
        console.log(`[eval2]Dean Edwards Packer 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
        return result;
      }
    } catch (e) {
      console.log('[eval2]直接执行方法失败，尝试正则提取');
    }
    
    // 方法2：正则提取并手动解包
    try {
      // 匹配Dean Edwards Packer的参数
      const regex = /eval\s*\(\s*function\s*\(p,a,c,k,e,d\)\s*\{[\s\S]*?\}\s*\(\s*'([\s\S]*?)'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'([\s\S]*?)'\s*\.split\s*\(\s*'([^']+)'\s*\)\s*,\s*\d+\s*,\s*\{\s*\}\s*\)\s*\)/;
      const match = code.match(regex);
      
      if (match) {
        const payload = match[1];
        const radix = parseInt(match[2]);
        const count = parseInt(match[3]);
        const words = match[4].split(match[5]);
        
        // 实现Dean Edwards的解码算法
        const decode = function(w, n) {
          return (w < n ? '' : decode(parseInt(w / n), n)) + 
                 ((w = w % n) > 35 ? String.fromCharCode(w + 29) : w.toString(36));
        };
        
        // 构建替换映射
        const dictionary = {};
        for (let i = 0; i < count; i++) {
          const key = decode(i, radix);
          dictionary[key] = words[i] || key;
        }
        
        // 执行替换
        let unpacked = payload;
        for (let i = count - 1; i >= 0; i--) {
          const key = decode(i, radix);
          if (dictionary[key]) {
            const regex = new RegExp('\\b' + key + '\\b', 'g');
            unpacked = unpacked.replace(regex, dictionary[key]);
          }
        }
        
        result = unpacked;
        
        // 检查是否需要继续解包
        if (result && detect(result)) {
          result = unpack(result);
        }
        
        if (result) {
          const endTime = Date.now();
          console.log(`[eval2]Dean Edwards Packer 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
          return result;
        }
      }
    } catch (e) {
      console.log('[eval2]正则提取方法也失败');
    }
    
    console.log('[eval2]Dean Edwards Packer 解密失败');
    return null;
    
  } catch (error) {
    console.error('[eval2]Dean Edwards Packer 解包发生错误:', error);
    return null;
  }
}

/**
 * 插件接口
 */
function plugin(code) {
  return unpack(code);
}

// 导出
export default {
  detect,
  unpack,
  plugin,
  // 插件元信息
  name: 'eval2',
  description: 'Dean Edwards Packer专用解包器',
  priority: 90 // 优先级高于普通eval
}