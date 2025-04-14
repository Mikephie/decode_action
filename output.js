// 2025-04-14T21:27:48.054Z
// Base: https://github.com/echo094/decode-js
// Modify: https://github.com/smallfawn/decode_action

(() => {
  function g(H, I) {
    {
      var K = "undefined" != typeof Symbol && H[Symbol.iterator] || H["@@iterator"];
      if (!K) {
        {
          if (Array.isArray(H) || (K = function(R, S) {
              {
                if (R) {
                  {
                    if ("string" == typeof R) {
                      return j(R, S);
                    }
                    var T = {}.toString.call(R).slice(8, -1);
                    "Object" === T && R.constructor && (T = R.constructor.name);
                    return "Map" === T || "Set" === T ? Array.from(R) : "Arguments" === T || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(T) ? j(R, S) : undefined;
                  }
                }
              }
            }(H)) || I && H && "number" == typeof H.length) {
            {
              K && (H = K);
              var L = 0;
              var M = function() {};
              return {
                s: M,
                n: function() {
                  {
                    var T = {
                      done: true
                    };
                    return L >= H.length ? T : {
                      done: false,
                      value: H[L++]
                    };
                  }
                },
                e: function(S) {
                  {
                    throw S;
                  }
                },
                f: M
              };
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
      }
      var N;
      var O = true;
      var P = false;
      return {
        s: function() {
          {
            K = K.call(H);
          }
        },
        n: function() {
          {
            var S = K.next();
            O = S.done;
            return S;
          }
        },
        e: function(S) {
          {
            P = true;
            N = S;
          }
        },
        f: function() {
          {
            try {
              {
                O || null == K.return || K.return();
              }
            } finally {
              {
                if (P) {
                  throw N;
                }
              }
            }
          }
        }
      };
    }
  }

  function j(H, I) {
    {
      (null == I || I > H.length) && (I = H.length);
      for (var K = 0, L = Array(I); K < I; K++) {
        L[K] = H[K];
      }
      return L;
    }
  }

  function k() {
    "use strict";

    var H = {
      gMAmG: function(ak, al) {
        return ak < al;
      },
      GUgzv: function(ak, al) {
        return ak === al;
      },
      pgARc: "YEdsc",
      oZWBk: "[object Generator]",
      tHvDF: function(ak, al, am, an, ao) {
        return ak(al, am, an, ao);
      },
      PBZJf: "Wvdxi",
      wYInB: "zRsuE",
      HIRyg: function(ak, al) {
        return ak == al;
      },
      RYGge: function(ak, al) {
        return ak in al;
      },
      RLOYy: "function",
      GIGRW: function(ak, al) {
        return ak !== al;
      },
      NNqbU: "XOBvf",
      tMyHS: "acYMV",
      cVzjX: "normal",
      NgCVK: "CcvxZ",
      IILxu: "throw",
      cKVOX: "catchLoc",
      FZChq: "finallyLoc",
      BnTGI: function(ak, al, am) {
        return ak(al, am);
      },
      diKyv: function(ak, al) {
        return ak(al);
      },
      idlqZ: "try statement without catch or finally",
      QKGFK: function(ak, al) {
        return ak === al;
      },
      CNGPb: "ioNVF",
      uPqsS: function(ak, al) {
        return ak === al;
      },
      hVanZ: "qgisx",
      QHFPY: "uHFCG",
      FgzLj: "cVcow",
      iBRLl: "wvppV",
      tbYgE: function(ak) {
        return ak();
      },
      EtmUz: function(ak, al) {
        return ak(al);
      },
      ZdhlW: "string",
      bpPqS: "Set",
      llXZV: "kvXdA",
      RKWje: "aslWV",
      bgYlI: function(ak, al, am, an, ao) {
        return ak(al, am, an, ao);
      },
      Pggcv: "fvVdC",
      YUxmb: function(ak, al) {
        return ak !== al;
      },
      hSLfR: "zxzrU",
      PBevf: function(ak, al, am, an) {
        return ak(al, am, an);
      },
      tZYUb: function(ak, al) {
        return ak == al;
      },
      HRkrm: "__await",
      ICpkc: "object",
      VqpHI: function(ak, al) {
        return ak(al);
      },
      xOByZ: function(ak, al) {
        return ak(al);
      },
      JNFfN: "nJpjW",
      evhWn: "CBwTG",
      rlhUt: "_invoke",
      blSvA: function(ak, al) {
        return ak(al);
      },
      gCPGV: "LcneI",
      EFdBz: "qqYbY",
      QszHx: "Generator is already running",
      VGoiQ: function(ak, al) {
        return ak === al;
      },
      yZcQe: function(ak, al) {
        return ak === al;
      },
      gFoAW: "Eqkdv",
      KdLCm: function(ak, al) {
        return ak === al;
      },
      uiuEi: "JAYeW",
      telWp: function(ak, al) {
        return ak === al;
      },
      hJVxP: "nuGMs",
      egMyu: function(ak, al) {
        return ak === al;
      },
      kGZuq: "CJYle",
      kGvQW: "pIZEt",
      QcOlK: function(ak, al) {
        return ak === al;
      },
      CgAWC: "next",
      eYlrk: function(ak, al) {
        return ak === al;
      },
      Ogttl: function(ak, al) {
        return ak !== al;
      },
      jqXQI: "slneY",
      WBjko: "oSyor",
      HPxzo: "return",
      xMPWX: function(ak, al) {
        return ak === al;
      },
      NNOFX: function(ak, al) {
        return ak === al;
      },
      uViyG: "aCzcZ",
      GalBX: "UnHxl",
      sEoUT: function(ak, al) {
        return ak === al;
      },
      QhNQV: function(ak, al, am, an, ao) {
        return ak(al, am, an, ao);
      },
      PuVgV: function(ak, al) {
        return ak !== al;
      },
      ZbBRG: "xlfXJ",
      qXOqm: function(ak, al) {
        return ak in al;
      },
      SmfQV: function(ak, al) {
        return ak in al;
      },
      oWpOU: "dWKTt",
      wYSMn: "root",
      lVgPv: function(ak, al) {
        return ak in al;
      },
      VVJNR: "video",
      Grtux: ".m3u8",
      WhBte: "rBSHi",
      nFTMl: "KZZEu",
      XHWEy: "KlOJB",
      xtQZG: function(ak, al) {
        return ak == al;
      },
      AXiPi: function(ak, al) {
        return ak(al);
      },
      mGlLC: "tAwEB",
      VpDkX: "sXBGP",
      hwhuF: " is not iterable",
      bXLEZ: function(ak, al) {
        return ak === al;
      },
      aFILT: function(ak, al) {
        return ak == al;
      },
      LLAXb: "symbol",
      zmJIA: function(ak, al) {
        return ak(al);
      },
      GjVHr: function(ak, al) {
        return ak !== al;
      },
      XZGon: "ejnTa",
      ksZKj: "qFeXx",
      tnTUH: function(ak, al) {
        return ak === al;
      },
      OEkNZ: "GeneratorFunction",
      SCpyb: function(ak, al) {
        return ak === al;
      },
      XIUak: "Map",
      vQnDK: function(ak, al) {
        return ak !== al;
      },
      uxKKP: "vNvJE",
      FhuJQ: function(ak, al) {
        return ak === al;
      },
      eMQRZ: "TAarb",
      qhcux: "zzBEx",
      BvsNy: function(ak, al) {
        return ak === al;
      },
      zFved: "OWhsU",
      zfgfJ: function(ak, al) {
        return ak === al;
      },
      CHmuB: function(ak, al) {
        return ak(al);
      },
      YxxYN: function(ak, al) {
        return ak(al);
      },
      lVruf: function(ak, al) {
        return ak !== al;
      },
      gAdvj: "is_buy",
      oQkDv: "buy_index",
      TGRro: "IhGtO",
      knLrU: function(ak, al) {
        return ak === al;
      },
      WOMxz: "dxpwP",
      UYbfh: function(ak, al) {
        return ak(al);
      },
      GvavX: function(ak, al) {
        return ak(al);
      },
      RIsmw: "vopzK",
      ztUiC: function(ak, al) {
        return ak - al;
      },
      FzRId: function(ak, al) {
        return ak === al;
      },
      iZKRD: function(ak, al) {
        return ak <= al;
      },
      yiPsN: function(ak, al) {
        return ak !== al;
      },
      kjAUX: "SrYAT",
      NQDWI: "JqNLO",
      VwvUA: "break",
      HfJQd: function(ak, al) {
        return ak === al;
      },
      qKNTl: function(ak, al) {
        return ak <= al;
      },
      dfzfx: function(ak, al) {
        return ak(al);
      }
    };
    k = function() {
      {
        return K;
      }
    };
    var J;
    var K = {};
    var M = Object.prototype;
    var Q = M.hasOwnProperty;
    var R = Object.defineProperty || function(ak, al, am) {
      {
        ak[al] = am.value;
      }
    };
    var T = "function" == typeof Symbol ? Symbol : {};
    var U = T.iterator || "@@iterator";
    var V = T.asyncIterator || "@@asyncIterator";
    var W = T.toStringTag || "@@toStringTag";

    function X(ak, al, am) {
      {
        var an = {
          value: am,
          enumerable: true,
          configurable: true,
          writable: true
        };
        Object.defineProperty(ak, al, an);
        return ak[al];
      }
    }
    try {
      X({}, "");
    } catch (al) {
      {
        X = function(an, ao, ap) {
          {
            return an[ao] = ap;
          }
        };
      }
    }

    function Y(an, ao, ap, aq) {
      {
        var as = ao && ao.prototype instanceof a5 ? ao : a5;
        var at = Object.create(as.prototype);
        var au = new ai(aq || []);
        R(at, "_invoke", {
          value: ae(an, ap, au)
        });
        return at;
      }
    }

    function Z(an, ao, ap) {
      {
        try {
          {
            return {
              type: "normal",
              arg: an.call(ao, ap)
            };
          }
        } catch (au) {
          {
            var ar = {
              type: "throw",
              arg: au
            };
            return ar;
          }
        }
      }
    }
    K.wrap = Y;
    var a0 = "suspendedStart";
    var a1 = "suspendedYield";
    var a2 = "executing";
    var a3 = "completed";
    var a4 = {};

    function a5() {}

    function a6() {}

    function a7() {}
    var a8 = {};
    X(a8, U, function() {
      {
        return this;
      }
    });
    var a9 = Object.getPrototypeOf;
    var aa = a9 && a9(a9(aj([])));
    aa && aa !== M && Q.call(aa, U) && (a8 = aa);
    a7.prototype = a5.prototype = Object.create(a8);
    var ab = a7.prototype;

    function ac(an) {
      {
        ["next", "throw", "return"].forEach(function(aq) {
          {
            X(an, aq, function(at) {
              {
                return this._invoke(aq, at);
              }
            });
          }
        });
      }
    }

    function ad(an, ao) {
      function ar(as, at, au, av) {
        var ax = Z(an[as], an, at);
        if ("throw" !== ax.type) {
          {
            var ay = ax.arg;
            var az = ay.value;
            return az && "object" == m(az) && Q.call(az, "__await") ? ao.resolve(az.__await).then(function(aC) {
              {
                ar("next", aC, au, av);
              }
            }, function(aC) {
              ar("throw", aC, au, av);
            }) : ao.resolve(az).then(function(aC) {
              {
                ay.value = aC;
                au(ay);
              }
            }, function(aC) {
              {
                return ar("throw", aC, au, av);
              }
            });
          }
        }
        av(ax.arg);
      }
      var aq;
      R(this, "_invoke", {
        value: function(as, at) {
          {
            function aw() {
              {
                return new ao(function(az, aA) {
                  ar(as, at, az, aA);
                });
              }
            }
            return aq = aq ? aq.then(aw, aw) : aw();
          }
        }
      });
    }

    function ae(an, ao, ap) {
      {
        var ar = a0;
        return function(at, au) {
          {
            if (ar === a2) {
              throw Error("Generator is already running");
            }
            if (ar === a3) {
              {
                if ("throw" === at) {
                  throw au;
                }
                var aw = {
                  value: J,
                  done: true
                };
                return aw;
              }
            }
            for (ap.method = at, ap.arg = au;;) {
              {
                var ax = ap.delegate;
                if (ax) {
                  {
                    var ay = af(ax, ap);
                    if (ay) {
                      {
                        if (ay === a4) {
                          continue;
                        }
                        return ay;
                      }
                    }
                  }
                }
                if ("next" === ap.method) {
                  ap.sent = ap._sent = ap.arg;
                } else {
                  if ("throw" === ap.method) {
                    {
                      if (ar === a0) {
                        throw ar = a3, ap.arg;
                      }
                      ap.dispatchException(ap.arg);
                    }
                  } else {
                    "return" === ap.method && ap.abrupt("return", ap.arg);
                  }
                }
                ar = a2;
                var az = Z(an, ao, ap);
                if ("normal" === az.type) {
                  {
                    if (ar = ap.done ? a3 : a1, az.arg === a4) {
                      continue;
                    }
                    var aA = {
                      value: az.arg,
                      done: ap.done
                    };
                    return aA;
                  }
                }
                "throw" === az.type && (ar = a3, ap.method = "throw", ap.arg = az.arg);
              }
            }
          }
        };
      }
    }

    function af(an, ao) {
      {
        var av = ao.method;
        var aw = an.iterator[av];
        if (aw === J) {
          ao.delegate = null;
          "throw" === av && an.iterator.return && (ao.method = "return", ao.arg = J, af(an, ao), "throw" === ao.method) || "return" !== av && (ao.method = "throw", ao.arg = new TypeError("The iterator does not provide a '" + av + "' method"));
          return a4;
        }
        var au = Z(aw, an.iterator, ao.arg);
        if ("throw" === au.type) {
          ao.method = "throw";
          ao.arg = au.arg;
          ao.delegate = null;
          return a4;
        }
        var at = au.arg;
        return at ? at.done ? (ao[an.resultName] = at.value, ao.next = an.nextLoc, "return" !== ao.method && (ao.method = "next", ao.arg = J), ao.delegate = null, a4) : at : (ao.method = "throw", ao.arg = new TypeError("iterator result is not an object"), ao.delegate = null, a4);
      }
    }

    function ag(an) {
      {
        var aq = {
          tryLoc: an[0]
        };
        1 in an && (aq.catchLoc = an[1]);
        2 in an && (aq.finallyLoc = an[2], aq.afterLoc = an[3]);
        this.tryEntries.push(aq);
      }
    }

    function ah(an) {
      {
        var ao = an.completion || {};
        ao.type = "normal";
        delete ao.arg;
        an.completion = ao;
      }
    }

    function ai(an) {
      {
        var ap = {
          tryLoc: "root"
        };
        this.tryEntries = [ap];
        an.forEach(ag, this);
        this.reset(true);
      }
    }

    function aj(an) {
      {
        if (an || "" === an) {
          {
            var ap = an[U];
            if (ap) {
              return ap.call(an);
            }
            if ("function" == typeof an.next) {
              return an;
            }
            if (!isNaN(an.length)) {
              {
                var aq = -1;
                var ar = function av() {
                  {
                    for (; ++aq < an.length;) {
                      if (Q.call(an, aq)) {
                        av.value = an[aq];
                        av.done = false;
                        return av;
                      }
                    }
                    av.value = J;
                    av.done = true;
                    return av;
                  }
                };
                return ar.next = ar;
              }
            }
          }
        }
        throw new TypeError(m(an) + " is not iterable");
      }
    }
    a6.prototype = a7;
    R(ab, "constructor", {
      value: a7,
      configurable: true
    });
    R(a7, "constructor", {
      value: a6,
      configurable: true
    });
    a6.displayName = X(a7, W, "GeneratorFunction");
    K.isGeneratorFunction = function(an) {
      {
        var ap = "function" == typeof an && an.constructor;
        return !!ap && (ap === a6 || "GeneratorFunction" === (ap.displayName || ap.name));
      }
    };
    K.mark = function(an) {
      {
        Object.setPrototypeOf ? Object.setPrototypeOf(an, a7) : (an.__proto__ = a7, X(an, W, "GeneratorFunction"));
        an.prototype = Object.create(ab);
        return an;
      }
    };
    K.awrap = function(an) {
      {
        var ao = {
          __await: an
        };
        return ao;
      }
    };
    ac(ad.prototype);
    X(ad.prototype, V, function() {
      {
        return this;
      }
    });
    K.AsyncIterator = ad;
    K.async = function(an, ao, ap, aq, ar) {
      {
        undefined === ar && (ar = Promise);
        var as = new ad(Y(an, ao, ap, aq), ar);
        return K.isGeneratorFunction(ao) ? as : as.next().then(function(at) {
          {
            return at.done ? at.value : as.next();
          }
        });
      }
    };
    ac(ab);
    X(ab, W, "Generator");
    X(ab, U, function() {
      {
        return this;
      }
    });
    X(ab, "toString", function() {
      {
        return "[object Generator]";
      }
    });
    K.keys = function(an) {
      {
        var ap = Object(an);
        var aq = [];
        for (var ar in ap) aq.push(ar);
        aq.reverse();
        return function as() {
          {
            for (; aq.length;) {
              {
                var at = aq.pop();
                if (at in ap) {
                  as.value = at;
                  as.done = false;
                  return as;
                }
              }
            }
            as.done = true;
            return as;
          }
        };
      }
    };
    K.values = aj;
    ai.prototype = {
      constructor: ai,
      reset: function(an) {
        {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = J, this.done = false, this.delegate = null, this.method = "next", this.arg = J, this.tryEntries.forEach(ah), !an) {
            for (var ao in this) "t" === ao.charAt(0) && Q.call(this, ao) && !isNaN(+ao.slice(1)) && (this[ao] = J);
          }
        }
      },
      stop: function() {
        {
          this.done = true;
          var an = this.tryEntries[0].completion;
          if ("throw" === an.type) {
            throw an.arg;
          }
          return this.rval;
        }
      },
      dispatchException: function(an) {
        {
          if (this.done) {
            throw an;
          }
          var ap = this;

          function av(aw, ax) {
            as.type = "throw";
            as.arg = an;
            ap.next = aw;
            ax && (ap.method = "next", ap.arg = J);
            return !!ax;
          }
          for (var aq = this.tryEntries.length - 1; aq >= 0; --aq) {
            {
              var ar = this.tryEntries[aq];
              var as = ar.completion;
              if ("root" === ar.tryLoc) {
                return av("end");
              }
              if (ar.tryLoc <= this.prev) {
                {
                  var at = Q.call(ar, "catchLoc");
                  var au = Q.call(ar, "finallyLoc");
                  if (at && au) {
                    {
                      if (this.prev < ar.catchLoc) {
                        return av(ar.catchLoc, true);
                      }
                      if (this.prev < ar.finallyLoc) {
                        return av(ar.finallyLoc);
                      }
                    }
                  } else {
                    if (at) {
                      {
                        if (this.prev < ar.catchLoc) {
                          return av(ar.catchLoc, true);
                        }
                      }
                    } else {
                      {
                        if (!au) {
                          throw Error("try statement without catch or finally");
                        }
                        if (this.prev < ar.finallyLoc) {
                          return av(ar.finallyLoc);
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
      abrupt: function(an, ao) {
        {
          for (var aq = this.tryEntries.length - 1; aq >= 0; --aq) {
            {
              var ar = this.tryEntries[aq];
              if (ar.tryLoc <= this.prev && Q.call(ar, "finallyLoc") && this.prev < ar.finallyLoc) {
                {
                  var as = ar;
                  break;
                }
              }
            }
          }
          as && ("break" === an || "continue" === an) && as.tryLoc <= ao && ao <= as.finallyLoc && (as = null);
          var at = as ? as.completion : {};
          at.type = an;
          at.arg = ao;
          return as ? (this.method = "next", this.next = as.finallyLoc, a4) : this.complete(at);
        }
      },
      complete: function(an, ao) {
        {
          if ("throw" === an.type) {
            throw an.arg;
          }
          "break" === an.type || "continue" === an.type ? this.next = an.arg : "return" === an.type ? (this.rval = this.arg = an.arg, this.method = "return", this.next = "end") : "normal" === an.type && ao && (this.next = ao);
          return a4;
        }
      },
      finish: function(an) {
        {
          for (var ao = this.tryEntries.length - 1; ao >= 0; --ao) {
            {
              var ap = this.tryEntries[ao];
              if (ap.finallyLoc === an) {
                this.complete(ap.completion, ap.afterLoc);
                ah(ap);
                return a4;
              }
            }
          }
        }
      },
      catch: function(an) {
        {
          for (var ap = this.tryEntries.length - 1; ap >= 0; --ap) {
            {
              var aq = this.tryEntries[ap];
              if (aq.tryLoc === an) {
                {
                  var ar = aq.completion;
                  if ("throw" === ar.type) {
                    {
                      var as = ar.arg;
                      ah(aq);
                    }
                  }
                  return as;
                }
              }
            }
          }
          throw Error("illegal catch attempt");
        }
      },
      delegateYield: function(an, ao, ap) {
        {
          this.delegate = {
            iterator: aj(an),
            resultName: ao,
            nextLoc: ap
          };
          "next" === this.method && (this.arg = J);
          return a4;
        }
      }
    };
    return K;
  }

  function m(H) {
    {
      m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(K) {
        {
          return typeof K;
        }
      } : function(K) {
        {
          return K && "function" == typeof Symbol && K.constructor === Symbol && K !== Symbol.prototype ? "symbol" : typeof K;
        }
      };
      return m(H);
    }
  }

  function q(H, I, J, K, L, M, N) {
    try {
      var O = H[M](N);
      var P = O.value;
    } catch (Q) {
      return void J(Q);
    }
    O.done ? I(P) : Promise.resolve(P).then(K, L);
  }

  function v(H) {
    return function() {
      var K = this;
      var L = arguments;
      return new Promise(function(M, N) {
        var Q = H.apply(K, L);

        function R(T) {
          q(Q, M, N, R, S, "next", T);
        }

        function S(T) {
          q(Q, M, N, R, S, "throw", T);
        }
        R(undefined);
      });
    };
  }
  var w;
  var x = $response.body;
  var z = "undefined" != typeof $httpClient;
  var A = "undefined" != typeof $task;
  var B = $request.url;

  function C(H) {
    return new Promise(function(J, K) {
      z ? $httpClient.get(H, function(M, N, O) {
        M ? K(M) : J(O);
      }) : A && $task.fetch(H).then(function(M) {
        return J(M.body);
      }, function(M) {
        return K(M);
      });
    });
  }

  function D(H) {
    return decodeURIComponent(escape(atob(H)));
  }

  function E(H) {
    return btoa(unescape(encodeURIComponent(H)));
  }

  function F(H) {
    return G.apply(this, arguments);
  }

  function G() {
    G = v(k().mark(function I(J) {
      var L;
      var M;
      var N;
      var O;
      var P;
      var Q;
      var R;
      var S;
      var T;
      var U;
      return k().wrap(function(V) {
        for (;;) {
          switch (V.prev = V.next) {
            case 0:
              var W = {
                url: J
              };
              V.prev = 0;
              V.next = 3;
              return C(W);
            case 3:
              L = V.sent;
              M = L.split("\n");
              N = null;
              O = g(M);
              V.prev = 7;
              O.s();
            case 9:
              if ((P = O.n()).done) {
                V.next = 16;
                break;
              }
              if (Q = P.value, !Q || Q.startsWith("#") || !Q.includes(".ts")) {
                V.next = 14;
                break;
              }
              N = Q.trim();
              return V.abrupt("break", 16);
            case 14:
              V.next = 9;
              break;
            case 16:
              V.next = 21;
              break;
            case 18:
              V.prev = 18;
              V.t0 = V.catch(7);
              O.e(V.t0);
            case 21:
              V.prev = 21;
              O.f();
              return V.finish(21);
            case 24:
              if (N) {
                V.next = 26;
                break;
              }
              return V.abrupt("return", null);
            case 26:
              R = new URL(J);
              S = R.origin + R.pathname.substring(0, R.pathname.lastIndexOf("/") + 1);
              T = N.includes("/") ? N.substring(N.lastIndexOf("/") + 1) : N;
              U = T.replace(/_i\d+\.ts$/, "");
              return V.abrupt("return", S + U + "_i.m3u8");
            case 33:
              V.prev = 33;
              V.t1 = V.catch(0);
              console.log("处理预览URL时出错: " + V.t1.message);
              return V.abrupt("return", null);
            case 37:
            case "end":
              return V.stop();
          }
        }
      }, I, null, [
        [0, 33],
        [7, 18, 21, 24]
      ]);
    }));
    return G.apply(this, arguments);
  }
  v(k().mark(function H() {
    var J;
    var K;
    var M;
    var N;
    var O;
    var P;
    var Q;
    var R;
    var S;
    var T;
    var U;
    var V;
    var W;
    var X;
    return k().wrap(function(Y) {
      for (;;) {
        switch (Y.prev = Y.next) {
          case 0:
            if (Y.prev = 0, w = JSON.parse(x), !B || !B.includes("/api/banner/banner_list")) {
              Y.next = 7;
              break;
            }
            w.data = "WW01V2MySkJQVDA9";
            x = JSON.stringify(w);
            $done({
              body: x
            });
            return Y.abrupt("return");
          case 7:
            if (!w.data) {
              Y.next = 30;
              break;
            }
            if (J = function(a1) {
                "object" === m(a1) && null !== a1 && ("is_buy" in a1 && (a1.is_buy = true), "buy_index" in a1 && (a1.buy_index = 9999), "vipLimit" in a1 && (a1.vipLimit = 0), Array.isArray(a1) ? a1.forEach(function(a3) {
                  return J(a3);
                }) : Object.keys(a1).forEach(function(a3) {
                  "object" === m(a1[a3]) && null !== a1[a3] && J(a1[a3]);
                }));
              }, K = w.data, M = D(K), N = D(M), O = D(N), P = JSON.parse(O), J(P), P.sale && (P.sale.is_buy = true, P.sale.buy_index = 9999), Q = null, P.attachments && Array.isArray(P.attachments) && (Q = P.attachments.find(function(a1) {
                return "video" === a1.category && a1.remoteUrl && a1.remoteUrl.includes(".m3u8") && a1.video_time_length;
              })), !Q) {
              Y.next = 24;
              break;
            }
            R = Q.remoteUrl;
            Y.next = 22;
            return F(R);
          case 22:
            S = Y.sent;
            S && (T = "\n<div style=\"float:right; width:140px; text-align:center; margin:0 0 15px 15px; padding:10px; background-color:#f0f8ff; border-radius:8px; border:1px solid #d0e3ff;\">\n  <a href=\"https://t.me/Jsforbaby\" target=\"_blank\">\n    <img src=\"https://dongfanglong-pic.oss-cn-hangzhou.aliyuncs.com/profilepic/50187dfc-a90b-4888-93f3-a492067aefc9.jpeg\" style=\"width:100px; height:100px; border-radius:50%; margin-bottom:10px; border:3px solid #0066cc;\">\n    <div style=\"font-size:12px; color:#666; margin-top:3px;\">点头像加入作者频道</div>\n  </a>\n  <a href=\"".concat(S, "\" style=\"display:block; margin-top:10px; background-color:#0066cc; color:white; padding:8px 0; border-radius:6px; text-decoration:none; font-weight:bold;\">\n    解析视频\n  </a>\n</div>"), P.content.includes("<body>") ? P.content = P.content.replace("<body>", "<body>" + T) : P.content.includes("<p>") ? P.content = P.content.replace(/(<p>.*?<\/p>)/, "$1" + T) : P.content = T + P.content, P.content = P.content.replace(/<span class="sell-btn"[^>]*>[^]*?<\/span><\/span>/g, "<a href=\"".concat(S, "\" style=\"display:inline-block; background-color:#0066cc; color:white; padding:8px 16px; border-radius:4px; text-decoration:none; margin:10px 0;\">点击观看完整视频</a>")));
          case 24:
            U = JSON.stringify(P);
            V = E(U);
            W = E(V);
            X = E(W);
            w.data = X;
            x = JSON.stringify(w);
          case 30:
            var a0 = {
              body: x
            };
            $done(a0);
            Y.next = 37;
            break;
          case 33:
            Y.prev = 33;
            Y.t0 = Y.catch(0);
            console.log("处理响应数据时发生错误: " + Y.t0.message);
            $done({});
          case 37:
          case "end":
            return Y.stop();
        }
      }
    }, H, null, [
      [0, 33]
    ]);
  }))();
})();
