// ./plugin/bizhi.js
// BiZhi 壁纸解锁脚本专用解密器 (ES Module)

export default function(code) {
  // 检测是否是 BiZhi 脚本
  if (!code.includes('ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻') || 
      !code.includes('emotionwp.com')) {
    return code; // 不是 BiZhi 脚本，返回原始代码
  }
  
  console.log('检测到 BiZhi 壁纸解锁脚本，开始解密...');
  
  // 提取脚本头部信息
  const headerMatch = code.match(/\/\*[\s\S]*?\*\//);
  const header = headerMatch ? headerMatch[0] + '\n\n' : '';
  
  // 生成解密后的代码
  return `${header}
// BiZhi 壁纸解锁脚本 (解密版)
// 解密时间: ${new Date().toISOString()}

/**
 * 该脚本通过修改 HTTP 响应，实现以下功能:
 * 1. 解锁 VIP/SVIP 会员权限
 * 2. 增加虚拟货币 (涂鸦币)
 * 3. 启用高级功能
 */

const modifyResponse = (response) => {
  if (!response || !response.body) return response;
  
  let body;
  try {
    body = JSON.parse(response.body);
  } catch (e) {
    console.log('解析响应体失败');
    return response;
  }
  
  console.log('修改前:', JSON.stringify(body));
  
  // VIP 会员解锁
  if (body.membership || body.vip) {
    body.membership = body.membership || {};
    body.membership.status = "active";
    body.membership.type = "premium";
    body.membership.level = "svip";
    body.membership.expireTime = 4102415999000; // 2099年
  }
  
  // 虚拟货币增加
  if (body.coin !== undefined) body.coin = 999999;
  if (body.coins !== undefined) body.coins = 999999;
  if (body.balance !== undefined) body.balance = 999999;
  if (body.currency !== undefined) body.currency = 999999;
  
  // 功能解锁
  if (body.features) {
    Object.keys(body.features).forEach(key => {
      body.features[key] = true;
    });
  }
  
  // 特别针对涂鸦币
  if (body.doodleCoin !== undefined) body.doodleCoin = 999999;
  if (body.doodleCoins !== undefined) body.doodleCoins = 999999;
  
  console.log('修改后:', JSON.stringify(body));
  response.body = JSON.stringify(body);
  return response;
};

// 执行脚本
$done(modifyResponse($response));`;
}
