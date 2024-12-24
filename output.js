//Tue Dec 24 2024 10:26:02 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let chxm1024 = {};
let chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || "{}");
const headers = $request.headers;
const ua = headers["User-Agent"] || headers["user-agent"];
const bundle_id = headers["X-Client-Bundle-ID"] || headers["x-client-bundle-id"];
const forbiddenApps = ["Fileball", "APTV"];
const forbiddenAppFound = forbiddenApps.find(appName => ua && ua.includes(appName) || $request.body && $request.body.includes(appName));
if (forbiddenAppFound) {
  console.log(`发现禁止MITM的APP: ${forbiddenAppFound}，已停止运行脚本！`);
  $done({});
}
const bundle = {
  TeleprompterX: {
    name: "Pro Upgrade",
    id: "TPXOTP",
    cm: "sjb"
  }
};
const listua = {
  OneTap: {
    name: "pro",
    id: "DiscountedProLifetime",
    cm: "sjb"
  },
  Spark: {
    name: "premium",
    id: "spark_5999_1y_1w0",
    nameb: "premium",
    idb: "spark_openai_tokens_4xt",
    cm: "sja"
  }
};
var encode_version = "jsjiami.com.v5";
if (typeof $response === "undefined") {
  delete headers["x-revenuecat-etag"];
  delete headers["X-RevenueCat-ETag"];
  chxm1024.headers = headers;
  console.log("已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023");
  $done(chxm1024);
} else {
  const timea = {
    purchase_date: "2024-09-09T09:09:09Z",
    expires_date: "2099-09-09T09:09:09Z"
  };
  const timeb = {
    original_purchase_date: "2024-09-09T09:09:09Z",
    is_sandbox: false,
    store_transaction_id: "490001314520000",
    store: "app_store",
    ownership_type: "PURCHASED"
  };
  let name;
  let nameb;
  let ids;
  let idb;
  let data;
  let anchor = false;
  for (const src of [listua, bundle]) {
    for (const i in src) {
      const test = src === listua ? ua : bundle_id;
      if (new RegExp("^" + i, "i").test(test)) {
        if (src[i].cm.includes("sja")) {
          data = timea;
          anchor = true;
        } else {
          if (src[i].cm.includes("sjb")) {
            data = {
              purchase_date: "2024-09-09T09:09:09Z"
            };
            anchor = true;
          } else {
            if (src[i].cm.includes("sjc")) {
              data = timea;
              anchor = false;
            }
          }
        }
        ids = src[i].id;
        name = src[i].name || "";
        idb = src[i].idb;
        nameb = src[i].nameb;
        break;
      }
    }
    if (ids) {
      break;
    }
  }
  const fetchProductEntitlements = function () {
    const _0x2d4713 = {
      url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
      headers: headers
    };
    return new Promise((_0xb1cda, _0x11e439) => {
      {
        const _0x155d26 = typeof $task !== "undefined";
        const _0x5b5168 = typeof $httpClient !== "undefined";
        const _0x1c5e58 = typeof $rocket !== "undefined";
        if (_0x155d26) {
          $task.fetch(_0x2d4713).then(_0xb1cda).catch(_0x11e439);
        } else {
          if (_0x5b5168) {
            $httpClient.get(_0x2d4713, (_0x3c9540, _0xf33880, _0x179581) => {
              {
                if (_0x3c9540) {
                  _0x11e439(_0x3c9540);
                } else {
                  _0xb1cda(Object.assign(_0xf33880, {
                    body: _0x179581
                  }));
                }
              }
            });
          } else {
            if (_0x1c5e58) {
              $rocket.fetch(_0x2d4713, (_0x5a4f0e, _0x473ada, _0x24a829) => {
                {
                  if (_0x5a4f0e) {
                    _0x11e439(_0x5a4f0e);
                  } else {
                    _0xb1cda(Object.assign(_0x473ada, {
                      body: _0x24a829
                    }));
                  }
                }
              });
            } else {
              _0x11e439("不支持的代理工具");
            }
          }
        }
      }
    });
  };
  const updateEntitlements = function (_0x4695a8 = "", _0x142fec = "", _0x163046 = "", _0x278e78 = false) {
    const _0x5c7276 = name || _0x4695a8;
    const _0x2a6aaf = ids || _0x142fec;
    const _0x536c7b = data || timea;
    const _0x3ec49b = Object.assign({}, _0x536c7b, timeb);
    if (!_0x163046) {
      chxm1023.subscriber.non_subscriptions = Object.assign(chxm1023.subscriber.non_subscriptions || {}, {
        [_0x2a6aaf]: [Object.assign({}, {
          id: "888888888"
        }, _0x3ec49b)]
      });
      chxm1023.subscriber.other_purchases = Object.assign(chxm1023.subscriber.other_purchases || {}, {
        [_0x2a6aaf]: _0x536c7b
      });
    }
    if (!_0x278e78) {
      {
        chxm1023.subscriber.entitlements = Object.assign(chxm1023.subscriber.entitlements || {}, {
          [_0x5c7276]: Object.assign({}, _0x536c7b, {
            product_identifier: _0x2a6aaf
          })
        });
      }
    }
    chxm1023.subscriber.subscriptions = Object.assign(chxm1023.subscriber.subscriptions || {}, {
      [_0x2a6aaf]: _0x3ec49b
    });
    if (idb && nameb && !_0x278e78) {
      chxm1023.subscriber.entitlements = Object.assign(chxm1023.subscriber.entitlements, {
        [nameb]: Object.assign({}, _0x536c7b, {
          product_identifier: idb
        })
      });
      chxm1023.subscriber.subscriptions = Object.assign(chxm1023.subscriber.subscriptions, {
        [idb]: _0x3ec49b
      });
    }
  };
  const finalizeScript = function () {
    chxm1024.body = JSON.stringify(chxm1023);
    console.log("已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023");
    $done(chxm1024);
  };
  const fallbackSolution = function () {
    console.log("主逻辑执行失败，正在执行备用方案...");
    const _0x11a5b6 = "pro";
    const _0x59f205 = "com.chxm1023.pro";
    updateEntitlements(_0x11a5b6, _0x59f205, anchor);
    finalizeScript();
  };
  fetchProductEntitlements().then(_0x54c32c => {
    const _0x31e70e = JSON.parse(_0x54c32c.body);
    const _0xb82611 = _0x31e70e.product_entitlement_mapping;
    let _0x317c0e = false;
    if (!_0xb82611 || Object.keys(_0xb82611).length === 0) {
      console.log("主逻辑返回的数据无效，执行备用方案...");
      fallbackSolution();
      _0x317c0e = true;
    }
    if (!_0x317c0e) {
      for (const [_0x33e544, _0x259629] of Object.entries(_0xb82611)) {
        const _0x3e504c = _0x259629.product_identifier;
        const _0xac9a17 = _0x259629.entitlements;
        if (_0xac9a17.length === 0) {
          {
            updateEntitlements("", _0x3e504c, anchor, true);
          }
        } else {
          {
            for (const _0x128542 of _0xac9a17) {
              updateEntitlements(_0x128542, _0x3e504c, anchor, false);
            }
          }
        }
      }
      finalizeScript();
    }
  }).catch(_0x25238e => {
    console.log("Error:", _0x25238e);
    if (/^https:\/\/api\.revenuecat\.com\/v1\/subscribers\/[^\/]+\/(offerings|attributes|adservices_attribution)$/.test($request.url)) {
      {
        console.log("检测到屏蔽的URL，已跳过脚本执行。");
        $done({});
      }
    } else {
      fallbackSolution();
    }
  });
}
(function (_0x398233, _0xa9c0e7, _0x3e27a3) {
  var _0x499dcf = function () {
    var _0x4b1782 = true;
    return function (_0x4c641e, _0x415bc0) {
      var _0x3db240 = _0x4b1782 ? function () {
        if (_0x415bc0) {
          var _0x5a6bc3 = _0x415bc0.apply(_0x4c641e, arguments);
          _0x415bc0 = null;
          return _0x5a6bc3;
        }
      } : function () {};
      _0x4b1782 = false;
      return _0x3db240;
    };
  }();
  var _0x2e9b49 = _0x499dcf(this, function () {
    var _0x45f5e2 = function () {
      return "dev";
    };
    var _0x164b96 = function () {
      return "window";
    };
    var _0x33b920 = function () {
      var _0x1bee75 = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
      return !_0x1bee75.test(_0x45f5e2.toString());
    };
    var _0x1fd240 = function () {
      var _0x16e7b9 = new RegExp("(\\\\[x|u](\\w){2,4})+");
      return _0x16e7b9.test(_0x164b96.toString());
    };
    var _0x5b29a9 = function (_0x1c4aff) {
      var _0x2f8812 = 0 >> 1 + NaN;
      if (_0x1c4aff.indexOf("i" === _0x2f8812)) {
        _0xb02ffc(_0x1c4aff);
      }
    };
    var _0xb02ffc = function (_0x110540) {
      var _0x1ea509 = 3 >> 1 + NaN;
      if (_0x110540.indexOf("true"[3]) !== _0x1ea509) {
        _0x5b29a9(_0x110540);
      }
    };
    if (!_0x33b920()) {
      if (!_0x1fd240()) {
        _0x5b29a9("indеxOf");
      } else {
        _0x5b29a9("indexOf");
      }
    } else {
      _0x5b29a9("indеxOf");
    }
  });
  _0x2e9b49();
  _0x3e27a3 = "al";
  try {
    _0x3e27a3 += "ert";
    _0xa9c0e7 = encode_version;
    if (!(typeof _0xa9c0e7 !== "undefined" && _0xa9c0e7 === "jsjiami.com.v5")) {
      _0x398233[_0x3e27a3]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x2fabc7) {
    _0x398233[_0x3e27a3]("删除版本号，js会定期弹窗");
  }
})(window);
encode_version = "jsjiami.com.v5";