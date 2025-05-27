//Tue May 27 2025 12:11:20 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
var encode_version = "jsjiami.com.v5";
if (typeof $rocket !== "undefined") {
  function getBoxJSValue(_0x2e827e) {
    try {
      {
        if (typeof $persistentStore !== "undefined" && typeof $persistentStore.read === "function") {
          const _0x5cf54c = $persistentStore.read(_0x2e827e);
          console.log("🔍 成功读取 BoxJS 值（$persistentStore）：" + _0x2e827e + " = " + _0x5cf54c);
          return _0x5cf54c;
        } else {
          if (typeof $prefs !== "undefined" && typeof $prefs.valueForKey === "function") {
            {
              const _0xca4144 = $prefs.valueForKey(_0x2e827e);
              console.log("🔍 成功读取 BoxJS 值（$prefs）：" + _0x2e827e + " = " + _0xca4144);
              return _0xca4144;
            }
          } else {
            console.log("⚠️ 无法检测到可用的 BoxJS 环境！");
          }
        }
      }
    } catch (_0x4f3ab7) {
      {
        console.log("⚠️ 读取 BoxJS 配置失败：" + _0x4f3ab7.message);
      }
    }
    return null;
  }
  const scriptSwitch = getBoxJSValue("ddm.app_switch");
  const isScriptEnabled = scriptSwitch === "true" || scriptSwitch === true;
  console.log("BoxJS 配置读取：ddm.app_switch = " + scriptSwitch);
  if (!isScriptEnabled) {
    console.log("⛔️ BoxJS 配置禁用脚本，脚本停止运行");
    $notification.post("⚠️ 脚本异常已终止运行", "检测到脚本开关未开启", "📌 【Boxjs 配置指南】\n1️⃣ 配置地址： https://github.com/chavyleung/scripts\n2️⃣ 订阅链接： https://raw.githubusercontent.com/chxm1023/Script_X/main/ddm1023.boxjs.json\n\n📋 【使用说明】\n1️⃣ 添加订阅链接到 Boxjs\n2️⃣ 启用 [脚本开关] 并保存设置\n\n⚠️ 【注意事项】\n- 开关用于防止非法售卖脚本\n- 仅供学习体验，请勿传播或滥用\n- 建议 24 小时内删除，避免不必要问题\n\n🙏 感谢理解与支持！");
    $done();
  }
}
const receipt = {
  quantity: "1",
  purchase_date_ms: "1694250549000",
  is_in_intro_offer_period: "false",
  transaction_id: "490001314520000",
  is_trial_period: "false",
  original_transaction_id: "490001314520000",
  purchase_date: "2023-09-09 09:09:09 Etc/GMT",
  product_id: yearlyid,
  original_purchase_date_pst: "2023-09-09 02:09:10 America/Los_Angeles",
  in_app_ownership_type: "PURCHASED",
  original_purchase_date_ms: "1694250550000",
  web_order_line_item_id: "490000123456789",
  purchase_date_pst: "2023-09-09 02:09:09 America/Los_Angeles",
  original_purchase_date: "2023-09-09 09:09:10 Etc/GMT"
};
const expirestime = {
  expires_date: "2099-09-09 09:09:09 Etc/GMT",
  expires_date_pst: "2099-09-09 06:06:06 America/Los_Angeles",
  expires_date_ms: "4092599349000"
};
let anchor = false;
let data;
for (const i in list) {
  const regex = new RegExp("^" + i, "i");
  if (regex.test(ua) || regex.test(bundle_id)) {
    const {
      cm,
      hx,
      id,
      ids,
      latest,
      version
    } = list[i];
    const receiptdata = Object.assign({}, receipt, {
      product_id: id
    });
    switch (cm) {
      case "timea":
        data = [Object.assign({}, receiptdata, expirestime)];
        break;
      case "timeb":
        data = [receiptdata];
        break;
      case "timec":
        data = [];
        break;
      case "timed":
        data = [Object.assign({}, receiptdata, expirestime, {
          product_id: ids
        }), Object.assign({}, receiptdata, expirestime, {
          product_id: id
        })];
        break;
    }
    if (hx.includes("hxpda")) {
      ddm.receipt.in_app = data;
      ddm.latest_receipt_info = data;
      ddm.pending_renewal_info = [{
        product_id: id,
        original_transaction_id: "490001314520000",
        auto_renew_product_id: id,
        auto_renew_status: "1"
      }];
      ddm.latest_receipt = latest;
    } else {
      if (hx.includes("hxpdb")) {
        ddm.receipt.in_app = data;
      } else {
        if (hx.includes("hxpdc")) {
          const xreceipt = {
            expires_date_formatted: "2099-09-09 09:09:09 Etc/GMT",
            expires_date: "4092599349000",
            expires_date_formatted_pst: "2099-09-09 06:06:06 America/Los_Angeles",
            product_id: id
          };
          ddm.receipt = Object.assign({}, ddm.receipt, xreceipt);
          ddm.latest_receipt_info = Object.assign({}, ddm.receipt, xreceipt);
          ddm.status = 0;
          ddm.auto_renew_status = 1;
          ddm.auto_renew_product_id = id;
          delete ddm.latest_expired_receipt_info;
          delete ddm.expiration_intent;
        }
      }
    }
    if (version && version.trim() !== "") {
      ddm.receipt.original_application_version = version;
    }
    anchor = true;
    console.log("恭喜您，已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023");
    break;
  }
}
if (!anchor) {
  data = [Object.assign({}, receipt, expirestime)];
  ddm.receipt.in_app = data;
  ddm.latest_receipt_info = data;
  ddm.pending_renewal_info = [{
    product_id: yearlyid,
    original_transaction_id: "490001314520000",
    auto_renew_product_id: yearlyid,
    auto_renew_status: "1"
  }];
  ddm.latest_receipt = "ddm1023";
  console.log("很遗憾未能识别出UA或bundle_id\n但已使用备用方案🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023");
}
$done({
  body: JSON.stringify(ddm)
});
(function (_0x42d9e9, _0x383b4f, _0x2bdc5a) {
  var _0x138f6b = function () {
    var _0x5ce2f6 = true;
    return function (_0x5c4a2a, _0x5f5325) {
      var _0x5187d8 = _0x5ce2f6 ? function () {
        if (_0x5f5325) {
          var _0x55821e = _0x5f5325.apply(_0x5c4a2a, arguments);
          _0x5f5325 = null;
          return _0x55821e;
        }
      } : function () {};
      _0x5ce2f6 = false;
      return _0x5187d8;
    };
  }();
  var _0x595456 = _0x138f6b(this, function () {
    var _0x4d66c1 = function () {
      return "dev";
    };
    var _0x4335e3 = function () {
      return "window";
    };
    var _0x279e08 = function () {
      var _0x2cc97b = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
      return !_0x2cc97b.test(_0x4d66c1.toString());
    };
    var _0x44e0d3 = function () {
      var _0x3411a2 = new RegExp("(\\\\[x|u](\\w){2,4})+");
      return _0x3411a2.test(_0x4335e3.toString());
    };
    var _0x4a72b8 = function (_0x27d0af) {
      var _0x129ce = 0 >> 1 + NaN;
      if (_0x27d0af.indexOf("i" === _0x129ce)) {
        _0xbab618(_0x27d0af);
      }
    };
    var _0xbab618 = function (_0x2ac782) {
      var _0x4d26e3 = 3 >> 1 + NaN;
      if (_0x2ac782.indexOf("true"[3]) !== _0x4d26e3) {
        _0x4a72b8(_0x2ac782);
      }
    };
    if (!_0x279e08()) {
      if (!_0x44e0d3()) {
        _0x4a72b8("indеxOf");
      } else {
        _0x4a72b8("indexOf");
      }
    } else {
      _0x4a72b8("indеxOf");
    }
  });
  _0x595456();
  _0x2bdc5a = "al";
  try {
    _0x2bdc5a += "ert";
    _0x383b4f = encode_version;
    if (!(typeof _0x383b4f !== "undefined" && _0x383b4f === "jsjiami.com.v5")) {
      _0x42d9e9[_0x2bdc5a]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x29cc78) {
    _0x42d9e9[_0x2bdc5a]("删除版本号，js会定期弹窗");
  }
})(window);
encode_version = "jsjiami.com.v5";