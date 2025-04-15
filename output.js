//Tue Apr 15 2025 00:42:33 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
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

/*´∇｀*/

[rewrite_local] ^
https ? : \/\/leancloud\.emotionwp\.com\/.+\/(classes|batch\/save) url script-response-body https:/ / raw.githubusercontent.com / Mike - offers / Rewrite / refs / heads / master / QuantumultX / BiZhi.js

[mitm]
hostname = leancloud.emotionwp.com

  **
  ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** * /

ﾟωﾟﾉ = /｀ｍ´）ﾉ ~┻━┻   / /*´∇｀*/

/* 基于代码分析重建的函数逻辑 */
var body = $response.body;
try {
  var obj = JSON.parse(body);

  // 在此进行对象修改
  // 根据脚本注释说明，此脚本可能用于解锁壁纸应用的付费内容
  // 以下是基于代码分析的可能处理逻辑

  // 处理数据对象
  if (obj.results && Array.isArray(obj.results)) {
    obj.results.forEach(item => {
      // VIP状态设置
      if ('isVIP' in item) item.isVIP = 1;
      if ('isSVIP' in item) item.isSVIP = 1;

      // 过期时间设置
      if ('vipEndTime' in item) item.vipEndTime = 4092599349;
      if ('svipEndTime' in item) item.svipEndTime = 4092599349;

      // 资源点数设置
      if ('coin' in item) item.coin = 99999;
      if ('score' in item) item.score = 99999;

      // 权限设置
      if ('needVIP' in item) item.needVIP = 0;
      if ('needSVIP' in item) item.needSVIP = 0;
      if ('needCoin' in item) item.needCoin = 0;
    });
  }

  // 批处理保存请求处理
  if (obj.code !== undefined) {
    obj.code = 1;
  }

  body = JSON.stringify(obj);
} catch (e) {
  console.log('JSON处理错误: ' + e.message);
}

$done({
  body
});
