// 2025-04-14T04:31:09.052Z
// Base: https://github.com/echo094/decode-js
// Modify: https://github.com/smallfawn/decode_action

[rewrite_local] ^
https ? : \/\/(cdn-bm|bmall)\.camera360\.com\/api\/(mix\/(getinfo|purchase|recovery)|iap\/check-receipt|mix-asset\/assets) url script-response-body https:/ / raw.githubusercontent.com / Mike - offers / Rewrite / refs / heads / master / QuantumultX / Mix.js
https: \/\/mix-api\.camera360\.com\/v\d\/operational-positions url reject

[mitm]
hostname = cdn - bm.camera360.com, bmall.camera360.com, mix - api.camera360.com

  **
  ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** * /

ﾟωﾟﾉ = /｀ｍ´）ﾉ ~┻━┻   / /*´∇｀*/

/*************************************/

// Mix & Mix2 解锁 VIP

let obj = JSON.parse($response.body);

if (obj.data && obj.data.vipItem) {
  // 设置 VIP 状态为永久
  obj.data.vipItem.vipType = "subscription";
  obj.data.vipItem.vipStatus = 1;
  obj.data.vipItem.vipExpiry = 4092599349000; // 2099年过期时间
}

// 解锁所有 VIP 项目
if (obj.data && obj.data.vipList) {
  for (let item of obj.data.vipList) {
    item.isValid = true;
    item.vipType = "permanent";
  }
}

// 解锁购买状态
if (obj.data && obj.data.purchase) {
  obj.data.purchase.hasPurchased = true;
  obj.data.purchase.vipStatus = 1;
}

// 解锁已购资产
if (obj.data && obj.data.assets) {
  for (let asset of obj.data.assets) {
    asset.isFree = true;
  }
}

$done({
  body: JSON.stringify(obj)
});
