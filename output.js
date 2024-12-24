//Tue Dec 24 2024 12:59:29 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var encode_version = "jsjiami.com.v5";
var _0x20d4bd = $response.body;
var _0x210edd = $request.url;
const _0x1ac1bc = "/api/v1/user/quota?user_id";
const _0x502750 = "/settings.itranscreen.com/settings.json";
var _0x56a65b;
try {
  _0x56a65b = JSON.parse(_0x20d4bd);
  if (_0x210edd.indexOf(_0x1ac1bc) !== -1) {
    _0x56a65b.data.coins = 999880;
    _0x56a65b.data.coins = 999880;
    _0x56a65b.data.gift = 999880;
    _0x56a65b.data.subscribed = 1;
    _0x56a65b.status_code = 0;
    _0x20d4bd = JSON.stringify(_0x56a65b);
  }
  if (_0x210edd.indexOf(_0x502750) !== -1) {
    _0x56a65b.cost.token.zhipu = "免费99";
    _0x56a65b.cost.request.baidu_pic = "免费999";
    _0x56a65b.cost.request.youdao_pic = "免费999";
    _0x56a65b.cost.char.google = "免费999";
    _0x56a65b.cost.char.baidu = "免费999";
    _0x20d4bd = JSON.stringify(_0x56a65b);
  }
} catch (_0x584ddf) {
  console.log("JSON 解析错误: " + _0x584ddf.message);
}
$done({
  body: _0x20d4bd
});
(function (_0x2badf8, _0x184f1c, _0x4079e0) {
  var _0x225fbc = function () {
    {
      var _0x1a8b6c = true;
      return function (_0x59cc3b, _0x598059) {
        var _0x4110aa = _0x1a8b6c ? function () {
          if (_0x598059) {
            var _0x23089f = _0x598059.apply(_0x59cc3b, arguments);
            _0x598059 = null;
            return _0x23089f;
          }
        } : function () {};
        _0x1a8b6c = false;
        return _0x4110aa;
      };
    }
  }();
  var _0x694768 = _0x225fbc(this, function () {
    {
      var _0x230663 = function () {};
      var _0x65fc4d = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
      if (!_0x65fc4d.console) {
        _0x65fc4d.console = function (_0x998af8) {
          {
            var _0x4079e0 = {};
            _0x4079e0.log = _0x998af8;
            _0x4079e0.warn = _0x998af8;
            _0x4079e0.debug = _0x998af8;
            _0x4079e0.info = _0x998af8;
            _0x4079e0.error = _0x998af8;
            _0x4079e0.exception = _0x998af8;
            _0x4079e0.trace = _0x998af8;
            return _0x4079e0;
          }
        }(_0x230663);
      } else {
        {
          _0x65fc4d.console.log = _0x230663;
          _0x65fc4d.console.warn = _0x230663;
          _0x65fc4d.console.debug = _0x230663;
          _0x65fc4d.console.info = _0x230663;
          _0x65fc4d.console.error = _0x230663;
          _0x65fc4d.console.exception = _0x230663;
          _0x65fc4d.console.trace = _0x230663;
        }
      }
    }
  });
  _0x694768();
  _0x4079e0 = "al";
  try {
    _0x4079e0 += "ert";
    _0x184f1c = encode_version;
    if (!(typeof _0x184f1c !== "undefined" && _0x184f1c === "jsjiami.com.v5")) {
      _0x2badf8[_0x4079e0]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x42296a) {
    {
      _0x2badf8[_0x4079e0]("删除版本号，js会定期弹窗");
    }
  }
})(window);
encode_version = "jsjiami.com.v5";