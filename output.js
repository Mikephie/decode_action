//Thu Dec 26 2024 06:43:07 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var encode_version = "jsjiami.com.v5";
var Rnik = JSON.parse($response.body);
Rnik = {
  message: "成功!",
  result: {
    uid: "efe376d39b4f4385a45cb19ae0c8c13b",
    phone: "18888888888",
    memberExpire: 4092610661000
  },
  code: "00000"
};
$done({
  body: JSON.stringify(Rnik)
});
(function (_0x4f25fb, _0x35a1f4, _0x4de8ef) {
  _0x4de8ef = "al";
  try {
    _0x4de8ef += "ert";
    _0x35a1f4 = encode_version;
    if (!(typeof _0x35a1f4 !== "undefined" && _0x35a1f4 === "jsjiami.com.v5")) {
      _0x4f25fb[_0x4de8ef]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x3d5a62) {
    _0x4f25fb[_0x4de8ef]("删除版本号，js会定期弹窗");
  }
})(window);
encode_version = "jsjiami.com.v5";