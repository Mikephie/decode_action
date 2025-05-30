//Fri May 30 2025 02:07:46 GMT+0000 (Coordinated Universal Time)
//解密脚本在此
const $ = new Env("麻豆社区");
const selected = $.getdata("scheme_select");
const custom = $.getdata("scheme_custom");
const playerMap = {
  SenPlayer: "SenPlayer://x-callback-url/play?url=",
  Infuse: "infuse://x-callback-url/play?url=",
  PotPlayer: "potplayer://url=",
  nPlayer: "nplayer-http://",
  VLC: "vlc://",
  alook: "alook://open?url=",
  yybp: "yybp://play?url=",
  zoeplay: "zoeplay://",
  Safari: null
};
let scheme = selected === "自定义" ? custom : selected || "SenPlayer";
let playerScheme = playerMap[scheme] ?? (scheme?.includes("://") ? scheme : `${scheme}://`);
if (scheme === "Safari") {
  playerScheme = null;
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwdWJsaWMiLCJleHAiOjE3NDY2MzU1NDMsImlzc3VlciI6ImNvbS5idXR0ZXJmbHkiLCJzdWIiOiJhc2lnbiIsInVzZXJJZCI6MTcwNjI3NjkxfQ.DUQdJOKVJP_C4PRV1eccbQ1fAXwDbs1d1KVrUntSIt0";
(() => {
  function b(v) {
    {
      b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (x) {
        {
          return typeof x;
        }
      } : function (x) {
        return x && "function" == typeof Symbol && x.constructor === Symbol && x !== Symbol.prototype ? "symbol" : typeof x;
      };
      return b(v);
    }
  }
  function c() {
    "use strict";

    var z = {
      ZbDKb: function (ae, af) {
        return ae === af;
      },
      woYZR: "NnNTO",
      yxqcL: function (ae, af) {
        return ae == af;
      },
      omOvM: "function",
      vrGrx: "GeneratorFunction",
      bVboi: "hkWcI",
      VNlNK: function (ae, af, ag) {
        return ae(af, ag);
      },
      kMXJg: function (ae, af) {
        return ae < af;
      },
      mPFQK: function (ae, af) {
        return ae(af);
      },
      pSxBc: "MsgUI",
      iEGJe: "twmwQ",
      tRxrx: function (ae, af) {
        return ae(af);
      },
      jrYPS: "try statement without catch or finally",
      qGCGM: function (ae, af) {
        return ae < af;
      },
      GsAmP: function (ae, af) {
        return ae(af);
      },
      EVQzR: function (ae, af) {
        return ae(af);
      },
      UdEDl: function (ae, af) {
        return ae << af;
      },
      jyeAm: function (ae, af) {
        return ae >> af;
      },
      AJGjJ: function (ae, af) {
        return ae & af;
      },
      bvBGZ: function (ae, af) {
        return ae !== af;
      },
      uIXuh: "pOREH",
      xqryz: "eNfjF",
      GmBcE: function (ae, af) {
        return ae === af;
      },
      NWnqX: "iKjrp",
      GstlV: "next",
      IwRGm: "throw",
      lzZBj: function (ae, af) {
        return ae | af;
      },
      WxJJY: function (ae, af) {
        return ae | af;
      },
      aeUFc: function (ae, af) {
        return ae + af;
      },
      EVyjc: function (ae, af) {
        return ae << af;
      },
      PTacq: function (ae, af) {
        return ae + af;
      },
      jMulJ: function (ae, af) {
        return ae & af;
      },
      nNGrB: function (ae, af) {
        return ae(af);
      },
      WhhAC: function (ae, af) {
        return ae + af;
      },
      MJOyY: "nHWGR",
      CygEM: "return",
      DLJbu: "The iterator does not provide a '",
      dKcgg: "' method",
      ENhkA: "vyOrd",
      cPxrl: "IYEPF",
      ggKaz: "__await",
      YQlnQ: function (ae, af) {
        return ae(af);
      },
      bhleQ: function (ae, af) {
        return ae | af;
      },
      AmlmB: function (ae, af) {
        return ae << af;
      },
      WkopM: function (ae, af) {
        return ae + af;
      },
      CcfXO: "PWxFt",
      pFgsd: "VWTYT",
      swYAK: "wXwiq",
      mWBit: function (ae) {
        return ae();
      },
      QPAZP: "string",
      sMKuN: function (ae, af, ag, ah) {
        return ae(af, ag, ah);
      },
      xQgbA: "symbol",
      Hdxpj: function (ae, af) {
        return ae === af;
      },
      RcDbS: function (ae, af) {
        return ae === af;
      },
      atWZE: function (ae, af) {
        return ae(af);
      },
      vVtZY: "Generator is already running",
      UXgoc: function (ae, af) {
        return ae === af;
      },
      FFYKd: function (ae, af) {
        return ae !== af;
      },
      ZRzZM: "rWsEF",
      WhbRp: function (ae, af) {
        return ae === af;
      },
      wdcuj: function (ae, af) {
        return ae !== af;
      },
      Zzoko: "UeFwE",
      cDlSe: "fjtYH",
      jXVKb: "MrnCc",
      jFiWY: function (ae, af, ag) {
        return ae(af, ag);
      },
      rpMVm: function (ae, af) {
        return ae === af;
      },
      zLolO: "eCiKv",
      XWUqo: function (ae, af) {
        return ae === af;
      },
      CeFDe: function (ae, af) {
        return ae !== af;
      },
      AiHgd: "vCaLX",
      yuMGg: "PfKsU",
      jmHBJ: function (ae, af) {
        return ae === af;
      },
      AjpvP: function (ae, af) {
        return ae !== af;
      },
      iKxNK: "aLoSm",
      gaFAr: function (ae, af) {
        return ae === af;
      },
      HbzJP: function (ae, af) {
        return ae === af;
      },
      NvAJx: function (ae, af, ag, ah) {
        return ae(af, ag, ah);
      },
      mZXwc: function (ae, af) {
        return ae === af;
      },
      hkoHQ: "fLgyd",
      uKUws: "qWaHJ",
      IKLXS: "3|0|5|2|4|1",
      pvzeg: function (ae, af) {
        return ae === af;
      },
      eqWZT: function (ae, af) {
        return ae + af;
      },
      YWpqe: function (ae, af) {
        return ae !== af;
      },
      brweW: "UfCtQ",
      yXVPI: "FeeAA",
      ZtmQQ: function (ae, af) {
        return ae in af;
      },
      GOcdA: function (ae, af) {
        return ae in af;
      },
      cmRxM: "pEurB",
      IRUir: "normal",
      YWYio: "[object Generator]",
      qKqfU: "❌ 执行错误: ",
      DbBHH: function (ae, af) {
        return ae * af;
      },
      UzIsk: "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN",
      ARsep: function (ae, af) {
        return ae(af);
      },
      HBcBd: function (ae, af) {
        return ae(af);
      },
      nlUXM: function (ae, af) {
        return ae === af;
      },
      ZyxoN: "pluZq",
      FeQax: function (ae, af) {
        return ae < af;
      },
      GXMlo: function (ae, af) {
        return ae / af;
      },
      micgP: function (ae, af) {
        return ae + af;
      },
      nIZDZ: function (ae, af) {
        return ae > af;
      },
      xAXwh: function (ae, af) {
        return ae + af;
      },
      XZwkp: function (ae, af) {
        return ae < af;
      },
      SAVML: function (ae, af) {
        return ae | af;
      },
      kwOWR: function (ae, af) {
        return ae + af;
      },
      RYjmm: function (ae, af) {
        return ae + af;
      },
      AXeQC: function (ae, af) {
        return ae & af;
      },
      UrMkg: "无效的 Base64 字符串长度",
      Tfuvm: function (ae, af) {
        return ae !== af;
      },
      jTUyC: "ohSRe",
      ZlYAN: function (ae, af) {
        return ae !== af;
      },
      FQIec: "iWYgS",
      GoNjz: "sSfQL",
      oCZjZ: function (ae, af) {
        return ae == af;
      },
      wiMvK: function (ae, af) {
        return ae(af);
      },
      WjrbB: "YJvZh",
      CzhfQ: function (ae, af) {
        return ae + af;
      },
      HmFBr: function (ae, af) {
        return ae === af;
      },
      Traqf: "break",
      UvJas: function (ae, af) {
        return ae === af;
      },
      RVPvM: "continue",
      LEcuU: function (ae, af) {
        return ae === af;
      },
      XUNiO: "end",
      RbkdI: function (ae, af) {
        return ae - af;
      },
      htdVl: function (ae, af) {
        return ae & af;
      },
      djoRb: function (ae, af) {
        return ae & af;
      },
      KWtrF: function (ae, af) {
        return ae << af;
      },
      BjPlR: "gRDoA",
      xHhQg: "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
      TOeDu: "IYQuX",
      YSJhk: function (ae, af) {
        return ae(af);
      },
      LwkAt: function (ae, af) {
        return ae - af;
      },
      DAccf: "✅ Utils 加载成功, 请继续",
      ADeSw: function (ae, af) {
        return ae(af);
      },
      rrbRM: function (ae, af) {
        return ae !== af;
      },
      ramnJ: "tzpdN",
      ypDoR: "wtEhr",
      yzGEP: function (ae, af) {
        return ae in af;
      },
      wriln: "ykYXR",
      hNfgu: function (ae, af) {
        return ae(af);
      },
      joLWj: function (ae, af, ag, ah) {
        return ae(af, ag, ah);
      },
      bzspy: "_invoke",
      QDNhi: function (ae, af) {
        return ae % af;
      },
      cQbZn: function (ae, af) {
        return ae | af;
      },
      OrrzG: function (ae, af) {
        return ae + af;
      },
      tbpBY: function (ae, af) {
        return ae & af;
      },
      QZysc: function (ae, af) {
        return ae & af;
      },
      JyOQj: function (ae, af) {
        return ae >> af;
      },
      EmVUt: function (ae, af) {
        return ae >> af;
      },
      AdJyM: function (ae, af) {
        return ae & af;
      },
      BlZwa: function (ae, af) {
        return ae << af;
      },
      ZCjFi: function (ae, af) {
        return ae === af;
      },
      UNltA: function (ae, af) {
        return ae | af;
      },
      HJyCS: function (ae, af) {
        return ae >> af;
      },
      LPByU: function (ae, af) {
        return ae & af;
      },
      EIBPO: function (ae, af, ag, ah, ai) {
        return ae(af, ag, ah, ai);
      },
      jgJED: "bwKPv",
      neZjf: "sqxWC",
      fKXyF: function (ae, af) {
        return ae >= af;
      },
      yEQow: "zUPIA",
      rXyiG: function (ae, af) {
        return ae <= af;
      },
      WKTRB: "AngWg",
      qDkUm: "stvGf",
      ZYXjd: function (ae, af) {
        return ae === af;
      },
      LprTx: function (ae, af) {
        return ae <= af;
      },
      ZrgLB: "Utils_Code",
      yxVQI: function (ae, af) {
        return ae === af;
      },
      keDdF: "nbqGP",
      BhskF: function (ae, af) {
        return ae === af;
      },
      NInbp: function (ae, af) {
        return ae === af;
      },
      iOrVd: function (ae, af) {
        return ae === af;
      },
      sbMOM: "1|4|2|3|0",
      IKBKX: function (ae, af, ag) {
        return ae(af, ag);
      },
      QwKbM: function (ae, af) {
        return ae != af;
      },
      kJPis: "lytSw",
      OJxbh: "yvfdc",
      ipfah: function (ae, af) {
        return ae === af;
      },
      EPqFH: function (ae, af) {
        return ae != af;
      },
      UooKD: "undefined",
      YMChA: "@@iterator",
      KrnLI: function (ae, af) {
        return ae - af;
      },
      ZCpAv: "LdJIN",
      QXaFN: "tTWAF",
      xmiYv: "zzhfv",
      uPIpy: "illegal catch attempt"
    };
    c = function () {
      {
        return F;
      }
    };
    var D;
    var F = {};
    var G = Object.prototype;
    var H = G.hasOwnProperty;
    var I = Object.defineProperty || function (ae, af, ag) {
      {
        ae[af] = ag.value;
      }
    };
    var J = "function" == typeof Symbol ? Symbol : {};
    var K = J.iterator || "@@iterator";
    var M = J.asyncIterator || "@@asyncIterator";
    var N = J.toStringTag || "@@toStringTag";
    function O(ae, af, ag) {
      {
        var ah = {
          value: ag,
          enumerable: true,
          configurable: true,
          writable: true
        };
        Object.defineProperty(ae, af, ah);
        return ae[af];
      }
    }
    try {
      {
        O({}, "");
      }
    } catch (af) {
      {
        O = function (ah, ai, aj) {
          {
            return ah[ai] = aj;
          }
        };
      }
    }
    function P(ah, ai, aj, ak) {
      {
        var am = ai && ai.prototype instanceof Z ? ai : Z;
        var an = Object.create(am.prototype);
        var ao = new ac(ak || []);
        I(an, "_invoke", {
          value: a8(ah, aj, ao)
        });
        return an;
      }
    }
    function Q(ah, ai, aj) {
      {
        try {
          {
            return {
              type: "normal",
              arg: ah.call(ai, aj)
            };
          }
        } catch (ao) {
          {
            var al = {
              type: "throw",
              arg: ao
            };
            return al;
          }
        }
      }
    }
    F.wrap = P;
    var R = "suspendedStart";
    var V = "suspendedYield";
    var W = "executing";
    var X = "completed";
    var Y = {};
    function Z() {}
    function a0() {}
    function a1() {}
    var a2 = {};
    O(a2, K, function () {
      {
        return this;
      }
    });
    var a3 = Object.getPrototypeOf;
    var a4 = a3 && a3(a3(ad([])));
    a4 && a4 !== G && H.call(a4, K) && (a2 = a4);
    a1.prototype = Z.prototype = Object.create(a2);
    var a5 = a1.prototype;
    function a6(ah) {
      {
        ["next", "throw", "return"].forEach(function (ak) {
          {
            O(ah, ak, function (am) {
              {
                return this._invoke(ak, am);
              }
            });
          }
        });
      }
    }
    function a7(ah, ai) {
      var aj = {
        HSDEW: function (al, am) {
          return al | am;
        },
        zkIKS: function (al, am) {
          return al << am;
        },
        YLfux: function (al, am) {
          return al + am;
        },
        kgOwT: function (al, am) {
          return al + am;
        },
        HFKEt: function (al, am) {
          return al & am;
        },
        fAbSA: function (al, am) {
          return al >> am;
        },
        GdEqA: function (al, am) {
          return al & am;
        },
        GhtjD: function (al, am) {
          return al === am;
        },
        hhFkF: "hkEGo",
        brAag: "tPEnm",
        xkjZb: function (al, am) {
          return al === am;
        },
        AqHtY: "LvivF",
        mdcMW: function (al, am, an, ao, ap) {
          return al(am, an, ao, ap);
        }
      };
      {
        function am(an, ao, ap, aq) {
          {
            var as = Q(ah[an], ah, ao);
            if ("throw" !== as.type) {
              {
                var at = as.arg;
                var au = at.value;
                return au && "object" == b(au) && H.call(au, "__await") ? ai.resolve(au.__await).then(function (aw) {
                  {
                    am("next", aw, ap, aq);
                  }
                }, function (aw) {
                  {
                    am("throw", aw, ap, aq);
                  }
                }) : ai.resolve(au).then(function (aw) {
                  {
                    at.value = aw;
                    ap(at);
                  }
                }, function (aw) {
                  {
                    return am("throw", aw, ap, aq);
                  }
                });
              }
            }
            aq(as.arg);
          }
        }
        var ak;
        I(this, "_invoke", {
          value: function (an, ao) {
            {
              function aq() {
                {
                  return new ai(function (as, at) {
                    {
                      am(an, ao, as, at);
                    }
                  });
                }
              }
              return ak = ak ? ak.then(aq, aq) : aq();
            }
          }
        });
      }
    }
    function a8(ah, ai, aj) {
      {
        var al = R;
        return function (am, an) {
          {
            if (al === W) {
              throw Error("Generator is already running");
            }
            if (al === X) {
              {
                if ("throw" === am) {
                  throw an;
                }
                var ap = {
                  value: D,
                  done: true
                };
                return ap;
              }
            }
            for (aj.method = am, aj.arg = an;;) {
              {
                var aq = aj.delegate;
                if (aq) {
                  {
                    var ar = a9(aq, aj);
                    if (ar) {
                      {
                        if (ar === Y) {
                          continue;
                        }
                        return ar;
                      }
                    }
                  }
                }
                if ("next" === aj.method) {
                  aj.sent = aj._sent = aj.arg;
                } else {
                  if ("throw" === aj.method) {
                    {
                      if (al === R) {
                        throw al = X, aj.arg;
                      }
                      aj.dispatchException(aj.arg);
                    }
                  } else {
                    "return" === aj.method && aj.abrupt("return", aj.arg);
                  }
                }
                al = W;
                var as = Q(ah, ai, aj);
                if ("normal" === as.type) {
                  {
                    if (al = aj.done ? X : V, as.arg === Y) {
                      continue;
                    }
                    var at = {
                      value: as.arg,
                      done: aj.done
                    };
                    return at;
                  }
                }
                "throw" === as.type && (al = X, aj.method = "throw", aj.arg = as.arg);
              }
            }
          }
        };
      }
    }
    function a9(ah, ai) {
      {
        var al = ai.method;
        var am = ah.iterator[al];
        if (am === D) {
          ai.delegate = null;
          "throw" === al && ah.iterator.return && (ai.method = "return", ai.arg = D, a9(ah, ai), "throw" === ai.method) || "return" !== al && (ai.method = "throw", ai.arg = new TypeError("The iterator does not provide a '" + al + "' method"));
          return Y;
        }
        var ao = Q(am, ah.iterator, ai.arg);
        if ("throw" === ao.type) {
          ai.method = "throw";
          ai.arg = ao.arg;
          ai.delegate = null;
          return Y;
        }
        var an = ao.arg;
        return an ? an.done ? (ai[ah.resultName] = an.value, ai.next = ah.nextLoc, "return" !== ai.method && (ai.method = "next", ai.arg = D), ai.delegate = null, Y) : an : (ai.method = "throw", ai.arg = new TypeError("iterator result is not an object"), ai.delegate = null, Y);
      }
    }
    function aa(ah) {
      {
        var ak = {
          tryLoc: ah[0]
        };
        1 in ah && (ak.catchLoc = ah[1]);
        2 in ah && (ak.finallyLoc = ah[2], ak.afterLoc = ah[3]);
        this.tryEntries.push(ak);
      }
    }
    function ab(ah) {
      {
        var ak = ah.completion || {};
        ak.type = "normal";
        delete ak.arg;
        ah.completion = ak;
      }
    }
    function ac(ah) {
      {
        var aj = {
          tryLoc: "root"
        };
        this.tryEntries = [aj];
        ah.forEach(aa, this);
        this.reset(true);
      }
    }
    function ad(ah) {
      var ai = {
        HMnrz: function (am, an) {
          return am * an;
        },
        nOJWB: function (am, an) {
          return am(an);
        },
        DbJCj: "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN",
        skiau: function (am, an) {
          return am(an);
        },
        SZnOO: function (am, an) {
          return am(an);
        },
        psLun: function (am, an) {
          return am === an;
        },
        ChqlJ: "pluZq",
        IfUbp: function (am, an) {
          return am < an;
        },
        XNuUL: "2|3|7|9|8|4|1|5|6|0",
        eMQjd: function (am, an) {
          return am - an;
        },
        zqTCB: function (am, an) {
          return am % an;
        },
        tDoVY: function (am, an) {
          return am / an;
        },
        XGQDm: function (am, an) {
          return am + an;
        },
        MKTxS: function (am, an) {
          return am > an;
        },
        GGHzk: function (am, an) {
          return am | an;
        },
        TSpvN: function (am, an) {
          return am | an;
        },
        fnYdP: function (am, an) {
          return am << an;
        },
        EubRo: function (am, an) {
          return am + an;
        },
        cifSu: function (am, an) {
          return am & an;
        },
        zIllk: function (am, an) {
          return am >> an;
        },
        rkWDJ: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        iBCZT: function (am, an) {
          return am < an;
        },
        EEfLv: function (am, an) {
          return am | an;
        },
        TmKrr: function (am, an) {
          return am + an;
        },
        DJAIM: function (am, an) {
          return am << an;
        },
        lqGSE: function (am, an) {
          return am + an;
        },
        EYIJx: function (am, an) {
          return am + an;
        },
        Djztd: function (am, an) {
          return am & an;
        },
        yhYHI: "无效的 Base64 字符串长度"
      };
      {
        if (ah || "" === ah) {
          {
            var aj = ah[K];
            if (aj) {
              return aj.call(ah);
            }
            if ("function" == typeof ah.next) {
              return ah;
            }
            if (!isNaN(ah.length)) {
              {
                var ak = -1;
                var al = function an() {
                  var ao = {
                    HwhNQ: function (ap, aq) {
                      return ap < aq;
                    },
                    GKsnc: function (ap, aq) {
                      return ap * aq;
                    },
                    STFIw: function (ap, aq) {
                      return ap(aq);
                    },
                    gFkDV: function (ap, aq) {
                      return ap(aq);
                    },
                    jlxxU: "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN",
                    rldvV: function (ap, aq) {
                      return ap / aq;
                    },
                    kUHYk: function (ap, aq) {
                      return ap(aq);
                    },
                    UxkzI: function (ap, aq) {
                      return ap(aq);
                    },
                    wBFxb: function (ap, aq) {
                      return ap(aq);
                    },
                    eaCMj: function (ap, aq) {
                      return ap(aq);
                    },
                    TPDLV: function (ap, aq) {
                      return ap(aq);
                    },
                    xxZyJ: function (ap, aq) {
                      return ap(aq);
                    }
                  };
                  {
                    for (; ++ak < ah.length;) {
                      if (H.call(ah, ak)) {
                        an.value = ah[ak];
                        an.done = false;
                        return an;
                      }
                    }
                    an.value = D;
                    an.done = true;
                    return an;
                  }
                };
                return al.next = al;
              }
            }
          }
        }
        throw new TypeError(b(ah) + " is not iterable");
      }
    }
    a0.prototype = a1;
    I(a5, "constructor", {
      value: a1,
      configurable: true
    });
    I(a1, "constructor", {
      value: a0,
      configurable: true
    });
    a0.displayName = O(a1, N, "GeneratorFunction");
    F.isGeneratorFunction = function (ah) {
      {
        var ai = "function" == typeof ah && ah.constructor;
        return !!ai && (ai === a0 || "GeneratorFunction" === (ai.displayName || ai.name));
      }
    };
    F.mark = function (ah) {
      {
        Object.setPrototypeOf ? Object.setPrototypeOf(ah, a1) : (ah.__proto__ = a1, O(ah, N, "GeneratorFunction"));
        ah.prototype = Object.create(a5);
        return ah;
      }
    };
    F.awrap = function (ah) {
      {
        var ai = {
          __await: ah
        };
        return ai;
      }
    };
    a6(a7.prototype);
    O(a7.prototype, M, function () {
      {
        return this;
      }
    });
    F.AsyncIterator = a7;
    F.async = function (ah, ai, aj, ak, al) {
      {
        undefined === al && (al = Promise);
        var an = new a7(P(ah, ai, aj, ak), al);
        return F.isGeneratorFunction(ai) ? an : an.next().then(function (ap) {
          {
            return ap.done ? ap.value : an.next();
          }
        });
      }
    };
    a6(a5);
    O(a5, N, "Generator");
    O(a5, K, function () {
      return this;
    });
    O(a5, "toString", function () {
      {
        return "[object Generator]";
      }
    });
    F.keys = function (ah) {
      {
        var aj = Object(ah);
        var ak = [];
        for (var al in aj) ak.push(al);
        ak.reverse();
        return function am() {
          {
            for (; ak.length;) {
              {
                var ao = ak.pop();
                if (ao in aj) {
                  am.value = ao;
                  am.done = false;
                  return am;
                }
              }
            }
            am.done = true;
            return am;
          }
        };
      }
    };
    F.values = ad;
    ac.prototype = {
      constructor: ac,
      reset: function (ah) {
        {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = D, this.done = false, this.delegate = null, this.method = "next", this.arg = D, this.tryEntries.forEach(ab), !ah) {
            for (var ai in this) "t" === ai.charAt(0) && H.call(this, ai) && !isNaN(+ai.slice(1)) && (this[ai] = D);
          }
        }
      },
      stop: function () {
        {
          this.done = true;
          var ai = this.tryEntries[0].completion;
          if ("throw" === ai.type) {
            throw ai.arg;
          }
          return this.rval;
        }
      },
      dispatchException: function (ah) {
        var ai = {
          tmQnf: function (ap, aq) {
            return ap(aq);
          },
          XdSyo: function (ap, aq) {
            return ap !== aq;
          },
          wwmNa: "CuPeU",
          irNwE: "atzMd",
          mpTKB: function (ap, aq) {
            return ap(aq);
          },
          tEVMM: function (ap, aq) {
            return ap(aq);
          },
          yOJiF: "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN",
          iGbIM: function (ap, aq) {
            return ap(aq);
          },
          uuZlz: function (ap, aq) {
            return ap(aq);
          },
          DYdzk: function (ap, aq) {
            return ap(aq);
          },
          tdlQt: function (ap, aq) {
            return ap(aq);
          },
          VhkKk: function (ap, aq) {
            return ap(aq);
          },
          debhG: function (ap, aq) {
            return ap(aq);
          },
          LALkM: function (ap, aq) {
            return ap(aq);
          },
          DpaXE: function (ap, aq) {
            return ap(aq);
          },
          VDyzG: function (ap, aq) {
            return ap(aq);
          },
          OZgUo: function (ap, aq) {
            return ap(aq);
          },
          opvNA: function (ap, aq) {
            return ap == aq;
          },
          zHbhu: function (ap, aq) {
            return ap > aq;
          },
          unVYi: function (ap, aq) {
            return ap < aq;
          }
        };
        {
          if (this.done) {
            throw ah;
          }
          var aj = this;
          function aq(ar, as) {
            {
              am.type = "throw";
              am.arg = ah;
              aj.next = ar;
              as && (aj.method = "next", aj.arg = D);
              return !!as;
            }
          }
          for (var ak = this.tryEntries.length - 1; ak >= 0; --ak) {
            {
              var al = this.tryEntries[ak];
              var am = al.completion;
              if ("root" === al.tryLoc) {
                return aq("end");
              }
              if (al.tryLoc <= this.prev) {
                {
                  var an = H.call(al, "catchLoc");
                  var ao = H.call(al, "finallyLoc");
                  if (an && ao) {
                    {
                      if (this.prev < al.catchLoc) {
                        return aq(al.catchLoc, true);
                      }
                      if (this.prev < al.finallyLoc) {
                        return aq(al.finallyLoc);
                      }
                    }
                  } else {
                    if (an) {
                      {
                        if (this.prev < al.catchLoc) {
                          return aq(al.catchLoc, true);
                        }
                      }
                    } else {
                      {
                        if (!ao) {
                          throw Error("try statement without catch or finally");
                        }
                        if (this.prev < al.finallyLoc) {
                          return aq(al.finallyLoc);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      abrupt: function (ah, ai) {
        {
          for (var aj = this.tryEntries.length - 1; aj >= 0; --aj) {
            {
              var ak = this.tryEntries[aj];
              if (ak.tryLoc <= this.prev && H.call(ak, "finallyLoc") && this.prev < ak.finallyLoc) {
                {
                  var al = ak;
                  break;
                }
              }
            }
          }
          al && ("break" === ah || "continue" === ah) && al.tryLoc <= ai && ai <= al.finallyLoc && (al = null);
          var am = al ? al.completion : {};
          am.type = ah;
          am.arg = ai;
          return al ? (this.method = "next", this.next = al.finallyLoc, Y) : this.complete(am);
        }
      },
      complete: function (ah, ai) {
        {
          if ("throw" === ah.type) {
            throw ah.arg;
          }
          "break" === ah.type || "continue" === ah.type ? this.next = ah.arg : "return" === ah.type ? (this.rval = this.arg = ah.arg, this.method = "return", this.next = "end") : "normal" === ah.type && ai && (this.next = ai);
          return Y;
        }
      },
      finish: function (ah) {
        {
          for (var aj = this.tryEntries.length - 1; aj >= 0; --aj) {
            {
              var ak = this.tryEntries[aj];
              if (ak.finallyLoc === ah) {
                this.complete(ak.completion, ak.afterLoc);
                ab(ak);
                return Y;
              }
            }
          }
        }
      },
      catch: function (ah) {
        for (var ai = this.tryEntries.length - 1; ai >= 0; --ai) {
          {
            var aj = this.tryEntries[ai];
            if (aj.tryLoc === ah) {
              {
                var ak = aj.completion;
                if ("throw" === ak.type) {
                  {
                    var al = ak.arg;
                    ab(aj);
                  }
                }
                return al;
              }
            }
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (ah, ai, aj) {
        {
          this.delegate = {
            iterator: ad(ah),
            resultName: ai,
            nextLoc: aj
          };
          "next" === this.method && (this.arg = D);
          return Y;
        }
      }
    };
    return F;
  }
  function d(v) {
    {
      return h(v) || g(v) || f(v) || e();
    }
  }
  function e() {
    {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
  }
  function f(v, w) {
    {
      if (v) {
        {
          if ("string" == typeof v) {
            return i(v, w);
          }
          var x = {}.toString.call(v).slice(8, -1);
          "Object" === x && v.constructor && (x = v.constructor.name);
          return "Map" === x || "Set" === x ? Array.from(v) : "Arguments" === x || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x) ? i(v, w) : undefined;
        }
      }
    }
  }
  function g(v) {
    {
      if ("undefined" != typeof Symbol && null != v[Symbol.iterator] || null != v["@@iterator"]) {
        return Array.from(v);
      }
    }
  }
  function h(v) {
    {
      if (Array.isArray(v)) {
        return i(v);
      }
    }
  }
  function i(v, w) {
    {
      (null == w || w > v.length) && (w = v.length);
      for (var x = 0, y = Array(w); x < w; x++) {
        y[x] = v[x];
      }
      return y;
    }
  }
  function j(v, w, x, y, z, A, B) {
    {
      try {
        {
          var D = v[A](B);
          var E = D.value;
        }
      } catch (H) {
        {
          return void x(H);
        }
      }
      D.done ? w(E) : Promise.resolve(E).then(y, z);
    }
  }
  function k(v) {
    return function () {
      var w = {
        SbeoX: function (z, A) {
          return z === A;
        },
        bSCcB: "dfbos",
        VmgUY: "next",
        Hsfgx: "string",
        ArWbK: "Map",
        fCRaL: "Set",
        TLFfZ: "WXIgY",
        cNojm: function (z, A, B, C, D, E, F, G) {
          return z(A, B, C, D, E, F, G);
        },
        nkltg: "throw",
        dCCpR: function (z, A) {
          return z(A);
        }
      };
      var x = this;
      var y = arguments;
      return new Promise(function (z, A) {
        var C = v.apply(x, y);
        function D(F) {
          j(C, z, A, D, E, "next", F);
        }
        function E(F) {
          {
            j(C, z, A, D, E, "throw", F);
          }
        }
        D(undefined);
      });
    };
  }
  function l() {
    return m.apply(this, arguments);
  }
  function m() {
    {
      m = k(c().mark(function x() {
        {
          var A;
          var B;
          var C;
          var D;
          var E;
          var F;
          var G;
          var H;
          var I;
          var J;
          var K;
          var L;
          var M;
          var N;
          return c().wrap(function (O) {
            var P = {
              rEYni: function (Q, R) {
                return Q < R;
              },
              XOKzx: function (Q, R) {
                return Q === R;
              },
              SxedT: function (Q, R) {
                return Q == R;
              },
              HJuId: "function",
              dRUKF: function (Q, R) {
                return Q(R);
              },
              tUjCG: " is not iterable",
              ahSOT: "normal",
              eaqJT: function (Q, R) {
                return Q === R;
              }
            };
            {
              for (;;) {
                switch (O.prev = O.next) {
                  case 0:
                    O.next = 2;
                    return n();
                  case 2:
                    if (A = O.sent, B = A.createCryptoJS(), C = $response.body, D = $request.url, E = C.match(/"data"\s*:\s*"([^"]+)"/), E) {
                      {
                        O.next = 9;
                        break;
                      }
                    }
                    return O.abrupt("return", $.done({}));
                  case 9:
                    if (F = E[1], G = p(F, B), !/\/api\/app\/user\/info/.test(D)) {
                      {
                        O.next = 28;
                        break;
                      }
                    }
                    H = G;
                    H = H.replace(/"nickName"\s*:\s*".*?"/, "\"nickName\":\"baby66\"");
                    H = H.replace(/"vipExpire"\s*:\s*-?\d+/, "\"vipExpire\":62135596800");
                    H = H.replace(/"vipExpireTime"\s*:\s*".*?"/, "\"vipExpireTime\":\"9001-01-01T00:00:00Z\"");
                    H = H.replace(/"vipType"\s*:\s*\d+/, "\"vipType\":9");
                    H = H.replace(/"liveVipExpire"\s*:\s*".*?"/, "\"liveVipExpire\":\"9001-01-01T00:00:00Z\"");
                    H = H.replace(/"vipLevel"\s*:\s*\d+/, "\"vipLevel\":9");
                    H = H.replace(/"cardName"\s*:\s*".*?"/, "\"cardName\":\"永久VIP\"");
                    H = H.replace(/"leftWatchTimes"\s*:\s*\d+/, "\"leftWatchTimes\":9999");
                    H = H.replace(/"totalWatchTimes"\s*:\s*\d+/, "\"totalWatchTimes\":9999");
                    H = H.replace(/"movieTickets"\s*:\s*\d+/, "\"movieTickets\":9999");
                    H = H.replace(/"isQuest"\s*:\s*(true|false)/, "\"isQuest\":false");
                    H = H.replace(/"isOpen"\s*:\s*false/g, "\"isOpen\":true");
                    I = q(H, B);
                    J = C.replace(/"data"\s*:\s*"([^"]+)"/, "\"data\":\"".concat(I, "\""));
                    return O.abrupt("return", $.done({
                      body: J
                    }));
                  case 28:
                    if (!/\/api\/app\/media\/play/.test(D)) {
                      {
                        O.next = 32;
                        break;
                      }
                    }
                    K = G.match(/"videoUrl"\s*:\s*"(.*?)"/);
                    K && K[1] && (L = K[1], M = "https://d1skbu98kuldnf.cloudfront.net/api/app/media/m3u8ex/".concat(L, "?token=").concat(token), N = playerScheme ? playerScheme + encodeURIComponent(M) : M, $.msg("🎬 已经获取到视频啦", "如果你喜欢小b的脚本，记得来频道点个关注哦❤️", "点击即可播放完整版~", N));
                    return O.abrupt("return", $.done({}));
                  case 32:
                    $.done({});
                  case 33:
                  case "end":
                    return O.stop();
                }
              }
            }
          }, x);
        }
      }));
      return m.apply(this, arguments);
    }
  }
  function n() {
    {
      return o.apply(this, arguments);
    }
  }
  function o() {
    o = k(c().mark(function v() {
      var x;
      return c().wrap(function y(z) {
        for (;;) {
          switch (z.prev = z.next) {
            case 0:
              if (x = $.getdata("Utils_Code") || "", !x || !Object.keys(x).length) {
                z.next = 5;
                break;
              }
              console.log("✅ ".concat($.name, ": 缓存中存在 Utils 代码, 跳过下载"));
              eval(x);
              return z.abrupt("return", creatUtils());
            case 5:
              console.log("🚀 ".concat($.name, ": 开始下载 Utils 代码"));
              return z.abrupt("return", new Promise(function () {
                var B = k(c().mark(function C(D) {
                  return c().wrap(function F(G) {
                    for (;;) {
                      switch (G.prev = G.next) {
                        case 0:
                          $.getScript("https://github.moeyy.xyz/https://raw.githubusercontent.com/xzxxn777/Surge/main/Utils/Utils.js").then(function (H) {
                            $.setdata(H, "Utils_Code");
                            eval(H);
                            console.log("✅ Utils 加载成功, 请继续");
                            D(creatUtils());
                          });
                        case 1:
                        case "end":
                          return G.stop();
                      }
                    }
                  }, C);
                }));
                return function (D) {
                  return B.apply(this, arguments);
                };
              }()));
            case 7:
            case "end":
              return z.stop();
          }
        }
      }, v);
    }));
    return o.apply(this, arguments);
  }
  function p(w, x) {
    var z = Array.from(r(w));
    var B = z.splice(0, 12);
    var C = [].concat(d(u("vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN")), d(B));
    var D = Math.floor(C.length / 2);
    var E = s(C);
    var F = x.enc.Base64.parse(E);
    var G = t(x.SHA256(F).toString()).splice(8, 16);
    var H = [].concat(d(G), d(C.splice(0, D)));
    var I = s(H);
    var J = x.enc.Base64.parse(I);
    var K = t(x.SHA256(J).toString());
    var L = [].concat(d(C), d(G));
    var M = s(L);
    var N = x.enc.Base64.parse(M);
    var O = t(x.SHA256(N).toString());
    var P = [].concat(d(K.splice(0, 8)), d(O.splice(8, 16)), d(K.splice(16, 24)));
    var Q = [].concat(d(O.splice(0, 4)), d(K.splice(4, 8)), d(O.splice(8, 12)));
    var R = s(z);
    var S = x.enc.Base64.parse(s(P));
    var T = x.enc.Base64.parse(s(Q));
    return x.AES.decrypt(R, S, {
      iv: T,
      mode: x.mode.CBC
    }).toString(x.enc.Utf8);
  }
  function q(w, x) {
    for (var z = [], B = 0; B < 12; B++) {
      z.push(Math.floor(256 * Math.random()));
    }
    var C = [].concat(d(u("vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN")), z);
    var D = Math.floor(C.length / 2);
    var E = s(C);
    var F = x.enc.Base64.parse(E);
    var G = t(x.SHA256(F).toString()).splice(8, 16);
    var H = [].concat(d(G), d(C.splice(0, D)));
    var I = s(H);
    var J = x.enc.Base64.parse(I);
    var K = t(x.SHA256(J).toString());
    var L = [].concat(d(C), d(G));
    var M = s(L);
    var N = x.enc.Base64.parse(M);
    var O = t(x.SHA256(N).toString());
    var P = [].concat(d(K.splice(0, 8)), d(O.splice(8, 16)), d(K.splice(16, 24)));
    var Q = [].concat(d(O.splice(0, 4)), d(K.splice(4, 8)), d(O.splice(8, 12)));
    var R = x.enc.Base64.parse(s(P));
    var S = x.enc.Base64.parse(s(Q));
    var T = x.AES.encrypt(x.enc.Utf8.parse(w), R, {
      iv: S,
      mode: x.mode.CBC,
      padding: x.pad.Pkcs7
    });
    return s([].concat(z, d(Array.from(r(T.ciphertext.toString(x.enc.Base64))))));
  }
  function r(v) {
    for (var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", x = [], z = 0; z < 64; z++) {
      x[w.charCodeAt(z)] = z;
    }
    x["-".charCodeAt(0)] = 62;
    x["_".charCodeAt(0)] = 63;
    var A = v.length;
    if (A % 4 > 0) {
      throw new Error("无效的 Base64 字符串长度");
    }
    var B = v.indexOf("=");
    B = -1 === B ? A : B;
    for (var C = B === A ? 0 : 4 - B % 4, D = 3 * (B + C) / 4 - C, E = new Uint8Array(D), F = 0, G = C > 0 ? B - 4 : B, H = 0; H < G; H += 4) {
      var I = x[v.charCodeAt(H)] << 18 | x[v.charCodeAt(H + 1)] << 12 | x[v.charCodeAt(H + 2)] << 6 | x[v.charCodeAt(H + 3)];
      E[F++] = I >> 16 & 255;
      E[F++] = I >> 8 & 255;
      E[F++] = 255 & I;
    }
    if (2 === C) {
      var J = x[v.charCodeAt(G)] << 2 | x[v.charCodeAt(G + 1)] >> 4;
      E[F++] = 255 & J;
    }
    if (1 === C) {
      var K = x[v.charCodeAt(G)] << 10 | x[v.charCodeAt(G + 1)] << 4 | x[v.charCodeAt(G + 2)] >> 2;
      E[F++] = K >> 8 & 255;
      E[F++] = 255 & K;
    }
    return E;
  }
  function s(v) {
    for (var w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", x = v.length, y = x % 3, z = [], A = 0; A < x - y; A += 3) {
      var B = v[A] << 16 | v[A + 1] << 8 | v[A + 2];
      z.push(w[B >> 18 & 63], w[B >> 12 & 63], w[B >> 6 & 63], w[63 & B]);
    }
    if (1 === y) {
      var C = v[x - 1];
      z.push(w[C >> 2], w[C << 4 & 63], "==");
    } else {
      if (2 === y) {
        var D = v[x - 2] << 8 | v[x - 1];
        z.push(w[D >> 10], w[D >> 4 & 63], w[D << 2 & 63], "=");
      }
    }
    return z.join("");
  }
  function t(v) {
    var w = 0;
    var x = v.length;
    if (x % 2 != 0) {
      return null;
    }
    x /= 2;
    for (var y = [], z = 0; z < x; z++) {
      var A = v.substr(w, 2);
      var B = parseInt(A, 16);
      y.push(B);
      w += 2;
    }
    return y;
  }
  function u(v) {
    for (var w = encodeURIComponent(v), x = [], y = 0; y < w.length; y++) {
      var z = w.charAt(y);
      if ("%" === z) {
        var A = w.charAt(y + 1) + w.charAt(y + 2);
        var B = parseInt(A, 16);
        x.push(B);
        y += 2;
      } else {
        x.push(z.charCodeAt(0));
      }
    }
    return x;
  }
  l().catch(function (v) {
    console.log("❌ 执行错误: ".concat(v.message));
    $.done({});
  });
})();
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
      "POST" === e && (s = this.post);
      return new Promise((e, a) => {
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
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
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
      if (a) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
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
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [i, o] = a.split("@");
        const n = {
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
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile);
        const e = this.path.resolve(process.cwd(), this.dataFile);
        const s = this.fs.existsSync(t);
        const a = !s && this.fs.existsSync(e);
        if (!s && !a) {
          return {};
        }
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
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile);
        const e = this.path.resolve(process.cwd(), this.dataFile);
        const s = this.fs.existsSync(t);
        const a = !s && this.fs.existsSync(e);
        const r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const a = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of a) if (r = Object(r)[t], undefined === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t);
        const r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, a, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e);
        const i = this.getval(a);
        const o = a ? "null" === i ? null : i || "{}" : "{}";
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), a);
        } catch (e) {
          const i = {};
          this.lodash_set(i, r, t);
          s = this.setval(JSON.stringify(i), a);
        }
      } else {
        s = this.setval(t, e);
      }
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
          this.data = this.loaddata();
          return this.data[t];
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
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return true;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, undefined === t.headers.Cookie && undefined === t.cookieJar && (t.cookieJar = this.ckjar));
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
          }));
          $httpClient.get(t, (t, s, a) => {
            !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, a);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: false
          }));
          $task.fetch(t).then(t => {
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
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null);
                e.cookieJar = this.ckjar;
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
            } = t;
            const n = s.decode(o, this.encoding);
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
          }));
          $httpClient[s](t, (t, s, a) => {
            !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, a);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: false
          }));
          $task.fetch(t).then(t => {
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
            } = t;
            const n = a.decode(o, this.encoding);
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
      e = e.substring(0, e.length - 1);
      return e;
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
                  let e = t.openUrl || t.url || t["open-url"];
                  let s = t.mediaUrl || t["media-url"];
                  return {
                    openUrl: e,
                    mediaUrl: s
                  };
                }
              case "Quantumult X":
                {
                  let e = t["open-url"] || t.url || t.openUrl;
                  let s = t["media-url"] || t.mediaUrl;
                  let a = t["update-pasteboard"] || t.updatePasteboard;
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
      if (!this.isMute) {
        switch (this.getEnv()) {
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
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        a && t.push(a);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
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
      const e = new Date().getTime();
      const s = (e - this.startTime) / 1000;
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