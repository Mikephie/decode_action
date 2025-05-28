/**
 * Eval2 - 专门处理 Dean Edwards Packer 格式的解包器
 * 用于处理 eval(function(p,a,c,k,e,d){...}(...)) 格式
 */

function detect(code) {
  return code.includes('eval') &&
         code.includes('function(p,a,c,k,e,d)') &&
         code.includes('.split(') &&
         code.includes('toString(36)');
}

function unpack(code) {
  try {
    console.log('[eval2]尝试检测是否为 Dean Edwards Packer 加密');

    if (!detect(code)) return code;

    console.log('[eval2]检测到 Dean Edwards Packer 加密，正在解密...');
    const startTime = Date.now();
    let result = null;

    // 方法1：捕获 eval 执行
    try {
      const captureCode = `
        (function() {
          let __captured = null;
          const __originalEval = eval;
          eval = function(x) {
            __captured = x;
            return __originalEval(x);
          };
          try { ${code} } catch(e) {}
          eval = __originalEval;
          return __captured;
        })()
      `;
      result = eval(captureCode);

      if (result && typeof result === 'string') {
        if (detect(result)) {
          result = unpack(result);
        } else if (result.includes('eval')) {
          const endTime = Date.now();
          console.log(`[eval2]Dean Edwards Packer 解密成功! 耗时: ${(endTime - startTime).toFixed(2)}ms`);
          console.log('[eval2]检测到内部还有其他eval格式，交给其他插件处理');
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

    // 方法2：正则解析参数 + 解码
    try {
      const regex = /eval\s*\(\s*function\s*\(p,a,c,k,e,d\)\s*\{[\s\S]*?\}\s*\(\s*'([\s\S]*?)'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'([\s\S]*?)'\s*\.split\s*\(\s*'([^']+)'\s*\)\s*,\s*\d+\s*,\s*\{\s*\}\s*\)\s*\)/;
      const match = code.match(regex);

      if (match) {
        const payload = match[1];
        const radix = parseInt(match[2]);
        const count = parseInt(match[3]);
        const words = match[4].split(match[5]);

        const decode = function(w, n) {
          return (w < n ? '' : decode(parseInt(w / n), n)) + 
                 ((w = w % n) > 35 ? String.fromCharCode(w + 29) : w.toString(36));
        };

        const dictionary = {};
        for (let i = 0; i < count; i++) {
          const key = decode(i, radix);
          dictionary[key] = words[i] || key;
        }

        let unpacked = payload;
        for (let i = count - 1; i >= 0; i--) {
          const key = decode(i, radix);
          if (dictionary[key]) {
            const regex = new RegExp('\\b' + key + '\\b', 'g');
            unpacked = unpacked.replace(regex, dictionary[key]);
          }
        }

        result = unpacked;

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
      console.log('[eval2]正则解包失败');
    }

    console.log('[eval2]Dean Edwards Packer 解密失败，交由其他插件处理');
    return code; // ⬅️ 改为返回原始代码

  } catch (error) {
    console.error('[eval2]Dean Edwards Packer 解包发生错误:', error);
    return code; // ⬅️ 同样改为返回原始代码
  }
}

function plugin(code) {
  return unpack(code);
}

export default {
  detect,
  unpack,
  plugin,
  name: 'eval2',
  description: 'Dean Edwards Packer专用解包器',
  priority: 90
};