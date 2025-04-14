
// ./plugin/bizhi.js - 真正的 BiZhi Kaomoji 解密插件

import { VM } from 'vm2';

export default function(code) {
  // 检测是否是 BiZhi 脚本
  if (!(/ﾟωﾟﾉ=\s*\/｀ｍ´\）ﾉ\s*~┻━┻/.test(code) && 
      (code.includes('emotionwp.com') || code.includes('壁纸解锁')))) {
    return code; // 不是 BiZhi 脚本，返回原始代码
  }
  
  console.log('[BiZhi] 检测到壁纸解锁脚本，开始真实解密...');
  
  try {
    // 提取脚本头部信息
    const headerMatch = code.match(/\/\*[\s\S]*?\*\//);
    const header = headerMatch ? headerMatch[0] + '\n\n' : '';
    
    // 第1步：提取执行部分
    const execMatch = code.match(/\(ﾟДﾟ\)\s*\[\s*['"]_['"]\s*\]\s*\(\s*([\s\S]*?)\s*\)\s*;?$/);
    if (!execMatch) {
      console.error('[BiZhi] 无法找到执行部分');
      return code;
    }
    
    // 第2步：提取变量设置部分
    const setupCode = code.substring(0, code.lastIndexOf('(ﾟДﾟ)[ﾟεﾟ]'));
    
    // 第3步：创建一个解密函数，它将返回解密后的代码而不执行它
    const decodeFn = `
      function decodeKaomoji() {
        try {
          ${setupCode}
          
          // 获取实际的解密函数
          const decodeFunc = (ﾟДﾟ)['_'];
          
          // 修改解密函数以返回解密后的代码而不执行它
          function modifiedDecode(code) {
            // 使用 Function 构造函数创建一个返回代码的函数
            return new Function('return ' + decodeFunc(code))();
          }
          
          // 应用修改后的解密函数
          const decodedCode = modifiedDecode(${execMatch[1]});
          return decodedCode;
        } catch (e) {
          return "解密失败: " + e.message;
        }
      }
      decodeKaomoji();
    `;
    
    // 第4步：在安全的沙盒中执行解密函数
    const vm = new VM({
      timeout: 5000,
      sandbox: {
        console: {
          log: (msg) => console.log('[BiZhi VM]', msg),
          error: (msg) => console.error('[BiZhi VM Error]', msg)
        },
        // 提供一个假的响应对象以防脚本需要
        $response: { body: '{}' },
        $done: () => {},
        JSON: JSON,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout
      }
    });
    
    // 执行解密函数
    const result = vm.run(decodeFn);
    
    // 检查结果
    if (typeof result === 'string' && result.length > 0 && !result.startsWith('解密失败')) {
      console.log('[BiZhi] 成功提取到原始解密代码');
      
      // 将解密后的代码与原始头部合并
      return header + '\n' + result;
    } else {
      console.error('[BiZhi] 解密执行失败:', result);
      
      // 尝试替代方法：对整个代码进行字符串分析
      console.log('[BiZhi] 尝试使用字符串分析方法...');
      
      // 查找对 $response 和 $done 的使用模式
      const modifyMatch = code.match(/\$response\s*[\.\[]|body[\.\[]/g);
      if (modifyMatch) {
        console.log('[BiZhi] 检测到 $response 修改模式');
        
        // 尝试执行代码并捕获 $done 调用
        let capturedResponse = null;
        const executionVM = new VM({
          timeout: 5000,
          sandbox: {
            console: {
              log: (msg) => console.log('[BiZhi Exec]', msg),
              error: () => {},
              warn: () => {}
            },
            $response: { body: '{"membership":{"status":"none"},"coin":100}' },
            $request: {},
            $done: (obj) => { 
              capturedResponse = obj;
              return obj; 
            },
            setTimeout: () => {},
            clearTimeout: () => {},
            JSON: JSON
          }
        });
        
        try {
          // 试图执行整个代码
          executionVM.run(code);
          
          // 检查是否捕获到响应修改
          if (capturedResponse) {
            console.log('[BiZhi] 成功捕获响应修改');
            
            // 根据捕获的响应重建代码
            let responseBody;
            try {
              responseBody = JSON.parse(capturedResponse.body);
            } catch (e) {
              responseBody = capturedResponse.body;
            }
            
            // 创建真实解密版本
            const analyzedCode = `
// 解密后的 BiZhi 壁纸解锁脚本
// 解密时间: ${new Date().toISOString()}
${header}

// 此代码是通过执行原始混淆脚本并提取其行为生成的

const modifyResponse = (response) => {
  if (!response || !response.body) return response;
  
  let body;
  try {
    body = JSON.parse(response.body);
  } catch (e) {
    console.log('解析响应体失败');
    return response;
  }
  
  // 以下修改基于对原始脚本行为的分析
  ${generateModificationCode(responseBody)}
  
  // 更新响应体
  response.body = JSON.stringify(body);
  return response;
};

// 执行脚本
$done(modifyResponse($response));

/* 原始混淆代码:
${code.substring(0, 300)}...（已截断）
*/
`;
            return analyzedCode;
          }
        } catch (execError) {
          console.error('[BiZhi] 执行代码失败:', execError.message);
        }
      }
      
      // 如果所有方法都失败，返回原始代码
      console.error('[BiZhi] 所有解密方法失败，返回原始代码');
      return code;
    }
  } catch (error) {
    console.error('[BiZhi] 解密过程错误:', error.message);
    return code; // 发生错误，返回原始代码
  }
}

// 辅助函数：根据捕获的响应重建修改代码
function generateModificationCode(responseBody) {
  if (!responseBody) {
    return '// 未检测到明确的响应体修改';
  }
  
  const lines = [];
  
  // 分析 membership/vip 字段
  if (responseBody.membership) {
    lines.push('// 会员状态修改');
    
    if (responseBody.membership.status) {
      lines.push(`body.membership = body.membership || {};`);
      lines.push(`body.membership.status = "${responseBody.membership.status}";`);
    }
    
    if (responseBody.membership.type) {
      lines.push(`body.membership.type = "${responseBody.membership.type}";`);
    }
    
    if (responseBody.membership.expireTime) {
      lines.push(`body.membership.expireTime = ${responseBody.membership.expireTime};`);
    }
  }
  
  // 分析虚拟货币字段
  if (responseBody.coin !== undefined) {
    lines.push('// 虚拟货币修改');
    lines.push(`body.coin = ${responseBody.coin};`);
  }
  
  if (responseBody.coins !== undefined) {
    lines.push(`body.coins = ${responseBody.coins};`);
  }
  
  if (responseBody.doodleCoin !== undefined) {
    lines.push(`body.doodleCoin = ${responseBody.doodleCoin};`);
  }
  
  // 分析其他可能的字段
  const otherFields = Object.keys(responseBody).filter(key => 
    !['membership', 'coin', 'coins', 'doodleCoin'].includes(key)
  );
  
  if (otherFields.length > 0) {
    lines.push('// 其他字段修改');
    otherFields.forEach(key => {
      const value = responseBody[key];
      if (typeof value === 'object' && value !== null) {
        lines.push(`body.${key} = ${JSON.stringify(value)};`);
      } else if (typeof value === 'string') {
        lines.push(`body.${key} = "${value}";`);
      } else {
        lines.push(`body.${key} = ${value};`);
      }
    });
  }
  
  return lines.join('\n  ');
}
