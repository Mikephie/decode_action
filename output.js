<<<<<<< main
//Wed Apr 16 2025 12:19:10 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let names = "ColorIdentifier";
let productName = "proversion";
let productType = "color_identifier_pro";
let appVersion = null;
let notifyState = true;
let ua = true;
let obj = JSON.parse($response.body);
let $ = new Env(names);
obj.subscriber = {
  non_subscriptions: {},
  first_seen: "2024-03-08T04:44:30Z",
  original_application_version: appVersion,
  other_purchases: {
    [productType]: {
      price: {
        amount: 0,
        currency: "USD",
      },
      display_name: null,
      purchase_date: "2024-03-08T04:44:44Z",
    },
  },
  management_url: null,
  subscriptions: {},
  entitlements: {},
  original_purchase_date: "2024-03-08T04:44:14Z",
  original_app_user_id: "$RCAnonymousID:0400000000000000000000000000000",
  last_seen: "2024-03-08T04:44:30Z",
};
obj.subscriber.non_subscriptions[productType] = [{
  id: "aaaaaaaaaa",
  is_sandbox: false,
  price: {
    amount: 0,
    currency: "USD",
  },
  display_name: null,
  purchase_date: "2024-03-08T04:44:44Z",
  original_purchase_date: "2024-03-08T04:44:44Z",
  store: "app_store",
  store_transaction_id: "280000000000000",
}, ];
obj.subscriber.entitlements[productName] = {
  grace_period_expires_date: null,
  purchase_date: "2024-03-08T04:44:44Z",
  product_identifier: productType,
  expires_date: null,
};
$.notify("XiaoMao_" + names + " 执行成功！", "", "Nice!已解锁成功，可关掉此脚本。", "https://i.pixiv.re/img-original/img/2022/12/19/00/06/12/103718184_p0.png");
$done({
  body: JSON.stringify(obj)
});

function Env(name) {
  const isLoon = typeof $loon !== "undefined";
  const isSurge = typeof $httpClient !== "undefined" && !isLoon;
  const isQX = typeof $task !== "undefined";
  const read = (key) => {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key)
  };
  const write = (key, value) => {
    if (isLoon || isSurge) return $persistentStore.write(key, value);
    if (isQX) return $prefs.setValueForKey(key, value)
  };
  const notify = (title = "XiaoMao", subtitle = "", message = "", url = "", url2 = url) => {
    if (isLoon) $notification.post(title, subtitle, message, url);
    if (isSurge) $notification.post(title, subtitle, message, {
      url
    });
    if (isQX) $notify(title, subtitle, message, {
      "open-url": url,
      "media-url": url2
    })
  };
  const get = (url, callback) => {
    if (isLoon || isSurge) $httpClient.get(url, callback);
    if (isQX) {
      url.method = `GET`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body))
    }
  };
  const post = (url, callback) => {
    if (isLoon || isSurge) $httpClient.post(url, callback);
    if (isQX) {
      url.method = `POST`;
      $task.fetch(url).then((resp) => callback(null, {}, resp.body))
    }
  };
  const put = (url, callback) => {
    if (isLoon || isSurge) $httpClient.put(url, callback);
    if (isQX) {
      url.method = "PUT";
      $task.fetch(url).then((resp) => callback(null, {}, resp.body))
    }
  };
  const toObj = (str) => JSON.parse(str);
  const toStr = (obj) => JSON.stringify(obj);
  const queryStr = (obj) => {
    return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join("&")
  };
  const log = (message) => console.log(message);
  const done = (value = {}) => $done(value);
  return {
    name,
    read,
    write,
    notify,
    get,
    post,
    put,
    toObj,
    toStr,
    queryStr,
    log,
    done,
  }
}
=======
//Mon May 19 2025 13:14:08 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const version = 'V1.0.4';
var _0xodQ = 'jsjiami.com.v7';
const _0x21c6fa = _0x318b;
if (function (_0x102188, _0x32742d, _0x176f85, _0x38836f, _0x4d4054, _0x4e6116, _0x22ed7c) {
  _0x102188 = _0x102188 >> 0x5;
  _0x4e6116 = 'hs';
  _0x22ed7c = 'hs';
  return function (_0x4af929, _0x3455ce, _0x2c76cb, _0x5d8b9a, _0x5ad61a) {
    const _0x3d8aae = _0x318b;
    _0x5d8b9a = 'tfi';
    _0x4e6116 = _0x5d8b9a + _0x4e6116;
    _0x5ad61a = 'up';
    _0x22ed7c += _0x5ad61a;
    _0x4e6116 = _0x2c76cb(_0x4e6116);
    _0x22ed7c = _0x2c76cb(_0x22ed7c);
    _0x2c76cb = 0x0;
    const _0x1e471d = _0x4af929();
    while (!![] && --_0x38836f + _0x3455ce) {
      try {
        _0x5d8b9a = parseInt(_0x3d8aae(0x1ae, 'PgMS')) / 0x1 * (-parseInt(_0x3d8aae(0x1de, 'BOyN')) / 0x2) + -parseInt(_0x3d8aae(0x1e5, 'k)VT')) / 0x3 * (parseInt(_0x3d8aae(0x1f3, 'V6dO')) / 0x4) + parseInt(_0x3d8aae(0x19c, 'ptq5')) / 0x5 + -parseInt(_0x3d8aae(0x1dd, 'D*mP')) / 0x6 * (parseInt(_0x3d8aae(0x1d1, '^3NJ')) / 0x7) + -parseInt(_0x3d8aae(0x19e, '^3NJ')) / 0x8 * (parseInt(_0x3d8aae(0x1b7, '$Qgu')) / 0x9) + parseInt(_0x3d8aae(0x1df, ']77I')) / 0xa + parseInt(_0x3d8aae(0x1ab, 'mZh*')) / 0xb;
      } catch (_0x3a7f07) {
        _0x5d8b9a = _0x2c76cb;
      } finally {
        _0x5ad61a = _0x1e471d[_0x4e6116]();
        if (_0x102188 <= _0x38836f) {
          if (_0x2c76cb) {
            if (_0x4d4054) {
              _0x5d8b9a = _0x5ad61a;
            } else {
              _0x4d4054 = _0x5ad61a;
            }
          } else {
            _0x2c76cb = _0x5ad61a;
          }
        } else {
          if (_0x2c76cb == _0x4d4054['replace'](/[buhEgGdtFxLDrHAqPQ=]/g, '')) {
            if (_0x5d8b9a === _0x3455ce) {
              _0x1e471d['un' + _0x4e6116](_0x5ad61a);
              break;
            }
            _0x1e471d[_0x22ed7c](_0x5ad61a);
          }
        }
      }
    }
  }(_0x176f85, _0x32742d, function (_0x2cccd0, _0x537e28, _0x37d33b, _0x5d6706, _0x4d3d8b, _0x297bd0, _0x2ccf1a) {
    _0x537e28 = '\x73\x70\x6c\x69\x74';
    _0x2cccd0 = arguments[0x0];
    _0x2cccd0 = _0x2cccd0[_0x537e28]('');
    _0x37d33b = '\x72\x65\x76\x65\x72\x73\x65';
    _0x2cccd0 = _0x2cccd0[_0x37d33b]('\x76');
    _0x5d6706 = '\x6a\x6f\x69\x6e';
    0x1a4245;
    return _0x2cccd0[_0x5d6706]('');
  });
}(0x1780, 0xbb8ad, _0x56ca, 0xbe), _0x56ca) {}
let body = $response[_0x21c6fa(0x1d4, '9iPm')],
  obj;
try {
  obj = JSON[_0x21c6fa(0x1cd, 'nML&')](body);
} catch (_0x2166b8) {
  $done({
    'body': body
  });
}
const opName = $request?.[_0x21c6fa(0x1aa, 'sjwt')]?.[_0x21c6fa(0x1d3, 'V6dO')] || 'x-apollo-operation-name',
  processorMap = {
    'HomeFeedSdui': handleHomeFeed,
    'CommentsPageAds': handleClearBody,
    'CommentTreeAds': handleClearBody,
    'FetchIdentityPreferences': handleFetchIdentityPreferences,
    'FeedPostDetailsByIds': handleFeedPostDetailsByIds
  };
if (processorMap[opName]) {
  processorMap[opName](obj);
}
function _0x318b(_0x26090f, _0x4c846a) {
  const _0x56cac4 = _0x56ca();
  _0x318b = function (_0x318b96, _0x2bf0e7) {
    _0x318b96 = _0x318b96 - 0x193;
    let _0x568ab9 = _0x56cac4[_0x318b96];
    if (_0x318b['UjItNK'] === undefined) {
      var _0x20ba40 = function (_0x5dfe76) {
        const _0x1e10d8 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
        let _0x13838f = '',
          _0x41f6ea = '';
        for (let _0x1a6f10 = 0x0, _0x448fc6, _0x172df7, _0x4958f7 = 0x0; _0x172df7 = _0x5dfe76['charAt'](_0x4958f7++); ~_0x172df7 && (_0x1a6f10 % 0x4 ? _0x448fc6 = _0x448fc6 * 0x40 + _0x172df7 : _0x448fc6 = _0x172df7, _0x1a6f10++ % 0x4) ? _0x13838f += String['fromCharCode'](0xff & _0x448fc6 >> (-0x2 * _0x1a6f10 & 0x6)) : 0x0) {
          _0x172df7 = _0x1e10d8['indexOf'](_0x172df7);
        }
        for (let _0x259c79 = 0x0, _0x52672e = _0x13838f['length']; _0x259c79 < _0x52672e; _0x259c79++) {
          _0x41f6ea += '%' + ('00' + _0x13838f['charCodeAt'](_0x259c79)['toString'](0x10))['slice'](-0x2);
        }
        return decodeURIComponent(_0x41f6ea);
      };
      const _0x22299d = function (_0x31c2b3, _0x1b9cf5) {
        let _0x339f17 = [],
          _0xdc032d = 0x0,
          _0x5939fa,
          _0x4086fa = '';
        _0x31c2b3 = _0x20ba40(_0x31c2b3);
        let _0x561504;
        for (_0x561504 = 0x0; _0x561504 < 0x100; _0x561504++) {
          _0x339f17[_0x561504] = _0x561504;
        }
        for (_0x561504 = 0x0; _0x561504 < 0x100; _0x561504++) {
          _0xdc032d = (_0xdc032d + _0x339f17[_0x561504] + _0x1b9cf5['charCodeAt'](_0x561504 % _0x1b9cf5['length'])) % 0x100;
          _0x5939fa = _0x339f17[_0x561504];
          _0x339f17[_0x561504] = _0x339f17[_0xdc032d];
          _0x339f17[_0xdc032d] = _0x5939fa;
        }
        _0x561504 = 0x0;
        _0xdc032d = 0x0;
        for (let _0x492ce4 = 0x0; _0x492ce4 < _0x31c2b3['length']; _0x492ce4++) {
          _0x561504 = (_0x561504 + 0x1) % 0x100;
          _0xdc032d = (_0xdc032d + _0x339f17[_0x561504]) % 0x100;
          _0x5939fa = _0x339f17[_0x561504];
          _0x339f17[_0x561504] = _0x339f17[_0xdc032d];
          _0x339f17[_0xdc032d] = _0x5939fa;
          _0x4086fa += String['fromCharCode'](_0x31c2b3['charCodeAt'](_0x492ce4) ^ _0x339f17[(_0x339f17[_0x561504] + _0x339f17[_0xdc032d]) % 0x100]);
        }
        return _0x4086fa;
      };
      _0x318b['HZokIO'] = _0x22299d;
      _0x26090f = arguments;
      _0x318b['UjItNK'] = !![];
    }
    const _0x54465b = _0x56cac4[0x0],
      _0x4c7183 = _0x318b96 + _0x54465b,
      _0xb0091a = _0x26090f[_0x4c7183];
    !_0xb0091a ? (_0x318b['cUliUn'] === undefined && (_0x318b['cUliUn'] = !![]), _0x568ab9 = _0x318b['HZokIO'](_0x568ab9, _0x2bf0e7), _0x26090f[_0x4c7183] = _0x568ab9) : _0x568ab9 = _0xb0091a;
    return _0x568ab9;
  };
  return _0x318b(_0x26090f, _0x4c846a);
}
function _0x56ca() {
  const _0xa055f6 = function () {
    return [_0xodQ, 'GGdjFsLjAuGiabmiqt.EGcHPxoDGmgF.rDvQh7FG==', 'b8oIibRdJmkFW4K', 'WO/cS01GW7RcS8ke', 'uSoNcZhdMW', 'yCkgsG8', 'eCo8WOOSW7a', 'WRFcOmk9', 'hhJdG3S', 'W4ldNaaLvXG4bfjRWOddGSoXW6q', 'W4KPxc/dJW', 'BLzmWQv7', 's3BcMSknW7eLdSk4', 'W5/cS39dW7NcUCkq', 'WPtcOqX0b8otWQFcGhmrECoJfW', 'vJddGCoy', 'idtdTKRdSWZcNeZdTcGiW6NdG8kUW4uLWPVdSCoPjcSEzW', 'ASkQjf0', 'as4Nb8ol', 'WPxcRWKUW5NdQmo4vLNdVG', 'W4tdVv4IrSkjW6dcLa', 'wbSlAvu', 'WPLStxfq', 'WRxcO8kRpSkzbtfJAmkIWPhcQSkhW7O', 'W6FcVmkFyq', 'm8oIWR/cK2mTW6v/W6VcJmowemoYW6eAfXZcKsJdN8k2iCkysXNdIsddI8k1kmoPnSoKW4bwdHqty8kQ', 'W5dcSLTEW5/cUSku', 'WO7dQCo3duOxW70XpdW', 'm8oxbLRdImkYW7yaif8HW7Wr', 'WRWHWPNcPmkqWPiOtmoXW4PmWQ3dKmoSWPWQr1W', 'W5xcICkgv8kP', 'dSkehmkKWOFcL8opCmkOW71tWQWS', 'c8ogCSoqW6tdJ8kw', 'wCkiW4TxjSoUfmkc', 'WQ7dR18zyJ14'].concat(function () {
      return ['W57cRCklrN0pW5GNcInYbSoVW4a1W57cPCo+', 'WOqxW7vCgMzut8oa', 'WQFcSCohDuBcPSkUl8kVhCksWPai', 'BCkofv1/', 'W5/cOtihfG', 'W7xdOmklia', 'W6tdQSkrsa', 'WRfDW6xdHa', 'vmohA8oVW5xdKmkYFSkaW6jIWPSnWRqirCkdzq', 'Ar3dQCkjEtBdGGNdUWbfaSkjW54', 'W64PWQSpjCoXWQaBWQu', 'xWqHzx/cH1uSyxhdOG', 'E8kuwCkTW6TvWRr0WRKMWQtcTv7cLmkPW5C+W4y', 'tsRcGcRcI3JdQgZcUXCjW4hdOq', 'wCkFW7Pro8o1bmkRW5dcV8oVBSkMv8kCW6ivWO3cQ314ECogBSomfSoXWPtdVmouWQBcJmogW71IfmkVWRZdKSk1', 'lCofn8kSw8otWPCOWPKxdq', 'W5Dza8kLW4avk35fkI5cWPRdKCozWO4mySk8WP7dV8oDvulcVmk1', 'vmknW5Py', 'W7lcNIGFiW', 'W6pcMX4Vhmo/aLVdImk2W7i', 'bGGkd8oA', 'W7K8WQ0h', 'WOdcNfpcOmo9WRS', 'WONdSmomW7iv', 'W7RdT8kqsWldUCk8WOJcV3lcSq', 'xCkxjmkg', 's8ktimklW4HKW7y', 'W4rtWR4nqdenqSo1vaBcRgy', 'amooz8oFWPW0WQdcJutdLcDaW7m', 'WPZcQa98cSosWQddLvGzESoDgSkJ', 'WO4MWQxdNhDLy2hdRKe', 'aSolFLBcQHpcRcRdKGhdN8orWO1RW4L0WRhcUq', 'W63dJfq3xs1sW4WuWQKB', 'WRbqW7tdImo/omoSWR4', 'W7JdPCkAlWVdU8oQfa'].concat(function () {
        return ['WPlcHvz0zryQeNHZ', 'WQhcTmkytSk7duLhWRzZhsbpsG', 'WRnvW73dKCo/ja', 'W4JdTv4Hv8koW6dcNG', 'W57cRCkkv30nW6GRbsnYda', 'W7RcSc9dymogjSkX', 'WRhcQSkZW6dcL8otWPO', 'W6fNW6ldPCogW5jqgCosW4b6WQpdNSoh', 'ySkvCSk4W6HqWPj1WRq3WRi', 'WOlcLeVcTq', 'pKNdJCkoFHVdUq0', 'rmobkZtdS8kpW6nWW74IWPW', 'WReZWQpcTG', 'WRHSB15MW5hdI10', 'W7tdJxa1AdPfW5eyWQijW4DPW7JdU2ivt8orW74PaapdU8ohWOW', 'WOZcSWGHW5/dU8oPv0JdQmoW', 'WPuRW7/cLYjfWPCoEa', 'omoXDJ8QWPLYWPtcPSobAq', 'uMdcMSkfW6a+h8kVoJBcNW', 'sCo4WQORW5VdRYK', 'W6pdOCkqqXpdOSkTWP8', 'vh/cISkcW50', 'W7pdUaGUvq', 'W5v2WR/dIhaCW4nxu8k7DCkJyZy', 'BWZdJSkoEdtdMG', 'W4ZdVwSTs8kmW7VcJg0', 'WOGNW6/cLdrcWOiE', 'WQRcIh51W7e', 'W7/cP1m', 'WRpcSSkzi8kdfdrhBmk0WRxcSSk6W7X5q8otBCoNW70HWR/dM8kvi2m8nL/dIbexW4eoW7FcTSkxWOWZW6i', 'WPjWrvHc', 'zrRdO8kqEq', 'W63dUmoKWPStW7FdU0mBjCksWPxcQq'];
      }());
    }());
  }();
  _0x56ca = function () {
    return _0xa055f6;
  };
  return _0x56ca();
}
;
$done({
  'body': JSON[_0x21c6fa(0x1e7, 'ptq5')](obj)
});
function handleHomeFeed(_0xa8a116) {
  const _0xfb14bd = _0x21c6fa,
    _0x494816 = {
      'awSVZ': function (_0x11cc0c, _0x40bb3b) {
        return _0x11cc0c === _0x40bb3b;
      },
      'MgXKt': _0xfb14bd(0x1d5, 'lU$s'),
      'LHrgy': _0xfb14bd(0x1ba, '#e!n'),
      'CxOhP': _0xfb14bd(0x1d9, 'TZf0')
    },
    _0x51669e = _0xa8a116?.['data']?.['homeV3']?.[_0xfb14bd(0x1a2, 'dZD1')]?.[_0xfb14bd(0x198, 'hic[')];
  if (!Array[_0xfb14bd(0x1c6, 'D*mP')](_0x51669e)) {
    return;
  }
  _0xa8a116['data']['homeV3'][_0xfb14bd(0x1a7, '^3NJ')]['edges'] = _0x51669e[_0xfb14bd(0x1a6, 'dZD1')](_0x10955d => !_0x10955d?.[_0xfb14bd(0x1ec, 'sEaI')]?.[_0xfb14bd(0x1bd, '^3NJ')])[_0xfb14bd(0x1c0, 'LB9O')](_0x57a932 => {
    const _0x49ac99 = _0xfb14bd;
    if (_0x494816[_0x49ac99(0x1c9, '$Qgu')](_0x494816[_0x49ac99(0x1ce, 'eYUp')], _0x494816[_0x49ac99(0x1bf, 'D*mP')])) {
      _0x4fb1b2 = {};
    } else {
      const _0x3d1732 = _0x57a932['node'];
      Array[_0x49ac99(0x1bc, 'PgMS')](_0x3d1732['cells']) && (_0x494816[_0x49ac99(0x193, 'vLE3')]('HdGAB', _0x494816[_0x49ac99(0x1c2, 'TZf0')]) ? _0x3d1732[_0x49ac99(0x1c3, 'PgMS')] = processHomeFeedCells(_0x3d1732['cells']) : _0x449e20[_0x49ac99(0x1ef, 'PgMS')] = null);
      return _0x57a932;
    }
  });
}
function processHomeFeedCells(_0x329fb2) {
  const _0x52ba07 = _0x21c6fa,
    _0x10e1b6 = {
      'VTmWa': function (_0x2db459, _0x262b02) {
        return _0x2db459 === _0x262b02;
      },
      'PKdMn': _0x52ba07(0x1e9, '9iPm'),
      'BiGJy': _0x52ba07(0x1d8, 'uRAd'),
      'MjGPC': _0x52ba07(0x1b9, 'SNdk')
    };
  return _0x329fb2[_0x52ba07(0x1ca, 'reGz')](_0x180d21 => {
    const _0x2408ea = _0x52ba07,
      _0x44ba62 = _0x180d21?.[_0x2408ea(0x1b4, 'nHDJ')]?.['sourceData'];
    if (_0x44ba62) {
      _0x10e1b6[_0x2408ea(0x1e1, 'wGR5')](_0x44ba62['isObfuscated'], !![]) && (_0x10e1b6['PKdMn'] !== _0x10e1b6['BiGJy'] ? _0x44ba62[_0x2408ea(0x1a8, 'BOyN')] = ![] : _0x5106b0?.[_0x2408ea(0x1d2, '54[9')]?.[_0x2408ea(0x1e4, '^wgP')]?.[_0x2408ea(0x1b6, 'SNdk')] && (_0x3b100d[_0x2408ea(0x1eb, '%3Dm')][_0x2408ea(0x1be, 'nHDJ')][_0x2408ea(0x194, 'vLE3')][_0x2408ea(0x1f6, 'oQzy')] = ![], _0x429dc8[_0x2408ea(0x1b0, 'mZh*')]['identity'][_0x2408ea(0x199, 'sEaI')][_0x2408ea(0x1dc, '179T')] = ![], _0x409832[_0x2408ea(0x1f7, '^wgP')][_0x2408ea(0x1a9, '*BUc')][_0x2408ea(0x1f1, 'uRAd')]['isNsfwMediaBlocked'] = ![], _0x18f90b[_0x2408ea(0x1cb, 'V6dO')]['identity'][_0x2408ea(0x1b5, 'pXwr')][_0x2408ea(0x1f2, '1wC&')] = ![]));
      _0x44ba62[_0x2408ea(0x1da, 'reGz')] && (_0x10e1b6[_0x2408ea(0x195, 'lU$s')] !== _0x10e1b6['MjGPC'] ? (_0x403f89['data']['identity'][_0x2408ea(0x1f5, 'klSG')][_0x2408ea(0x1b2, 'k)VT')] = ![], _0x18bd90[_0x2408ea(0x1c8, ']77I')][_0x2408ea(0x1cf, 'SNdk')]['preferences'][_0x2408ea(0x1c1, 'reGz')] = ![], _0x51fe0e[_0x2408ea(0x1ad, '7A!1')]['identity'][_0x2408ea(0x1af, 'kWAG')][_0x2408ea(0x1e0, 'mZh*')] = ![], _0x4059ad[_0x2408ea(0x1db, 'wGR5')][_0x2408ea(0x1d7, '^3NJ')]['preferences'][_0x2408ea(0x1e6, 'BOyN')] = ![]) : _0x44ba62['obfuscatedPath'] = null);
    }
    const _0x4d9c26 = _0x180d21?.['indicatorsCell']?.[_0x2408ea(0x19f, 'Bu8$')];
    Array['isArray'](_0x4d9c26) && (_0x180d21[_0x2408ea(0x1cc, '#e!n')][_0x2408ea(0x1d6, '$tv7')] = _0x4d9c26[_0x2408ea(0x197, '7A!1')](_0x4dda6e => _0x4dda6e !== 'NSFW'));
    return _0x180d21;
  });
}
function handleFetchIdentityPreferences(_0x4eebb1) {
  const _0x369b55 = _0x21c6fa;
  if (_0x4eebb1?.[_0x369b55(0x1ed, 'dZD1')]?.[_0x369b55(0x1d7, '^3NJ')]?.[_0x369b55(0x194, 'vLE3')]) {
    _0x4eebb1[_0x369b55(0x19a, 'fVGn')][_0x369b55(0x1a3, '%3Dm')][_0x369b55(0x1b3, '$tv7')]['isAdPersonalizationAllowed'] = ![];
    _0x4eebb1[_0x369b55(0x196, 'gTVU')][_0x369b55(0x1b1, 'TZf0')][_0x369b55(0x1ac, '1wC&')][_0x369b55(0x1f4, '^wgP')] = ![];
    _0x4eebb1['data']['identity'][_0x369b55(0x1af, 'kWAG')][_0x369b55(0x1ee, '5y0z')] = ![];
    _0x4eebb1['data'][_0x369b55(0x1b8, 'sEaI')][_0x369b55(0x1a1, 'k)VT')][_0x369b55(0x1a0, '%#OD')] = ![];
  }
}
function handleFeedPostDetailsByIds(_0x2b8f15) {
  const _0x1ad25d = _0x21c6fa,
    _0x55ff17 = {
      'fTEcM': function (_0x374ce6, _0x450fc8) {
        return _0x374ce6(_0x450fc8);
      },
      'LHINo': _0x1ad25d(0x1a5, 'wGR5')
    };
  _0x55ff17[_0x1ad25d(0x1c7, 'kWAG')]($done, {
    'body': JSON[_0x1ad25d(0x1f0, 'gTVU')](_0x2b8f15)[_0x1ad25d(0x19b, 'fVGn')](/"isNsfw":true/g, _0x55ff17[_0x1ad25d(0x1ea, 'vLE3')])
  });
}
function handleClearBody(_0x70ae7) {
  _0x70ae7 = {};
}
var version_ = 'jsjiami.com.v7';
>>>>>>> origin/main
