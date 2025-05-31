// 解码时间: 5/31/2025, 1:45:10 AM
// 使用插件: obfuscator

var encode_version = "jsjiami.com.v5";
var _0x56f1f9 = $response.body;
var _0x246f07 = $request.url;
const _0x5ef41b = "/api/v1/getProgramList";
const _0x105b53 = "/api/v1/getUserInfo";
if (typeof _0x56f1f9 === "string") {
  if (_0x246f07.indexOf(_0x5ef41b) !== -1) {
    _0x56f1f9 = _0x56f1f9.replace(/free_type":\d/g, "free_type\":1");
  }
  var _0x295325;
  try {
    _0x295325 = JSON.parse(_0x56f1f9);
    if (_0x246f07.indexOf(_0x105b53) !== -1) {
      _0x295325.data.vip = 1;
      _0x295325.data.vipOld = 1;
      _0x295325.data.vip_endtimd = 32493834549;
      _0x295325.data.vip_enddata = "2999-09-09";
      _0x295325.data.username = "t.me/GieGie777";
      _0x295325.data.is_vip = 1;
      _0x56f1f9 = JSON.stringify(_0x295325);
    }
  } catch (_0x40d0d3) {
    console.log("JSON 解析错误: " + _0x40d0d3.message);
  }
}
$done({
  body: _0x56f1f9
});
(function (_0x62f42a, _0x121eb5, _0x4cfbd5) {
  var _0x5e3a79 = function () {
    {
      var _0x2eebb2 = true;
      return function (_0x2ac3d9, _0x201b15) {
        var _0x190c85 = _0x2eebb2 ? function () {
          {
            if (_0x201b15) {
              var _0x160f00 = _0x201b15.apply(_0x2ac3d9, arguments);
              _0x201b15 = null;
              return _0x160f00;
            }
          }
        } : function () {};
        _0x2eebb2 = false;
        return _0x190c85;
      };
    }
  }();
  var _0x3a97a4 = _0x5e3a79(this, function () {
    {
      var _0x4b5df1 = function () {};
      var _0x2167ce = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
      if (!_0x2167ce.console) {
        _0x2167ce.console = function (_0x410f1b) {
          var _0x4cfbd5 = {};
          _0x4cfbd5.log = _0x410f1b;
          _0x4cfbd5.warn = _0x410f1b;
          _0x4cfbd5.debug = _0x410f1b;
          _0x4cfbd5.info = _0x410f1b;
          _0x4cfbd5.error = _0x410f1b;
          _0x4cfbd5.exception = _0x410f1b;
          _0x4cfbd5.trace = _0x410f1b;
          return _0x4cfbd5;
        }(_0x4b5df1);
      } else {
        {
          _0x2167ce.console.log = _0x4b5df1;
          _0x2167ce.console.warn = _0x4b5df1;
          _0x2167ce.console.debug = _0x4b5df1;
          _0x2167ce.console.info = _0x4b5df1;
          _0x2167ce.console.error = _0x4b5df1;
          _0x2167ce.console.exception = _0x4b5df1;
          _0x2167ce.console.trace = _0x4b5df1;
        }
      }
    }
  });
  _0x3a97a4();
  _0x4cfbd5 = "al";
  try {
    {
      _0x4cfbd5 += "ert";
      _0x121eb5 = encode_version;
      if (!(typeof _0x121eb5 !== "undefined" && _0x121eb5 === "jsjiami.com.v5")) {
        {
          _0x62f42a[_0x4cfbd5]("删除版本号，js会定期弹窗，还请支持我们的工作");
        }
      }
    }
  } catch (_0x971826) {
    {
      _0x62f42a[_0x4cfbd5]("删除版本号，js会定期弹窗");
    }
  }
})(window);
encode_version = "jsjiami.com.v5";