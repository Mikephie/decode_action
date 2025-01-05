//Sun Jan 05 2025 13:54:30 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let obj = JSON.parse($response.body);
obj.data.user_status_infos = [{
  "serial": "",
  "uid": "406280149991055360",
  "status": 1,
  "expire_at": 4092595200000,
  "extra": "{\"products\":[{\"code\":\"premium_lifetime_prime_398\",\"trial\":false,\"subscription\":true,\"upgraded\":false,\"introductory\":false}]}",
  "count": 1,
  "name": "vip"
}];
$done({
  "body": JSON.stringify(obj)
});