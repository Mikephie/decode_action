//2025-09-03T04:56:29.847Z
//解密脚本在此
var _0x57cd62 = {
  "parseJSON": function (_0x1949d0) {
    try {
      return JSON.parse(_0x1949d0);
    } catch (_0x19ab6e) {
      return null;
    }
  },
  "formatDuration": function (_0x74e787) {
    if (!_0x74e787 || isNaN(_0x74e787)) return "未知";
    var _0x63bf29 = Math.floor(_0x74e787 / 1000);
    var _0x2c2958 = Math.floor(_0x63bf29 / 60);
    _0x63bf29 = _0x63bf29 % 60;
    return _0x2c2958 + ":" + (_0x63bf29 < 10 ? "0" + _0x63bf29 : _0x63bf29);
  },
  "flatten": function (_0x33b240) {
    var _0x3c3c2c = [];
    for (var _0x296218 = 0; _0x296218 < _0x33b240.length; _0x296218++) {
      if (_0x33b240[_0x296218] && _0x33b240[_0x296218].length) _0x3c3c2c = _0x3c3c2c.concat(_0x33b240[_0x296218]);
    }
    return _0x3c3c2c;
  },
  "extractDurl": function (_0x5c66ce) {
    var _0x28f05b = _0x5c66ce.result || {};
    var _0x4069e9 = _0x28f05b.durl || [];
    var _0x2f8ff3 = _0x28f05b.timelength || 0;
    if (_0x4069e9.length === 0 || !_0x4069e9[0].url) return null;
    var _0x2b13ef = _0x4069e9[0];
    return {
      "mainUrl": _0x2b13ef.url,
      "backupUrls": _0x2b13ef.backup_url || [],
      "size": _0x2b13ef.size ? (_0x2b13ef.size / 1024 / 1024).toFixed(2) + "MB" : "未知大小",
      "duration": this.formatDuration(_0x2f8ff3)
    };
  },
  "isBiliVideoRequest": function (_0x1779d2) {
    return /https?:\/\/.*bilivideo\.(com|cn).*\/upgcxcode\/.*\.(m4s|flv|mp4|ts)/i.test(_0x1779d2);
  }
};
var _0x4fffa7 = {
  "VIDEO_HEADERS": {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    "Referer": "https://www.bilibili.com/",
    "Origin": "https://www.bilibili.com"
  },
  "PLAYURL_API_HEADERS": {
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "origin": "https://www.bilibili.com",
    "referer": "https://www.bilibili.com/",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  },
  "getSeasonUrl": function (_0x30f4e6) {
    return "https://api.bilibili.com/pgc/view/web/season?ep_id=" + _0x30f4e6;
  },
  "getPlayUrl": function (_0x38bae0, _0x5362d6, _0x2b3a37, _0x709e25) {
    return "https://api.bilibili.com/pgc/player/web/playurl?avid=" + _0x38bae0 + "&cid=" + _0x5362d6 + "&ep_id=" + _0x2b3a37 + "&season_id=" + _0x709e25 + "&qn=64&fnver=0&fnval=0&platform=web";
  },
  "getCookie": function () {
    return "DedeUserID=3546800843655499; DedeUserID__ckMd5=3592173e401f4566; SESSDATA=cc027d01%2C1772026875%2Cd6d76a82CjC6YAdmucu53FE7m1XZp58VYli4tvi15Deqs8uzsHOlm9V3c921Ds0vtj19-Qys68sSVlVoZEw4OU5EWU5uZ0I1MjBFZVc5a0tUdFRoc05jbmFadVVuVktCR2o5MzBfODd4UjdwaE4wQ1V1WXc1dzZRMlpLTVdBY0p1VWtjTnRfTnk3T0ZTMldnIIEC; bili_jct=b159c0f5c213f70891dc71d577e4fb1c; sid=7jsy1b86";
  }
};
var _0x4cc1b7 = {
  "getEpId": function (_0x52a334) {
    var _0x4eee7f = _0x57cd62.parseJSON(_0x52a334);
    if (!_0x4eee7f || !_0x4eee7f.data || !_0x4eee7f.data.content) {
      return null;
    }
    var _0x43a3ff = _0x4eee7f.data.content.match(/ep(\d+)/);
    if (!_0x43a3ff || !_0x43a3ff[1]) {
      return null;
    }
    return _0x43a3ff[1];
  },
  "getPlayParams": function (_0x1bea66, _0x474ca6) {
    _0x4a6e74.request({
      "url": _0x4fffa7.getSeasonUrl(_0x1bea66),
      "method": "GET",
      "headers": {
        "User-Agent": _0x4fffa7.VIDEO_HEADERS["User-Agent"]
      }
    }, function (_0x4ab285) {
      {
        if (_0x4ab285.status !== 200) {
          _0x474ca6(null, "番剧接口错误（状态码：" + _0x4ab285.status + "）");
          return;
        }
        var _0xad282e = _0x57cd62.parseJSON(_0x4ab285.body);
        if (!_0xad282e || _0xad282e.code !== 0 || !_0xad282e.result) {
          _0x474ca6(null, "番剧数据错误：" + (_0xad282e ? _0xad282e.message : "无返回数据"));
          return;
        }
        var _0xa639d4 = null;
        var _0x488610 = Number(_0x1bea66);
        if (_0xad282e.result.episodes && _0xad282e.result.episodes.length) {
          {
            _0xa639d4 = _0xad282e.result.episodes.find(_0x2bdaac => _0x2bdaac.ep_id === _0x488610);
          }
        }
        if (!_0xa639d4 && _0xad282e.result.section) {
          var _0x435062 = _0x57cd62.flatten(_0xad282e.result.section.map(_0x490733 => _0x490733.episodes));
          _0xa639d4 = _0x435062.find(_0x47b917 => _0x47b917 && _0x47b917.ep_id === _0x488610);
        }
        if (!_0xa639d4) {
          _0x474ca6(null, "未找到 EP" + _0x1bea66 + " 的剧集数据");
          return;
        }
        _0x474ca6({
          "avid": _0xa639d4.aid || "",
          "cid": _0xa639d4.cid || "",
          "seasonId": _0xad282e.result.season_id || "",
          "seasonTitle": _0xad282e.result.season_title || "未知番剧",
          "epTitle": _0xa639d4.show_title || _0xa639d4.title || "未知集数"
        }, null);
      }
    }, function (_0x3a800c) {
      _0x474ca6(null, "获取番剧参数失败：" + _0x3a800c);
    });
  },
  "getDurlUrls": function (_0x517c4a, _0x53287a, _0x56c837) {
    var _0x1f84e7 = Object.assign({}, _0x4fffa7.PLAYURL_API_HEADERS);
    _0x1f84e7.Cookie = _0x4fffa7.getCookie();
    _0x4a6e74.request({
      "url": _0x4fffa7.getPlayUrl(_0x517c4a.avid, _0x517c4a.cid, _0x53287a, _0x517c4a.seasonId),
      "method": "GET",
      "headers": _0x1f84e7
    }, function (_0x5584a2) {
      if (_0x5584a2.status !== 200) {
        {
          _0x56c837(null, "播放地址接口错误（" + _0x5584a2.status + "）→ 大概率 Cookie 失效");
          return;
        }
      }
      var _0x5cc00b = _0x57cd62.parseJSON(_0x5584a2.body);
      if (!_0x5cc00b || _0x5cc00b.code !== 0 || !_0x5cc00b.result) {
        {
          _0x56c837(null, "播放地址数据错误：" + (_0x5cc00b ? _0x5cc00b.message : "格式异常"));
          return;
        }
      }
      var _0x8f1e00 = _0x57cd62.extractDurl(_0x5cc00b);
      if (!_0x8f1e00) {
        {
          _0x56c837(null, "未找到有效播放地址（durl 为空）");
          return;
        }
      }
      _0x56c837({
        "seasonTitle": _0x517c4a.seasonTitle,
        "epTitle": _0x517c4a.epTitle,
        "mainUrl": _0x8f1e00.mainUrl,
        "backupUrls": _0x8f1e00.backupUrls,
        "size": _0x8f1e00.size,
        "duration": _0x8f1e00.duration
      }, null);
    }, function (_0x444a0f) {
      _0x56c837(null, "网络请求失败：" + _0x444a0f);
    });
  },
  "sendNotify": function (_0x5547cd, _0x2ad8b7) {
    var _0x2f6f9c = "【番剧名称】" + _0x5547cd.seasonTitle + "\n" + ("【当前集数】" + _0x5547cd.epTitle + "\n") + ("【规格】" + _0x5547cd.size + " | 时长 " + _0x5547cd.duration);
    _0x4a6e74.notify("Bilibili 播放地址提取成功（EP" + _0x2ad8b7 + "）", "720P 清晰度", _0x2f6f9c);
  }
};
var _0x4a6e74 = {
  "getEnv": function () {
    if (typeof $task !== "undefined") return "qx";
    if (typeof $httpClient !== "undefined") {
      {
        return typeof $surge !== "undefined" ? "surge" : "loon";
      }
    }
    return "unknown";
  },
  "request": function (_0x24269b, _0xddab02, _0x47de1c) {
    _0x24269b.headers = _0x24269b.headers || {};
    _0x24269b.headers.Referer = "https://www.bilibili.com/";
    var _0x38664f = this.getEnv();
    if (_0x38664f === "qx") {
      {
        $task.fetch(_0x24269b).then(_0x1eec01 => _0xddab02({
          "status": _0x1eec01.statusCode,
          "body": _0x1eec01.body
        }), _0x156214 => _0x47de1c("QX 请求错误：" + _0x156214.message));
      }
    } else if (_0x38664f === "surge" || _0x38664f === "loon") {
      var _0x4817ca = (_0x24269b.method || "GET").toLowerCase();
      $httpClient[_0x4817ca](_0x24269b, (_0xa858a8, _0x55943f, _0x274f4f) => {
        {
          if (_0xa858a8) _0x47de1c((_0x38664f === "surge" ? "Surge" : "Loon") + " 请求错误：" + _0xa858a8);else _0xddab02({
            "status": _0x55943f.status,
            "body": _0x274f4f
          });
        }
      });
    } else {
      {
        _0x47de1c("不支持当前工具（仅适配 Loon/Surge/Quantumult X）");
      }
    }
  },
  "notify": function (_0x2aa8cc, _0x3f3ba6, _0x5637f8) {
    var _0x393695 = this.getEnv();
    if (_0x393695 === "qx") $notify(_0x2aa8cc, _0x3f3ba6, _0x5637f8);
    if (_0x393695 === "surge" || _0x393695 === "loon") $notification.post(_0x2aa8cc, _0x3f3ba6, _0x5637f8);
  },
  "done": function (_0x167c5a) {
    if (this.getEnv() === "qx" && typeof $done !== "undefined") $done(_0x167c5a || {});
  },
  "run": function () {
    var _0xa0ccaa = this.getEnv();
    if (typeof $request !== "undefined" && _0x57cd62.isBiliVideoRequest($request.url)) {
      {
        let _0x4665ac = $request.headers || {};
        for (let _0x1f8d27 in _0x4fffa7.VIDEO_HEADERS) {
          _0x4665ac[_0x1f8d27] = _0x4fffa7.VIDEO_HEADERS[_0x1f8d27];
        }
        if (_0xa0ccaa === "qx") {
          this.done({
            "headers": _0x4665ac
          });
        } else {
          return {
            "headers": _0x4665ac
          };
        }
        return;
      }
    }
    if (_0xa0ccaa === "qx") {
      {
        if (typeof $response === "undefined") {
          this.done();
          return;
        }
        var _0x150037 = $response.body;
        var _0x192522 = _0x4cc1b7.getEpId(_0x150037);
        if (!_0x192522) {
          {
            this.done({
              "body": _0x150037
            });
            return;
          }
        }
        _0x4cc1b7.getPlayParams(_0x192522, (_0xce6b2d, _0x46cfcf) => {
          {
            if (_0x46cfcf) {
              this.done({
                "body": _0x150037
              });
              return;
            }
            _0x4cc1b7.getDurlUrls(_0xce6b2d, _0x192522, (_0x72408a, _0x1f985c) => {
              if (_0x1f985c) {
                this.done({
                  "body": _0x150037
                });
                return;
              }
              _0x4cc1b7.sendNotify(_0x72408a, _0x192522);
              var _0x1efd70 = _0x57cd62.parseJSON(_0x150037);
              if (_0x1efd70 && _0x1efd70.data) {
                _0x1efd70.data.content = _0x72408a.mainUrl;
                this.done({
                  "body": JSON.stringify(_0x1efd70)
                });
              } else {
                this.done({
                  "body": _0x150037
                });
              }
            });
          }
        });
      }
    }
    if (_0xa0ccaa === "loon" || _0xa0ccaa === "surge") {
      {
        if (typeof $request !== "undefined" && typeof $response !== "undefined") {
          {
            const _0x5f7027 = $request.url;
            const _0x488874 = $response.body || "";
            if (_0x5f7027.includes("/x/share/click") && _0x488874) {
              var _0x3983c9 = _0x4cc1b7.getEpId(_0x488874);
              if (!_0x3983c9) return {
                "body": _0x488874
              };
              _0x4cc1b7.getPlayParams(_0x3983c9, (_0x33b5b2, _0x1cf81c) => {
                {
                  if (_0x1cf81c) {
                    $done({
                      "body": _0x488874
                    });
                    return;
                  }
                  _0x4cc1b7.getDurlUrls(_0x33b5b2, _0x3983c9, (_0x5a5d08, _0x468a8a) => {
                    if (_0x468a8a) {
                      {
                        $done({
                          "body": _0x488874
                        });
                        return;
                      }
                    }
                    _0x4cc1b7.sendNotify(_0x5a5d08, _0x3983c9);
                    var _0x124fdf = _0x57cd62.parseJSON(_0x488874);
                    if (_0x124fdf && _0x124fdf.data) {
                      _0x124fdf.data.content = _0x5a5d08.mainUrl;
                      $done({
                        "body": JSON.stringify(_0x124fdf)
                      });
                    } else {
                      $done({
                        "body": _0x488874
                      });
                    }
                  });
                }
              });
              return {
                "body": _0x488874
              };
            }
            return {
              "body": _0x488874
            };
          }
        }
      }
    }
  }
};
(function () {
  var _0x32560f = function () {
    var _0x49524b = true;
    return function (_0x40f8a4, _0xc43f2e) {
      {
        var _0x42b266 = _0x49524b ? function () {
          {
            if (_0xc43f2e) {
              {
                var _0x10f874 = _0xc43f2e.apply(_0x40f8a4, arguments);
                _0xc43f2e = null;
                return _0x10f874;
              }
            }
          }
        } : function () {
          {}
        };
        _0x49524b = false;
        return _0x42b266;
      }
    };
  }();
  var _0x359a84 = _0x32560f(this, function () {
    {
      var _0x211293 = function () {};
      var _0x1d9fdd = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
      if (!_0x1d9fdd.console) {
        _0x1d9fdd.console = function (_0x434814) {
          var _0x3da034 = {};
          _0x3da034.log = _0x434814;
          _0x3da034.warn = _0x434814;
          _0x3da034.debug = _0x434814;
          _0x3da034.info = _0x434814;
          _0x3da034.error = _0x434814;
          _0x3da034.exception = _0x434814;
          _0x3da034.trace = _0x434814;
          return _0x3da034;
        }(_0x211293);
      } else {
        {
          _0x1d9fdd.console.log = _0x211293;
          _0x1d9fdd.console.warn = _0x211293;
          _0x1d9fdd.console.debug = _0x211293;
          _0x1d9fdd.console.info = _0x211293;
          _0x1d9fdd.console.error = _0x211293;
          _0x1d9fdd.console.exception = _0x211293;
          _0x1d9fdd.console.trace = _0x211293;
        }
      }
    }
  });
  _0x359a84();
  if (typeof $request !== "undefined" && _0x57cd62.isBiliVideoRequest($request.url)) {
    {
      let _0x1558b8 = $request.headers || {};
      for (let _0x560271 in _0x4fffa7.VIDEO_HEADERS) {
        {
          _0x1558b8[_0x560271] = _0x4fffa7.VIDEO_HEADERS[_0x560271];
        }
      }
      if (typeof $done !== "undefined") {
        $done({
          "headers": _0x1558b8
        });
      } else {
        return {
          "headers": _0x1558b8
        };
      }
      return;
    }
  }
  if (typeof $response !== "undefined") {
    _0x4a6e74.run();
  }
})();
encode_version = "jsjiami.com.v5";