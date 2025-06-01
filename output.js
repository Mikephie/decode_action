// 解码时间: 6/1/2025, 5:10:09 AM
// 使用插件链: aadecode -> aadecode2

var Mike = JSON.parse($response.body);
const user = /classes\/wpf_account/;
const xiazai = /classes/;
const save = /batch\/save/;

if(user.test($request.url)){
  Mike.results = [{
      "updatedAt" : "2023-09-09T09:09:09Z",
      "vipEndTime" : 4092599349,
      "svipEndTimeFormat" : "2099-09-09",
      "sex" : "1",
      "isSVIP" : 1,
      "isVIP" : 1,
      "userId" : "A66666666_B6666666666666-C66",
      "loginType" : 1,
      "nickName" : "Tg频道@TrollStoreKios",
      "headImageUrl" : "https://star7-1301731293.cos.ap-shanghai.myqcloud.com/user_avatar/1721058054.416775.png",
      "objectId" : "666666666666666666666666",
      "createdAt" : "2023-09-09T09:09:09Z",
      "svipEndTime" : 4092599349,
      "coin" : 99999
  }];
}

if(xiazai.test($request.url)){
  Mike.results.forEach(item => {
    if ('needVIP' in item && 'needSVIP' in item && 'needCoin' in item && 'score' in item) {
      item.score = 99999;
      item.needVIP = 0;
      item.needSVIP = 0;
      item.needCoin = 0;
    }
  });
}

if(save.test($request.url)){
  Mike = {
  "666666666666666666666666" : {
    "updatedAt" : "2023-09-09T09:09:09Z",
    "objectId" : "666666666666666666666666"
  },
  "code" : 1
  }
}

$done({body : JSON.stringify(Mike)});