// 2025-04-14T05:18:12.166Z
// Base: https://github.com/echo094/decode-js
// Modify: https://github.com/smallfawn/decode_action

/*************************************

>「 脚本名称 」         壁纸解锁Svip、Vip、无限涂鸦币
>「 脚本作者 」         M̆̈̆̈ĭ̈̆̈k̆̈̆̈ĕ̈
>「 电报频道 」         https://t.me/TrollStoreKios 
>「 更新时间 」         2025-01-09
>「 注意事项 」         如需引用请注明出处，谢谢合作！
>「 注意事项 」         使用此脚本，会导致AppleStore无法切换账户，解决方法[关闭QX切换账户，或关闭MITM，或删除脚本，或去设置媒体与购买项目处切换ID]
>「 额外说明 」         请勿传播或售卖此脚本

[rewrite_local]
^https?:\/\/leancloud\.emotionwp\.com\/.+\/(classes|batch\/save) url script-response-body https://raw.githubusercontent.com/Mike-offers/Rewrite/refs/heads/master/QuantumultX/BiZhi.js

[mitm]
hostname = leancloud.emotionwp.com

*************************************/

// BiZhi 壁纸解锁脚本 (解密版)
// 解密时间: 2025-04-14T05:18:12.166Z

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
$done(modifyResponse($response));
