//Tue Apr 15 2025 23:59:50 GMT+0000 (Coordinated Universal Time)
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

var Mike = JSON.parse($response.body);
const user = /classes\/wpf_account/;
const xiazai = /classes/;
const save = /batch\/save/;

if (user.test($request.url)) {
  Mike.results = [{
    "updatedAt": "2023-09-09T09:09:09Z",
    "vipEndTime": 4092599349,
    "svipEndTimeFormat": "2099-09-09",
    "sex": "1",
    "isSVIP": 1,
    "isVIP": 1,
    "userId": "A66666666_B6666666666666-C66",
    "loginType": 1,
    "nickName": "Tg频道@TrollStoreKios",
    "headImageUrl": "https://star7-1301731293.cos.ap-shanghai.myqcloud.com/user_avatar/1721058054.416775.png",
    "objectId": "666666666666666666666666",
    "createdAt": "2023-09-09T09:09:09Z",
    "svipEndTime": 4092599349,
    "coin": 99999
  }];
}

if (xiazai.test($request.url)) {
  Mike.results.forEach(item => {
    if ('needVIP' in item && 'needSVIP' in item && 'needCoin' in item && 'score' in item) {
      item.score = 99999;
      item.needVIP = 0;
      item.needSVIP = 0;
      item.needCoin = 0;
    }
  });
}

if (save.test($request.url)) {
  Mike = {
    "666666666666666666666666": {
      "updatedAt": "2023-09-09T09:09:09Z",
      "objectId": "666666666666666666666666"
    },
    "code": 1
  }
}

$done({
  body: JSON.stringify(Mike)
});
