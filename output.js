//2025-06-07T02:02:53.626Z
//解密脚本在此
if (typeof $rocket !== "undefined") {
  function getBoxJSValue(_0x2e827e) {
    try {
      {
        if (typeof $persistentStore !== "undefined" && typeof $persistentStore.read === "function") {
          const _0x5cf54c = $persistentStore.read(_0x2e827e);
          console.log("🔍 成功读取 BoxJS 值（$persistentStore）：" + _0x2e827e + " = " + _0x5cf54c);
          return _0x5cf54c;
        } else if (typeof $prefs !== "undefined" && typeof $prefs.valueForKey === "function") {
          {
            const _0xca4144 = $prefs.valueForKey(_0x2e827e);
            console.log("🔍 成功读取 BoxJS 值（$prefs）：" + _0x2e827e + " = " + _0xca4144);
            return _0xca4144;
          }
        } else {
          console.log("⚠️ 无法检测到可用的 BoxJS 环境！");
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
  "quantity": "1",
  "purchase_date_ms": "1694250549000",
  "is_in_intro_offer_period": "false",
  "transaction_id": "490001314520000",
  "is_trial_period": "false",
  "original_transaction_id": "490001314520000",
  "purchase_date": "2023-09-09 09:09:09 Etc/GMT",
  "product_id": yearlyid,
  "original_purchase_date_pst": "2023-09-09 02:09:10 America/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "original_purchase_date_ms": "1694250550000",
  "web_order_line_item_id": "490000123456789",
  "purchase_date_pst": "2023-09-09 02:09:09 America/Los_Angeles",
  "original_purchase_date": "2023-09-09 09:09:10 Etc/GMT"
};
const expirestime = {
  "expires_date": "2099-09-09 09:09:09 Etc/GMT",
  "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
  "expires_date_ms": "4092599349000"
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
      "product_id": id
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
          "product_id": ids
        }), Object.assign({}, receiptdata, expirestime, {
          "product_id": id
        })];
        break;
    }
    if (hx.includes("hxpda")) {
      ddm.receipt.in_app = data;
      ddm.latest_receipt_info = data;
      ddm.pending_renewal_info = [{
        "product_id": id,
        "original_transaction_id": "490001314520000",
        "auto_renew_product_id": id,
        "auto_renew_status": "1"
      }];
      ddm.latest_receipt = latest;
    } else if (hx.includes("hxpdb")) {
      ddm.receipt.in_app = data;
    } else if (hx.includes("hxpdc")) {
      const xreceipt = {
        "expires_date_formatted": "2099-09-09 09:09:09 Etc/GMT",
        "expires_date": "4092599349000",
        "expires_date_formatted_pst": "2099-09-09 06:06:06 America/Los_Angeles",
        "product_id": id
      };
      ddm.receipt = Object.assign({}, ddm.receipt, xreceipt);
      ddm.latest_receipt_info = Object.assign({}, ddm.receipt, xreceipt);
      ddm.status = 0;
      ddm.auto_renew_status = 1;
      ddm.auto_renew_product_id = id;
      delete ddm.latest_expired_receipt_info;
      delete ddm.expiration_intent;
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
    "product_id": yearlyid,
    "original_transaction_id": "490001314520000",
    "auto_renew_product_id": yearlyid,
    "auto_renew_status": "1"
  }];
  ddm.latest_receipt = "ddm1023";
  console.log("很遗憾未能识别出UA或bundle_id\n但已使用备用方案🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023");
}
$done({
  "body": JSON.stringify(ddm)
});
encode_version = "jsjiami.com.v5";