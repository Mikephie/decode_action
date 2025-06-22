//2025-06-22T12:10:08.116Z
//解密脚本在此
if ($request.url.includes("/productAuthorizeService/user/auth/query/allAuthSimple")) {
  let _0xe40b75 = JSON.parse($response.body);
  Object.assign(_0xe40b75.data, {
    "appCode": "75335384",
    "currentSystemTime": "1750522244510",
    "businessProductCode": "75335384",
    "strategies": [{
      "status": 4,
      "strategyName": "LuckPik_App订阅",
      "businessType": "luckpik_auth",
      "strategyCode": "ksKlVezXF",
      "expireTime": "32493834549000",
      "businessCode": "luckpik_ai_vip"
    }],
    "total": {
      "status": 4,
      "auths": [{
        "totalNumber": 0,
        "type": "device_use_number",
        "description": "同时设备登录数--同时设备使用数",
        "unit": "台"
      }, {
        "totalNumber": 168,
        "type": "effective_time",
        "description": "有效期",
        "unit": "小时"
      }],
      "businessType": "luckpik_auth",
      "expireTime": "32493834549000"
    }
  });
  $done({
    "body": JSON.stringify(_0xe40b75)
  });
}
encode_version = "jsjiami.com.v5";