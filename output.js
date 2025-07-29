//2025-07-29T10:56:41.540Z
//解密脚本在此
var body = $response.body;
var url = $request.url;
const p1 = "/api/v1/user/info?";
const p2 = "/v1/short/play";
const p3 = "/api/v1/payment/apple/pay/verify/info?";
if (typeof body === "string") {
  if (url.indexOf(p2) !== -1) {
    body = body.replace(/locked":\d/g, "locked\" :0");
  }
  var obj;
  try {
    obj = JSON.parse(body);
    if (url.indexOf(p1) !== -1) {
      obj.result.isVip = 1;
      obj.result.isForeverVip = 1;
      obj.result.vipExpireTime = 32493834549000;
      obj.result.bizId = 20000;
      body = JSON.stringify(obj);
    }
    if (url.indexOf(p3) !== -1) {
      obj = {
        "message": {
          "messageInfo": "H20000",
          "serverTime": 1733924690381,
          "code": 200
        },
        "result": {
          "unsign": 1,
          "agreementNo": "000001899416154",
          "isTrialPeriod": false,
          "eventToken": null,
          "expiresDate": 32493834549000,
          "isVip": 1,
          "skuType": null
        }
      };
      body = JSON.stringify(obj);
    }
  } catch (_0x37d1d6) {
    console.log("JSON 解析错误: " + _0x37d1d6.message);
  }
}
$done({
  "body": body
});
encode_version = "jsjiami.com.v5";