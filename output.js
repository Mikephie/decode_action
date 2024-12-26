//Thu Dec 26 2024 01:59:57 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var encode_version = "jsjiami.com.v5";
var _0x4fe830 = $response.body;
var _0x597205 = $request.url;
const _0x512a15 = "/api/v1/user/info?";
const _0x4a21c2 = "/v1/short/play";
const _0x4c2e68 = "/api/v1/payment/apple/pay/verify/info?";
if (typeof _0x4fe830 === "string") {
  if (_0x597205.indexOf(_0x4a21c2) !== -1) {
    _0x4fe830 = _0x4fe830.replace(/locked":\d/g, "locked\" :0");
  }
  var _0xb56a75;
  try {
    _0xb56a75 = JSON.parse(_0x4fe830);
    if (_0x597205.indexOf(_0x512a15) !== -1) {
      _0xb56a75.result.isVip = 1;
      _0xb56a75.result.isForeverVip = 1;
      _0xb56a75.result.vipExpireTime = 32493834549000;
      _0xb56a75.result.bizId = 7777777;
      _0x4fe830 = JSON.stringify(_0xb56a75);
    }
    if (_0x597205.indexOf(_0x4c2e68) !== -1) {
      _0xb56a75 = {
        message: {
          messageInfo: "H20000",
          serverTime: 1733924690381,
          code: 200
        },
        result: {
          unsign: 1,
          agreementNo: "000001899416154",
          isTrialPeriod: false,
          eventToken: null,
          expiresDate: 32493834549000,
          isVip: 1,
          skuType: null
        }
      };
      _0x4fe830 = JSON.stringify(_0xb56a75);
    }
  } catch (_0xc28ae) {
    console.log("JSON 解析错误: " + _0xc28ae.message);
  }
}
$done({
  body: _0x4fe830
});
(function (_0x455f7b, _0x40d0c5, _0x49a978) {
  var _0x59cc61 = function () {
    var _0xe744f0 = true;
    return function (_0x48bfbd, _0x4bc660) {
      var _0x17be73 = _0xe744f0 ? function () {
        if (_0x4bc660) {
          {
            var _0x4e9ba2 = _0x4bc660.apply(_0x48bfbd, arguments);
            _0x4bc660 = null;
            return _0x4e9ba2;
          }
        }
      } : function () {};
      _0xe744f0 = false;
      return _0x17be73;
    };
  }();
  var _0x4a9d90 = _0x59cc61(this, function () {
    var _0x144c7e = function () {};
    var _0x40b43d = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
    if (!_0x40b43d.console) {
      _0x40b43d.console = function (_0x2e4404) {
        var _0x49a978 = {};
        _0x49a978.log = _0x2e4404;
        _0x49a978.warn = _0x2e4404;
        _0x49a978.debug = _0x2e4404;
        _0x49a978.info = _0x2e4404;
        _0x49a978.error = _0x2e4404;
        _0x49a978.exception = _0x2e4404;
        _0x49a978.trace = _0x2e4404;
        return _0x49a978;
      }(_0x144c7e);
    } else {
      {
        _0x40b43d.console.log = _0x144c7e;
        _0x40b43d.console.warn = _0x144c7e;
        _0x40b43d.console.debug = _0x144c7e;
        _0x40b43d.console.info = _0x144c7e;
        _0x40b43d.console.error = _0x144c7e;
        _0x40b43d.console.exception = _0x144c7e;
        _0x40b43d.console.trace = _0x144c7e;
      }
    }
  });
  _0x4a9d90();
  _0x49a978 = "al";
  try {
    _0x49a978 += "ert";
    _0x40d0c5 = encode_version;
    if (!(typeof _0x40d0c5 !== "undefined" && _0x40d0c5 === "jsjiami.com.v5")) {
      _0x455f7b[_0x49a978]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x4ff874) {
    {
      _0x455f7b[_0x49a978]("删除版本号，js会定期弹窗");
    }
  }
})(window);
encode_version = "jsjiami.com.v5";