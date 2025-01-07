//Tue Jan 07 2025 04:12:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
/* 
🎵酷我音乐 v1.6.1
🥳脚本功能:  
  ✅每日小说
  ✅每日签到
  ✅每日听歌
  ✅每日收藏
  ✅创意视频
  ✅免费抽奖
  ✅视频抽奖
  ✅惊喜任务
  ✅定时宝箱
  ✅补领宝箱
  ✅资产查询
🎯重写脚本:
  [Script]
http-request https://appi.kuwo.cn/api/automobile/kuwo/v1/configuration/signature script-path=https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/kuwo.cookie.js, requires-body=true, timeout=60, enabled=false, tag=酷我音乐获取Cookies, img-url=https://raw.githubusercontent.com/deezertidal/private/main/icons/kuwosvip.png
[MITM]
hostname = appi.kuwo.cn
⏰定时任务:
  cron "0 9,11,13,15,17,19,21 * * *" script-path=https://raw.githubusercontent.com/Mikephie/Task/main/kuwocoin.js, timeout=3000, tag=酷我音乐刷积分, img-url=https://raw.githubusercontent.com/deezertidal/private/main/icons/kuwosvip.png
🔍手动抓包: 
  开启抓包,进入网页登陆后的界面
  搜索url记录关键词"configuration\/signature"请求头中的Cookies里的 userid和 websid 分别填入BoxJs（userid=loginUid，websid=loginSid）

 
📦BoxJs地址:
  https://raw.githubusercontent.com/General74110/Quantumult-X/master/Boxjs/General74110.json(General℡版)改变了获取Cookies的途径，添加了多账号，增加多次运行防遗漏

  https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/mcdasheng.boxjs.json（原作者版）




*/

const $ = new Env("\u9177\u6211\u97F3\u4E50");
var _0xodL = "jsjiami.com.v7";
(function (_0x28057a, _0x3a9764, _0x47104f, _0x5e61ef, _0x15488d, _0x42310a, _0x2dd7cd) {
  _0x28057a = _0x28057a >> 9;
  _0x42310a = "hs";
  _0x2dd7cd = "hs";
  return function (_0x4b749e, _0x32266c, _0x377193, _0x3a7be2, _0x560ad2) {
    _0x3a7be2 = "tfi";
    _0x42310a = _0x3a7be2 + _0x42310a;
    _0x560ad2 = "up";
    _0x2dd7cd += _0x560ad2;
    _0x42310a = _0x377193(_0x42310a);
    _0x2dd7cd = _0x377193(_0x2dd7cd);
    _0x377193 = 0;
    var _0x3776eb = _0x4b749e();
    while (true && --_0x5e61ef + _0x32266c) {
      try {
        _0x3a7be2 = -parseInt(_0x1af3(558, "!CVc")) / 1 + parseInt(_0x1af3(1126, "ev^0")) / 2 * (parseInt(_0x1af3(883, "&1^T")) / 3) + parseInt(_0x1af3(1077, "I1wH")) / 4 + -parseInt(_0x1af3(1115, "BOoU")) / 5 + -parseInt(_0x1af3(565, "ZLJN")) / 6 + -parseInt(_0x1af3(486, "i9nj")) / 7 * (parseInt(_0x1af3(844, "GP06")) / 8) + -parseInt(_0x1af3(672, "AR2*")) / 9 * (-parseInt(_0x1af3(847, "NMCk")) / 10);
      } catch (_0x307642) {
        _0x3a7be2 = _0x377193;
      } finally {
        _0x560ad2 = _0x3776eb[_0x42310a]();
        if (_0x28057a <= _0x5e61ef) {
          if (_0x377193) {
            if (_0x15488d) {
              _0x3a7be2 = _0x560ad2;
            } else {
              _0x15488d = _0x560ad2;
            }
          } else {
            _0x377193 = _0x560ad2;
          }
        } else {
          if (_0x377193 == _0x15488d.replace(/[HYlGMWyFkhKXEgwrJIu=]/g, "")) {
            if (_0x3a7be2 === _0x32266c) {
              _0x3776eb["un" + _0x42310a](_0x560ad2);
              break;
            }
            _0x3776eb[_0x2dd7cd](_0x560ad2);
          }
        }
      }
    }
  }(_0x47104f, _0x3a9764, function (_0x4525d8, _0x3d7ebd, _0x478178, _0x3147a7, _0x402978, _0x28843b, _0x20f331) {
    _0x3d7ebd = "split";
    _0x4525d8 = arguments[0];
    _0x4525d8 = _0x4525d8[_0x3d7ebd]("");
    _0x478178 = "reverse";
    _0x4525d8 = _0x4525d8[_0x478178]("v");
    _0x3147a7 = "join";
    1550549;
    return _0x4525d8[_0x3147a7]("");
  });
})(99328, 986227, _0xbb05, 196);
if (_0xbb05) {
  _0xodL = 671;
}
const loginUid = $.getdata(_0x1af3(654, "O*Ta"))[_0x1af3(903, "y1z!")]("@");
const loginSid = $[_0x1af3(691, "9IqL")]("kw_loginSid")[_0x1af3(1075, "EF0Q")]("@");
if (loginUid[_0x1af3(780, "7ra)")] === 0 || loginSid[_0x1af3(888, "i9nj")] === 0) {
  $.log(_0x1af3(1098, "9IqL"));
  $[_0x1af3(992, "9IqL")]($[_0x1af3(898, "CcHz")], _0x1af3(580, "NMCk"));
  $[_0x1af3(536, "sJnr")]();
} else {
  $[_0x1af3(567, "#Ead")](_0x1af3(698, "ZLJN") + new Date(new Date()[_0x1af3(1072, "kUfW")]() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString() + _0x1af3(1164, "!CVc"));
}
const kw_headers = {
  "Host": _0x1af3(887, "4dMH"),
  "Origin": "https://h5app.kuwo.cn",
  "Connection": "keep-alive",
  "Accept": _0x1af3(1007, "m4bk"),
  "User-Agent": _0x1af3(723, "sJnr"),
  "Accept-Language": _0x1af3(762, "!CVc"),
  "Referer": "https://h5app.kuwo.cn/",
  "Accept-Encoding": _0x1af3(747, "Av1G"),
  "User-Agent": _0x1af3(538, "sJnr")
};
function getNickname(_0x4bf209) {
  var _0x24e174 = {
    "nSDtP": function (_0x309f13, _0x1456bd) {
      return _0x309f13 != _0x1456bd;
    },
    "DFnLm": function (_0x584994, _0x567377) {
      return _0x584994 / _0x567377;
    },
    "rBWeJ": "\u4ECA\u5929\u5DF2\u5B8C\u6210\u4EFB\u52A1",
    "CmPux": _0x1af3(1028, "E*6@"),
    "FlpHs": function (_0x5e7c84, _0x29e81b) {
      return _0x5e7c84 !== _0x29e81b;
    },
    "UWFEQ": _0x1af3(1150, "9IqL"),
    "IYzoP": function (_0x5764f0, _0x69596f) {
      return _0x5764f0 === _0x69596f;
    },
    "qUNnG": "rinOa"
  };
  return new Promise(_0xebaa1c => {
    var _0x4cf6ee = {
      "DkFOc": function (_0xa5e714, _0x5eb823) {
        return _0x24e174[_0x1af3(689, "OEp)")](_0xa5e714, _0x5eb823);
      },
      "EnMpo": function (_0x469c6d, _0x16845e) {
        return _0x24e174[_0x1af3(969, "4dMH")](_0x469c6d, _0x16845e);
      },
      "SQUKp": function (_0x3ec3ed, _0xdaa7c9) {
        return _0x3ec3ed == _0xdaa7c9;
      },
      "oFuaG": _0x24e174[_0x1af3(1158, "EF0Q")],
      "tZfGo": function (_0x2730b2, _0x2be6ba) {
        return _0x2730b2 === _0x2be6ba;
      },
      "qFxRW": _0x24e174[_0x1af3(1172, "f%zU")],
      "hukoX": function (_0x2a87dd, _0x1d0562) {
        return _0x2a87dd(_0x1d0562);
      },
      "TOJYb": function (_0x179c8a, _0x1af452) {
        return _0x24e174[_0x1af3(1071, "y1z!")](_0x179c8a, _0x1af452);
      },
      "yXBnw": _0x24e174.UWFEQ,
      "dZojM": function (_0x5a0be4, _0x5b597c) {
        return _0x5a0be4 === _0x5b597c;
      },
      "baZGd": _0x24e174[_0x1af3(1037, "]H@f")]
    };
    const _0x602382 = "https://integralapi.kuwo.cn/api/v1/online/sign/v1/music/userBase?loginUid=" + _0x4bf209;
    const _0x2fcbdc = {
      "url": _0x602382,
      "headers": kw_headers
    };
    $.log(_0x1af3(1129, "ZLJN") + _0x602382);
    $[_0x1af3(882, "EF0Q")](_0x2fcbdc, (_0x1ff4b0, _0x584511, _0x3cf57e) => {
      var _0x540f6d = {
        "tAtvF": function (_0x11fd75, _0x4399f4) {
          return _0x11fd75 == _0x4399f4;
        },
        "xxcLY": _0x4cf6ee.oFuaG
      };
      if (_0x4cf6ee[_0x1af3(593, "(Gll")](_0x4cf6ee[_0x1af3(612, "7ra)")], _0x1af3(1048, "GP06"))) {
        try {
          if (_0x1ff4b0) {
            $[_0x1af3(1120, "&1^T")](_0x1af3(1121, "*Z6(") + _0x1ff4b0);
            _0x4cf6ee[_0x1af3(1163, "GLl^")](_0xebaa1c, "");
            return;
          }
          $[_0x1af3(475, "O*Ta")]("\u54CD\u5E94\u6570\u636E: " + _0x3cf57e);
          _0x3cf57e = JSON.parse(_0x3cf57e);
          if (_0x3cf57e && _0x3cf57e[_0x1af3(688, "EF0Q")] && _0x3cf57e[_0x1af3(1049, "w)TY")].nickname) {
            const _0x467851 = _0x3cf57e[_0x1af3(776, "x@f)")].nickname;
            _0xebaa1c(_0x467851);
          } else {
            if (_0x4cf6ee[_0x1af3(518, "x@f)")](_0x4cf6ee.yXBnw, _0x1af3(912, "A5KE"))) {
              $.logErr(_0x1af3(482, "VLso") + JSON.stringify(_0x3cf57e));
              _0x4cf6ee[_0x1af3(843, "F$Cw")](_0xebaa1c, "");
            } else {
              _0x28f7d5 = _0xf4e0b3[_0x1af3(743, "kUfW")].description;
              if (_0x21162e == "\u6210\u529F") {
                _0xfdf382 = _0x1af3(1057, "V6TA") + _0x3a7ffd;
              } else {
                if (_0x540f6d[_0x1af3(597, "kUfW")](_0x19cc95, _0x540f6d[_0x1af3(818, "3Jpx")])) {
                  _0x34b49e = "\uD83D\uDFE2\u6BCF\u65E5\u542C\u6B4C: " + _0x448d1e;
                } else {
                  if (_0x216e8b == _0x1af3(1069, "Ep6z")) {
                    _0x4c1ca1 = "\uD83D\uDD34\u6BCF\u65E5\u542C\u6B4C: " + _0x5df11a;
                  } else {
                    _0x4c0089 = _0x1af3(1044, "ev^0") + _0x3261ef;
                  }
                }
              }
            }
          }
        } catch (_0x416756) {
          if (_0x4cf6ee[_0x1af3(599, "&1^T")](_0x4cf6ee[_0x1af3(687, "#Ead")], _0x4cf6ee[_0x1af3(675, "^8xB")])) {
            $[_0x1af3(962, "D$nc")](_0x1af3(856, "!CVc") + _0x416756);
            _0x4cf6ee[_0x1af3(918, "&1^T")](_0xebaa1c, "");
          } else {
            let _0x162430 = _0x584241[_0x1af3(886, "f%zU")][_0x1af3(707, "BOoU")] ? _0x423d13[_0x1af3(841, "OEp)")][_0x1af3(979, "O*Ta")] : 0;
            if (_0x4cf6ee[_0x1af3(1073, "m4bk")](_0x162430, 0)) {
              let _0x407399 = _0x4cf6ee[_0x1af3(1145, "sJnr")](_0x162430, 10000)[_0x1af3(795, "Ep6z")](2);
              _0x2dbfad = "\uD83D\uDCB0" + _0x162430 + _0x1af3(582, "Zn(7") + _0x407399 + " CNY";
            } else {
              _0x27f504 = _0x1af3(1050, "ZLJN");
            }
          }
        }
      } else {
        _0x1f3eda = _0x1af3(1001, "OEp)");
      }
    });
  });
}
(async () => {
  var _0x3509d3 = {
    "CvXPl": _0x1af3(778, "Zn(7"),
    "nMBnS": function (_0x4cd1cf, _0x2a9cec) {
      return _0x4cd1cf == _0x2a9cec;
    },
    "vZMyG": function (_0x2946aa, _0x588c8e) {
      return _0x2946aa == _0x588c8e;
    },
    "iwVAE": _0x1af3(786, "AR2*"),
    "lZKfp": _0x1af3(607, "WHhC"),
    "WYTFD": function (_0x742369, _0x489945) {
      return _0x742369 === _0x489945;
    },
    "nKNPv": _0x1af3(798, "i9nj"),
    "xrQIL": _0x1af3(490, "Av1G"),
    "WARAj": function (_0x5d8a65, _0x169376) {
      return _0x5d8a65(_0x169376);
    },
    "ChqyD": function (_0x5b385e, _0x5079d7, _0x4b1d7f) {
      return _0x5b385e(_0x5079d7, _0x4b1d7f);
    },
    "eCEft": function (_0x541788, _0x20b2aa, _0x597c6f) {
      return _0x541788(_0x20b2aa, _0x597c6f);
    },
    "RTEJy": function (_0x29ea07, _0x4b02fa) {
      return _0x29ea07 < _0x4b02fa;
    },
    "mZxWT": function (_0xfab875, _0x45e842, _0x1a2a99) {
      return _0xfab875(_0x45e842, _0x1a2a99);
    },
    "ClENa": function (_0x2daa91, _0x4be79d) {
      return _0x2daa91 !== _0x4be79d;
    },
    "FGoga": _0x1af3(488, "F$Cw")
  };
  for (let _0x126d3d = 0; _0x126d3d < loginUid[_0x1af3(997, "^8xB")]; _0x126d3d++) {
    if (_0x3509d3.nKNPv === _0x3509d3[_0x1af3(570, "EF0Q")]) {
      _0x36acda = _0x1af3(1152, "Zn(7");
      _0x3a8be9.log(_0x12ed77[_0x1af3(823, "Ep6z")]);
    } else {
      if (loginUid[_0x126d3d] && loginSid[_0x126d3d]) {
        $[_0x1af3(1144, "CcHz")] = [];
        const _0x7ddf2d = await getNickname(loginUid[_0x126d3d]);
        $[_0x1af3(1138, "NMCk")]("\u8D26\u53F7 " + loginUid[_0x126d3d] + _0x1af3(545, "f%zU") + _0x7ddf2d);
        await novel(loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await _0x3509d3[_0x1af3(960, "Z^Uc")](mobile, loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await collect(loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await box(loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await _0x3509d3[_0x1af3(860, "I1wH")](loterry_free, loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await new_sign(loginUid[_0x126d3d], loginSid[_0x126d3d]);
        await sign(loginUid[_0x126d3d], loginSid[_0x126d3d]);
        for (let _0x3d0e01 = 0; _0x3509d3[_0x1af3(792, "V6TA")](_0x3d0e01, 20); _0x3d0e01++) {
          await _0x3509d3[_0x1af3(771, "NMCk")](video, loginUid[_0x126d3d], loginSid[_0x126d3d]);
        }
        for (let _0x19433c = 0; _0x19433c < 10; _0x19433c++) {
          if (_0x3509d3[_0x1af3(1051, "f%zU")](_0x3509d3[_0x1af3(1014, "w)TY")], _0x3509d3.FGoga)) {
            let _0x5b8822 = {
              "url": _0x1af3(513, "y1z!") + _0x2fc67f + _0x1af3(1031, "AR2*") + _0x2e7962 + _0x1af3(526, "wD@&"),
              "headers": _0x1a0147
            };
            return _0x404778[_0x1af3(492, "Av1G")].get(_0x5b8822).then(_0x2cbccc => {
              var _0x5a9074 = _0x3509d3.CvXPl[_0x1af3(819, "VLso")]("|");
              var _0x4ba0db = 0;
              while (true) {
                switch (_0x5a9074[_0x4ba0db++]) {
                  case "0":
                    _0x56f670[_0x1af3(1114, "]H@f")](_0x1af3(528, "9IqL"));
                    continue;
                  case "1":
                    if (_0x3509d3[_0x1af3(677, "Ep6z")](_0x16042d.code, 200) && _0x3509d3[_0x1af3(1063, "ev^0")](_0x16042d[_0x1af3(1127, "GLl^")], _0x3509d3.iwVAE) && _0x3509d3[_0x1af3(543, "ev^0")](_0x16042d[_0x1af3(811, "CcHz")], true)) {
                      _0xed740b = _0x16042d[_0x1af3(592, "Zn(7")].description;
                      if (_0xed740b == "\u6210\u529F") {
                        _0xed740b = "\uD83C\uDF89\u6BCF\u65E5\u6536\u85CF: " + _0xed740b;
                      } else {
                        if (_0xed740b == _0x3509d3[_0x1af3(568, "(Gll")]) {
                          _0xed740b = _0x1af3(655, "y1z!") + _0xed740b;
                        } else {
                          if (_0xed740b == _0x1af3(967, "]H@f")) {
                            _0xed740b = _0x1af3(690, "AR2*") + _0xed740b;
                          } else {
                            _0xed740b = _0x1af3(943, "&1^T") + _0xed740b;
                          }
                        }
                      }
                    } else {
                      _0xed740b = _0x1af3(872, "9IqL");
                      _0x1f544a[_0x1af3(835, "y1z!")](_0x2cbccc[_0x1af3(870, "WHhC")]);
                    }
                    continue;
                  case "2":
                    _0x12f73c[_0x1af3(574, "VLso")][_0x1af3(479, "8a)j")](_0xed740b);
                    continue;
                  case "3":
                    _0x179cbf[_0x1af3(1113, "ZLJN")](_0xed740b);
                    continue;
                  case "4":
                    var _0x16042d = _0x18c29b[_0x1af3(619, "#Ead")](_0x2cbccc.body);
                    continue;
                  case "5":
                    var _0xed740b;
                    continue;
                }
                break;
              }
            });
          } else {
            await _0x3509d3[_0x1af3(1099, "kUfW")](surprise, loginUid[_0x126d3d], loginSid[_0x126d3d]);
            await loterry_video(loginUid[_0x126d3d], loginSid[_0x126d3d]);
          }
        }
        const _0x8927fa = await _0x3509d3[_0x1af3(692, "EF0Q")](getAsset, loginUid[_0x126d3d], loginSid[_0x126d3d]);
        $[_0x1af3(755, "GP06")][_0x1af3(479, "8a)j")](_0x8927fa);
        $[_0x1af3(801, "Ep6z")]($.name, "\u3010\u098F" + _0x7ddf2d + "\u098F\u3011", $[_0x1af3(880, "f%zU")][_0x1af3(684, "#!p6")]("\n"));
      }
    }
  }
})()["catch"](_0x5661e4 => $[_0x1af3(551, "GP06")](_0x5661e4))["finally"](() => {
  $[_0x1af3(1012, "f%zU")]();
});
async function novel(_0x33ad16, _0x5a538d) {
  var _0x49dc01 = {
    "sLtwe": _0x1af3(791, "Oghd"),
    "OCzlh": function (_0x52d644, _0x1f453f) {
      return _0x52d644 == _0x1f453f;
    },
    "cBeUi": function (_0x5583df, _0x427bb4) {
      return _0x5583df !== _0x427bb4;
    },
    "dtUgg": _0x1af3(923, "8a)j"),
    "eKfBx": _0x1af3(790, "wD@&")
  };
  let _0xef1271 = {
    "url": _0x1af3(1055, "kUfW") + _0x33ad16 + _0x1af3(515, "E*6@") + _0x5a538d + _0x1af3(800, "f%zU"),
    "headers": kw_headers
  };
  return $[_0x1af3(1000, "f%zU")].get(_0xef1271)[_0x1af3(824, "^8xB")](_0x52d54d => {
    var _0x5e1db4 = {
      "hoMHp": function (_0x267248, _0x2ddc47) {
        return _0x267248 == _0x2ddc47;
      },
      "IEfTT": _0x49dc01[_0x1af3(1151, "(Gll")]
    };
    $[_0x1af3(681, "axr]")](_0x1af3(940, "axr]"));
    var _0x470c69;
    var _0x26c8e6 = JSON.parse(_0x52d54d[_0x1af3(817, "sJnr")]);
    if (_0x49dc01[_0x1af3(636, "OEp)")](_0x26c8e6[_0x1af3(935, "BOoU")], 200) && _0x26c8e6[_0x1af3(908, "^(QB")] == _0x1af3(529, "GP06") && _0x26c8e6[_0x1af3(702, "4dMH")] == true) {
      if (_0x49dc01[_0x1af3(766, "Ep6z")] !== _0x49dc01[_0x1af3(1016, "(Gll")]) {
        _0x470c69 = _0x26c8e6.data[_0x1af3(930, "y1z!")];
        if (_0x49dc01[_0x1af3(878, "EF0Q")](_0x470c69, "\u6210\u529F")) {
          _0x470c69 = "\uD83C\uDF89\u6BCF\u65E5\u5C0F\u8BF4: " + _0x470c69;
        } else {
          if (_0x49dc01[_0x1af3(1170, "VLso")](_0x470c69, _0x49dc01[_0x1af3(617, "NMCk")])) {
            _0x470c69 = _0x1af3(719, "CcHz") + _0x470c69;
          } else {
            if (_0x470c69 == _0x1af3(915, "x@f)")) {
              _0x470c69 = _0x1af3(816, "A5KE") + _0x470c69;
            } else {
              _0x470c69 = _0x1af3(829, "!CVc") + _0x470c69;
            }
          }
        }
      } else {
        _0xb54d24 = _0x1cd455[_0x1af3(637, "axr]")].description;
        if (_0x5e1db4[_0x1af3(925, "]H@f")](_0x27367f, "\u6210\u529F")) {
          _0xf8e175 = _0x1af3(562, "]H@f") + _0x32058a;
        } else {
          if (_0x5e1db4[_0x1af3(857, "4dMH")](_0x4ad361, _0x5e1db4[_0x1af3(1157, "F$Cw")])) {
            _0x2ff09b = "\uD83D\uDFE2\u521B\u610F\u89C6\u9891: " + _0x29996a;
          } else {
            if (_0x1f81cd == _0x1af3(496, "BOoU")) {
              _0x37e7f7 = _0x1af3(514, "f%zU") + _0x1215c6;
            } else {
              _0xbe7ed8 = _0x1af3(494, "!CVc") + _0x190606;
            }
          }
        }
      }
    } else {
      _0x470c69 = _0x1af3(1093, "]H@f");
      $[_0x1af3(1138, "NMCk")](_0x52d54d[_0x1af3(972, "^(QB")]);
    }
    $[_0x1af3(1113, "ZLJN")](_0x470c69);
    $.notifyMsg[_0x1af3(1161, "f%zU")](_0x470c69);
  });
}
async function mobile(_0x525360, _0x2d46b2) {
  var _0x2188f1 = {
    "SAknf": _0x1af3(1030, "AR2*"),
    "VqYAU": function (_0x55329c, _0xe6b506) {
      return _0x55329c == _0xe6b506;
    },
    "bpoVm": _0x1af3(633, "w)TY"),
    "FXIwY": function (_0x69bcd5, _0x543a2e) {
      return _0x69bcd5 == _0x543a2e;
    },
    "ZOwBx": function (_0x4d0c14, _0x4e8d1d) {
      return _0x4d0c14 == _0x4e8d1d;
    },
    "ZNZGe": "MCBhG",
    "pzeDQ": _0x1af3(657, "BOoU")
  };
  let _0x34f162 = {
    "url": _0x1af3(881, "E*6@") + _0x525360 + _0x1af3(746, "VLso") + _0x2d46b2 + _0x1af3(483, "sJnr"),
    "headers": kw_headers
  };
  return $[_0x1af3(575, "ev^0")][_0x1af3(891, "!CVc")](_0x34f162)[_0x1af3(491, "wD@&")](_0x3a69ac => {
    $[_0x1af3(613, "#m3$")](_0x2188f1[_0x1af3(493, "ev^0")]);
    var _0xfb0985;
    var _0x5b9283 = JSON.parse(_0x3a69ac.body);
    if (_0x2188f1[_0x1af3(893, "Oghd")](_0x5b9283.code, 200) && _0x5b9283[_0x1af3(1019, "NMCk")] == _0x2188f1[_0x1af3(953, "OEp)")] && _0x2188f1[_0x1af3(760, "A5KE")](_0x5b9283[_0x1af3(1097, "D$nc")], true)) {
      _0xfb0985 = _0x5b9283.data.description;
      if (_0xfb0985 == "\u6210\u529F") {
        _0xfb0985 = "\uD83C\uDF89\u6BCF\u65E5\u542C\u6B4C: " + _0xfb0985;
      } else {
        if (_0x2188f1[_0x1af3(501, "F$Cw")](_0xfb0985, "\u4ECA\u5929\u5DF2\u5B8C\u6210\u4EFB\u52A1")) {
          _0xfb0985 = _0x1af3(1079, "x@f)") + _0xfb0985;
        } else {
          if (_0x2188f1[_0x1af3(663, "3Jpx")](_0xfb0985, _0x1af3(955, "wD@&"))) {
            _0xfb0985 = "\uD83D\uDD34\u6BCF\u65E5\u542C\u6B4C: " + _0xfb0985;
          } else {
            _0xfb0985 = _0x1af3(615, "x@f)") + _0xfb0985;
          }
        }
      }
    } else if (_0x2188f1[_0x1af3(991, "A5KE")] === _0x2188f1[_0x1af3(1167, "WHhC")]) {
      _0xffda17 = _0x1af3(852, "m4bk");
      _0x4698dd[_0x1af3(835, "y1z!")](_0x521f8f.body);
    } else {
      _0xfb0985 = _0x1af3(557, "I1wH");
      $[_0x1af3(1162, "wD@&")](_0x3a69ac.body);
    }
    $[_0x1af3(489, "Av1G")](_0xfb0985);
    $[_0x1af3(784, "NMCk")][_0x1af3(976, "w)TY")](_0xfb0985);
  });
}
async function collect(_0x303f0d, _0x1379d8) {
  var _0x381958 = {
    "SHiHX": function (_0x40868f, _0x1afeb2) {
      return _0x40868f(_0x1afeb2);
    },
    "gOqPt": function (_0xc402fc, _0x4be505) {
      return _0xc402fc !== _0x4be505;
    },
    "fmEND": _0x1af3(729, "V6TA"),
    "fTTGz": _0x1af3(639, "F$Cw"),
    "igvHr": function (_0x228178, _0x3bfbcb) {
      return _0x228178 == _0x3bfbcb;
    },
    "NxSyX": "success",
    "Detze": function (_0x46e2d9, _0x10b734) {
      return _0x46e2d9 == _0x10b734;
    },
    "aFMqW": _0x1af3(484, "Av1G"),
    "vfRFM": function (_0xc1ac0b, _0x589d70) {
      return _0xc1ac0b == _0x589d70;
    },
    "qCCrV": _0x1af3(1123, "A5KE"),
    "YKQUn": function (_0x20c8a3, _0x380d1b) {
      return _0x20c8a3 === _0x380d1b;
    },
    "sSVlQ": _0x1af3(769, "Oghd")
  };
  let _0x3786ad = {
    "url": "https://integralapi.kuwo.cn/api/v1/online/sign/v1/earningSignIn/everydaymusic/doListen?loginUid=" + _0x303f0d + "&loginSid=" + _0x1379d8 + "&from=collect&goldNum=18",
    "headers": kw_headers
  };
  return $.http[_0x1af3(643, "#!p6")](_0x3786ad)[_0x1af3(833, "w)TY")](_0x7bf377 => {
    if (_0x381958[_0x1af3(693, "GLl^")](_0x381958[_0x1af3(487, "w)TY")], _0x381958.fmEND)) {
      if (_0x183d3e) {
        _0x2c0ed0[_0x1af3(1100, "NMCk")](_0x1af3(601, "ev^0") + _0x6fe81);
        _0xb78fac("");
        return;
      }
      _0x53a5c9[_0x1af3(821, "WHhC")](_0x1af3(873, "m4bk") + _0x4127f5);
      _0x125ac3 = _0x5bb8e5[_0x1af3(974, "F$Cw")](_0x12451c);
      if (_0x106a97 && _0x45952a[_0x1af3(637, "axr]")] && _0x22fbe9[_0x1af3(807, "4dMH")].nickname) {
        const _0x59621d = _0x16646e[_0x1af3(922, "b$%k")][_0x1af3(673, "8a)j")];
        _0x2b0c4f(_0x59621d);
      } else {
        _0x116a84.logErr(_0x1af3(741, "I1wH") + _0x54d2a9[_0x1af3(1143, "Av1G")](_0x384474));
        _0x381958[_0x1af3(634, "sJnr")](_0x1547df, "");
      }
    } else {
      $[_0x1af3(1108, "F$Cw")](_0x381958.fTTGz);
      var _0x1c63b4;
      var _0x5d0494 = JSON.parse(_0x7bf377.body);
      if (_0x381958[_0x1af3(594, "*Z6(")](_0x5d0494[_0x1af3(727, "b$%k")], 200) && _0x5d0494.msg == "success" && _0x5d0494.success == true) {
        _0x1c63b4 = _0x5d0494[_0x1af3(1119, "#Ead")].description;
        if (_0x381958[_0x1af3(981, "axr]")](_0x1c63b4, "\u6210\u529F")) {
          _0x1c63b4 = _0x1af3(587, "D$nc") + _0x1c63b4;
        } else {
          if (_0x381958[_0x1af3(1090, "Av1G")](_0x1c63b4, _0x381958[_0x1af3(757, "x@f)")])) {
            _0x1c63b4 = "\uD83D\uDFE2\u6BCF\u65E5\u6536\u85CF: " + _0x1c63b4;
          } else {
            if (_0x381958[_0x1af3(971, "OEp)")](_0x1c63b4, _0x381958.qCCrV)) {
              _0x1c63b4 = _0x1af3(920, "#Ead") + _0x1c63b4;
            } else {
              _0x1c63b4 = _0x1af3(928, "Zn(7") + _0x1c63b4;
            }
          }
        }
      } else {
        if (_0x381958[_0x1af3(1005, "WHhC")](_0x381958[_0x1af3(1086, "Av1G")], _0x1af3(579, "Zn(7"))) {
          _0x1c63b4 = "\u274C\u6BCF\u65E5\u6536\u85CF: \u9519\u8BEF!";
          $[_0x1af3(1108, "F$Cw")](_0x7bf377[_0x1af3(534, "Zn(7")]);
        } else {
          const _0x257451 = _0x42ce2c[_0x1af3(1023, "9IqL")][_0x1af3(686, "!CVc")];
          _0x3b5f77(_0x257451);
        }
      }
      $[_0x1af3(895, "i9nj")](_0x1c63b4);
      $[_0x1af3(958, "x@f)")][_0x1af3(868, "m4bk")](_0x1c63b4);
    }
  });
}
async function video(_0x3ef40a, _0x45fa7c) {
  var _0x2aa178 = {
    "WUnpE": _0x1af3(661, "GP06"),
    "GnlwW": function (_0x4ac203, _0x3ebd05) {
      return _0x4ac203 == _0x3ebd05;
    },
    "eGSHD": function (_0x51c9ad, _0x3a8387) {
      return _0x51c9ad == _0x3a8387;
    },
    "rHeFq": "success",
    "gDccn": function (_0x160f25, _0x144b0a) {
      return _0x160f25 == _0x144b0a;
    },
    "zzAOC": function (_0x5c13fb, _0x5d9074) {
      return _0x5c13fb == _0x5d9074;
    },
    "dJpEX": function (_0x44c5d5, _0xf3ae2e) {
      return _0x44c5d5 == _0xf3ae2e;
    },
    "HWyNs": _0x1af3(614, "&1^T"),
    "TWKSO": _0x1af3(905, "V6TA")
  };
  let _0x1baad0 = {
    "url": _0x1af3(941, "&1^T") + _0x3ef40a + _0x1af3(806, "WHhC") + _0x45fa7c + _0x1af3(632, "#Ead"),
    "headers": kw_headers
  };
  return $.http[_0x1af3(679, "NMCk")](_0x1baad0).then(_0x1bbe5f => {
    var _0x37265b = _0x2aa178[_0x1af3(1027, "CcHz")][_0x1af3(722, "m4bk")]("|");
    var _0x5b79f8 = 0;
    while (true) {
      switch (_0x37265b[_0x5b79f8++]) {
        case "0":
          if (_0x2aa178[_0x1af3(751, "VLso")](_0xd5b2dd[_0x1af3(500, "^(QB")], 200) && _0xd5b2dd[_0x1af3(1038, "O*Ta")] == _0x2aa178[_0x1af3(665, "*Z6(")] && _0xd5b2dd.success == true) {
            _0x4184ce = _0xd5b2dd.data.description;
            if (_0x2aa178[_0x1af3(1159, "V6TA")](_0x4184ce, "\u6210\u529F")) {
              _0x4184ce = _0x1af3(871, "^8xB") + _0x4184ce;
            } else {
              if (_0x2aa178[_0x1af3(627, "9IqL")](_0x4184ce, _0x2aa178[_0x1af3(525, "WHhC")])) {
                _0x4184ce = _0x1af3(745, "Ep6z") + _0x4184ce;
              } else {
                if (_0x4184ce == _0x2aa178[_0x1af3(752, "*Z6(")]) {
                  _0x4184ce = _0x1af3(1103, "A5KE") + _0x4184ce;
                } else {
                  _0x4184ce = "\u26A0\uFE0F\u521B\u610F\u89C6\u9891: " + _0x4184ce;
                }
              }
            }
          } else {
            _0x4184ce = _0x1af3(664, "#Ead");
            $[_0x1af3(1046, "(Gll")](_0x1bbe5f[_0x1af3(1062, "*Z6(")]);
          }
          continue;
        case "1":
          $[_0x1af3(613, "#m3$")](_0x4184ce);
          continue;
        case "2":
          $[_0x1af3(555, "m4bk")][_0x1af3(539, "3Jpx")](_0x4184ce);
          continue;
        case "3":
          var _0x4184ce;
          continue;
        case "4":
          var _0xd5b2dd = JSON.parse(_0x1bbe5f[_0x1af3(917, "w)TY")]);
          continue;
        case "5":
          $[_0x1af3(832, "GLl^")](_0x1af3(744, "NMCk"));
          continue;
      }
      break;
    }
  });
}
async function sign(_0x256094, _0x434613) {
  var _0x1d6752 = {
    "XMopI": _0x1af3(484, "Av1G"),
    "zmRzZ": function (_0x371849, _0x4448b4) {
      return _0x371849 == _0x4448b4;
    },
    "ifizi": "oLOCU",
    "dpRPe": _0x1af3(1134, "kUfW"),
    "AlCdL": function (_0x1e5015, _0x1e00ce) {
      return _0x1e5015 == _0x1e00ce;
    },
    "rOYqY": _0x1af3(1173, "b$%k"),
    "txjDH": function (_0xd4a2c5, _0x4d60cb) {
      return _0xd4a2c5 !== _0x4d60cb;
    },
    "dFQqn": _0x1af3(902, "f%zU"),
    "shxUc": _0x1af3(848, "8a)j"),
    "Aebwb": function (_0x20dc0e, _0xf43fda) {
      return _0x20dc0e == _0xf43fda;
    },
    "zDrNU": _0x1af3(836, "WHhC"),
    "MXUve": function (_0xb03b77, _0x510876) {
      return _0xb03b77 === _0x510876;
    },
    "eiPsc": _0x1af3(1107, "Av1G")
  };
  let _0x5e6e4b = {
    "url": _0x1af3(855, "^8xB") + _0x256094 + _0x1af3(842, "OEp)") + _0x434613 + _0x1af3(839, "b$%k"),
    "headers": kw_headers
  };
  return $[_0x1af3(1153, "w)TY")].get(_0x5e6e4b).then(_0x28baf1 => {
    $.log(_0x1d6752[_0x1af3(668, "Zn(7")]);
    var _0x1aff8f;
    var _0x59dc17 = JSON[_0x1af3(787, "AR2*")](_0x28baf1[_0x1af3(797, "m4bk")]);
    if (_0x59dc17[_0x1af3(500, "^(QB")] == 200 && _0x1d6752[_0x1af3(616, "#Ead")](_0x59dc17[_0x1af3(669, "wD@&")], _0x1d6752.rOYqY) && _0x1d6752[_0x1af3(734, "kUfW")](_0x59dc17[_0x1af3(561, "WHhC")], true)) {
      if (_0x1d6752[_0x1af3(1137, "&1^T")](_0x1d6752.dFQqn, _0x1d6752[_0x1af3(858, "w)TY")])) {
        _0x49e648 = _0x2d9cb2[_0x1af3(696, "D$nc")][_0x1af3(949, "3Jpx")] ? _0x1af3(715, "#Ead") + _0x170487.data[_0x1af3(531, "Av1G")] : "\u274C\u89C6\u9891\u62BD\u5956: \u9519\u8BEF!";
      } else {
        _0x1aff8f = _0x59dc17.data[_0x1af3(532, "4dMH")];
        if (_0x1d6752[_0x1af3(666, "EF0Q")](_0x1aff8f, "\u6210\u529F")) {
          _0x1aff8f = _0x1af3(982, "y1z!") + _0x1aff8f;
        } else {
          if (_0x1aff8f == _0x1d6752[_0x1af3(1015, "O*Ta")]) {
            _0x1aff8f = _0x1af3(904, "(Gll") + _0x1aff8f;
          } else {
            if (_0x1aff8f == _0x1d6752[_0x1af3(546, "wD@&")]) {
              _0x1aff8f = _0x1af3(628, "E*6@") + _0x1aff8f;
            } else {
              if (_0x1d6752[_0x1af3(1054, "(Gll")](_0x1aff8f, _0x1d6752.zDrNU)) {
                _0x1aff8f = _0x1af3(683, "GP06") + _0x1aff8f;
              } else {
                _0x1aff8f = _0x1af3(674, "V6TA") + _0x1aff8f;
              }
            }
          }
        }
      }
    } else if (_0x1d6752[_0x1af3(1036, "m4bk")](_0x1d6752.eiPsc, _0x1af3(1169, "CcHz"))) {
      _0x5367fa = _0x1af3(850, "NMCk");
      _0xdaa105.log(_0x239855[_0x1af3(647, "&1^T")]);
    } else {
      _0x1aff8f = _0x1af3(1152, "Zn(7");
      $[_0x1af3(720, "CcHz")](_0x28baf1.body);
    }
    $[_0x1af3(1082, "D$nc")](_0x1aff8f);
    $.notifyMsg[_0x1af3(937, "O*Ta")](_0x1aff8f);
  });
}
function _0xbb05() {
  var _0x313dc9 = function () {
    return [_0xodL, "lHjgsgkjFWihYaGKmwgir.ukKcIXEomMMg.vyr7J==", "W73dICkDW4K", "W71pfmoqWOtdQq", "gmk5WPNdNG", "8yMTL+IKJEMJTEAlGowNQgmz6kso6Ak05Q+R5PwC55sm5A2T5lQ3", "nMVdK1ddSa", "4PMR77M75Q625Pw956Y45yUXiqi", "W55fW6y7WOm", "WPi/kmonka", "WQhcSfHN", "ov1vlZpcP2iqdmkEW7RdJM4gnZ5LW6yfWO1msSkhdG0tWPecWQmmlcxcNG", "WPSUWQWPdSoaySknW4G", "DWyota", "4P6D5QYk5PEo562X5yMTW5dcRoMuLoISQ2a", "iK7dQM/dMX/cRGddGdGU", "fmkIWOpdIW", "WO3cMmoKW5ZdMG", "gmk7dSoeW4y", "W6fLW6S8WPS", "WRtcJK1njq", "55wV5OMx5P+o55Un5BY1", "W7ddUmoXW54", "W6ddJ8kj", "C8kNWQm", "8lA1K+IKSoMHSUAiLEwLPhrp", "W6v5eCoYWOm", "lmk3CCo5", "W65bWQH1vq", "WRH8WOuLBa", "uJSBb14", "W7eYWPJcK8oT", "WRfBWRGTFq", "4P+15OoI5zsy5lQ35yMZA8km6zEg6k6mW7C", "8lcUIEATS+wFKUAjRUIGH+ATI+AxPUwrJ+AUTos4IEwiL8oPWOnv", "WPKeF8kDycxdL2OhW4u", "nCkxWORdOSk/", "W5OCWRX6uG", "4PMR77M75A+J5PwU5A+B562Wiqi", "WQNcNJJcKmkjWRtcVmo2BrFdTmkmWQvkb8k1dCocWQFcISkEW5pcHSkujrWxyLy7qSkohXdcR0ncW7xcUavIFxRdVCoQnSkgW4pcUGTzq2pcGeBdICkwWP3dTmkbWRpcOCoLW6RcOCogWQSKxd/dQSkHW7/dJCkmW6a9WQ4dnJdcNmkhCY3cLeTIoSk5W6LSxG", "fxvWnt8", "W65LldJcQW", "W5rBW6m", "WQNdLmkLabldKW", "WP8RdYy", "WR3cQL9Ql8kyW7vJWQuSWO0", "WPlcVW3cO8kC", "WPZcG0nSnq", "4PUg77MV5QYp5PAR5zo15Q+AWQBcQG", "wttcGSoqhq", "WR3cQKW", "Ba5I", "Bmo8EgGy", "oSkDfCoc", "8k6fJUI0LUs5SoADHUIUPowKJoI2KSoW", "m8kHWQJdOmkT", "8jcDQ+AdMEwwUEs6TEwiQ8kkWOK", "FXhcPJ3cML7dPcldPIaXWRlcNq", "WPdcOeL4pW", "DSkGWRa0bcRcR2qsi2jvFmoEAsVdRmkwq8k6iadcKSofW7VcKmoDsg3dHmoiWR4ZbgeQWO9azhNdMmofjCoJneujW6/cRdFdNmoXh27cLxLBW67cMc87WR7dOmolEahdQCoaCuLYssDCpmk5WRHVvCoEW4RcNmo3CCklsZpcQCoygeeiW6xdQComBa", "8lQ8IUAVOoAxOUETVEwiP8k/gG", "8lkoTUAUI+AwHUwsS+AVLtRcHG", "8jY+UEwhU+I2NEAjHEwMVSk2W5K", "WQLjfCoyWO/dILJdIvS", "8yUmPoATIowCP+AEUoISIoI3Ios6QSoQB8og", "dW7dQ8kpg0e1", "Bv/dKSoD", "edRcJtFcNG", "4PYW6kA96Acz5OMr5AsOcgBPLyNOR5FcPq", "dmo6WONdNCoj", "xSochW4/mcenWR0jW7NcTq", "W5ygWOtcKmon", "bSk4lSolW64", "55A85OQU5P6V55Ue5B6Y", "WOpcIuK", "WPn6W7JdG2a", "ECkXWRaqhN3dPq", "hezJddK", "W5bEmai", "wmkCeColaq", "b8kbhSo5", "DvBdL8kfuNhdGstcOCobWPNcQ8kz", "Fr0Erq", "8jQoI+AUPEAxKowrUUAUO1ZcSG", "WQpcLb97nwVcT0BcSxiEW4K2WPXq", "8y+hNUAUG+AuHEwtLUAVGSkPW7K", "c8o+WO8", "cftdNfpdHq", "WQ3cHsS", "t31iWQZcMCouW4tdNmorWRNdSgFdISk/", "bmkNo8o9W5S", "5lUD5AAD5Bw65A6b5OU+5lUf5yQo", "8k6fJUweN+I3RUAiNUwKKaFcL+wgNoI1OoAUNoAxJoEwPowST+s4Na", "W5RcQ2HbBG", "hSktg8ozW7G", "WQKFa8oHjW", "W6C4zSklya", "4P+t5Q+/5PAh5Bgz6kYyWPGh6zwz6k+TWRm", "W7TVW7SEpa", "cmkzteLw", "8k2UOEAVO+AxVEwqUEAVKevS", "fmoKWOVdUmohW5BdGG", "4PUO77Uz55sT5OQV5l+i5OoV5lQy5yE4WOtORixOJ5hLJBBMIitLOkVLHldKVANMG6m/", "C8koWRWtiW", "W6hdK8kjW6r8WPG", "WPJcNHxcQSkP", "omkcWOZdGCky", "8l6wRUwlPEAgPoINSoMJVCkxAq", "jmk5yG", "w8oSzW", "WPSRWRDEqa", "e8k+pmobW6y", "e8oyW4i", "F8oaW7X9WP0eagPTfcNcHCkBoNhcRMLNEcnBqXVdQmoGurCpW7OIW6NcLmkaWO/dNSkvbX9Cc8oVWPDsW7FcSJJcTN3dNmoFdmokWQKXerlcH8kCWRldL8keAuzmW6jXWRvezdzXWRVcSqHWaNRdG8o8nX4pWRT2fG", "aCkBwLDHFt0QWRS", "WOC3pSoEkW", "8lgfQEAUM+AwGUESGowiPCoyhowMKEI2LW", "kru1", "W7nFbq", "FheulsZcR0OAW7WHW4D7ta", "W69KW5euWR4", "lmoyWQxdRCou", "W6ZdSSkOW5bC", "c8kvwL8", "Ba5IWPBdUaO", "6i645y+M5PQd56wu5AEj6lEn776w", "WRpdMSkZaW", "55AS5OQT5P+u55Uq5B2J", "W4SuWPe", "W5HqiW", "v1xdUbFcKCoLW47dNse", "WRRdImkG", "W699WRPA", "6k6Y5Rc4b8kfW698hq", "W5LInSo+WQW", "W6L2oddcLq", "5BEL6lYk5yQ45B2E5Psl6kE855YK6Aoy5Ass6kA86Aom5Q+b5PAm", "fwPWjHS", "8jI8TEAUP+wDRoAiKoIHNoATJ+AwRUESHEwjVEs7REwkKtxcGIy", "WQZcV8o9W4hdUW", "DbZdKmokuJtdHXBdPmo4W60", "DbLVWPFdGG", "W6hdK8kj", "WRFdMSkS", "W7VcM0G", "WRGefCoXmG", "h8kbxvy", "bmkah8o4W6rrWORcIgO", "W4GiWOlcISoosWmCWOm", "orxdHCkCeq", "eSkMWPFdL8kT", "W77dICknW4jRWPLw", "WOaDnmoAbW", "8ks9VEAVOEAxM+ETUEwiTeP5", "p8kMFmoCza", "WQlcIv94oa", "4P6J5QYP5PEl56Yi5yMOW5Pp6zwO6k64BG", "nSkifCot", "aSkhsq", "o8kFrSoXwW", "BSk1WRy3eG", "nSoYW4mvaW", "wCkUkSohpW", "W45fbsZdNa", "8lgoVoAST+wDJ+AiMEIHMEASREAxMEEVNUwkGUs5QUwkVd94ya", "amk4WP7dHG", "bwfA", "WR/dJSkSdwK", "WQ8tr8kjW5BcUrdcMvTRxcFKUi/NPzhOTABLJBVcSr7dO8onjhfRD8k1WOxcKhDflGlcR1pcTeJdICkzW6CU", "WPSohqCY", "r8oeqmkHWRi", "WRSohmoCfW", "W69fet4", "W4eRWRlcJ8oI", "WQaDbIim", "WOjbWRCf", "m8kGWR3dM8k0", "DICwdf0BoG", "W5vhW6m", "8lw/U+wSGoAwMEwVQEESLd3dVW", "c8oyW6mOl3qT", "8jQ8VEATH+AxQowtGUATSHvL", "W5mgWRXZ", "W4T3k8oUWOO", "jYXl", "6i2y5y6i5PMj56A+5Awv6lEM77695zg35BMK5PwE5O2L5QcR5BY65lIM5Q+e56c8W4Og", "wH3dUSkdeW8Rp1RdRColBSoCE8kWW4VdPSk6cSkAW5ieWOO", "5lQ95AED5BAF5AYD5OQA5lUn5yMc", "WRRcOSo3W4JdHq", "FXFcRZRcKvNcHJRdGaabWRC", "omkrjmoTW6m", "kmoCW4eNbG", "g8kBcG", "nCkSjCozW4a", "hwzyWRa", "h8kagCoH", "nshcQYdcVW", "4PIV77IH5yMH5OA76ksT6Acvf8ke", "kruMWRldKtreW5NcSdtdMa", "55wJ5OM05PYg55MJ5B2a", "ds/cHCoVeW", "tSkNWQm9lq", "xSoIAvWV", "tb3cVmot", "jCo4W5idlW", "vSkRWP/dGCkHWRVdVmoIkSo0WRBcU8kAW7CpBdzwqZreWP3dLW", "kSoLxq", "DmoBW6XO", "imkGWOJdISkN", "qaBcSIhcTmkRW6/dVXFcUeBcQSoVFSkqW5LXfSkKqIldGCkp", "W5DvWQXvqa", "tSkUcCoYoq", "W7yGWR7cK8o9", "W4OOnWqBzSkr", "4PUN77MV5QYR5Pwt56YE5yM4W41k", "fvPSdqa", "WR1IW7ZdU2b1W5H3WPRcJ0/cJr5xgsddU8o8BqiGW4tcLmkJBCoDtSohW7qUW70TpvVdPCo2s8k2ys7dN3dcO8oWWObtwSk7W63cUaFdHSk3WRxcVJenst7cI8ofWONcK8o7Ew0SW6/dKmoxWQxdTru/CemiWRFdOCoKuSomWRZdLCkRjCoyWQjnnCoFFSk1vLNdSG", "8koxUEwlTUAgOEIKIUMGL8kRWQ0", "W4DcWRWhqSkhgKqDlq", "8j6fPUI0SEs7IoAFNEIUIUwLUoI0LIi", "mLXFlt8", "qsyGBdq", "tmo8ye0", "CqWzvItcHHBdPSkBW6/cIa", "eSomBSomvG", "E8oBW68", "umoMDa", "8yQTMUAUPowDIUAjLUIJN+IGMEMGGEwSJEESG+s4U+wiPCoeW7Ox", "WOmJamownq", "t2HpWRhcHmkBW47dGmoyWOhdRhtdM8kKW7VdV8oSimkdWPP1n0NdNG", "eSoeW4i", "8k2CT+ATPUwESoAjJUIJJoATMUAvTEAwNUIuVEs6NEwiGtXUEW", "t8o8CeyRW7NdGW", "j1Lhb2i"].concat(function () {
      return ["g8kBgCo0W7HeWPRcGhjBBa", "C8orW7TUWPXxxZfTftm", "fCkBcCoO", "WO3cIuOp", "WQRcNYtcUCkP", "gbtdPSkj", "oYjEA3a", "mrtdSSkfeL4NFW3cQSkxk8osDCkpW4/dRCkAgSomW492W6i9W5JcNCkypwBdSSkCWPe9xCo6WRfvWPRdImksWRyWW6BdOmkHumooW7BcJCoSW4VcRCoND2yRW7hcK8keW6xcNxFdI8oVWQ82W7m4kmo9WQhdLmkTWOaNW5DwWP0/W4naW73cOCkPWORcQSoDiH/cTuNdLCogx2WQWQNcVfNdLJZcIh4VWOBdTH86W6FdJLvIhvtcNCkbb8kxaSoUEmkSWORcUdmfwh/cNSkAW4hcPdRdRSkIoZFcRbKmWPlcT0pcKCkfgSkBw1jPWQBcKuxdO8oAt0/cNtZcQJxdRJVcUSowaCkJW7jFWOzS", "W4KOjW8", "j8o6W7iqlq", "WP7cLCoQW6JdJq", "4PUF77Q45Q2Q5PAK5zg75Q2DC8k1", "cc3cGIdcIG", "pt3dJCkleq", "uoEzIEABMoELNUs7TSk8WRe", "gMzfWOVcIG", "W4S4oqyxE8kXx8opW4ddTa", "w8kihKi1EemLW6KGWOi", "8k2nN+AVIUAvVEAuN+IvJ8kVWRa", "W7NdPmklW7bG", "umoMDga8W7G", "kmoaWOtdSSoq", "yJCb", "8y2LGoweToI2OEAlU+wMLYec", "nKjrkJZcVu4xaG", "8ysUV+ASN+wDPUAiG+IIJ+whVoI2G+AjJEwLUos7SowkTHSfWOK", "4PYl5Q6V5Psb5zkA5QYSCSox6zwZ6kY+WQu", "WR4EqSkdW5JcTX7dQceJg3Dd", "i8o3tSo3", "aSkHFmoVBG", "WRGbgSo7i8kYAa", "8lI+UEwjUEAfMEIKQUMGSX1G", "WOG7ca", "8ys9R+AVOEAwK+ESPUwlKfvr", "C0LLW6pcL3anW6lcMc7dMSo0W40", "lmo3D8ohDW", "a8kBsq", "WR3cN2bPlq", "8koCRoAUJUwEHUAkQ+IJIUATNUAvQoESTUwkREs4OEwjV8ksWR5o", "u8kElmoRoq", "4PYR5Q2E5Psn56+L5yQsWP/cKEMxTUITP8oA", "W4XvWR9oFG", "ah1UWRFcJSoi", "WOeXccCcWRRdVmojWPC", "dHtcTd4", "8kMFJoATHUwDQ+AiVEIIIowUMEAwKUwVUoETGos5R+wjGcPBDG", "8y2LGoAUTUAvVEESUowlSsec", "cf9qWQVcKq", "WONcHeSfaG", "4PIT77QZ55Eg5OQw5l+V5Okf5lIO5ysLC+ISK+ImLUwnSEAjN+wGUowhVUs/RUAcQce", "W5i1lbeS", "W4/dIWniEpghK5S", "f8oKWPVdSW", "kmoqvCoozW", "8lIVKUIGH+MJKowTSEESKX1G", "4P+A5OcI5zAZ5lU85yQIlCkL6zsJ6k2VlW", "8kA8MoASP+AvVUAwLoIvQSklW48", "agldUepdMG", "WQzJW6VdQhy8WOq", "yGP/WQRdQW", "WR3cOmo/W6VdKW", "WOVcH1Ox", "WQxcN01imG", "zLFdGmoSWOO", "WQBcJZJcTCkUW43dM8k2CqVdSW", "hmkbtv1IDWm", "ASkvWRaYmq", "xCoagaS0mufOWRK3W4xcVN4u", "zdTQWRNdHW", "zCk+cmo1bq", "6i+r5y625PU156A+5AEO6lAZ776g", "FexdLCohWP3cM8o/", "he3dH3VdRG", "dwToWR3cM8opW53dM8oDWOldPW", "imoZtG", "wdyqW6ZdMq", "5lIb5AwD5BAl5AYu5OMw5lI65yQ6", "vGmqpeG", "5lM+5Asw5BA25A+V5OQp5lMI5yQH", "W7jhfbxdMW", "zZ0rfG", "WR1HpeFcUa", "W6f9WRK", "5lUk5Awi5BE35A2F5OQA5lQd5yMO", "4PQ177MM5Q6L5PEq5zg65Q6JxmkY", "lSkyBvPl", "W77dSmkAW5zR", "udmnEsu", "h8kvxe1I", "gmosW5e", "WRriWOSZFa", "8kA1LoIIPEMJIowTHoESP8kMWQO", "lYzFE2FdTq84W5OgW6S", "lHbBxv0", "t8odW75BWOm", "8y2ULUIMV+MGIEAlU+wMLYec6ksO6Aoi5Q6g5PAm55EC5A+k5lMT", "lmkCDCoDCq", "8yEeMUASNoAwHEETLEwlMxmn", "WPWxpYCw", "omk3D8oRta", "y1/dKq", "sCksxffQoqyWWRG5W5ZcVe8dxfVdJ8oynYddOefkgmketM4", "lCkjaSoaW4lcPmkM", "lZpdOCkKjG", "W50hDmkd", "WPtdTSkXcbu", "W454W64o", "c8oCtCozEG", "8kcTLUAVHUwDQEAiSoIHNEAUHUAvSoAwMEIuMEs5VEwkRSonW7RdSa", "WPSVWRDEta", "8k68N+AdSowuIUs7QowkOYTO", "j8kzxxTo", "WO/cTSoe", "eZrAtNG", "uCo6Da", "WRz5W6ZdRG", "yG5HWQO", "4PYe5QYz5PEG56+M5yIzWRRcTEMwIEITH8ot", "WO0XgdC", "WQ1CW4VdGuq", "W7jdbq", "8kAVQEAaIUwxKUs4OUwiT8kMWQO", "8lYVJoAUTEAvKEEULEwkTbFcHa", "W5jFW5SGWR02W4xcStBcV8oB", "8yQpToATH+AvRUAuPEIwGmonEa", "BG5XWRRdRahcHh41", "aYLEA1K", "5lQe5Asi5BwS5A6g5OQ55lQw5yM2", "W5Dqiay", "8y+DO+IGQEMHPUwTP+ESV8kPW7K", "cCo1ifL6W7BcGmovWPyLwq", "W5PqmaRdUCoGtCovja", "W6msiYug", "4PYJ5yUV5OsH6kE46AkwpLdPLydORln9", "FxJdK8oIWOK", "ASkapSogoq", "W77cNfT3Cc3cQHxdQwbEW5bMWPicW6P6W75hW7CpW5GNeYuPW6vqqJhcRhS7ACk7WQPAtHfnpSkjlq7cPmktgH7dI8oyW4ilF8kwWP/cGNeSWPNcICotW50tB1WtktjnfSkqW4OG", "WOVcLNWMpq", "bh1A", "puBdQKldJW", "W71NWQ1l", "WO1CjSopoN7cTtigWPpcHmovWPldJa", "W40AWQXWASovBCke", "4PIu77IW5Q6l5PAg56+H5yQPoSkg", "jCo3ymorDW", "ca/cTcFcV8oVW5hdUqi", "W7RdLmohW5hcTa", "5BAu6l+E5yUW5BYD5Ps86kwu556x6Acx5AwZ6kso6AkL5Q+I5PES", "W6RdMCkA", "jmk9y0HX", "W4z2W70", "W6lcGePP", "8jcDQ+AVNoAxGoESSowkUSkkWOK", "WOlcVmozW6a", "WOFcKLOgk8oAqf4+iCoIW4FdU8kLW43cSSoLavWxxZnNWR7cVcBcSxVcI8k6hmk7ws0HiCktfwX7WPyCW5idydPOW6BcPSoxqI7cIH4udCkHW71/W5ldSgWiWPfFWPhcSNldS8oMW6yKW7tcK8o2WOJcLGGAWOddGmoWE8o3AG", "W6fhgCoFWOxdPuddGq", "dCkvDhLJ", "t8kncCod", "WRxdPSkpec0", "8lcLNoAVN+AuN+AuV+IwHmk+iW", "l8kZCCo8smo0W7q", "AmkedmoBmq", "WRddTmk2mKu", "ySoTW4PCWQW", "k2v0WPVcVW", "a8oWWPZdUG", "4PQC77Qg5A6j5PEt5A+t56Y7WORcIq", "t3bVW6RcNNSaWORdRgtcGmkbWRhcHSoDWR4sW5uDW6tdSEkeVmo1WRpcGSkvW7hcIfHnagFdGSoQiX7cHd8sWONdGmkQzmobhmoxvaVOHPhMNlNMIydOOOPSW73dR+wpSUs5PUAvRoMuGH3cO1FcMYKewo+8Jq", "W7hdG8k8W7P0", "4P6J6ksG6Ak/5OUl5AsoW5Pp6zwO6k64BG", "W4OcWPJcHmoCwG", "zmobW6TUWOTnxa", "W5dcMuLwAW", "WQLcfCotWOldQN7dJqjR", "frxcOY3cVmoLW68", "WOKSmmoYnq", "oszbExZdSIWVW5WBW6a", "rHtcImo+kq", "W5JcUgTrAq", "WRNcSv9/", "nCo6ymoWsW", "zar2WRddUbhcUxK7wmo3", "hsldV8kBnG", "n2rgxaPrF31ZWRRdGZhdQq", "8ks9VEINQoMIR+AkUUwLKKP5", "W7hdMSkKfLJdVblcUSo+W5FcT8kIWP7cVvr+Fq", "WPtcJbtcS8kT", "W4/dQCkAW6DF", "8lA+HEASUEAuHUwYP+IVHNrp", "W4OiWPe", "4PYe5yAB6ls85OIL5Aw/WRRcTEMwIEITH8ot", "k11jkI4", "xdBdP8kwf14QmrFcSCkjo8oAnmk2W7FdQSkBeCksW5qvW7e4WQ3dLmkHbwhdS8kxW5rsqCkjWQbsW7pcPSkdW7O1W6tdRSoKpCoIW7tdJSkdW5FdNSkFbM9kW4dcK8kyW6ZcR0xdJmogWO0RWQGHlSo4WRRdI8kYWP8JW4jEW748W59zW7ZdGCkLW4BcR8oFlfRdKMVdK8oowYOJW4tcNLtdNtNcGtqXWOlcHMS/W6VdLJ5+b2ZcM8kBdCoBhmoVzSk3WPhcPs4BsbVcV8kjW57cRJZdHSkamdBcPvPkWQVcJ0tcKmkotSkzreX7W4JcULtdG8o3rLRdL0tcTdRdOvldSCoia8k7W61oWObUW5K", "4P2z5yMY5OwL6kEZ6AohW5vg6zAl6kYDWQe", "W44tWOlcKW", "8lgEOEwkN+AfG+IKLoMJGmkwW78", "zJ0rcG", "b2fjWRFcJ8oFW6ddNmot", "W5XqfbldSW", "8kMFJoATHUwDQ+AiVEIIIowfJUI1NEAlMowMP+s5R+wjGcPBDG", "W6nbhq", "eqJdRW", "W47cP8ojW77dKuGIW5xcVCki", "x8k4WOCGoW", "emkrgq", "W6ddU8kkW4O", "W6pdQCkOW7TJ", "55w25OUl5P2l55Uy5B+Y", "jCkRWRxdVCkB", "aSouDSo3qW", "6i+W5y625PUr56wg5Awr6lwT77+75zkN5BMf5PE05O6Y5Qoq5B+z5lM+5QYD56cxWPtcVG", "WOvlWQadwCkaovKqF8oW", "ESk1WRaL", "8lYnNEAUJEwEIEAjQEIIPUwiVUAfGUIMMEMHTEs5MUwiHMD9WRu", "8lQDU+wkNUAgSoIKOEMGJwpdNq", "W4KYeYKnWQ3dOSotWPqt", "emkobmoHWQywWOFcI3vAAmoyCau2W4eF", "umovW5XlWRy", "W6rQWR3dTYeZW4mKW4pcNqG", "WRXsn30", "WQGWedKZ", "w2FdVCo3WRC", "gSoCumktrW", "W7BdTSkKW41U", "uSoMz0WOW7pdVCoAW4a", "W5LmiW", "Dc8Nrae", "W4H2W74w", "W6npdIZdKG", "W4ldGSk3W5XV", "W6ddSCoGW5e", "WQ9ueSkzWQJdIGhdNG57kxTeWQn0xmkXe8oWW4K", "nHWHWPxdIW", "lCkAgCoMW6u"].concat(function () {
        return ["W4NcGfWznCoDhbGWiCkWW4FdPmkJW57cV8odhLLDEJn9W6ZcO3tdRW", "W7ddRCoqW5JcGa", "mc5eeWSuE083WOpcTG", "ja/cGmot", "WQFcIcNcK8kG", "W6ZdRSkkW5S", "W6ddPSkwW7zA", "F0xdHCom", "5lQ65AEK5BsF5AYI5OUC5lM95yIW", "8lQwREATIUAvMUAxKEIvK2pdNq", "i8ouEmoLsq", "CqGEva", "chLCWPdcOG", "W5/cMHSkBmkCxG1Km8kK", "8k6FS+wVIoAuOEwSVUEVTWFcLW", "WQbckNlcM8oQ", "bmo+WOZdVG", "W7VdN8oQW6FcKW", "8j6FM+AcV+wxS+s7G+wlIxmt", "W6pdK8kAW4HOWPnOpJG", "pmkLqSoaFG", "W4WDC8kzBdJdTW", "W48jySkjBa", "8j6oSowVR+AwMEwUPEEVMxmt", "WRLegYBcICkFusLMW7D9", "ih5PWQFcNq", "5lIl5AEd5BA+5A2S5OUQ5lM15yIY", "W6zRasNdPG", "WQFdMSk1evq", "BmknkCoKlq", "W6ddTSodW5BcN8o5pq", "ErpcPJ/cKf7dOJJdRH0jWRBcRa", "oKjboG", "pNtdM0VdPq", "8kcTLEAbR+wxNEs6RowkShpcTq", "vSkRWP/dGCkHWRVdV8oIpSo4WRBdUmoBW78mzbXTw2riWPq", "W7NdQSoI", "lczy", "WRrEW5NdRMK", "W5f9mdpdKW", "W5LfWRLMsG", "W60yfSo/l8kVseVcIMq", "C8ovW7XS", "8lgeNowSNUAwUUwTJ+EVOmkwW78", "5BAD6l2k5yIE5B2T5PEI6kEg55276Aoe5AEk6kAA6AcI5Q+85PwB", "WPfCWOmyuW", "W5usWPxcGmonqt0", "8lYCTEIII+MGP+wUK+ETMX9T", "pmk9imoNW7W", "rSkFgG", "W6tdUmo3W4ZcGG", "8l6wRUASSEAvJUwWUEIUMmkxAq", "hHtdRmkv", "W4eLnYSN", "WPWUecCq", "WOOncWSS", "WQCBhG", "WRNdLmkZc1FdQJhdTmo3", "W7BdTSoHW4y", "m8o+x8o4", "W6OpF8kzEG", "W7NdMmoxW7NcPq", "lmkZDSo7w8oPW6xdPmobWP0i", "55wy5OU65P+h55Uv5B6z", "4PIV77IH5Q615Pwr5BoK6k2Wf8ke", "WQrKmMdcPq", "8lgpIEAVP+wDPoAkTEIGNEILQUMHJUAlNUwMGos5HowkPKhcINu", "WRVdLmkG", "kSkubmon", "W4TNdmogWOG", "WRL5W68", "5Bs56l+k5yMj5B+l5PAJ6ksd55Yq6Ak/5AE46kAF6Ac25Q+D5PAe", "8kA+GUIIPEMJIowTHoESP8kMWQO", "W4qiWPlcMG", "iZqhafvvoLPKWPhcObpdNSkLz3xcH8k1ECkdWOtdH8oInSksW4zD", "W4zInbpcQW", "WR/dLmk/bq", "W73dMCkKaXtdKaPqWQWy", "f8ocW44UdW", "dCk+jwm0W6/dLCo7W6G", "W53dQmkCW7HG", "WRL5W7ZdRMe9WO42WPlcJf4", "WRZcJmkeW6LBWP53iq", "55Al5OMe5P+L55MG5B2r", "8kwpR+ATNUwFTUAkJUIJQUwkTUAgOoILSUMHVos5SUwkTSkbWQZcSG", "4P+b5Q2Z5Psl56+F5yI+W5af6zwu6k6WW4u", "nG8XWRtdHJvo", "4PYu5Q+I5PEa5zgV5QYwW74J6zw96k6kW5a", "W5qUmW", "W7ZdRCoXW48", "l8oItSoMydG+z8kItmoLW7pcUHFcSXjRWQxdTutcPmk1kSoqFtu0gtldKSkaFSoWWPdcI1VcGudcVCozW5tdGSkloINcJatcLaWhW4/dN8kFW7DGW4VcPg7dVmk2trVcPSosW6/dP1qLW4PJWO7cO8k7W5jHWPaHWRiVtmkNacnxWR4rCmkklYfMWOqSW4ShWQm", "6kwS5P6+5PMp56we5AEA6lAHf8ke", "F8oBW4vfWP4", "oSk6mmosW4K", "8yQMJ+ASIoAwH+ETJ+wkO0BcPW", "baJcLCopja", "a8o0WPVdUmoqW4ZdGCkBW6hcLg4", "8konHowgOoI2L+AjSEwNKmkRWQ0", "W6Plk3lcHSoSW6qBWPvU", "WRNcSv9/lSoqWQmIWQ0VWPX5bMC5WObUAxjlaLy2tKZcPbZdLhZdVmkKhmoGWPhcGSobpmkZtSoICSkOxCoXWPhdScawW7C9W4DPWOJcRKbVWPdcONxdUSk/l8o2umkwoHybW7e", "WP/cH1Wfpq", "4P6K5yAE6lAj5OIZ5AEIt2tPLR7ORlFdJa", "bWTTDL4", "kfHwkW", "W6TpdSov", "WQKBhCoH", "8k68N+wiOEAgMEINLEMIKYTO", "4PYe5QYz5PEG5PAU6jEMWRRcTEMwIEITH8ot", "5zkv5BQ55Pwv5OYTymoK", "5lMo5AAZ5Bsm5AYN5OIM5lQx5yIm", "4PUq77Uc6kki6AcO5A2r56Y3WQVcRq", "vSkHWOldICkLW6JdGSoKlmkG", "WOddKSkPcLC", "zmkVb8oohq", "WPZcLKiFla", "hSkIWPNdH8kQW7/dNmo+lW", "WOLAWQCqwmotzGiqFSoQW5pdOmkvor7dP8kjjXldN8oPW6SqW7tcKIhcL8olyCkqwfldSmkPdvrwW7hcGmoNnmkvDqKGoJ85qIC4fYhdPvNcVx8JWPJdMbxcRX9fDCkJWPlcGSoHDfX9fCk8zCkLW4pcUCkAW6ZdLuBcUmoBWQ9brCobW7evW4ZcQSkTWOid", "tmkjcq", "nLuZW6hcVb3cSfKIF8o6", "WQHllKBcMG", "wZKUyZW", "fmkSWPNdJW", "FSoAW7XOWOLmtILLcJtdJSkxpwFcRsz0FW", "iKtdSg3dNqu", "55sd5OUB5P2x55Uz5BYG", "k8k5yCo9", "W6HldG", "W4icWOxcGmoAwZ4BWO3cGmk7", "WPFcMXxcOCkV", "xaFcU8ovaCklFG", "iK7dUq", "zHWjvJpcNbu", "z8k7WRCLiq", "W4GgWPVcHG", "kSk5yCoH", "8lcLNoAdMUwvPUs7SUwlQSk+iW", "jGbMWQFdOXFcPZa9w8o9zSoLWRtdGgeB", "nmkHWO7dOCkM", "WQzMW6tdOMC", "8yUmP+AVPoAxQUESO+wlMSk2lq", "55AC5OIi5P2U55Iy5B+k", "fCo9WRldVCo6", "8ysSHoAVOEAwK+ESPUwlKfvr", "qGhcVW", "t2LsWRlcJCoOW5JdGSkj", "dGKgWPZdTW", "4PUj77Ib5Oo35zwc5lIs5yIhWPFcJW", "W4ZdICkxW6ze", "8lYePUAaLowwV+s7T+wiSSkAbq", "fa/dVmkC", "55s95OME5P2a55Mo5BYd", "CXrMWRddRWVcUG", "pmktbCoA", "AbrUWRZdKG", "W79CkSomWPm", "8ksNGoAVOEAxM+AuSEIxI0P5", "WRD5W6ZdSG", "ytmbdG", "W4ODWQjjrW", "Cmk7WRaTewNdJtGC", "W7DFlX7cNa", "WRldTCoQW5JcJSoYcSkuCSox", "bq/cPcS", "4PMp77UP5Q+H5PAt5PwU6jsVvve", "W7hdKCoqW6ZcQG", "WRfZW7VdQgeMWOCSWPRcJLu", "W5LPW7ygaa", "8jITNEwTNUAwSUwVQUEUOCk6AW", "g8ouumktrq", "8kY0LEATKEAxR+EVL+wjNCoTtG", "kcXiFq", "irSMWRy", "W4LDW7CK", "ksXiyq", "hmkIWPNdI8k+W7tdQmoJkCoWWR8", "8lw/UoAVUEwDH+AiK+IJQEAVIoAuUUwYIoISPEs5PUwkUMJdP8on", "AbvXWQpdUuldPIi7wCoTjCo2WQ/dJgHhWQtcGquwW7dcKqqdWOj0WReoWPSYWOVcKSoEW4L+WQLfgYixW6RcJ8kJxeldRcG8o8k8WQ/cI8kShhldHmkVWOufWO7cMHddLCkND3edbmkHW75pmKNdOtBcSWniqbi4e0NcIt/cMIZcVCk/W7lcU8kiWPHyWPy", "hCoyW4e4", "4PQG77MU5Q+k5Ps25PA86jA3W7mT", "8ywCSEATV+AvQ+EVIUwjHx7cH+AlIowjSGm", "WQRdLSkOaI0", "WOLAWQCqwmotzGiqFSoQW5pdOmkvor7dP8kjjXldN8oPW6SqW7tcKIhcL8olyCkqwfldSmkPdvrwW7hcGmoNnmkvDqKGoIvNgsCRfZBcO1dcV1GgWORdLtFcUa9mBmkHWONcLCoqFeeT", "cSkoWRRdP8k/", "WR9sj3BcISoXW4q", "W5uYiaimz8kBuSobW5/dTa", "WQvJW7VdOW", "W6NdQCkz", "lSkgd8ocW5W", "WRNdHCkKmHa", "4PUj77Ib5Q+Y5Ps75PEF6jwPWPFcJW", "55wb5OI55PYx55QL5B68", "WOxcOmox", "Fmo2W4rbWOO", "EWyExddcLIVdOCkv", "k8oAW7uLma", "W5xcGf5+rW", "W504jWqmFmkssmojW53dVW", "c8o+WO/dNSoqW5C", "uCkfWQGTbq", "Bf/dKSob", "4PMH77UL5Q6d5Psf566e5yQ+WQNdUq", "8yEeMUwgNUI1MEAkLUwMV3mn", "55A35OIh5P2i55IT5B65", "W4pdOmonW5tcIa", "u8oYW6zbWOm", "k8o5xq", "WQ3dK8kziJa", "tr3cVmop", "WRHpixS", "d8owW5CYmG", "W64kWOxcPSoH", "lSkjeSol", "W7FcQurOnmkeW59KWQb8", "W55Uux9w", "W4TnW6KTWRS/W7/cVaZcPmoA", "4P2d6lw05lIr5P2b6kYAW5lcRoMxOoITMCoHWQ3cGG", "W658W64veq", "8yQEN+ATH+AvRUETREwjV8onEa", "mr4bWPNdKq", "WRBdRSkXihG", "hefOdbu", "WRldUCkZmN0", "pmkDWPxdGmk/", "kGf8t34", "WPtdPmkapI0", "qHWxo1S", "W57dLmkKW6Xt", "jCkLyG", "WPJcUbRcPCk9", "B8kHfCo1oa", "WRddRmk9k3a", "tSoGW65lWQy", "k8oZvmoXz2O"];
      }());
    }());
  }();
  _0xbb05 = function () {
    return _0x313dc9;
  };
  return _0xbb05();
}
function _0x1af3(_0xb694f0, _0x1b98f3) {
  var _0xbb0571 = _0xbb05();
  _0x1af3 = function (_0x1af3c6, _0x3b6008) {
    _0x1af3c6 = _0x1af3c6 - 475;
    var _0x5cb1c1 = _0xbb0571[_0x1af3c6];
    if (_0x1af3.KyMLSS === undefined) {
      var _0x15f86b = function (_0x16e346) {
        var _0x219ab1 = "";
        var _0x15faf3 = "";
        var _0x44de64 = 0;
        var _0x4db9b9;
        var _0x2da6a8;
        for (var _0x2cb485 = 0; _0x2da6a8 = _0x16e346.charAt(_0x2cb485++); ~_0x2da6a8 && (_0x4db9b9 = _0x44de64 % 4 ? _0x4db9b9 * 64 + _0x2da6a8 : _0x2da6a8, _0x44de64++ % 4) ? _0x219ab1 += String.fromCharCode(255 & _0x4db9b9 >> (-2 * _0x44de64 & 6)) : 0) {
          _0x2da6a8 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(_0x2da6a8);
        }
        var _0x223c6f = 0;
        for (var _0x1d8408 = _0x219ab1.length; _0x223c6f < _0x1d8408; _0x223c6f++) {
          _0x15faf3 += "%" + ("00" + _0x219ab1.charCodeAt(_0x223c6f).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x15faf3);
      };
      var _0x3440ca = function (_0x3d7e3c, _0x40fc71) {
        var _0x40666b = [];
        var _0x1a7185 = 0;
        var _0x3d0f1b;
        var _0x429bcd = "";
        _0x3d7e3c = _0x15f86b(_0x3d7e3c);
        var _0x2a9c01;
        for (_0x2a9c01 = 0; _0x2a9c01 < 256; _0x2a9c01++) {
          _0x40666b[_0x2a9c01] = _0x2a9c01;
        }
        for (_0x2a9c01 = 0; _0x2a9c01 < 256; _0x2a9c01++) {
          _0x1a7185 = (_0x1a7185 + _0x40666b[_0x2a9c01] + _0x40fc71.charCodeAt(_0x2a9c01 % _0x40fc71.length)) % 256;
          _0x3d0f1b = _0x40666b[_0x2a9c01];
          _0x40666b[_0x2a9c01] = _0x40666b[_0x1a7185];
          _0x40666b[_0x1a7185] = _0x3d0f1b;
        }
        _0x2a9c01 = 0;
        _0x1a7185 = 0;
        for (var _0x49e90a = 0; _0x49e90a < _0x3d7e3c.length; _0x49e90a++) {
          _0x2a9c01 = (_0x2a9c01 + 1) % 256;
          _0x1a7185 = (_0x1a7185 + _0x40666b[_0x2a9c01]) % 256;
          _0x3d0f1b = _0x40666b[_0x2a9c01];
          _0x40666b[_0x2a9c01] = _0x40666b[_0x1a7185];
          _0x40666b[_0x1a7185] = _0x3d0f1b;
          _0x429bcd += String.fromCharCode(_0x3d7e3c.charCodeAt(_0x49e90a) ^ _0x40666b[(_0x40666b[_0x2a9c01] + _0x40666b[_0x1a7185]) % 256]);
        }
        return _0x429bcd;
      };
      _0x1af3.YSuMuQ = _0x3440ca;
      _0xb694f0 = arguments;
      _0x1af3.KyMLSS = true;
    }
    var _0x1c108a = _0xbb0571[0];
    var _0x4e72b3 = _0x1af3c6 + _0x1c108a;
    var _0x5b0625 = _0xb694f0[_0x4e72b3];
    if (!_0x5b0625) {
      if (_0x1af3.ZSnlDf === undefined) {
        _0x1af3.ZSnlDf = true;
      }
      _0x5cb1c1 = _0x1af3.YSuMuQ(_0x5cb1c1, _0x3b6008);
      _0xb694f0[_0x4e72b3] = _0x5cb1c1;
    } else {
      _0x5cb1c1 = _0x5b0625;
    }
    return _0x5cb1c1;
  };
  return _0x1af3(_0xb694f0, _0x1b98f3);
}
;
async function new_sign(_0x40b961, _0x331988) {
  var _0xbec571 = {
    "nhZRE": _0x1af3(978, "VLso"),
    "cSvVY": _0x1af3(828, "f%zU"),
    "SUACf": function (_0x3020bd, _0xe86bbe) {
      return _0x3020bd !== _0xe86bbe;
    },
    "alEPN": _0x1af3(706, "WHhC"),
    "XPvqi": _0x1af3(1160, "3Jpx"),
    "KIMvv": function (_0x95ab10, _0x9722a2) {
      return _0x95ab10 == _0x9722a2;
    },
    "gAybh": function (_0x51c560, _0x598303) {
      return _0x51c560 == _0x598303;
    },
    "jMNpJ": _0x1af3(948, "7ra)"),
    "SZcPa": function (_0x239d18, _0x4d4c55) {
      return _0x239d18 !== _0x4d4c55;
    },
    "TWgEF": _0x1af3(996, "4dMH")
  };
  let _0x44b515 = {
    "url": "https://integralapi.kuwo.cn/api/v1/online/sign/v1/earningSignIn/newUserSignList?loginUid=" + _0x40b961 + "&loginSid=" + _0x331988,
    "headers": kw_headers
  };
  return $[_0x1af3(725, "CcHz")][_0x1af3(735, "Av1G")](_0x44b515)[_0x1af3(973, "7ra)")](_0x2af863 => {
    var _0x339e2b = {
      "LJwOi": function (_0x4ed68d, _0x9f1529) {
        return _0x4ed68d == _0x9f1529;
      },
      "leHrY": _0xbec571[_0x1af3(1024, "#m3$")]
    };
    if (_0xbec571[_0x1af3(1042, "Oghd")]("alQeI", _0xbec571.alEPN)) {
      $.log(_0xbec571[_0x1af3(1092, "AR2*")]);
      var _0x5b9271;
      var _0x288908 = JSON.parse(_0x2af863[_0x1af3(534, "Zn(7")]);
      if (_0xbec571[_0x1af3(680, "#Ead")](_0x288908[_0x1af3(659, "V6TA")], 200) && _0x288908[_0x1af3(1154, "#Ead")] == _0xbec571.jMNpJ && _0xbec571[_0x1af3(813, "Av1G")](_0x288908[_0x1af3(602, "*Z6(")], true)) {
        _0x5b9271 = _0x288908.data[_0x1af3(573, "wD@&")];
        if (_0xbec571[_0x1af3(1117, "D$nc")](_0x5b9271, true)) {
          _0x5b9271 = _0x1af3(944, "#!p6");
        } else {
          if (_0x5b9271 == "\u7528\u6237\u672A\u767B\u5F55") {
            _0x5b9271 = _0x1af3(1112, "3Jpx");
          }
        }
      } else if (_0x1af3(521, "^8xB") !== _0xbec571[_0x1af3(805, "#m3$")]) {
        _0x5b9271 = _0x1af3(571, "D$nc");
        $[_0x1af3(1084, "Oghd")](_0x2af863.body);
      } else {
        _0x18e54b.push(_0xbec571.nhZRE);
      }
      $[_0x1af3(1108, "F$Cw")](_0x5b9271);
      $[_0x1af3(822, "GLl^")].push(_0x5b9271);
    } else {
      _0x4669d8 = _0x29b8fb.data.description;
      if (_0x163f1f == "\u6210\u529F") {
        _0xa3bd54 = _0x1af3(932, "kUfW") + _0x2653ce;
      } else {
        if (_0x127581 == _0x1af3(609, "V6TA")) {
          _0x108351 = _0x1af3(788, "b$%k") + _0x2bc612;
        } else {
          if (_0x339e2b[_0x1af3(638, "^8xB")](_0x3a262d, _0x339e2b.leHrY)) {
            _0x203bdf = _0x1af3(808, "O*Ta") + _0x271d56;
          } else {
            _0x1ca254 = _0x1af3(697, "GP06") + _0x5d98ab;
          }
        }
      }
    }
  });
}
async function loterry_free(_0x2dd30b, _0x2918de) {
  var _0x391d6c = {
    "TIAtt": function (_0x2bc524, _0x117c4c) {
      return _0x2bc524 == _0x117c4c;
    },
    "RqGFq": function (_0x53bcca, _0x9a6279) {
      return _0x53bcca == _0x9a6279;
    },
    "uCSWX": _0x1af3(596, "#Ead"),
    "XDOhI": function (_0x9fae5b, _0xf991a4) {
      return _0x9fae5b == _0xf991a4;
    },
    "MIadJ": function (_0x2ac821, _0x2317b0) {
      return _0x2ac821 !== _0x2317b0;
    },
    "ifPHM": _0x1af3(629, "VLso")
  };
  let _0x3f1c8f = {
    "url": _0x1af3(946, "E*6@") + _0x2dd30b + _0x1af3(876, "f%zU") + _0x2918de + _0x1af3(733, "#!p6"),
    "headers": kw_headers
  };
  return $.http.get(_0x3f1c8f)[_0x1af3(761, "Ep6z")](_0x20bc24 => {
    $.log(_0x1af3(730, "m4bk"));
    var _0x37f57e;
    var _0x40f051 = JSON[_0x1af3(1067, "CcHz")](_0x20bc24[_0x1af3(1009, "x@f)")]);
    if (_0x40f051[_0x1af3(1171, "E*6@")] == 200 && _0x391d6c[_0x1af3(485, "#!p6")](_0x40f051[_0x1af3(1124, "CcHz")], _0x391d6c.uCSWX) && _0x40f051[_0x1af3(702, "4dMH")] == true) {
      _0x37f57e = _0x40f051[_0x1af3(559, "^8xB")][_0x1af3(495, "ZLJN")] ? _0x1af3(862, "f%zU") + _0x40f051[_0x1af3(736, "A5KE")][_0x1af3(1011, "i9nj")] : "\u274C\u514D\u8D39\u62BD\u5956: \u9519\u8BEF!";
    } else {
      _0x37f57e = _0x40f051[_0x1af3(814, "EF0Q")] ? _0x1af3(554, "WHhC") + _0x40f051.msg : "\u274C\u514D\u8D39\u62BD\u5956: \u9519\u8BEF!";
    }
    if (_0x391d6c[_0x1af3(1068, "w)TY")](_0x37f57e, _0x1af3(1088, "ZLJN"))) {
      _0x37f57e = "\uD83D\uDFE2\u514D\u8D39\u62BD\u5956: \u514D\u8D39\u6B21\u6570\u7528\u5B8C\u4E86";
    }
    if (_0x37f57e == _0x1af3(721, "9IqL")) {
      if (_0x391d6c[_0x1af3(708, "^(QB")] !== _0x1af3(1155, "9IqL")) {
        _0x13715f = _0x1af3(586, "Z^Uc");
        _0x390bad[_0x1af3(1113, "ZLJN")](_0x45d9d9[_0x1af3(838, "CcHz")]);
      } else {
        $.log(_0x20bc24.body);
      }
    }
    $[_0x1af3(613, "#m3$")](_0x37f57e);
    $[_0x1af3(822, "GLl^")][_0x1af3(1168, "]H@f")](_0x37f57e);
  });
}
async function loterry_video(_0x996f9e, _0x374b66) {
  var _0x5e703b = {
    "YRVEG": function (_0x3d15c7, _0x501336) {
      return _0x3d15c7 == _0x501336;
    },
    "MGUeA": _0x1af3(773, "f%zU"),
    "FqfQh": _0x1af3(678, "ev^0"),
    "kBLLd": _0x1af3(569, "f%zU"),
    "tsGXW": function (_0x4632d5, _0x27e7f0) {
      return _0x4632d5 == _0x27e7f0;
    },
    "tvDJu": "success",
    "sfsBh": function (_0xc5b28e, _0x17f366) {
      return _0xc5b28e === _0x17f366;
    },
    "Winhf": _0x1af3(737, "NMCk")
  };
  let _0x1da344 = {
    "url": _0x1af3(667, "Z^Uc") + _0x996f9e + _0x1af3(977, "(Gll") + _0x374b66 + _0x1af3(789, "]H@f"),
    "headers": kw_headers
  };
  return $.http[_0x1af3(735, "Av1G")](_0x1da344).then(_0x41702c => {
    var _0x52f51f = {
      "YrbSV": function (_0x2cf7a7, _0x48888e) {
        return _0x5e703b[_0x1af3(993, "Oghd")](_0x2cf7a7, _0x48888e);
      },
      "LCGFm": function (_0x38a131, _0x2ceb2d) {
        return _0x5e703b[_0x1af3(1025, "E*6@")](_0x38a131, _0x2ceb2d);
      },
      "SQeSp": function (_0x3f428d, _0x1da740) {
        return _0x3f428d == _0x1da740;
      },
      "uPJLG": _0x5e703b[_0x1af3(1133, "m4bk")],
      "GNbTc": "\u7528\u6237\u672A\u767B\u5F55",
      "KiMBA": _0x5e703b[_0x1af3(703, "Z^Uc")],
      "xJMZY": _0x5e703b[_0x1af3(957, "4dMH")]
    };
    $.log(_0x1af3(831, "O*Ta"));
    var _0x18cbde;
    var _0x413213 = JSON[_0x1af3(1156, "kUfW")](_0x41702c.body);
    if (_0x5e703b[_0x1af3(840, "]H@f")](_0x413213.code, 200) && _0x5e703b[_0x1af3(785, "9IqL")](_0x413213[_0x1af3(645, "GP06")], "success") && _0x413213[_0x1af3(894, "^(QB")] == true) {
      _0x18cbde = _0x413213[_0x1af3(743, "kUfW")][_0x1af3(1041, "(Gll")] ? "\uD83C\uDF89\u89C6\u9891\u62BD\u5956: " + _0x413213.data[_0x1af3(846, "y1z!")] : _0x1af3(1064, "sJnr");
    } else {
      _0x18cbde = _0x413213.msg ? _0x1af3(1021, "CcHz") + _0x413213[_0x1af3(651, "]H@f")] : _0x1af3(700, "Zn(7");
    }
    if (_0x18cbde == "\uD83D\uDD34\u89C6\u9891\u62BD\u5956: \u89C6\u9891\u6B21\u6570\u7528\u5B8C\u4E86") {
      _0x18cbde = _0x1af3(626, "WHhC");
    }
    if (_0x5e703b[_0x1af3(840, "]H@f")](_0x18cbde, "\u274C\u89C6\u9891\u62BD\u5956: \u9519\u8BEF!")) {
      if (_0x5e703b[_0x1af3(763, "ZLJN")](_0x5e703b[_0x1af3(877, "GLl^")], _0x5e703b[_0x1af3(1026, "b$%k")])) {
        $[_0x1af3(1082, "D$nc")](_0x41702c[_0x1af3(533, "Av1G")]);
      } else {
        let _0x37aa63 = {
          "url": "https://integralapi.kuwo.cn/api/v1/online/sign/v1/earningSignIn/everydaymusic/doListen?loginUid=" + _0x4af40f + _0x1af3(863, "7ra)") + _0xb535bd + _0x1af3(765, "Zn(7"),
          "headers": _0x14d2c5
        };
        return _0x5c8627.http[_0x1af3(620, "F$Cw")](_0x37aa63)[_0x1af3(491, "wD@&")](_0x4daf5b => {
          var _0x1f0fa1 = _0x1af3(1136, "I1wH")[_0x1af3(879, "Zn(7")]("|");
          var _0x5b35e6 = 0;
          while (true) {
            switch (_0x1f0fa1[_0x5b35e6++]) {
              case "0":
                if (_0x52f51f[_0x1af3(845, "A5KE")](_0x550f72[_0x1af3(768, "I1wH")], 200) && _0x52f51f[_0x1af3(1111, "WHhC")](_0x550f72[_0x1af3(1127, "GLl^")], "success") && _0x52f51f[_0x1af3(1089, "Z^Uc")](_0x550f72.success, true)) {
                  _0x1cf028 = _0x550f72.data.description;
                  if (_0x1cf028 == "\u6210\u529F") {
                    _0x1cf028 = _0x1af3(1149, "#Ead") + _0x1cf028;
                  } else {
                    if (_0x52f51f[_0x1af3(608, "b$%k")](_0x1cf028, _0x52f51f.uPJLG)) {
                      _0x1cf028 = _0x1af3(653, "!CVc") + _0x1cf028;
                    } else {
                      if (_0x52f51f[_0x1af3(952, "Av1G")](_0x1cf028, _0x52f51f[_0x1af3(990, "b$%k")])) {
                        _0x1cf028 = _0x1af3(934, "i9nj") + _0x1cf028;
                      } else {
                        if (_0x1cf028 == _0x52f51f[_0x1af3(1148, "WHhC")]) {
                          _0x1cf028 = "\uD83D\uDFE2\u6BCF\u65E5\u7B7E\u5230: " + _0x1cf028;
                        } else {
                          _0x1cf028 = _0x1af3(511, "I1wH") + _0x1cf028;
                        }
                      }
                    }
                  }
                } else {
                  _0x1cf028 = _0x1af3(1010, "(Gll");
                  _0x2015bb.log(_0x4daf5b.body);
                }
                continue;
              case "1":
                _0xa21b19.notifyMsg[_0x1af3(950, "y1z!")](_0x1cf028);
                continue;
              case "2":
                var _0x550f72 = _0x357324[_0x1af3(865, "Zn(7")](_0x4daf5b[_0x1af3(817, "sJnr")]);
                continue;
              case "3":
                _0x15852d[_0x1af3(731, "!CVc")](_0x52f51f[_0x1af3(1002, "i9nj")]);
                continue;
              case "4":
                var _0x1cf028;
                continue;
              case "5":
                _0x43574c[_0x1af3(1125, "V6TA")](_0x1cf028);
                continue;
            }
            break;
          }
        });
      }
    }
    $[_0x1af3(1084, "Oghd")](_0x18cbde);
    $[_0x1af3(662, "V6TA")].push(_0x18cbde);
  });
}
async function surprise(_0x4934eb, _0x5cf30a) {
  var _0x2921c8 = {
    "HOaoT": "12-14",
    "aBPWk": function (_0x206d5a, _0x142c86) {
      return _0x206d5a == _0x142c86;
    },
    "DYQZa": _0x1af3(602, "*Z6("),
    "aYwwH": "\u4ECA\u5929\u5DF2\u5B8C\u6210\u4EFB\u52A1",
    "WpJOM": _0x1af3(1069, "Ep6z"),
    "BkIEV": _0x1af3(610, "V6TA"),
    "BWClY": function (_0x1f3b3d, _0x512538) {
      return _0x1f3b3d < _0x512538;
    }
  };
  var _0x2bdfa4 = Math.random() < 0.3 ? 68 : Math.random() < 0.6 ? 69 : 70;
  let _0x1faeeb = {
    "url": _0x1af3(1109, "4dMH") + _0x4934eb + "&loginSid=" + _0x5cf30a + "&from=surprise&goldNum=" + _0x2bdfa4 + _0x1af3(1085, "wD@&"),
    "headers": kw_headers
  };
  return $[_0x1af3(770, "A5KE")][_0x1af3(1105, "GP06")](_0x1faeeb)[_0x1af3(824, "^8xB")](_0x9a422c => {
    var _0xebe54c = {
      "YuCKt": _0x2921c8[_0x1af3(1102, "f%zU")]
    };
    $[_0x1af3(1104, "9IqL")]("\uD83D\uDFE1\u6B63\u5728\u6267\u884C\u60CA\u559C\u4EFB\u52A1...");
    var _0xc2ea2e;
    var _0x293336 = JSON[_0x1af3(793, "GLl^")](_0x9a422c[_0x1af3(938, "BOoU")]);
    if (_0x2921c8[_0x1af3(988, "BOoU")](_0x293336[_0x1af3(927, "ev^0")], 200) && _0x293336[_0x1af3(756, "V6TA")] == _0x2921c8[_0x1af3(480, "!CVc")] && _0x293336[_0x1af3(1061, "sJnr")] == true) {
      _0xc2ea2e = _0x293336[_0x1af3(869, "!CVc")][_0x1af3(861, "D$nc")];
      if (_0xc2ea2e == "\u6210\u529F") {
        _0xc2ea2e = _0x1af3(652, "ev^0") + _0xc2ea2e;
      } else {
        if (_0xc2ea2e == _0x2921c8[_0x1af3(713, "sJnr")]) {
          _0xc2ea2e = _0x1af3(1052, "GP06") + _0xc2ea2e;
        } else {
          if (_0xc2ea2e == _0x2921c8[_0x1af3(759, "V6TA")]) {
            _0xc2ea2e = _0x1af3(900, "AR2*") + _0xc2ea2e;
          } else {
            _0xc2ea2e = "\u26A0\uFE0F\u60CA\u559C\u4EFB\u52A1: " + _0xc2ea2e;
          }
        }
      }
    } else if (_0x2921c8[_0x1af3(695, "wD@&")] === "FxPvD") {
      _0xc2ea2e = _0x1af3(1029, "O*Ta");
      $.log(_0x9a422c[_0x1af3(899, "9IqL")]);
    } else {
      _0x358766[_0x1af3(519, "GP06")](_0xebe54c.YuCKt);
    }
    $[_0x1af3(523, "GP06")](_0xc2ea2e);
    $[_0x1af3(784, "NMCk")].push(_0xc2ea2e);
  });
}
async function box(_0x5e2620, _0x3704d5) {
  var _0x5d0af4 = {
    "mARFB": _0x1af3(849, "wD@&"),
    "aNFqR": function (_0x44c8e8, _0x49e6ff) {
      return _0x44c8e8 == _0x49e6ff;
    },
    "VLLJG": function (_0x50a1b0, _0x559c1a) {
      return _0x50a1b0 == _0x559c1a;
    },
    "BUtFQ": _0x1af3(705, "ev^0"),
    "EhEQS": function (_0x293832, _0xb3c808) {
      return _0x293832 == _0xb3c808;
    },
    "NRuWp": _0x1af3(874, "A5KE"),
    "gWzIA": function (_0xa0d254, _0x419371) {
      return _0xa0d254 == _0x419371;
    },
    "NPDVj": _0x1af3(889, "EF0Q"),
    "kaMQd": function (_0x24c108, _0x220a0d) {
      return _0x24c108 == _0x220a0d;
    },
    "yosaV": function (_0x52ad8f, _0x2ca648) {
      return _0x52ad8f == _0x2ca648;
    },
    "kkaFk": function (_0x3980ab, _0x173187) {
      return _0x3980ab == _0x173187;
    },
    "LHAnK": _0x1af3(556, "VLso"),
    "tvHDn": function (_0x9e59ab, _0x57f5d2) {
      return _0x9e59ab == _0x57f5d2;
    },
    "zWHng": function (_0x3e8202, _0x4f8a7d) {
      return _0x3e8202 == _0x4f8a7d;
    },
    "NCfIs": function (_0x1e9aa6, _0x116746) {
      return _0x1e9aa6 + _0x116746;
    },
    "oFoXt": function (_0x44c14c, _0x1b19ce) {
      return _0x44c14c >= _0x1b19ce;
    },
    "WyHko": _0x1af3(1094, "axr]"),
    "aHQez": _0x1af3(1013, "#!p6"),
    "EZgLs": function (_0x1679e7, _0x5dacca) {
      return _0x1679e7 !== _0x5dacca;
    },
    "XMWQz": "YtYJS",
    "TmPdg": function (_0x48482c, _0x47ef1c) {
      return _0x48482c >= _0x47ef1c;
    },
    "MFhch": _0x1af3(753, "EF0Q"),
    "dljSu": function (_0x90c141, _0x1d913b) {
      return _0x90c141 === _0x1d913b;
    },
    "xJCJW": "iRuQP",
    "VLUXl": "14-16",
    "KsTKT": function (_0x498d1c, _0x21f7d3) {
      return _0x498d1c >= _0x21f7d3;
    },
    "RlYqG": _0x1af3(530, "x@f)"),
    "JwywG": function (_0x374692, _0x37f082) {
      return _0x374692 - _0x37f082;
    },
    "aQmux": function (_0x43f9ea, _0x58a1b0) {
      return _0x43f9ea < _0x58a1b0;
    },
    "OQKZP": function (_0x1cf9bc, _0x1fca01, _0x4af9e6, _0x4bf2ef) {
      return _0x1cf9bc(_0x1fca01, _0x4af9e6, _0x4bf2ef);
    }
  };
  var _0x2b96d2 = [];
  var _0x3048cf = _0x5d0af4[_0x1af3(588, "i9nj")](new Date()[_0x1af3(595, "Oghd")](), 8);
  if (_0x5d0af4[_0x1af3(584, "^8xB")](_0x3048cf, 0)) {
    if (_0x5d0af4[_0x1af3(968, "Ep6z")] !== _0x5d0af4[_0x1af3(803, "y1z!")]) {
      _0x2b96d2[_0x1af3(671, "#m3$")](_0x1af3(1166, "Av1G"));
    } else {
      _0x52fd1c[_0x1af3(832, "GLl^")](_0x5d0af4[_0x1af3(826, "Ep6z")]);
      var _0x54ef83;
      var _0x414486 = _0x4ec1d9.parse(_0x12b271.body);
      if (_0x414486[_0x1af3(646, "y1z!")] == 200 && _0x5d0af4[_0x1af3(1130, "!CVc")](_0x414486[_0x1af3(951, "A5KE")], _0x5d0af4[_0x1af3(718, "NMCk")]) && _0x5d0af4[_0x1af3(1118, "NMCk")](_0x414486[_0x1af3(510, "3Jpx")], true)) {
        _0x54ef83 = _0x414486[_0x1af3(1122, "GLl^")][_0x1af3(827, "9IqL")];
        if (_0x54ef83 == "\u6210\u529F") {
          _0x54ef83 = _0x1af3(726, "O*Ta") + _0x54ef83;
        } else {
          if (_0x54ef83 == _0x5d0af4[_0x1af3(600, "EF0Q")]) {
            _0x54ef83 = "\uD83D\uDFE2\u521B\u610F\u89C6\u9891: " + _0x54ef83;
          } else {
            if (_0x5d0af4[_0x1af3(995, "GLl^")](_0x54ef83, _0x5d0af4[_0x1af3(709, "Z^Uc")])) {
              _0x54ef83 = "\uD83D\uDD34\u521B\u610F\u89C6\u9891: " + _0x54ef83;
            } else {
              _0x54ef83 = _0x1af3(494, "!CVc") + _0x54ef83;
            }
          }
        }
      } else {
        _0x54ef83 = _0x1af3(724, "x@f)");
        _0x3e52c1[_0x1af3(1047, "&1^T")](_0x218d96[_0x1af3(942, "F$Cw")]);
      }
      _0x4abedf.log(_0x54ef83);
      _0x1d4c1e[_0x1af3(728, "wD@&")].push(_0x54ef83);
    }
  }
  if (_0x5d0af4[_0x1af3(782, "Ep6z")](_0x3048cf, 8)) {
    if (_0x5d0af4[_0x1af3(1032, "f%zU")](_0x1af3(1101, "Oghd"), _0x5d0af4[_0x1af3(540, "F$Cw")])) {
      var _0x48e569 = _0x1af3(1080, "Z^Uc")[_0x1af3(931, "axr]")]("|");
      var _0xd3cac8 = 0;
      while (true) {
        switch (_0x48e569[_0xd3cac8++]) {
          case "0":
            var _0xa3ee7d;
            continue;
          case "1":
            if (_0xa3ee7d == "\uD83D\uDD34\u514D\u8D39\u62BD\u5956: \u514D\u8D39\u6B21\u6570\u7528\u5B8C\u4E86") {
              _0xa3ee7d = "\uD83D\uDFE2\u514D\u8D39\u62BD\u5956: \u514D\u8D39\u6B21\u6570\u7528\u5B8C\u4E86";
            }
            continue;
          case "2":
            if (_0x944df8[_0x1af3(964, "*Z6(")] == 200 && _0x5d0af4[_0x1af3(566, "^8xB")](_0x944df8[_0x1af3(527, "F$Cw")], _0x5d0af4.BUtFQ) && _0x5d0af4[_0x1af3(897, "kUfW")](_0x944df8[_0x1af3(1147, "NMCk")], true)) {
              _0xa3ee7d = _0x944df8[_0x1af3(1049, "w)TY")][_0x1af3(939, "f%zU")] ? _0x1af3(1058, "*Z6(") + _0x944df8.data.loterryname : "\u274C\u514D\u8D39\u62BD\u5956: \u9519\u8BEF!";
            } else {
              _0xa3ee7d = _0x944df8[_0x1af3(956, "#!p6")] ? _0x1af3(966, "E*6@") + _0x944df8[_0x1af3(527, "F$Cw")] : "\u274C\u514D\u8D39\u62BD\u5956: \u9519\u8BEF!";
            }
            continue;
          case "3":
            _0x552896[_0x1af3(656, "&1^T")][_0x1af3(998, "NMCk")](_0xa3ee7d);
            continue;
          case "4":
            if (_0x5d0af4[_0x1af3(1065, "D$nc")](_0xa3ee7d, _0x1af3(866, "#!p6"))) {
              _0xdd5834[_0x1af3(1113, "ZLJN")](_0x4364d6[_0x1af3(870, "WHhC")]);
            }
            continue;
          case "5":
            _0x1e793d[_0x1af3(523, "GP06")](_0x5d0af4[_0x1af3(867, "BOoU")]);
            continue;
          case "6":
            var _0x944df8 = _0x2f84c9[_0x1af3(537, "BOoU")](_0x2d5a55[_0x1af3(635, "AR2*")]);
            continue;
          case "7":
            _0x184a43[_0x1af3(1070, "Zn(7")](_0xa3ee7d);
            continue;
        }
        break;
      }
    } else {
      _0x2b96d2[_0x1af3(1006, "(Gll")](_0x1af3(933, "EF0Q"));
    }
  }
  if (_0x5d0af4[_0x1af3(959, "F$Cw")](_0x3048cf, 10)) {
    if (_0x5d0af4[_0x1af3(618, "x@f)")]("xOLwK", _0x1af3(1083, "i9nj"))) {
      _0x2b96d2.push(_0x5d0af4[_0x1af3(1043, "(Gll")]);
    } else {
      _0x172172 = _0x1d963b[_0x1af3(1119, "#Ead")][_0x1af3(892, "CcHz")];
      if (_0x151443 == "\u6210\u529F") {
        _0x5047d1 = _0x1af3(549, "9IqL") + _0x3f61b6;
      } else {
        if (_0x2a48bd == _0x5d0af4.NRuWp) {
          _0x28dd8d = "\uD83D\uDFE2\u6BCF\u65E5\u6536\u85CF: " + _0x19dac9;
        } else {
          if (_0x5d0af4[_0x1af3(1033, "8a)j")](_0x25552b, _0x5d0af4[_0x1af3(885, "x@f)")])) {
            _0x8c7921 = _0x1af3(774, "Ep6z") + _0x47c255;
          } else {
            _0x512d46 = _0x1af3(954, "wD@&") + _0xb8d5ea;
          }
        }
      }
    }
  }
  if (_0x3048cf >= 12) {
    _0x2b96d2[_0x1af3(1142, "#Ead")](_0x1af3(1106, "axr]"));
  }
  if (_0x3048cf >= 14) {
    if (_0x5d0af4[_0x1af3(884, "7ra)")]("xVrpz", _0x5d0af4[_0x1af3(650, "y1z!")])) {
      _0x5d1a74[_0x1af3(631, "*Z6(")](_0x2b543a[_0x1af3(649, "VLso")]);
    } else {
      _0x2b96d2[_0x1af3(772, "*Z6(")](_0x5d0af4[_0x1af3(1116, "O*Ta")]);
    }
  }
  if (_0x3048cf >= 16) {
    _0x2b96d2[_0x1af3(1168, "]H@f")](_0x1af3(640, "axr]"));
  }
  if (_0x5d0af4[_0x1af3(910, "ZLJN")](_0x3048cf, 18)) {
    _0x2b96d2[_0x1af3(519, "GP06")](_0x1af3(606, "wD@&"));
  }
  if (_0x3048cf >= 20) {
    _0x2b96d2[_0x1af3(1076, "Av1G")](_0x5d0af4[_0x1af3(603, "i9nj")]);
  }
  var _0x23fe1f = _0x2b96d2[_0x1af3(701, "CcHz")];
  await box_new(_0x2b96d2[_0x23fe1f - 1], _0x5e2620, _0x3704d5);
  for (var _0x4c324b = 0; _0x5d0af4[_0x1af3(578, "wD@&")](_0x4c324b, _0x5d0af4[_0x1af3(560, "9IqL")](_0x23fe1f, 1)); _0x4c324b++) {
    await _0x5d0af4[_0x1af3(989, "OEp)")](box_old, _0x2b96d2[_0x4c324b], _0x5e2620, _0x3704d5);
  }
}
async function box_new(_0x1fd29b, _0x28d035, _0x3bc2fc) {
  var _0x42422e = {
    "gmbwQ": function (_0x3d7d9e, _0x31a2e5) {
      return _0x3d7d9e == _0x31a2e5;
    },
    "UfXSW": function (_0x278eac, _0x14aa7c) {
      return _0x278eac == _0x14aa7c;
    },
    "prPxx": function (_0x5c1e7a, _0x1aee1f) {
      return _0x5c1e7a == _0x1aee1f;
    },
    "GaTFX": function (_0x58aaa5, _0x5246ea) {
      return _0x58aaa5 == _0x5246ea;
    },
    "XwvVm": _0x1af3(658, "i9nj"),
    "DlMOO": "\u7528\u6237\u672A\u767B\u5F55",
    "Pmedk": function (_0x3a8c21, _0x4cd560) {
      return _0x3a8c21 !== _0x4cd560;
    },
    "EBLaP": _0x1af3(820, "VLso"),
    "tClRI": _0x1af3(576, "m4bk"),
    "rphZr": function (_0x55eb39, _0x286c29) {
      return _0x55eb39 === _0x286c29;
    },
    "tFcuP": _0x1af3(552, "D$nc"),
    "uYBQB": function (_0x4ad4b7, _0x3ca79b) {
      return _0x4ad4b7 == _0x3ca79b;
    },
    "DIvrc": function (_0x2c1c21, _0x4fb112) {
      return _0x2c1c21 < _0x4fb112;
    }
  };
  var _0x2a7ae1 = Math.random() < 0.3 ? 28 : _0x42422e[_0x1af3(834, "!CVc")](Math.random(), 0.6) ? 29 : 30;
  let _0x49b26b = {
    "url": _0x1af3(864, "(Gll") + _0x28d035 + _0x1af3(926, "Ep6z") + _0x3bc2fc + _0x1af3(716, "GLl^") + _0x1fd29b + _0x1af3(909, "wD@&") + _0x2a7ae1,
    "headers": kw_headers
  };
  return $[_0x1af3(914, "sJnr")][_0x1af3(605, "^8xB")](_0x49b26b).then(_0x2c715d => {
    var _0x56cd37 = {
      "sfxEB": function (_0x25481f, _0x41e88b) {
        return _0x42422e[_0x1af3(810, "E*6@")](_0x25481f, _0x41e88b);
      },
      "tPaIV": "success",
      "qccfP": function (_0x526b8e, _0x1fb5d0) {
        return _0x526b8e == _0x1fb5d0;
      },
      "ZTfnG": function (_0x525840, _0x228e22) {
        return _0x42422e[_0x1af3(717, "Oghd")](_0x525840, _0x228e22);
      },
      "sGnAM": _0x42422e[_0x1af3(644, "BOoU")],
      "ebjDr": "\u7528\u6237\u672A\u767B\u5F55",
      "PGHpU": "\uD83D\uDFE1\u6B63\u5728\u6267\u884C\u6BCF\u65E5\u542C\u6B4C\u4EFB\u52A1..."
    };
    if (_0x42422e[_0x1af3(505, "f%zU")](_0x42422e[_0x1af3(740, "^8xB")], _0x1af3(624, "BOoU"))) {
      var _0x4bdf5a = _0x1af3(749, "y1z!").split("|");
      var _0x4da34d = 0;
      while (true) {
        switch (_0x4bdf5a[_0x4da34d++]) {
          case "0":
            _0x5af7a0[_0x1af3(835, "y1z!")](_0x39de7b);
            continue;
          case "1":
            _0x2c0266[_0x1af3(522, "4dMH")]("\uD83D\uDFE1\u6B63\u5728\u6267\u884C\u6BCF\u65E5\u7B7E\u5230\u4EFB\u52A1...");
            continue;
          case "2":
            var _0x1ecb69 = _0x299d75.parse(_0x5d234e[_0x1af3(823, "Ep6z")]);
            continue;
          case "3":
            _0x21e3c5[_0x1af3(822, "GLl^")].push(_0x39de7b);
            continue;
          case "4":
            if (_0x1ecb69.code == 200 && _0x42422e[_0x1af3(739, "f%zU")](_0x1ecb69[_0x1af3(1154, "#Ead")], _0x1af3(589, "y1z!")) && _0x42422e[_0x1af3(1004, "O*Ta")](_0x1ecb69[_0x1af3(786, "AR2*")], true)) {
              _0x39de7b = _0x1ecb69.data[_0x1af3(961, "3Jpx")];
              if (_0x42422e[_0x1af3(919, "!CVc")](_0x39de7b, "\u6210\u529F")) {
                _0x39de7b = _0x1af3(564, "Zn(7") + _0x39de7b;
              } else {
                if (_0x42422e[_0x1af3(794, "EF0Q")](_0x39de7b, _0x42422e.XwvVm)) {
                  _0x39de7b = _0x1af3(1056, "Z^Uc") + _0x39de7b;
                } else {
                  if (_0x39de7b == _0x42422e[_0x1af3(985, "m4bk")]) {
                    _0x39de7b = _0x1af3(859, "GLl^") + _0x39de7b;
                  } else {
                    if (_0x39de7b == _0x1af3(809, "#Ead")) {
                      _0x39de7b = _0x1af3(653, "!CVc") + _0x39de7b;
                    } else {
                      _0x39de7b = _0x1af3(965, "Oghd") + _0x39de7b;
                    }
                  }
                }
              }
            } else {
              _0x39de7b = _0x1af3(648, "9IqL");
              _0x104456.log(_0x238d9c.body);
            }
            continue;
          case "5":
            var _0x39de7b;
            continue;
        }
        break;
      }
    } else {
      $[_0x1af3(1070, "Zn(7")](_0x42422e.tClRI);
      var _0x1bbab2;
      var _0x5d7037 = JSON[_0x1af3(630, "9IqL")](_0x2c715d[_0x1af3(1128, "#m3$")]);
      if (_0x42422e[_0x1af3(1095, "#Ead")](_0x5d7037.code, 200) && _0x42422e[_0x1af3(621, "E*6@")](_0x5d7037[_0x1af3(853, "3Jpx")], _0x1af3(596, "#Ead")) && _0x42422e[_0x1af3(748, "4dMH")](_0x5d7037[_0x1af3(896, "x@f)")], true)) {
        if (_0x1af3(963, "kUfW") === _0x42422e.tFcuP) {
          _0x1bbab2 = _0x5d7037[_0x1af3(1018, "Ep6z")][_0x1af3(623, "BOoU")];
          if (_0x42422e[_0x1af3(694, "4dMH")](_0x1bbab2, "\u6210\u529F")) {
            _0x1bbab2 = _0x1af3(779, "ZLJN") + _0x1bbab2;
          } else {
            if (_0x1bbab2 == _0x42422e[_0x1af3(625, "4dMH")]) {
              _0x1bbab2 = _0x1af3(476, "axr]") + _0x1bbab2;
            } else {
              if (_0x42422e[_0x1af3(699, "A5KE")](_0x1bbab2, _0x42422e[_0x1af3(1135, "#!p6")])) {
                _0x1bbab2 = "\uD83D\uDD34\u5B9A\u65F6\u5B9D\u7BB1: " + _0x1bbab2;
              } else {
                _0x1bbab2 = _0x1af3(1034, "WHhC") + _0x1bbab2;
              }
            }
          }
        } else {
          let _0x288b25 = {
            "url": "https://integralapi.kuwo.cn/api/v1/online/sign/v1/earningSignIn/everydaymusic/doListen?loginUid=" + _0x2fa839 + _0x1af3(704, "!CVc") + _0x119946 + _0x1af3(502, "f%zU"),
            "headers": _0x4cd933
          };
          return _0x5a6845.http[_0x1af3(553, "b$%k")](_0x288b25)[_0x1af3(682, "Z^Uc")](_0x48b38b => {
            var _0xa30e36 = _0x1af3(767, "b$%k")[_0x1af3(903, "y1z!")]("|");
            var _0x36abe7 = 0;
            while (true) {
              switch (_0xa30e36[_0x36abe7++]) {
                case "0":
                  _0x235040[_0x1af3(1110, "#Ead")][_0x1af3(583, "D$nc")](_0x12ad38);
                  continue;
                case "1":
                  var _0x12ad38;
                  continue;
                case "2":
                  if (_0x129f3[_0x1af3(504, "4dMH")] == 200 && _0x56cd37[_0x1af3(764, "w)TY")](_0x129f3[_0x1af3(732, "sJnr")], _0x56cd37[_0x1af3(1165, "VLso")]) && _0x56cd37[_0x1af3(945, "OEp)")](_0x129f3.success, true)) {
                    _0x12ad38 = _0x129f3.data[_0x1af3(742, "E*6@")];
                    if (_0x42422e[_0x1af3(717, "Oghd")](_0x12ad38, "\u6210\u529F")) {
                      _0x12ad38 = _0x1af3(478, "4dMH") + _0x12ad38;
                    } else {
                      if (_0x12ad38 == _0x56cd37.sGnAM) {
                        _0x12ad38 = _0x1af3(1096, "BOoU") + _0x12ad38;
                      } else {
                        if (_0x42422e[_0x1af3(810, "E*6@")](_0x12ad38, "\u7528\u6237\u672A\u767B\u5F55")) {
                          _0x12ad38 = _0x1af3(1081, "Oghd") + _0x12ad38;
                        } else {
                          _0x12ad38 = _0x1af3(542, "F$Cw") + _0x12ad38;
                        }
                      }
                    }
                  } else {
                    _0x12ad38 = "\u274C\u6BCF\u65E5\u542C\u6B4C: \u9519\u8BEF!";
                    _0x3c8c34[_0x1af3(489, "Av1G")](_0x48b38b[_0x1af3(917, "w)TY")]);
                  }
                  continue;
                case "3":
                  var _0x129f3 = _0x3b9eda[_0x1af3(815, "Ep6z")](_0x48b38b.body);
                  continue;
                case "4":
                  _0x4e8521[_0x1af3(720, "CcHz")](_0x12ad38);
                  continue;
                case "5":
                  _0x2e361d.log(_0x56cd37[_0x1af3(509, "CcHz")]);
                  continue;
              }
              break;
            }
          });
        }
      } else {
        _0x1bbab2 = "\u274C\u5B9A\u65F6\u5B9D\u7BB1: \u9519\u8BEF!";
        $[_0x1af3(1114, "]H@f")](_0x2c715d.body);
      }
      $[_0x1af3(481, "BOoU")](_0x1bbab2);
      $[_0x1af3(924, "kUfW")].push(_0x1bbab2);
    }
  });
}
async function box_old(_0x331a12, _0x2d3b1e, _0x4cac27) {
  var _0x53d6da = {
    "HmsEI": function (_0x1e650b, _0x10e89a) {
      return _0x1e650b < _0x10e89a;
    },
    "vFZfy": function (_0x3c12c7, _0x9491ef) {
      return _0x3c12c7 == _0x9491ef;
    },
    "bzvGf": _0x1af3(916, "&1^T"),
    "cHCRx": _0x1af3(1087, "4dMH"),
    "BqVYO": _0x1af3(524, "GLl^"),
    "XqYZY": function (_0x5c8ee9, _0x2dfc00) {
      return _0x5c8ee9 == _0x2dfc00;
    },
    "LPxns": function (_0xa7530a, _0x3c877a) {
      return _0xa7530a == _0x3c877a;
    },
    "QOVcv": function (_0x33f745, _0x98bdd0) {
      return _0x33f745 == _0x98bdd0;
    },
    "OzKEH": function (_0x24dc65, _0x1f24dc) {
      return _0x24dc65 == _0x1f24dc;
    },
    "jqzne": function (_0x20c0d4, _0x14bc3f) {
      return _0x20c0d4 === _0x14bc3f;
    },
    "awaNK": _0x1af3(670, "i9nj")
  };
  var _0x1a83bb = _0x53d6da[_0x1af3(975, "CcHz")](Math[_0x1af3(999, "!CVc")](), 0.3) ? 28 : Math.random() < 0.6 ? 29 : 30;
  let _0x3ddb5f = {
    "url": "https://integralapi.kuwo.cn/api/v1/online/sign/new/boxRenew?loginUid=" + _0x2d3b1e + _0x1af3(704, "!CVc") + _0x4cac27 + _0x1af3(901, "&1^T") + _0x331a12 + _0x1af3(1059, "!CVc") + _0x1a83bb,
    "headers": kw_headers
  };
  return $[_0x1af3(1078, "x@f)")][_0x1af3(802, "BOoU")](_0x3ddb5f).then(_0x35e2e6 => {
    var _0x13f446 = {
      "tdSNr": _0x1af3(548, "#Ead"),
      "rlZfX": function (_0x3c22f3, _0x1ee0ee) {
        return _0x53d6da[_0x1af3(1045, "^(QB")](_0x3c22f3, _0x1ee0ee);
      },
      "NUjfC": _0x53d6da.bzvGf,
      "ltMOP": function (_0x536a6a, _0x107ec5) {
        return _0x536a6a == _0x107ec5;
      },
      "aUvBI": _0x53d6da.cHCRx,
      "TQaki": function (_0x2acaab, _0x5bfa30) {
        return _0x53d6da[_0x1af3(1131, "]H@f")](_0x2acaab, _0x5bfa30);
      },
      "tXeQn": "\uD83D\uDFE1\u6B63\u5728\u6267\u884C\u60CA\u559C\u4EFB\u52A1..."
    };
    $[_0x1af3(1125, "V6TA")](_0x53d6da.BqVYO);
    var _0x198ce1;
    var _0x204289 = JSON.parse(_0x35e2e6[_0x1af3(921, "y1z!")]);
    if (_0x204289[_0x1af3(890, "9IqL")] == 200 && _0x53d6da[_0x1af3(987, "f%zU")](_0x204289[_0x1af3(1020, "kUfW")], _0x53d6da.bzvGf) && _0x53d6da[_0x1af3(541, "#!p6")](_0x204289.success, true)) {
      _0x198ce1 = _0x204289.data.description;
      if (_0x198ce1 == "\u6210\u529F") {
        _0x198ce1 = _0x1af3(812, "NMCk") + _0x198ce1;
      } else {
        if (_0x198ce1 == _0x53d6da.cHCRx) {
          _0x198ce1 = _0x1af3(585, "]H@f") + _0x198ce1;
        } else {
          if (_0x198ce1 == _0x1af3(738, "w)TY")) {
            _0x198ce1 = "\uD83D\uDD34\u8865\u9886\u5B9D\u7BB1: " + _0x198ce1;
          } else {
            _0x198ce1 = "\u26A0\uFE0F\u8865\u9886\u5B9D\u7BB1: " + _0x198ce1;
          }
        }
      }
    } else {
      if (_0x53d6da[_0x1af3(517, "m4bk")](_0x1af3(507, "#m3$"), _0x53d6da[_0x1af3(777, "wD@&")])) {
        var _0x317628 = _0x2cdacc[_0x1af3(1039, "OEp)")]() < 0.3 ? 68 : _0x53d6da[_0x1af3(642, "#Ead")](_0x4e852c.random(), 0.6) ? 69 : 70;
        let _0x125a0a = {
          "url": _0x1af3(685, "Zn(7") + _0x1ff101 + _0x1af3(977, "(Gll") + _0x101ace + _0x1af3(506, "ev^0") + _0x317628 + "&surpriseType=",
          "headers": _0x23e6b0
        };
        return _0x11cbbc[_0x1af3(710, "(Gll")][_0x1af3(563, "VLso")](_0x125a0a).then(_0x3c40f7 => {
          var _0x38fd34 = _0x13f446[_0x1af3(983, "ZLJN")][_0x1af3(1141, "WHhC")]("|");
          var _0x4d69d4 = 0;
          while (true) {
            switch (_0x38fd34[_0x4d69d4++]) {
              case "0":
                var _0x139ff9;
                continue;
              case "1":
                _0x3906c5[_0x1af3(676, "ev^0")][_0x1af3(1040, "VLso")](_0x139ff9);
                continue;
              case "2":
                var _0xae1607 = _0x2c93a5.parse(_0x3c40f7.body);
                continue;
              case "3":
                if (_0x13f446[_0x1af3(906, "D$nc")](_0xae1607[_0x1af3(781, "D$nc")], 200) && _0x13f446[_0x1af3(711, "^8xB")](_0xae1607[_0x1af3(503, "^8xB")], _0x13f446.NUjfC) && _0x13f446[_0x1af3(754, "A5KE")](_0xae1607.success, true)) {
                  _0x139ff9 = _0xae1607[_0x1af3(1074, "V6TA")][_0x1af3(604, "wD@&")];
                  if (_0x139ff9 == "\u6210\u529F") {
                    _0x139ff9 = _0x1af3(641, "^8xB") + _0x139ff9;
                  } else {
                    if (_0x13f446[_0x1af3(906, "D$nc")](_0x139ff9, _0x13f446[_0x1af3(984, "GLl^")])) {
                      _0x139ff9 = "\uD83D\uDFE2\u60CA\u559C\u4EFB\u52A1: " + _0x139ff9;
                    } else {
                      if (_0x53d6da[_0x1af3(1131, "]H@f")](_0x139ff9, "\u7528\u6237\u672A\u767B\u5F55")) {
                        _0x139ff9 = "\uD83D\uDD34\u60CA\u559C\u4EFB\u52A1: " + _0x139ff9;
                      } else {
                        _0x139ff9 = _0x1af3(911, "wD@&") + _0x139ff9;
                      }
                    }
                  }
                } else {
                  _0x139ff9 = "\u274C\u60CA\u559C\u4EFB\u52A1: \u9519\u8BEF!";
                  _0x143f54[_0x1af3(821, "WHhC")](_0x3c40f7.body);
                }
                continue;
              case "4":
                _0x3c8fce[_0x1af3(1162, "wD@&")](_0x13f446[_0x1af3(550, "NMCk")]);
                continue;
              case "5":
                _0x32e41d[_0x1af3(1139, "OEp)")](_0x139ff9);
                continue;
            }
            break;
          }
        });
      } else {
        _0x198ce1 = "\u274C\u8865\u9886\u5B9D\u7BB1: \u9519\u8BEF!";
        $.log(_0x35e2e6[_0x1af3(611, "b$%k")]);
      }
    }
    $[_0x1af3(1047, "&1^T")](_0x198ce1);
    $[_0x1af3(822, "GLl^")][_0x1af3(750, "7ra)")](_0x198ce1);
  });
}
async function getAsset(_0xbd8d85, _0xea7c50) {
  var _0x3df5f4 = {
    "kuhYS": _0x1af3(791, "Oghd"),
    "bkzya": function (_0x7b110b, _0x297942) {
      return _0x7b110b == _0x297942;
    },
    "AGamr": _0x1af3(496, "BOoU"),
    "dBBsZ": _0x1af3(1132, "4dMH"),
    "DMhWM": function (_0x257a6c, _0x755a22) {
      return _0x257a6c == _0x755a22;
    },
    "eHUSM": _0x1af3(1060, "(Gll"),
    "KTjBe": _0x1af3(851, "ZLJN"),
    "fuLKZ": _0x1af3(497, "I1wH"),
    "zCWIs": _0x1af3(830, "7ra)"),
    "uxJlU": function (_0x4f3511, _0x4090d8) {
      return _0x4f3511 != _0x4090d8;
    },
    "uITvk": _0x1af3(512, "m4bk"),
    "SqFpc": _0x1af3(1022, "!CVc")
  };
  let _0x3a0f18 = {
    "url": _0x1af3(1035, "Oghd") + _0xbd8d85 + "&loginSid=" + _0xea7c50,
    "headers": kw_headers
  };
  return $[_0x1af3(854, "Ep6z")][_0x1af3(679, "NMCk")](_0x3a0f18).then(_0x4f0850 => {
    var _0x1625eb = {
      "jtAMP": function (_0x3b3591, _0x5af62a) {
        return _0x3b3591 == _0x5af62a;
      },
      "Ugocs": _0x3df5f4[_0x1af3(535, "Oghd")],
      "eBtPL": function (_0xa1001a, _0x11da5d) {
        return _0x3df5f4[_0x1af3(499, "GP06")](_0xa1001a, _0x11da5d);
      },
      "khxvR": _0x3df5f4[_0x1af3(572, "#m3$")],
      "AFEgo": _0x3df5f4[_0x1af3(775, "^8xB")],
      "UsOeg": function (_0x1631b0, _0x5a67b7) {
        return _0x3df5f4[_0x1af3(994, "EF0Q")](_0x1631b0, _0x5a67b7);
      },
      "PsgyZ": function (_0xafe567, _0x9d2839) {
        return _0xafe567 == _0x9d2839;
      }
    };
    $[_0x1af3(970, "^8xB")](_0x3df5f4[_0x1af3(929, "Ep6z")]);
    var _0x407af3;
    var _0x2668bd = JSON.parse(_0x4f0850[_0x1af3(758, "axr]")]);
    if (_0x3df5f4[_0x1af3(590, "&1^T")](_0x2668bd.code, 200) && _0x3df5f4[_0x1af3(1146, "f%zU")](_0x2668bd[_0x1af3(1140, "Z^Uc")], _0x3df5f4.KTjBe) && _0x3df5f4[_0x1af3(1091, "WHhC")](_0x2668bd.success, true)) {
      if (_0x3df5f4.fuLKZ === _0x3df5f4[_0x1af3(947, "f%zU")]) {
        _0x52b81a = _0xff40ea[_0x1af3(1119, "#Ead")].description;
        if (_0x53cbd9 == "\u6210\u529F") {
          _0x3abd10 = "\uD83C\uDF89\u6BCF\u65E5\u7B7E\u5230: " + _0x2661e6;
        } else {
          if (_0x208d4c == _0x1625eb[_0x1af3(825, "AR2*")]) {
            _0x49d197 = _0x1af3(907, "Zn(7") + _0x3fa602;
          } else {
            if (_0x1625eb[_0x1af3(986, "GLl^")](_0x55b756, _0x1625eb[_0x1af3(581, "3Jpx")])) {
              _0x42b62c = _0x1af3(577, "WHhC") + _0xf60ef0;
            } else {
              if (_0x1625eb[_0x1af3(804, "V6TA")](_0x11f111, _0x1625eb[_0x1af3(544, "sJnr")])) {
                _0x4f4f70 = "\uD83D\uDFE2\u6BCF\u65E5\u7B7E\u5230: " + _0x3df70a;
              } else {
                _0xc7e5f0 = _0x1af3(1003, "WHhC") + _0x486581;
              }
            }
          }
        }
      } else {
        let _0x5bcbef = _0x2668bd[_0x1af3(936, "ZLJN")][_0x1af3(979, "O*Ta")] ? _0x2668bd[_0x1af3(1122, "GLl^")][_0x1af3(547, "3Jpx")] : 0;
        if (_0x5bcbef != 0) {
          let _0x2866a3 = (_0x5bcbef / 10000)[_0x1af3(477, "F$Cw")](2);
          _0x407af3 = "\uD83D\uDCB0" + _0x5bcbef + " --> \uD83D\uDCB4" + _0x2866a3 + " CNY";
        } else {
          _0x407af3 = _0x1af3(516, "b$%k");
        }
      }
    } else {
      if (_0x3df5f4.uITvk === _0x3df5f4.SqFpc) {
        _0x5b4dbd = _0x307962.data[_0x1af3(712, "&1^T")];
        if (_0x1625eb[_0x1af3(591, "#!p6")](_0x55bedc, "\u6210\u529F")) {
          _0x36d3d7 = _0x1af3(783, "b$%k") + _0x3879aa;
        } else {
          if (_0x1625eb[_0x1af3(498, "kUfW")](_0x5f383c, _0x1625eb.Ugocs)) {
            _0x1e8903 = _0x1af3(799, "F$Cw") + _0x1f50d4;
          } else {
            if (_0x1625eb[_0x1af3(508, "EF0Q")](_0x1fd659, _0x1af3(1017, "I1wH"))) {
              _0x1242b3 = _0x1af3(913, "#m3$") + _0xd3d65;
            } else {
              _0x3b8b9c = "\u26A0\uFE0F\u60CA\u559C\u4EFB\u52A1: " + _0x3888f2;
            }
          }
        }
      } else {
        _0x407af3 = _0x1af3(980, "*Z6(");
      }
    }
    $[_0x1af3(731, "!CVc")](_0x407af3);
    return _0x407af3;
  });
}
function Env(t, s) {
  class e {
    constructor(t) {
      this.env = t;
    }
    send(t, s = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let e = this.get;
      if ("POST" === s) {
        e = this.post;
      }
      return new Promise((s, i) => {
        e.call(this, t, (t, e, r) => {
          if (t) {
            i(t);
          } else {
            s(e);
          }
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
    constructor(t, s) {
      this.name = t;
      this.http = new e(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, s);
      this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $environment && $environment["surge-version"];
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    isShadowrocket() {
      return "undefined" != typeof $rocket;
    }
    isStash() {
      return "undefined" != typeof $environment && $environment["stash-version"];
    }
    toObj(t, s = null) {
      try {
        return JSON.parse(t);
      } catch {
        return s;
      }
    }
    toStr(t, s = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return s;
      }
    }
    getjson(t, s) {
      let e = s;
      const i = this.getdata(t);
      if (i) {
        try {
          e = JSON.parse(this.getdata(t));
        } catch {}
      }
      return e;
    }
    setjson(t, s) {
      try {
        return this.setdata(JSON.stringify(t), s);
      } catch {
        return false;
      }
    }
    getScript(t) {
      return new Promise(s => {
        this.get({
          url: t
        }, (t, e, i) => s(i));
      });
    }
    runScript(t, s) {
      return new Promise(e => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = s && s.timeout ? s.timeout : r;
        const [o, h] = i.split("@");
        const a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          },
          timeout: r
        };
        this.post(a, (t, s, i) => e(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile);
        const s = this.path.resolve(process.cwd(), this.dataFile);
        const e = this.fs.existsSync(t);
        const i = !e && this.fs.existsSync(s);
        if (!e && !i) {
          return {};
        }
        {
          const i = e ? t : s;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile);
        const s = this.path.resolve(process.cwd(), this.dataFile);
        const e = this.fs.existsSync(t);
        const i = !e && this.fs.existsSync(s);
        const r = JSON.stringify(this.data);
        if (e) {
          this.fs.writeFileSync(t, r);
        } else if (i) {
          this.fs.writeFileSync(s, r);
        } else {
          this.fs.writeFileSync(t, r);
        }
      }
    }
    lodash_get(t, s, e) {
      const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) {
        r = Object(r)[t];
        if (undefined === r) {
          return e;
        }
      }
      return r;
    }
    lodash_set(t, s, e) {
      return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), s.slice(0, -1).reduce((t, e, i) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}, t)[s[s.length - 1]] = e, t);
    }
    getdata(t) {
      let s = this.getval(t);
      if (/^@/.test(t)) {
        const [, e, i] = /^@(.*?)\.(.*?)$/.exec(t);
        const r = e ? this.getval(e) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            s = t ? this.lodash_get(t, i, "") : s;
          } catch (t) {
            s = "";
          }
        }
      }
      return s;
    }
    setdata(t, s) {
      let e = false;
      if (/^@/.test(s)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(s);
        const o = this.getval(i);
        const h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const s = JSON.parse(h);
          this.lodash_set(s, r, t);
          e = this.setval(JSON.stringify(s), i);
        } catch (s) {
          const o = {};
          this.lodash_set(o, r, t);
          e = this.setval(JSON.stringify(o), i);
        }
      } else {
        e = this.setval(t, s);
      }
      return e;
    }
    getval(t) {
      return this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, s) {
      return this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = t, this.writedata(), true) : this.data && this.data[s] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      if (t) {
        t.headers = t.headers ? t.headers : {};
        if (undefined === t.headers.Cookie && undefined === t.cookieJar) {
          t.cookieJar = this.ckjar;
        }
      }
    }
    get(t, s = () => {}) {
      if (t.headers) {
        delete t.headers["Content-Type"];
        delete t.headers["Content-Length"];
      }
      if (this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash()) {
        if (this.isSurge() && this.isNeedRewrite) {
          t.headers = t.headers || {};
          Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": false
          });
        }
        $httpClient.get(t, (t, e, i) => {
          if (!t && e) {
            e.body = i;
            e.statusCode = e.status ? e.status : e.statusCode;
            e.status = e.statusCode;
          }
          s(t, e, i);
        });
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          t.opts = t.opts || {};
          Object.assign(t.opts, {
            hints: false
          });
        }
        $task.fetch(t).then(t => {
          const {
            statusCode: e,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          s(null, {
            status: e,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => s(t && t.error || "UndefinedError"));
      } else if (this.isNode()) {
        let e = require("iconv-lite");
        this.initGotEnv(t);
        this.got(t).on("redirect", (t, s) => {
          try {
            if (t.headers["set-cookie"]) {
              const e = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
              if (e) {
                this.ckjar.setCookieSync(e, null);
              }
              s.cookieJar = this.ckjar;
            }
          } catch (t) {
            this.logErr(t);
          }
        }).then(t => {
          const {
            statusCode: i,
            statusCode: r,
            headers: o,
            rawBody: h
          } = t;
          const a = e.decode(h, this.encoding);
          s(null, {
            status: i,
            statusCode: r,
            headers: o,
            rawBody: h,
            body: a
          }, a);
        }, t => {
          const {
            message: i,
            response: r
          } = t;
          s(i, r, r && e.decode(r.rawBody, this.encoding));
        });
      }
    }
    post(t, s = () => {}) {
      const e = t.method ? t.method.toLocaleLowerCase() : "post";
      if (t.body && t.headers && !t.headers["Content-Type"]) {
        t.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (t.headers) {
        delete t.headers["Content-Length"];
      }
      if (this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash()) {
        if (this.isSurge() && this.isNeedRewrite) {
          t.headers = t.headers || {};
          Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": false
          });
        }
        $httpClient[e](t, (t, e, i) => {
          if (!t && e) {
            e.body = i;
            e.statusCode = e.status ? e.status : e.statusCode;
            e.status = e.statusCode;
          }
          s(t, e, i);
        });
      } else if (this.isQuanX()) {
        t.method = e;
        if (this.isNeedRewrite) {
          t.opts = t.opts || {};
          Object.assign(t.opts, {
            hints: false
          });
        }
        $task.fetch(t).then(t => {
          const {
            statusCode: e,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          s(null, {
            status: e,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => s(t && t.error || "UndefinedError"));
      } else if (this.isNode()) {
        let i = require("iconv-lite");
        this.initGotEnv(t);
        const {
          url: r,
          ...o
        } = t;
        this.got[e](r, o).then(t => {
          const {
            statusCode: e,
            statusCode: r,
            headers: o,
            rawBody: h
          } = t;
          const a = i.decode(h, this.encoding);
          s(null, {
            status: e,
            statusCode: r,
            headers: o,
            rawBody: h,
            body: a
          }, a);
        }, t => {
          const {
            message: e,
            response: r
          } = t;
          s(e, r, r && i.decode(r.rawBody, this.encoding));
        });
      }
    }
    time(t, s = null) {
      const e = s ? new Date(s) : new Date();
      let i = {
        "M+": e.getMonth() + 1,
        "d+": e.getDate(),
        "H+": e.getHours(),
        "m+": e.getMinutes(),
        "s+": e.getSeconds(),
        "q+": Math.floor((e.getMonth() + 3) / 3),
        S: e.getMilliseconds()
      };
      if (/(y+)/.test(t)) {
        t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let s in i) if (new RegExp("(" + s + ")").test(t)) {
        t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[s] : ("00" + i[s]).substr(("" + i[s]).length));
      }
      return t;
    }
    queryStr(t) {
      let s = "";
      for (const e in t) {
        let i = t[e];
        if (null != i && "" !== i) {
          if ("object" == typeof i) {
            i = JSON.stringify(i);
          }
          s += `${e}=${i}&`;
        }
      }
      s = s.substring(0, s.length - 1);
      return s;
    }
    msg(s = t, e = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() || this.isShadowrocket() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() || this.isStash() ? {
            url: t
          } : undefined;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let s = t.openUrl || t.url || t["open-url"];
            let e = t.mediaUrl || t["media-url"];
            return {
              openUrl: s,
              mediaUrl: e
            };
          }
          if (this.isQuanX()) {
            let s = t["open-url"] || t.url || t.openUrl;
            let e = t["media-url"] || t.mediaUrl;
            let i = t["update-pasteboard"] || t.updatePasteboard;
            return {
              "open-url": s,
              "media-url": e,
              "update-pasteboard": i
            };
          }
          if (this.isSurge() || this.isShadowrocket() || this.isStash()) {
            let s = t.url || t.openUrl || t["open-url"];
            return {
              url: s
            };
          }
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isShadowrocket() || this.isLoon() || this.isStash()) {
          $notification.post(s, e, i, o(r));
        } else if (this.isQuanX()) {
          $notify(s, e, i, o(r));
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============\uD83D\uDCE3\u7CFB\u7EDF\u901A\u77E5\uD83D\uDCE3=============="];
        t.push(s);
        if (e) {
          t.push(e);
        }
        if (i) {
          t.push(i);
        }
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      if (t.length > 0) {
        this.logs = [...this.logs, ...t];
      }
      console.log(t.join(this.logSeparator));
    }
    logErr(t, s) {
      const e = !(this.isSurge() || this.isShadowrocket() || this.isQuanX() || this.isLoon() || this.isStash());
      if (e) {
        this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack);
      } else {
        this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t);
      }
    }
    wait(t) {
      return new Promise(s => setTimeout(s, t));
    }
    done(t = {}) {
      const s = new Date().getTime();
      const e = (s - this.startTime) / 1000;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`);
      this.log();
      if (this.isSurge() || this.isShadowrocket() || this.isQuanX() || this.isLoon() || this.isStash()) {
        $done(t);
      } else if (this.isNode()) {
        process.exit(1);
      }
    }
  }(t, s);
}