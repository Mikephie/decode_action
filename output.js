//Sun Jan 12 2025 13:50:42 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
/*
APP：酷我音乐
版本：10.6.6
作者：General℡

脚本功能：看广告，获取更多的免费听歌时间！不管你有没有刷广告入口都能用

更新：优化通知，更新多账号支持,更新Boxjs定阅(https://raw.githubusercontent.com/General74110/Quantumult-X/master/Boxjs/General74110.json)

操作：点击 我的-用户昵称 获取Cookies！获取完后关掉重写，避免不必要的MITM


注意⚠️：当前脚本只测试Loon，其他自测！
可配合其他酷我音乐会员脚本去掉部分广告（没时间搞广告）




使用声明：⚠️⚠️⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

[Script]
http-request ^https\:\/\/integralapi\.kuwo\.cn\/api\/v1\/online\/sign\/v1\/earningSignIn\/.* script-path=https://raw.githubusercontent.com/Mikephie/Task/main/kuwotimes.js, requires-body=true, timeout=10, enabled=true, tag=酷我音乐刷时长获取Cookie, img-url=https://raw.githubusercontent.com/LovedGM/Quantumult-X-TuBiao/main/zishi-cs/zs23.png


[Task]
cron "30 6 * * *" script-path=https://raw.githubusercontent.com/Mikephie/Task/main/kuwotimes.js, timeout=3600, tag=酷我音乐刷时长, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/KKTV.png


[MITM]
hostname = integralapi.kuwo.cn

*/

const $ = new Env("\u9177\u6211\u97F3\u4E50");
var _0xod7 = "jsjiami.com.v7";
const _0x5a6816 = _0x719e;
(function (_0x2eb68d, _0x3d654f, _0x2e6a44, _0x5ebbf6, _0x127768, _0x5db6b6, _0x1be6b9) {
  return _0x2eb68d = _0x2eb68d >> 5, _0x5db6b6 = "hs", _0x1be6b9 = "hs", function (_0xeb05d6, _0x384d20, _0x2ed90f, _0x2a28ea, _0x2c250e) {
    const _0x3902e6 = _0x719e;
    _0x2a28ea = "tfi", _0x5db6b6 = _0x2a28ea + _0x5db6b6, _0x2c250e = "up", _0x1be6b9 += _0x2c250e, _0x5db6b6 = _0x2ed90f(_0x5db6b6), _0x1be6b9 = _0x2ed90f(_0x1be6b9), _0x2ed90f = 0;
    const _0x163126 = _0xeb05d6();
    while (true && --_0x5ebbf6 + _0x384d20) {
      try {
        _0x2a28ea = -parseInt(_0x3902e6(295, ")G4J")) / 1 + parseInt(_0x3902e6(394, "v9T8")) / 2 + parseInt(_0x3902e6(140, "1gsg")) / 3 * (-parseInt(_0x3902e6(299, "1gsg")) / 4) + -parseInt(_0x3902e6(181, "eHu!")) / 5 + -parseInt(_0x3902e6(144, "Vq&Z")) / 6 * (-parseInt(_0x3902e6(229, "qOFG")) / 7) + parseInt(_0x3902e6(316, "]@h*")) / 8 * (-parseInt(_0x3902e6(269, "KSBU")) / 9) + parseInt(_0x3902e6(344, "Cl^W")) / 10;
      } catch (_0xdc0c4c) {
        _0x2a28ea = _0x2ed90f;
      } finally {
        _0x2c250e = _0x163126[_0x5db6b6]();
        if (_0x2eb68d <= _0x5ebbf6) _0x2ed90f ? _0x127768 ? _0x2a28ea = _0x2c250e : _0x127768 = _0x2c250e : _0x2ed90f = _0x2c250e;else {
          if (_0x2ed90f == _0x127768["replace"](/[ykMdLPRqSIuDbYAnCQKgt=]/g, "")) {
            if (_0x2a28ea === _0x384d20) {
              _0x163126["un" + _0x5db6b6](_0x2c250e);
              break;
            }
            _0x163126[_0x1be6b9](_0x2c250e);
          }
        }
      }
    }
  }(_0x2e6a44, _0x3d654f, function (_0x10a55c, _0x584e16, _0x15db39, _0x3d65e7, _0x4f5421, _0x5e9143, _0x23e849) {
    return _0x584e16 = "split", _0x10a55c = arguments[0], _0x10a55c = _0x10a55c[_0x584e16](""), _0x15db39 = "reverse", _0x10a55c = _0x10a55c[_0x15db39]("v"), _0x3d65e7 = "join", 1544442, _0x10a55c[_0x3d65e7]("");
  });
}(6272, 516216, _0x53ff, 198), _0x53ff) && (_0xod7 = _0x53ff);
const Clear = $[_0x5a6816(388, "1gsg")]("Clear") || 0;
function _0x719e(_0x14064c, _0x231250) {
  const _0x53ffe2 = _0x53ff();
  return _0x719e = function (_0x719ec, _0x1b5cc8) {
    _0x719ec = _0x719ec - 130;
    let _0x3d9818 = _0x53ffe2[_0x719ec];
    if (_0x719e["KAkwQH"] === undefined) {
      var _0x53bdc7 = function (_0x1fd9c1) {
        const _0x356bc5 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
        let _0x18f063 = "",
          _0x2bfbc9 = "";
        for (let _0x44d739 = 0, _0x71f6a, _0x12308a, _0x2f8f9e = 0; _0x12308a = _0x1fd9c1["charAt"](_0x2f8f9e++); ~_0x12308a && (_0x71f6a = _0x44d739 % 4 ? _0x71f6a * 64 + _0x12308a : _0x12308a, _0x44d739++ % 4) ? _0x18f063 += String["fromCharCode"](255 & _0x71f6a >> (-2 * _0x44d739 & 6)) : 0) {
          _0x12308a = _0x356bc5["indexOf"](_0x12308a);
        }
        for (let _0x3b43b1 = 0, _0x4c8a87 = _0x18f063["length"]; _0x3b43b1 < _0x4c8a87; _0x3b43b1++) {
          _0x2bfbc9 += "%" + ("00" + _0x18f063["charCodeAt"](_0x3b43b1)["toString"](16))["slice"](-2);
        }
        return decodeURIComponent(_0x2bfbc9);
      };
      const _0x28409e = function (_0x2ff2ef, _0x309379) {
        let _0x14216c = [],
          _0x1c6694 = 0,
          _0x250fa9,
          _0x1cee52 = "";
        _0x2ff2ef = _0x53bdc7(_0x2ff2ef);
        let _0x26b250;
        for (_0x26b250 = 0; _0x26b250 < 256; _0x26b250++) {
          _0x14216c[_0x26b250] = _0x26b250;
        }
        for (_0x26b250 = 0; _0x26b250 < 256; _0x26b250++) {
          _0x1c6694 = (_0x1c6694 + _0x14216c[_0x26b250] + _0x309379["charCodeAt"](_0x26b250 % _0x309379["length"])) % 256, _0x250fa9 = _0x14216c[_0x26b250], _0x14216c[_0x26b250] = _0x14216c[_0x1c6694], _0x14216c[_0x1c6694] = _0x250fa9;
        }
        _0x26b250 = 0, _0x1c6694 = 0;
        for (let _0x40595b = 0; _0x40595b < _0x2ff2ef["length"]; _0x40595b++) {
          _0x26b250 = (_0x26b250 + 1) % 256, _0x1c6694 = (_0x1c6694 + _0x14216c[_0x26b250]) % 256, _0x250fa9 = _0x14216c[_0x26b250], _0x14216c[_0x26b250] = _0x14216c[_0x1c6694], _0x14216c[_0x1c6694] = _0x250fa9, _0x1cee52 += String["fromCharCode"](_0x2ff2ef["charCodeAt"](_0x40595b) ^ _0x14216c[(_0x14216c[_0x26b250] + _0x14216c[_0x1c6694]) % 256]);
        }
        return _0x1cee52;
      };
      _0x719e["Mqfvew"] = _0x28409e, _0x14064c = arguments, _0x719e["KAkwQH"] = true;
    }
    const _0xd74f30 = _0x53ffe2[0],
      _0x38005a = _0x719ec + _0xd74f30,
      _0x1a2fc3 = _0x14064c[_0x38005a];
    return !_0x1a2fc3 ? (_0x719e["doLSPo"] === undefined && (_0x719e["doLSPo"] = true), _0x3d9818 = _0x719e["Mqfvew"](_0x3d9818, _0x1b5cc8), _0x14064c[_0x38005a] = _0x3d9818) : _0x3d9818 = _0x1a2fc3, _0x3d9818;
  }, _0x719e(_0x14064c, _0x231250);
}
let status;
status = (status = $["getval"]("kuwostatus") || "1") > 1 ? "" + status : "";
let loginUidArr = [],
  kuwoNameArr = [],
  tz = $[_0x5a6816(384, "IV%4")]("tz") || "1";
const logs = 0;
var message = "";
!(async () => {
  const _0x1e882 = _0x5a6816,
    _0x3de433 = {
      "MrvIa": function (_0x5b9b83, _0x376afd) {
        return _0x5b9b83 == _0x376afd;
      },
      "VlHse": function (_0x49b6c3, _0x4f20eb) {
        return _0x49b6c3(_0x4f20eb);
      },
      "KXkjl": function (_0x42c0ca, _0x3710d6) {
        return _0x42c0ca + _0x3710d6;
      },
      "DmAiX": function (_0x505b96, _0x1967ca) {
        return _0x505b96 + _0x1967ca;
      },
      "rjLDe": function (_0x517d81, _0x5745dc) {
        return _0x517d81 + _0x5745dc;
      },
      "qbRqZ": function (_0x35daa8, _0x2f975c) {
        return _0x35daa8 + _0x2f975c;
      },
      "lmNeD": _0x1e882(132, "KSBU"),
      "JatmZ": _0x1e882(376, "v9T8"),
      "wsYYZ": _0x1e882(401, "kEiQ"),
      "lgKle": function (_0x506a0f, _0x457577) {
        return _0x506a0f(_0x457577);
      },
      "XugtV": function (_0x2fddbd, _0x2ddf55) {
        return _0x2fddbd + _0x2ddf55;
      },
      "vOVAQ": _0x1e882(206, ")ivc"),
      "VZSWV": _0x1e882(227, "VTVG"),
      "IyVyK": _0x1e882(244, ")G4J"),
      "sWpil": function (_0x2bd44a, _0x2eaf1f) {
        return _0x2bd44a !== _0x2eaf1f;
      },
      "udESX": "CxiqW",
      "NnFYA": function (_0x2c750c) {
        return _0x2c750c();
      },
      "WIEjT": _0x1e882(247, "r7Dq"),
      "LOKWx": function (_0x1a66c2, _0x5edc76) {
        return _0x1a66c2 === _0x5edc76;
      },
      "lgrdv": "Lmzsk",
      "BjQEN": function (_0x3c2ae3, _0x4bd58e) {
        return _0x3c2ae3 < _0x4bd58e;
      },
      "XhKlq": function (_0xda9a85, _0x30dfff) {
        return _0xda9a85 + _0x30dfff;
      },
      "VkFOA": function (_0xe2943f, _0x2543b1) {
        return _0xe2943f * _0x2543b1;
      },
      "qVrZV": function (_0x1557a5, _0x13af0d) {
        return _0x1557a5 * _0x13af0d;
      },
      "gNYNR": function (_0x8aef64, _0x44b897) {
        return _0x8aef64 * _0x44b897;
      },
      "XbIYF": function (_0x44aa17, _0xd7d79c) {
        return _0x44aa17 < _0xd7d79c;
      },
      "QdPfl": function (_0x5d7683, _0x463121) {
        return _0x5d7683(_0x463121);
      },
      "fMUWn": "tfUhb",
      "GEUrh": "YqXOO",
      "bTuCK": _0x1e882(239, "a9AK"),
      "XaGKj": function (_0x56ac37, _0x2b3608) {
        return _0x56ac37 < _0x2b3608;
      },
      "cfMbo": _0x1e882(320, "4PeQ"),
      "jJaCk": "ZaNbK",
      "JzoEV": function (_0x40c7c1, _0x476640) {
        return _0x40c7c1(_0x476640);
      },
      "bEWLE": function (_0x46f54a, _0x4c8e31) {
        return _0x46f54a / _0x4c8e31;
      }
    };
  if (Clear == 1) {
    if (_0x3de433[_0x1e882(190, "$DMm")](_0x3de433[_0x1e882(363, "2tNu")], _0x3de433[_0x1e882(258, "aOBr")])) {
      _0x22adde = _0x58ae81[_0x1e882(393, "m]wh")](_0x33b449);
      if (_0x3de433[_0x1e882(154, "v9T8")](_0x2a9de8["code"], 200)) {
        let _0x409a06 = _0x2cc707[_0x1e882(346, "zxh)")]["endTime"],
          _0x189708 = new _0x4cfe85(_0x3de433[_0x1e882(161, ")ivc")](_0x3c506b, _0x409a06)),
          _0x31df6c = _0x189708[_0x1e882(292, ")ivc")]();
        _0x25cb52["log"](_0x3de433[_0x1e882(294, "r7Dq")](_0x3de433[_0x1e882(223, "KSBU")](_0x3de433["DmAiX"](_0x3de433["rjLDe"](_0x3de433[_0x1e882(350, "GWen")](_0x2aadc5[_0x1e882(145, "KSBU")], _0x1e882(158, "VTVG")), _0x3de433[_0x1e882(357, "iM!b")]), _0x45c9e2[_0x1e882(404, ")G4J")][_0x1e882(183, "Yb]O")]) + _0x3de433["JatmZ"], _0x3de433[_0x1e882(362, "GWen")]), _0x31df6c)), _0x3de433["lgKle"](_0x2d4c97, {
          "success": true,
          "singleTime": _0x3de433["VlHse"](_0xb42bf8, _0x5100d6["data"]["singleTime"]),
          "expiryTime": _0x31df6c,
          "message": _0x3de433[_0x1e882(310, "Cl^W")](_0x567208["msg"], "!\u2705")
        });
      } else _0x32cc08[_0x1e882(347, "%Bo9")] === -1 ? (_0x4acf2a["log"](_0x3de433[_0x1e882(149, "]vxk")](_0x5a6cef[_0x1e882(290, "tznY")], _0x3de433["vOVAQ"])), _0x3de433[_0x1e882(194, "j*@O")](_0xa598fe, {
        "success": false,
        "singleTime": 0,
        "expiryTime": "",
        "message": _0x18a713["msg"] + _0x1e882(245, "$@!f")
      })) : (_0x4727ab[_0x1e882(164, "oPVz")](_0x4df897[_0x1e882(137, "5W^u")] + _0x3de433[_0x1e882(160, "tznY")]), _0x3de433[_0x1e882(156, "$@!f")](_0xe3a9d7, {
        "success": false,
        "singleTime": 0,
        "expiryTime": "",
        "message": _0x3de433["XugtV"](_0x437b34[_0x1e882(200, "$DMm")], _0x3de433[_0x1e882(230, "qOFG")])
      }));
    } else {
      _0x3de433[_0x1e882(334, "iM!b")](clearEnvVars), $[_0x1e882(287, "zzf*")]($[_0x1e882(242, "zzf*")], "", _0x3de433[_0x1e882(270, "UzZM")]);
      return;
    }
  }
  if (typeof $request !== _0x1e882(284, "1gsg")) await kuwock();else {
    if (_0x3de433["LOKWx"]("xhDzX", _0x3de433[_0x1e882(143, "gLXf")])) _0x53ebe1 += _0x21f27f[_0x1e882(207, "tznY")], _0x46e00c = _0x44a26f[_0x1e882(186, "$@!f")], _0x5d58f0 = _0x5c426d[_0x1e882(170, "Q*aQ")];else {
      const _0x2b6d5e = $[_0x1e882(388, "1gsg")](_0x3de433["IyVyK"]);
      _0x2b6d5e && (loginUidArr = _0x2b6d5e[_0x1e882(163, "GWen")]("&"));
      for (let _0x2850e6 = 0; _0x3de433["BjQEN"](_0x2850e6, loginUidArr["length"]); _0x2850e6++) {
        kuwoNameArr[_0x1e882(369, "]xp]")]("\u7528\u6237" + _0x3de433[_0x1e882(139, "GWen")](_0x2850e6, 1));
      }
      $[_0x1e882(383, "GWen")]("\n\n============General\u2121========================= \u811A\u672C\u6267\u884C - \u5317\u4EAC\u65F6\u95F4(UTC+8)\uFF1A" + new Date(_0x3de433[_0x1e882(191, "v9T8")](_0x3de433[_0x1e882(271, "qOFG")](new Date()[_0x1e882(241, "Yb]O")](), _0x3de433["VkFOA"](_0x3de433[_0x1e882(341, "GaoH")](new Date()[_0x1e882(233, "]xp]")](), 60), 1000)), _0x3de433[_0x1e882(167, "r7Dq")](_0x3de433[_0x1e882(343, "a9AK")](_0x3de433[_0x1e882(324, "4PeQ")](8, 60), 60), 1000)))[_0x1e882(142, "eHu!")]() + _0x1e882(228, "5W^u")), $["log"](_0x1e882(217, "zxh)") + loginUidArr[_0x1e882(260, "tznY")] + " \u4E2A\u6709\u6548\u7528\u6237\u6570\u636E");
      for (let _0xe10b93 = 0; _0x3de433[_0x1e882(251, "^*zT")](_0xe10b93, loginUidArr[_0x1e882(201, "jXnh")]); _0xe10b93++) {
        let _0x51a0c = loginUidArr[_0xe10b93];
        const _0x2ae163 = await _0x3de433[_0x1e882(293, "g61A")](getNickname, _0x51a0c);
        _0x2ae163 && (_0x3de433["fMUWn"] !== _0x3de433["GEUrh"] ? kuwoNameArr[_0xe10b93] = _0x2ae163 : _0x18af10[_0x1e882(213, "j*@O")]("", _0x3de433["IyVyK"]));
        $["log"](_0x3de433[_0x1e882(325, "$DMm")]);
        let _0x1ba6d6 = 0,
          _0x4d0171 = "",
          _0x567f50 = "";
        const _0x1a4817 = _0x3de433[_0x1e882(214, "oPVz")](Math["floor"](_0x3de433[_0x1e882(291, "]vxk")](Math[_0x1e882(174, "aOBr")](), 50)), 50);
        for (let _0x4a29bd = 0; _0x3de433[_0x1e882(166, "oPVz")](_0x4a29bd, _0x1a4817); _0x4a29bd++) {
          if (_0x3de433["LOKWx"](_0x3de433["cfMbo"], _0x3de433["jJaCk"])) _0x459e75[_0x1e882(192, "Q*aQ")](_0x1bd859);else {
            $[_0x1e882(311, "iM!b")] = _0x4a29bd + 1, $[_0x1e882(286, "r7Dq")](_0x1e882(162, "]vxk") + $["index"] + _0x1e882(131, "Aquz"));
            const _0x57b84d = await _0x3de433[_0x1e882(385, "v9T8")](Task, _0x51a0c);
            _0x57b84d[_0x1e882(332, "GaoH")] && (_0x1ba6d6 += _0x57b84d[_0x1e882(195, "zzf*")], _0x4d0171 = _0x57b84d[_0x1e882(146, "jXnh")], _0x567f50 = _0x57b84d[_0x1e882(351, "a9AK")]), await $["wait"](1000);
          }
        }
        const _0x1423b9 = _0x3de433[_0x1e882(389, "aOBr")](_0x1ba6d6, 60)["toFixed"](2);
        message = _0x1e882(312, "zxh)") + kuwoNameArr[_0xe10b93] + _0x1e882(330, "zxh)") + _0x567f50 + _0x1e882(169, ")ivc") + _0x1423b9 + " \u5C0F\u65F6\uD83E\uDD73\n\u514D\u8D39\u542C\u6B4C\u5230\u671F\u65F6\u95F4: " + _0x4d0171 + _0x1e882(189, "r7Dq"), await _0x3de433["NnFYA"](showmsg);
      }
    }
  }
})()[_0x5a6816(266, ")ivc")](_0x53f745 => $[_0x5a6816(135, "2tNu")](_0x53f745))["finally"](() => $["done"]());
function clearEnvVars() {
  const _0x3b1aaa = _0x5a6816,
    _0x16102b = {
      "HkjaZ": "loginUid"
    };
  $[_0x3b1aaa(323, "VTVG")]("", _0x16102b["HkjaZ"]);
}
async function kuwock() {
  const _0x556085 = _0x5a6816,
    _0x563738 = {
      "IaGkH": _0x556085(177, "GaoH"),
      "kWCTR": function (_0x50d4cb, _0x7fbab1) {
        return _0x50d4cb(_0x7fbab1);
      },
      "blouf": function (_0x4fc35b, _0xbbadfc) {
        return _0x4fc35b(_0xbbadfc);
      },
      "wUTCN": function (_0xf89bef, _0x2b6368) {
        return _0xf89bef > _0x2b6368;
      },
      "fahSj": "sign/v1/music/userBase",
      "nMhrG": function (_0x2921d9, _0x3e2f50) {
        return _0x2921d9 !== _0x3e2f50;
      },
      "HkWgs": "WxKWQ",
      "AiWWK": _0x556085(153, "2tNu"),
      "sUbwM": function (_0xb86cc5, _0x42fde7) {
        return _0xb86cc5(_0x42fde7);
      },
      "kdLKJ": function (_0x4b712f, _0x2f36e7) {
        return _0x4b712f === _0x2f36e7;
      },
      "udwCI": _0x556085(349, "2tNu")
    };
  if (_0x563738["wUTCN"]($request[_0x556085(298, "eHu!")]["indexOf"](_0x563738[_0x556085(375, "]@h*")]), -1)) {
    if (_0x563738[_0x556085(366, "%upr")](_0x556085(377, "kEiQ"), _0x563738[_0x556085(254, "VTVG")])) {
      _0x18f063(), _0x2bfbc9["msg"](_0x44d739[_0x556085(297, "qOFG")], "", _0x563738[_0x556085(250, ")ivc")]);
      return;
    } else {
      const _0x2547ed = $request[_0x556085(367, "I03t")],
        _0x3a531d = _0x2547ed["split"]("?")[1][_0x556085(300, "f[IS")]("&");
      let _0xc4414f;
      for (const _0x56d5c1 of _0x3a531d) {
        const [_0x18c023, _0x552aa6] = _0x56d5c1[_0x556085(231, "v9T8")]("=");
        _0x18c023 === _0x563738[_0x556085(211, "tznY")] && (_0xc4414f = _0x552aa6);
      }
      if (!_0xc4414f) {
        $["log"](_0x556085(380, "zxh)"));
        return;
      }
      const _0x2dfba6 = $[_0x556085(339, "I[UL")](_0x556085(400, "gLXf")) || "",
        _0x563c5a = _0x2dfba6 ? _0xc4414f[_0x556085(196, "I[UL")]("&") : [],
        _0x3cc241 = await _0x563738[_0x556085(198, "s!&*")](getNickname, _0xc4414f);
      if (_0x563c5a[_0x556085(215, "kEiQ")](_0xc4414f)) $["setdata"](_0x3cc241, "nickname" + _0xc4414f), $["log"]("\u3010" + _0x3cc241 + "\u3011\u66F4\u65B0Cookie\u6210\u529F"), $[_0x556085(348, "I03t")]($["name"], "", "\u3010" + _0x3cc241 + _0x556085(285, "%Bo9"));else {
        if (_0x563738[_0x556085(220, "IV%4")](_0x556085(373, "^*zT"), _0x563738[_0x556085(396, ")G4J")])) {
          if (_0x2f9435) {
            _0x2fb09e["logErr"](_0x556085(238, "zzf*") + _0x2df821), _0x563738[_0x556085(279, "qOFG")](_0x3ff2f5, "");
            return;
          }
          _0x44f9cd = _0x5326bd[_0x556085(234, "DBiC")](_0x257e36);
          const _0x3da839 = _0x2a2148["data"][_0x556085(337, "zzf*")];
          _0x563738[_0x556085(333, "tznY")](_0x10ea61, _0x3da839);
        } else _0x563c5a[_0x556085(208, "DBiC")](_0xc4414f), $[_0x556085(141, "a9AK")](_0x563c5a["join"]("&"), _0x563738[_0x556085(354, "zxh)")]), $["setdata"](_0x3cc241, _0x556085(280, "iM!b") + _0xc4414f), $[_0x556085(221, "$DMm")](_0x556085(272, "m]wh") + _0x3cc241 + "\u3011\u7684Cookie\u6210\u529F"), $[_0x556085(382, "FWSE")]($[_0x556085(329, "Q*aQ")], "", "\u3010" + _0x3cc241 + _0x556085(225, "Q*aQ"));
      }
    }
  }
}
function getNickname(_0x2a037e) {
  const _0x76e15d = {
    "sYACm": function (_0x5a63fd, _0x19d886) {
      return _0x5a63fd + _0x19d886;
    },
    "xamfH": "\u516B\u6210Cookie\u6389\u4E86\uD83C\uDD98",
    "dFwSX": function (_0x50ff5e, _0x43923b) {
      return _0x50ff5e(_0x43923b);
    },
    "kCVaJ": function (_0x5afaeb, _0x4f987) {
      return _0x5afaeb + _0x4f987;
    },
    "yoEAc": function (_0x5de09e, _0x47b957) {
      return _0x5de09e === _0x47b957;
    }
  };
  return new Promise(_0x443fbc => {
    const _0x24791e = _0x719e,
      _0x35a09a = {
        "xJrTF": function (_0x1333c7, _0x51907e) {
          const _0x553923 = _0x719e;
          return _0x76e15d[_0x553923(381, "x1XH")](_0x1333c7, _0x51907e);
        },
        "plejZ": _0x76e15d["xamfH"],
        "Axgeo": function (_0x48f75b, _0x4e4bf7) {
          const _0x741e2d = _0x719e;
          return _0x76e15d[_0x741e2d(222, "Q*aQ")](_0x48f75b, _0x4e4bf7);
        },
        "zfrus": function (_0x47fe1b, _0x368ec8) {
          return _0x76e15d["kCVaJ"](_0x47fe1b, _0x368ec8);
        },
        "eGgXh": function (_0x4ac6b5, _0x13e505) {
          const _0x4aaca1 = _0x719e;
          return _0x76e15d[_0x4aaca1(187, "r7Dq")](_0x4ac6b5, _0x13e505);
        }
      },
      _0x506f45 = _0x24791e(219, "j*@O") + _0x2a037e;
    $[_0x24791e(253, "s!&*")](_0x506f45, (_0x13f306, _0x1f8dd4, _0x1248bf) => {
      const _0xe1eb11 = _0x24791e;
      try {
        if (_0x13f306) {
          if (_0xe1eb11(197, "]@h*") === _0xe1eb11(309, ")G4J")) _0x132701["setdata"](_0x65bc15, _0xe1eb11(134, ")ivc") + _0x5a0159), _0x33f217["log"]("\u3010" + _0x583030 + _0xe1eb11(338, "a9AK")), _0x199109["msg"](_0x3e2b7b[_0xe1eb11(374, "f[IS")], "", "\u3010" + _0x9878c3 + "\u3011\u66F4\u65B0Cookies\u6210\u529F");else {
            $[_0xe1eb11(188, "a9AK")](_0xe1eb11(210, "4PeQ") + _0x13f306), _0x35a09a[_0xe1eb11(172, "tznY")](_0x443fbc, "");
            return;
          }
        }
        _0x1248bf = JSON["parse"](_0x1248bf);
        const _0x26575e = _0x1248bf["data"]["nickname"];
        _0x35a09a["Axgeo"](_0x443fbc, _0x26575e);
      } catch (_0x5f1c1a) {
        _0x35a09a[_0xe1eb11(289, "iM!b")]("vAiNE", "cqxIB") ? (_0x2ad9bd[_0xe1eb11(235, "aOBr")](_0x35a09a[_0xe1eb11(263, "v9T8")](_0x37a909["msg"], _0x35a09a["plejZ"])), _0x35a09a[_0xe1eb11(237, "DBiC")](_0x12dc2d, {
          "success": false,
          "singleTime": 0,
          "expiryTime": "",
          "message": _0x35a09a[_0xe1eb11(150, "Yb]O")](_0x1afe4e[_0xe1eb11(249, "GaoH")], _0x35a09a["plejZ"])
        })) : ($[_0xe1eb11(402, "Yb]O")](_0x5f1c1a), _0x35a09a[_0xe1eb11(392, "GaoH")](_0x443fbc, ""));
      }
    });
  });
}
function _0x53ff() {
  const _0x4dbf40 = function () {
    return [_0xod7, "dIDjnsgjItPiuKaktmLyiR.YQcboqbm.yvC7MASC==", "ta1F", "iXBcIeVcTCkuW444", "aKjWWPGs", "trtcIG", "EmkHWP5Nma", "W45ZWRpdHmoxsmoMW5FdLrHbB8koW64", "ysZcQrlcOW", "WQfvWQr3bq", "hCoDDWaZWOlcH8ktDw9VW60", "sSkTWO/dS8k1", "DSk2WPdcUq", "gCkiWRK", "jSoioeldK2ZcKL1yWPezW6q", "W7PNhbal", "WRVdQSk8WRVdJW", "CSkDsJhcNa", "WOFdOYFcKaLzpJLR", "44oe6i6W5y2vpgzfd8owWP055OQW5yIv", "WQhdSqVdNNpdQM7dGgtdVmoRpSkF", "W4HUWRapW6e", "W4BdRSkCW6RdQG", "W53dL8kD", "zCkLkKXZ", "W4ldVuxcNwe", "dMTZWQuc", "yoobRocNTG", "W7P+hH4tFLf8pCoG", "CvBdMHldTHbkrcBcLHTeWR3cMa", "WOJdTXBdGg4", "W6q1WRrkor4ZW7NcRZRdK8of", "WPRdRmoUCYO", "l8oYfCoudq", "tSoClJhdNa", "W5ddL8k9W6tdNq", "ggKCemok", "W7XahuRdUG", "of/cTmkWWO/cR2q", "W4RdPmkZW4/dIq", "DSkvmmk+jW", "h8kfeei", "WO9vWQDApa", "WQddGXm", "g8o4hCol", "4kEp44gTwCkY", "WPDQwrG", "WOb+tHRdPSoXW5S", "qGVcGSkOW4a", "kwTrWPK7", "W5ddJ1hcPfi", "ExhcOG", "tXDBWQJcR1TozG", "44cm5PIa5PwYW7pcOWhdKCoHbEAjN+wjTa", "nvOMn8oJl8kz", "WRLyW79OsXpdVKjUl2fFWQaxW7mpdHZcNmksm059WQ7cSmoPWO3cHSktW4hcL8omW6xdTeZcMHRdNaP/WOX1tmolWQVdGHPodZWleLldMsXRW4vr", "WQvGAZBdGG", "pqRcK3lcLq", "ESk6WPVdVSkE", "WOBcRYldNWSwpWqIWRXNaCod", "cCkpmNFcQa", "jb0nW5K", "tWLQeq", "aCkTW58", "aCkNjvRcJq", "WQ7dUCkDWQhdSa", "CmkrWRhdG8kTcCoF", "tSk6W6RdGCoSW7a", "WObIqX7dR8oNW7ZcTmkHW4K", "aruUW68c", "xCk8WRC", "ECkvWRBdKq", "c2HzWQu+", "WOtdPmo/AYhcV8kHeG", "W7NdTSkzW7FdNG", "W5BcUCkzW6OM", "W4NcSmoAWRRdNvlcS0pcI8kaW4mxW7O", "WQJdQmkwWONdSa", "dSkaixdcPa", "aCk3WOlcGhS", "5yQE6zkiva", "WQpdVrZdU28", "gCkSW5q", "yCkBWQPNmq", "W7lcHCkVW7m", "Eg3cOG", "lbmE", "WOiQW4VcN8kcgCozW4BdTHPBsG", "ECkjWRySdW", "W6D2hrW", "WRnMW6SSyW", "5yMP6zoZqq", "W6BdGmkXgty"].concat(function () {
      return ["tmklcNRcNWnb", "a2JcUSkaWOW", "5P2Q5OIc5yMjWPGLhu18W7xcQNfP77+T5PEb5Rg25l6T5A6fWRpcHCkHWP4poG", "sb7cPmo6ra", "WRXFW6W", "WRpdTmkO", "WPVdPCkBW7/cJa0", "jryKWPa3", "WRH0W6q", "W7/dQSkUyCov", "ECkBEblcHcJcOa", "W7S6yNFcSW", "WPqiW77cOSoKcW", "W4BcVmkWW4KB", "WRjZsHZdRa", "u8oQdchdKW", "xL5YW6vqFSkuWQNdPvFcTSkhW6y", "D8kHW4ZdRSoF", "w8kpm3Tl", "AK7dHXZdNW", "WOJdGSkhW67cHW", "W4PPWOFdUCo6", "ExhcOGiSbJ3cHa", "5yQb5P6N5Psm6zsXrYdcNa", "W4VdOCkBavKc", "WQ/dM8o3AHG", "sSkkmfK", "lLNdPcxcO8oZ", "WOtdLcFdPuS", "5Q655lUS5yU/", "6i2c5B2c5ywM6lEk5PAr6zsRWPnDWQm", "WQxdNdldK38", "W5r1WPZdGmoAsmoNW5C", "f8kla2BcJJ8", "6i+m5yYY44g0", "W5/dMSkg", "44cy55MZWQ9sctldPmkf5OUs5yIF", "WPtdG8kKWRRdHG", "lCkmxJpcLq3cLa", "BSkrWRBdLmkTgSoB", "gmkvWPNcP04CWRGBW6ZdUCkDW69nWQq", "ExNcTW80", "WQWpW4v8WQNdICkCW7fpWRZdQCoxW6a", "WPJcPKW", "W7FcSupcHZdcOGRdPM3dUG", "W5NdG8kSW5JdVW", "Cmk+WQxdQCkT", "uCkcWOTjma", "W53dQmkomvG", "5ysE5OQjm8obnINdUaFMJRVKUzRWTAEc", "t8kFW6RdNCo/", "f8kla0RcKHH+WQq", "iH49WPWa", "WOTnW6jYwG", "WOBdQSoxBcO", "CLxcJXOU", "AUkCV8ok", "xSkKWOeQna", "DJ3cVSkkW7a", "W6XWWRFdMmor", "5Q2Q5z+F5OQl6kgX562k", "WQZdQ8kJWRNdNG", "WPqiW74", "tSo4gq", "WQagW57cRmo8", "WPTBWR1hpW", "W4BdHSkTvmo7pSkvaJ/dM2TkWPxcKq", "WRdMNldMR57OVBVOO7JOJP7LVj3MGONLH4VOTzxML4xPLBNdMSkP", "gmo8a8oDocxdTa", "W6X5fc0wDMa", "yr/cISk4W4K", "qY3cJrdcRSkihG", "W6SEw1/cMra", "o8obW51zbrddQSkNWPS", "i0lcQCkBWOS", "5Bsb5RIo6zMj5O+W5OUd5P6l6yEF5OUm6zY/5lU8WPldJNRdMmo2W6j3", "F8kTWOJcLKu", "77YW566A5PUE5AwI5zgz772C4PYx", "zmkLWPJdS8kf", "xColW6ZdUXHkW6eNW6BdJ8kfW7js", "WOjHWOLhpG", "W5tdP8ksi0CvpSoWcmk5", "6iYO5B6G5yAW6lw15PwU6zAhWOZcHaS", "WQ/dRSk8WRG", "WO/dTCoSAt3cP8kyhGHB", "WPnIWOPCcG", "CCkBWQxdTCk+ha", "8ywXImof", "z8kwnCkuaa", "nXKSWQe3", "gCo2fW", "WOtdNGFdVMO", "Dmk5W4xdT8o7"].concat(function () {
        return ["uHDwWQtcRv93AGiG", "iu8+oSo2", "WPjbW5Cgzq", "DMZdTaRdMa", "qIDzdtO", "ECkYiG", "W77cRf3cItBcSW", "ECkcWP9v", "cNBdNmkkhmkhfWBcRmktBvqI", "WPRcRwRcLIm", "xXzIhs8", "7767562v5PUX5AAc5zkt77YO4P+e", "uW7cG8k6W4OfWQ5TWQdcRq", "n1/dMsi", "WRLOW6qwz38nW5S", "6iYR5y2z5PUa56wW5AA56lAf77YB", "yq7cUSkkW60", "EHtcUSkNW6u", "uCkWW7NdOmo/W7zE", "WOKfW4VcLSom", "W5JdLSkziHj+W5Lg", "W5S/W7yTwbO8BmkylCkLxxe", "6k675y6Q5yMjWPG", "W7BdOmkCW64", "sSkHW7NdTmoTWRGqW6xcGfmuWQ/dG2FcI3ddH8ozW60SW6fTWRqjkSouW7JcSwZcOYddR1BcT0JdJx58WPNdQCkEWO9JimoMWQ5jW6pdQCk9W4qjW5FdRSk5WRK1WOFdLtPLW6jIFmoLp1aJu8o4W5eQW7S5", "WPFdPmkJW4lcPW", "EmkUiG", "eCoFb8o9aq", "WR7cJudcMqS", "tCk0W5/dVSou", "44gK6iYU5y6MW602lCo6c1FcR+AkUUwlHq", "W7JdJ0hcU0m", "5ysG5OIQWOpcU8kbWRbSW6tMJihKUQtWMPEA", "WPlcLmoCbSkLySoewLhcKIqE5lUE56w36ls15y+Iq8oMWOBdGCoCyMnbW7/dSrlcK3WMpSkZgHRdL8oPW618uq", "l8k4WPpcHuNcKmkL", "tSknWQ7cI3W", "hbWNWRWv", "W7TuWRqvW7u", "W6xcLCkOW48On8oke8ooj0tdVhHsW5hdLdC", "n0VdMdNcOG", "W7uquG", "W5lINi4N", "bLldJs/cQa", "6i6w5y6O5PIn56sZ5AEW6lsF77Y5", "f8o+5B+c5Aw755+h6kAO6AcR5BU35zcQ", "WQpdUWtdM3ldRWNdIvFdR8o+eW", "W4ddQ8kieeiDdW", "tX9vWQy", "77+q562L5PQf5AsX5zcF77YO4P6F", "qSkei1fSW6FcUCk/", "77+R56+e5PQs5AsP5zgO77+F4P6c", "c8kvW7iJWP0", "5Bsy5RIi6zQR5O6u5OIP5PYN6yw75OIW6zYK5lIjWOTXBGtcKCobcq", "tGBcGmk4", "WP54sG", "W7n9WRJdGmo8", "ACkXWPKsoa", "WRNdMbFdGhS", "yLZdOG", "a1hcL8kZWP0", "zeNdPHhdVbjhvrZcJqCcWRNcJbldQmkxWRXbE3xcRmoXWRJcPmo0W4/dN8kuWQa", "W7PVWPulW40", "W5ddJM7cOvO", "W6WBCgJcRG", "W7PzWPKyW7hcLCoj", "talcG8k6W5ii", "hmkvWQBcVa", "fJ0rWPyO", "fYy5WOeN", "W7JcLCkvW48Y", "huPVWOuu", "W5L9WOVdImoC", "W5VcRwdcGIe", "W5BcHv/cVbG", "W4FdOXRcLWqDW5qGW5O", "vKVcKa5d", "qmk/WRBcSfS", "6i6u5y2D44gU", "W5jZWQJdU8oh", "r8oQcJm", "rsL7WPlcRa", "W4H/WRhdOmoC", "BSkeWQ7dMCk4", "W5PBlL3dVG", "C8kaWR7cIhG", "cwX0WQSuWOGhqa", "W7ldT8kGfY4", "5yQP5P2G5PEd6zweW5zhCG", "BYLulri", "A8kqAbpcGZxcR0Xm", "44c95PQs5PA+nZtdTCkybhdcG+AkTUwlMq", "WOzIWQG"];
      }());
    }());
  }();
  _0x53ff = function () {
    return _0x4dbf40;
  };
  return _0x53ff();
}
;
function Task(_0x3e5a3d, _0x422a9d = 0) {
  const _0x1c079d = _0x5a6816,
    _0x3b4449 = {
      "cQyMa": function (_0x16af88, _0x440a9c) {
        return _0x16af88(_0x440a9c);
      },
      "mMWHV": function (_0x442311, _0x225b92) {
        return _0x442311 + _0x225b92;
      },
      "pELRv": function (_0x2dabc0, _0x2ea796) {
        return _0x2dabc0 + _0x2ea796;
      },
      "QtZUr": _0x1c079d(282, "aOBr"),
      "oxAeD": function (_0x473256, _0x5d03bb) {
        return _0x473256(_0x5d03bb);
      },
      "ZsWzC": function (_0x1cc2fb, _0x31615f) {
        return _0x1cc2fb(_0x31615f);
      },
      "EVkjW": _0x1c079d(273, ")ivc"),
      "oRXmB": function (_0xb217e8, _0x393f43) {
        return _0xb217e8 == _0x393f43;
      },
      "ELYXw": function (_0x337ec6, _0x226698) {
        return _0x337ec6 !== _0x226698;
      },
      "cPFHi": function (_0x6c41bb, _0x583337) {
        return _0x6c41bb + _0x583337;
      },
      "InswB": function (_0x3eb95f, _0x370ccb) {
        return _0x3eb95f === _0x370ccb;
      },
      "dqske": _0x1c079d(359, "4PeQ"),
      "dcIYm": _0x1c079d(199, "%Bo9"),
      "hxiOe": _0x1c079d(387, "5W^u"),
      "tnjYl": "\u516B\u6210Cookie\u6389\u4E86\uD83C\uDD98",
      "hFHwo": "\u672A\u77E5\u9519\u8BEF",
      "tBhgj": function (_0x589056, _0x806c76) {
        return _0x589056 === _0x806c76;
      },
      "gKJql": _0x1c079d(178, "qOFG"),
      "RUIFt": function (_0x581989, _0x144273, _0x3a28ae) {
        return _0x581989(_0x144273, _0x3a28ae);
      }
    };
  return new Promise(_0x44197a => {
    const _0x25785b = _0x1c079d;
    if (_0x3b4449[_0x25785b(398, "IV%4")](_0x3b4449[_0x25785b(246, "I03t")], _0x3b4449[_0x25785b(157, "gLXf")])) _0x3b4449["RUIFt"](setTimeout, () => {
      const _0x444735 = _0x25785b,
        _0xa2fb95 = {
          "hlFZW": function (_0x560695, _0x2cbfb8) {
            const _0x2a7712 = _0x719e;
            return _0x3b4449[_0x2a7712(257, "Cl^W")](_0x560695, _0x2cbfb8);
          },
          "eXhGU": function (_0x145862, _0x582b6d) {
            const _0x588055 = _0x719e;
            return _0x3b4449[_0x588055(364, "eHu!")](_0x145862, _0x582b6d);
          },
          "yQZCI": function (_0x1c2c30, _0x2d2596) {
            return _0x1c2c30 + _0x2d2596;
          },
          "owQaJ": function (_0x5e3146, _0xae5c09) {
            return _0x3b4449["pELRv"](_0x5e3146, _0xae5c09);
          },
          "DLlRZ": function (_0x3db089, _0x357b3d) {
            return _0x3db089 + _0x357b3d;
          },
          "IdSlc": _0x444735(236, "GaoH"),
          "Zaijb": _0x444735(184, "Vq&Z"),
          "mJgYa": _0x444735(365, "Aquz"),
          "dWCQm": _0x3b4449["QtZUr"],
          "puxRN": function (_0x390977, _0x475a02) {
            const _0x22ac7f = _0x444735;
            return _0x3b4449[_0x22ac7f(204, "KSBU")](_0x390977, _0x475a02);
          },
          "TIEqg": function (_0x234371, _0x21dd6f) {
            return _0x3b4449["mMWHV"](_0x234371, _0x21dd6f);
          },
          "COZYI": function (_0x31db77, _0x3d7610) {
            const _0x3db993 = _0x444735;
            return _0x3b4449[_0x3db993(212, "tznY")](_0x31db77, _0x3d7610);
          },
          "WYMCy": _0x3b4449[_0x444735(403, "$@!f")],
          "HRzTb": function (_0x5d3d37, _0x1323c5) {
            return _0x3b4449["oRXmB"](_0x5d3d37, _0x1323c5);
          },
          "UtAjA": function (_0x59bd4b, _0x414d91) {
            const _0x4ac295 = _0x444735;
            return _0x3b4449[_0x4ac295(147, "4PeQ")](_0x59bd4b, _0x414d91);
          },
          "mWPcj": function (_0x315051, _0xddc13) {
            return _0x3b4449["cPFHi"](_0x315051, _0xddc13);
          },
          "lcFGy": function (_0x302376, _0x4d7784) {
            const _0x39a19f = _0x444735;
            return _0x3b4449[_0x39a19f(193, "%upr")](_0x302376, _0x4d7784);
          },
          "BLpFi": _0x3b4449[_0x444735(301, "GWen")],
          "tSdqF": _0x3b4449[_0x444735(232, "Vq&Z")],
          "ZkezT": _0x444735(243, "FWSE"),
          "EGbIF": _0x3b4449[_0x444735(176, "VTVG")],
          "qdxSK": function (_0x29ca08, _0x2d6c1c) {
            const _0xd4cf19 = _0x444735;
            return _0x3b4449[_0xd4cf19(335, "Cl^W")](_0x29ca08, _0x2d6c1c);
          },
          "KPVWx": _0x3b4449["tnjYl"],
          "zeITs": _0x3b4449["hFHwo"]
        };
      let _0x310986 = {
        "url": _0x444735(340, "FWSE"),
        "headers": {
          "Content-Type": _0x444735(255, "s!&*")
        },
        "body": JSON["stringify"]({
          "loginUid": _0x3e5a3d,
          "status": 1
        })
      };
      $[_0x444735(261, "eHu!")](_0x310986, async (_0x1e19bf, _0x221dd9, _0x8c3b45) => {
        const _0x3865bc = _0x444735;
        if (_0xa2fb95[_0x3865bc(306, "Vq&Z")] === _0xa2fb95[_0x3865bc(296, "a9AK")]) try {
          _0x8c3b45 = JSON[_0x3865bc(317, "$@!f")](_0x8c3b45);
          if (_0xa2fb95[_0x3865bc(379, "VTVG")](_0x8c3b45["code"], 200)) {
            if (_0xa2fb95["UtAjA"](_0x3865bc(252, "%upr"), "thcIS")) _0x26b250[_0x40595b] = _0x20033f;else {
              let _0x5a1cd4 = _0x8c3b45[_0x3865bc(331, "GaoH")][_0x3865bc(259, "Vq&Z")],
                _0x3117a5 = new Date(_0xa2fb95[_0x3865bc(368, "]vxk")](Number, _0x5a1cd4)),
                _0x29bc44 = _0x3117a5[_0x3865bc(314, "s!&*")]();
              $[_0x3865bc(355, "^*zT")](_0xa2fb95["DLlRZ"](_0xa2fb95[_0x3865bc(319, "m]wh")](_0xa2fb95[_0x3865bc(327, "r7Dq")](_0xa2fb95[_0x3865bc(256, "Vq&Z")](_0xa2fb95["owQaJ"](_0x8c3b45[_0x3865bc(328, "%upr")], _0xa2fb95[_0x3865bc(267, "jXnh")]), _0xa2fb95[_0x3865bc(307, "4PeQ")]), _0x8c3b45["data"]["singleTime"]), _0xa2fb95[_0x3865bc(152, "j*@O")]) + _0xa2fb95[_0x3865bc(275, "zzf*")], _0x29bc44)), _0xa2fb95[_0x3865bc(283, "%Bo9")](_0x44197a, {
                "success": true,
                "singleTime": _0xa2fb95[_0x3865bc(399, ")ivc")](parseFloat, _0x8c3b45[_0x3865bc(326, "2tNu")][_0x3865bc(313, "f[IS")]),
                "expiryTime": _0x29bc44,
                "message": _0xa2fb95[_0x3865bc(397, "s!&*")](_0x8c3b45[_0x3865bc(370, "gLXf")], "!\u2705")
              });
            }
          } else {
            if (_0xa2fb95[_0x3865bc(302, "1gsg")](_0x8c3b45["code"], -1)) {
              if (_0xa2fb95[_0x3865bc(278, "Aquz")] === _0xa2fb95["tSdqF"]) {
                let _0x5c6205 = _0x327309[_0x3865bc(356, "a9AK")][_0x3865bc(171, "f[IS")],
                  _0x15589a = new _0x221541(_0xa2fb95[_0x3865bc(368, "]vxk")](_0x58c3f5, _0x5c6205)),
                  _0x212524 = _0x15589a[_0x3865bc(168, "5W^u")]();
                _0x206fd1["log"](_0xa2fb95[_0x3865bc(327, "r7Dq")](_0xa2fb95["eXhGU"](_0xa2fb95[_0x3865bc(262, "v9T8")](_0xa2fb95[_0x3865bc(180, "a9AK")](_0xa2fb95[_0x3865bc(159, "^*zT")](_0xa2fb95[_0x3865bc(391, "]xp]")](_0x21e507[_0x3865bc(382, "FWSE")], _0xa2fb95[_0x3865bc(130, "%upr")]), _0xa2fb95[_0x3865bc(155, "FWSE")]), _0x2f3748["data"][_0x3865bc(353, "GaoH")]), _0xa2fb95[_0x3865bc(148, "a9AK")]), _0xa2fb95[_0x3865bc(322, "Aquz")]), _0x212524)), _0xa2fb95[_0x3865bc(182, "r7Dq")](_0x378227, {
                  "success": true,
                  "singleTime": _0xa2fb95[_0x3865bc(342, "QpP%")](_0x3279e7, _0x5b2d6f[_0x3865bc(274, "m]wh")]["singleTime"]),
                  "expiryTime": _0x212524,
                  "message": _0xa2fb95[_0x3865bc(360, "]xp]")](_0x3c9de8[_0x3865bc(165, "m]wh")], "!\u2705")
                });
              } else $["log"](_0xa2fb95["mWPcj"](_0x8c3b45["msg"], _0xa2fb95[_0x3865bc(318, "Q*aQ")])), _0xa2fb95["hlFZW"](_0x44197a, {
                "success": false,
                "singleTime": 0,
                "expiryTime": "",
                "message": _0xa2fb95["mWPcj"](_0x8c3b45["msg"], _0x3865bc(179, "^*zT"))
              });
            } else {
              if (_0xa2fb95[_0x3865bc(395, "j*@O")](_0xa2fb95["EGbIF"], _0xa2fb95[_0x3865bc(315, "%upr")])) try {
                if (_0x5ea5d3) {
                  _0x47e458["logErr"]("\u83B7\u53D6\u6635\u79F0\u5931\u8D25\uFF1A" + _0xc708e3), _0x376189("");
                  return;
                }
                _0x398ff5 = _0x249826["parse"](_0x8d6dc5);
                const _0x2a98ad = _0x29d1c3["data"][_0x3865bc(288, "QpP%")];
                _0xa2fb95["COZYI"](_0x5c5ba9, _0x2a98ad);
              } catch (_0x390289) {
                _0x47d507["logErr"](_0x390289), _0xa2fb95["hlFZW"](_0x3547cb, "");
              } else $[_0x3865bc(308, "kEiQ")](_0xa2fb95["qdxSK"](_0x8c3b45["msg"], _0xa2fb95[_0x3865bc(226, "Cl^W")])), _0x44197a({
                "success": false,
                "singleTime": 0,
                "expiryTime": "",
                "message": _0xa2fb95[_0x3865bc(268, "jXnh")](_0x8c3b45[_0x3865bc(370, "gLXf")], _0x3865bc(151, "Q*aQ"))
              });
            }
          }
        } catch (_0x33ce8a) {
          $[_0x3865bc(390, "oPVz")](_0x33ce8a), _0xa2fb95[_0x3865bc(133, "%upr")](_0x44197a, {
            "success": false,
            "singleTime": 0,
            "expiryTime": "",
            "message": _0xa2fb95[_0x3865bc(264, "]xp]")]
          });
        } else _0x18224b[_0x3865bc(352, "j*@O")](_0xacb99c), _0xa2fb95[_0x3865bc(281, "kEiQ")](_0x3cded6, "");
      });
    }, _0x422a9d);else {
      const [_0x1301ec, _0x126aba] = _0x39e4b4[_0x25785b(277, "a9AK")]("=");
      _0x3b4449[_0x25785b(193, "%upr")](_0x1301ec, "loginUid") && (_0x4c2b89 = _0x126aba);
    }
  });
}
async function showmsg() {
  const _0x246351 = _0x5a6816,
    _0x5662c4 = {
      "rcNKh": function (_0x1e4292, _0x166b71) {
        return _0x1e4292 + _0x166b71;
      },
      "fppaz": _0x246351(303, "Cl^W"),
      "oaRzJ": _0x246351(209, "]@h*"),
      "qiETq": function (_0xb7b88e, _0x1c46e3) {
        return _0xb7b88e !== _0x1c46e3;
      },
      "JVNCH": "PfIRk",
      "zOxEn": "fJKJj",
      "rkVTT": "naIkd"
    };
  if (tz == 1) {
    if (_0x5662c4["qiETq"](_0x5662c4[_0x246351(321, "I[UL")], _0x5662c4[_0x246351(265, "iM!b")])) $[_0x246351(405, "DBiC")]() ? _0x5662c4["rkVTT"] !== _0x5662c4[_0x246351(345, "2tNu")] ? _0x309379[_0x246351(185, "GWen")]("\u7528\u6237" + _0x5662c4[_0x246351(276, ")ivc")](_0x14216c, 1)) : await notify["sendNotify"]($[_0x246351(248, "tznY")], message) : $["msg"]($["name"], "", message);else {
      const _0x2bcc9e = _0x5662c4["fppaz"][_0x246351(205, "%Bo9")]("|");
      let _0xd4520c = 0;
      while (true) {
        switch (_0x2bcc9e[_0xd4520c++]) {
          case "0":
            _0x338f5f[_0x246351(173, "g61A")](_0x19cd9f[_0x246351(218, "4PeQ")]("&"), _0x5662c4[_0x246351(224, "j*@O")]);
            continue;
          case "1":
            _0x44894a[_0x246351(371, "zxh)")](_0x246351(136, "2tNu") + _0x5f0d10 + _0x246351(138, "]vxk"));
            continue;
          case "2":
            _0x187a96["setdata"](_0x4966ea, _0x246351(358, "$@!f") + _0x5ee259);
            continue;
          case "3":
            _0x41c0f0[_0x246351(386, "]@h*")](_0x5dfe64[_0x246351(374, "f[IS")], "", "\u3010" + _0xc47e9c + _0x246351(304, "]@h*"));
            continue;
          case "4":
            _0x4d2ef6[_0x246351(202, "]vxk")](_0x107bd3);
            continue;
        }
        break;
      }
    }
  } else console[_0x246351(336, "gLXf")](message);
}
var version_ = "jsjiami.com.v7";

// https://github.com/chavyleung/scripts/blob/master/Env.min.js
/*********************************** API *************************************/
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, a) => {
        s.call(this, t, (t, s, r) => {
          t ? a(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = false, this.isNeedRewrite = false, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = new Date().getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : undefined;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const a = this.getdata(t);
      if (a) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return false;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, a) => e(a));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let a = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        a = a ? a.replace(/\n/g, "").trim() : a;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [i, o] = a.split("@"),
          n = {
            url: `http://${o}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": i,
              Accept: "*/*"
            },
            timeout: r
          };
        this.post(n, (t, e, a) => s(a));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          a = !s && this.fs.existsSync(e);
        if (!s && !a) return {};
        {
          const a = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(a));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          a = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const a = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of a) if (r = Object(r)[t], undefined === r) return s;
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, a, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e),
          i = this.getval(a),
          o = a ? "null" === i ? null : i || "{}" : "{}";
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a);
        } catch (e) {
          const i = {};
          this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          return this.data = this.loaddata(), this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          return this.data = this.loaddata(), this.data[e] = t, this.writedata(), true;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar(), t && (t.headers = t.headers ? t.headers : {}, undefined === t.headers.Cookie && undefined === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": false
          })), $httpClient.get(t, (t, s, a) => {
            !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: false
          })), $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: a,
              headers: r,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: a,
              headers: r,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar;
              }
            } catch (t) {
              this.logErr(t);
            }
          }).then(t => {
            const {
                statusCode: a,
                statusCode: r,
                headers: i,
                rawBody: o
              } = t,
              n = s.decode(o, this.encoding);
            e(null, {
              status: a,
              statusCode: r,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: a,
              response: r
            } = t;
            e(a, r, r && s.decode(r.rawBody, this.encoding));
          });
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": false
          })), $httpClient[s](t, (t, s, a) => {
            !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a);
          });
          break;
        case "Quantumult X":
          t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: false
          })), $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: a,
              headers: r,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: a,
              headers: r,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let a = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: r,
            ...i
          } = t;
          this.got[s](r, i).then(t => {
            const {
                statusCode: s,
                statusCode: r,
                headers: i,
                rawBody: o
              } = t,
              n = a.decode(o, this.encoding);
            e(null, {
              status: s,
              statusCode: r,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: r
            } = t;
            e(s, r, r && a.decode(r.rawBody, this.encoding));
          });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let a = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let a = t[s];
        null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`);
      }
      return e = e.substring(0, e.length - 1), e;
    }
    msg(e = t, s = "", a = "", r) {
      const i = t => {
        switch (typeof t) {
          case undefined:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                {
                  let e = t.url || t.openUrl || t["open-url"];
                  return {
                    url: e
                  };
                }
              case "Loon":
                {
                  let e = t.openUrl || t.url || t["open-url"],
                    s = t.mediaUrl || t["media-url"];
                  return {
                    openUrl: e,
                    mediaUrl: s
                  };
                }
              case "Quantumult X":
                {
                  let e = t["open-url"] || t.url || t.openUrl,
                    s = t["media-url"] || t.mediaUrl,
                    a = t["update-pasteboard"] || t.updatePasteboard;
                  return {
                    "open-url": e,
                    "media-url": s,
                    "update-pasteboard": a
                  };
                }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          $notification.post(e, s, a, i(r));
          break;
        case "Quantumult X":
          $notify(e, s, a, i(r));
          break;
        case "Node.js":
      }
      if (!this.isMuteLog) {
        let t = ["", "==============\uD83D\uDCE3\u7CFB\u7EDF\u901A\u77E5\uD83D\uDCE3=============="];
        t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, t.stack);
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}
/*****************************************************************************/