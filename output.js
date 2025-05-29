//Thu May 29 2025 21:32:11 GMT+0000 (Coordinated Universal Time)
//解密脚本在此
let ddm = JSON.parse($response.body);
const headers = $request?.headers || {};
const ua = headers["User-Agent"] || headers["user-agent"] || "";
const profileid = headers["adapty-sdk-profile-id"] || headers["ADAPTY-SDK-PROFILE-ID"] || "";
const time = Date.now();
const list = {
  "Logo%20Maker": {
    dy: "dypda",
    id: "com.limepresso.lm.paid.subscription.pro_yearly_high",
    bundle_id: "com.limepresso.logomaker"
  },
  Luminar: {
    dy: "dypda",
    id: "com.skylum.luminaripad.lifetime",
    bundle_id: "com.skylum.luminaripad"
  },
  Genie: {
    dy: "dypda",
    id: "yearly_advanced_pro",
    bundle_id: "co.appnation.geniechat"
  },
  "Flight%20Tracker": {
    dy: "dypda",
    id: "com.iaftt.flightplusfree.49.99year",
    bundle_id: "com.iaftt.flightplusfree"
  },
  "$%7BPRODUCT_NAME%7D": {
    dy: "dypda",
    id: "com.iaftt.flightplusfree.49.99year",
    bundle_id: "com.iaftt.flightplusfree"
  },
  AvA: {
    dy: "dypda",
    id: "momo_yearly_subs_pro",
    bundle_id: "com.scaleup.dreame"
  },
  PlantApp: {
    dy: "dypda",
    id: "plantapp.lifetime.promoted.sub",
    bundle_id: "com.scaleup.plantid"
  },
  KeyboardGPT: {
    dy: "dypda",
    id: "smart.keyboard.yearly.01",
    bundle_id: "com.smart.keyboard"
  },
  SketchAR: {
    dy: "dypda",
    id: "tech.sketchar.subscription.yearly",
    bundle_id: "tech.sketchar.ios"
  },
  universal: {
    dy: "dypda",
    id: "remotetv.yearly.01",
    bundle_id: "com.universal.remotetv"
  },
  Lingvist: {
    dy: "dypda",
    id: "com.lingvist.unlimited_12_months.v11.full_1md_ft",
    bundle_id: "ee.keel24.Lingvist"
  },
  ChatAI: {
    dy: "dypda",
    id: "chatai_yearly_ios",
    bundle_id: "com.scaleup.chatai"
  },
  FacePlus: {
    dy: "dypda",
    id: "faceplus_yearly_subs_3dft_ios",
    bundle_id: "com.scaleup.faceplus"
  },
  Batched: {
    dy: "dypdba",
    id: "com.advasoft.batched.premium_year",
    bundle_id: "com.advasoft.batched"
  }
};
var encode_version = "jsjiami.com.v5";
if (typeof $rocket !== "undefined") {
  function getBoxJSValue(_0x5ea269) {
    try {
      if (typeof $persistentStore !== "undefined" && typeof $persistentStore.read === "function") {
        const _0x3a43b4 = $persistentStore.read(_0x5ea269);
        console.log("🔍 成功读取 BoxJS 值（$persistentStore）：" + _0x5ea269 + " = " + _0x3a43b4);
        return _0x3a43b4;
      } else {
        if (typeof $prefs !== "undefined" && typeof $prefs.valueForKey === "function") {
          const _0x5e0bbf = $prefs.valueForKey(_0x5ea269);
          console.log("🔍 成功读取 BoxJS 值（$prefs）：" + _0x5ea269 + " = " + _0x5e0bbf);
          return _0x5e0bbf;
        } else {
          {
            console.log("⚠️ 无法检测到可用的 BoxJS 环境！");
          }
        }
      }
    } catch (_0x17880a) {
      console.log("⚠️ 读取 BoxJS 配置失败：" + _0x17880a.message);
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
const premiumTemplate = {
  id: "premium",
  is_lifetime: false,
  store: "app_store",
  starts_at: "2024-01-23T09:09:09.000000+0000",
  expires_at: "2099-09-09T09:09:09.000000+0000",
  will_renew: true,
  is_active: true,
  is_in_grace_period: false,
  activated_at: "2024-01-23T09:09:09.000000+0000",
  renewed_at: "2024-01-23T09:09:09.000000+0000",
  is_refund: false,
  vendor_transaction_id: "490001271881589",
  vendor_original_transaction_id: "490001271881589",
  is_sandbox: false,
  active_introductory_offer_type: "trial"
};
const receiptTemplate = {
  quantity: "1",
  purchase_date_ms: "1706000949000",
  expires_date: "2099-09-09 09:09:09 Etc/GMT",
  is_in_intro_offer_period: "false",
  transaction_id: "490001271881589",
  is_trial_period: "true",
  original_transaction_id: "490001271881589",
  purchase_date: "2024-01-23 09:09:09 Etc/GMT",
  in_app_ownership_type: "PURCHASED",
  original_purchase_date_ms: "1706000949000",
  expires_date_ms: "4092628149000"
};
for (const key in list) {
  const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp("^" + safeKey, "i").test(ua)) {
    const {
      dy,
      id,
      ids,
      bundle_id
    } = list[key];
    let subscriptions = {};
    let receiptdata = [];
    switch (dy) {
      case "dypda":
        subscriptions[id] = Object.assign({}, premiumTemplate, {
          vendor_product_id: id
        });
        receiptdata.push(Object.assign({}, receiptTemplate, {
          product_id: id
        }));
        break;
      case "dypdb":
        subscriptions[id] = Object.assign({}, premiumTemplate, {
          vendor_product_id: id
        });
        if (ids) {
          subscriptions[ids] = Object.assign({}, premiumTemplate, {
            vendor_product_id: ids
          });
          receiptdata.push(Object.assign({}, receiptTemplate, {
            product_id: ids
          }));
        }
        receiptdata.push(Object.assign({}, receiptTemplate, {
          product_id: id
        }));
        break;
    }
    if (/(analytics\/profiles|purchase\/app-store)/.test($request.url)) {
      ddm = {
        data: {
          type: "adapty_purchase_app_store_original_transaction_id_validation_result",
          id: profileid,
          attributes: {
            profile_id: profileid,
            is_test_user: false,
            segment_hash: "8245f974014fdf4c",
            timestamp: time,
            apple_validation_result: {
              environment: "Production",
              revision: "1726387136000_490001234567890_4",
              appAppleId: 1560806510,
              transactions: [{
                productId: id,
                storefront: "CHN",
                originalTransactionId: "490001234567890",
                expiresDate: "2099-09-09T09:09:09Z",
                subscriptionGroupIdentifier: "20459405",
                purchaseDate: "2024-01-23 09:09:09Z",
                price: 0,
                transactionId: "490001234567890",
                currency: "CNY",
                inAppOwnershipType: "PURCHASED"
              }],
              hasMore: false,
              bundleId: bundle_id
            },
            subscriptions: subscriptions,
            paid_access_levels: {
              premium: Object.assign({}, premiumTemplate, {
                vendor_product_id: id
              })
            }
          }
        }
      };
    }
    if (/(receipt\/validate|purchase-containers)/.test($request.url)) {
      ddm = {
        data: {
          type: "adapty_inapps_apple_receipt_validation_result",
          id: profileid,
          attributes: {
            profile_id: profileid,
            apple_validation_result: {
              environment: "Production",
              receipt: {
                receipt_type: "Production",
                bundle_id: bundle_id,
                in_app: receiptdata,
                original_purchase_date: "2024-01-23 09:09:09 Etc/GMT",
                adam_id: 1560806510,
                request_date: "2024-01-23 09:09:09 Etc/GMT",
                request_date_ms: "1706000949000",
                application_version: "1",
                original_application_version: "1"
              },
              status: 0,
              pending_renewal_info: [{
                expiration_intent: "1",
                product_id: id,
                is_in_billing_retry_period: "0",
                auto_renew_product_id: id,
                original_transaction_id: "490001234567890",
                auto_renew_status: "0"
              }],
              latest_receipt_info: receiptdata,
              latest_receipt: "ddm"
            },
            subscriptions: subscriptions,
            paid_access_levels: {
              premium: Object.assign({}, premiumTemplate, {
                vendor_product_id: id
              })
            }
          }
        }
      };
    }
    console.log("已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023");
    break;
  }
}
$done({
  body: JSON.stringify(ddm)
});
(function (_0x13a141, _0x2c2753, _0x35c450) {
  _0x35c450 = "al";
  try {
    _0x35c450 += "ert";
    _0x2c2753 = encode_version;
    if (!(typeof _0x2c2753 !== "undefined" && _0x2c2753 === "jsjiami.com.v5")) {
      _0x13a141[_0x35c450]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x88cffb) {
    _0x13a141[_0x35c450]("删除版本号，js会定期弹窗");
  }
})(window);
encode_version = "jsjiami.com.v5";