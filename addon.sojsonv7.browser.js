/* =============================================
 * addon.sojsonv7.browser.js
 * Front-end, no-deps, drop-in light deobfuscator for jsjiami/sojson v7
 * - Works with your current template (no code changes required)
 * - HTML-entity decode + v7 light replace
 * - Non-invasive: hooks into startDecrypt() if present
 * ============================================= */
(function(){
  'use strict';

  // ---- tiny utils ----
  function decodeHtmlEntities(s){
    try{
      if(!s || typeof s !== "string") return s||"";
      if(!/[&][a-zA-Z#0-9]+;/.test(s)) return s;
      const ta = document.createElement("textarea");
      ta.innerHTML = s;
      return ta.value;
    }catch(e){ return s; }
  }
  function stripComments(src){
    return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/[^\n]*\n/g, '$1\n');
  }
  function uniq(arr){ return Array.from(new Set(arr)); }
  function showToastSafe(msg){
    try { if (typeof showToast === "function") showToast(msg); } catch(e){}
  }
  function logInfo(msg){
    try { if (typeof addLog === "function") addLog(msg, "info"); else console.log("[v7-addon]", msg); } catch(e){}
  }

  // ---- heuristic detectors ----
  function looksLikeV7(code){
    if (!code) return false;
    const s = code;
    if (/jsjiami\.com\.v7|sojson\.v7/i.test(s)) return true;
    // mapper call style: _0x[0-9a-f]{3,}\(\s*0x[0-9a-f]+\s*,\s*['"][^'"]+['"]\s*\)
    if (/_0x[0-9a-fA-F]{3,}\(\s*0x[0-9a-fA-F]+\s*,\s*['"][^'"]+['"]\s*\)/.test(s) && /function\s+_0x[0-9a-fA-F]{3,}\s*\([^)]+\)\s*\{/.test(s)) return true;
    return false;
  }

  // ---- extract array factory and mapper function text ----
  function extractV7Pieces(code){
    // try to find the first "factory" returning array (e.g. function _0x1715(){ const ... return [ ... ].concat(...); } )
    const factoryRe = /function\s+(_0x[0-9a-fA-F]{3,})\s*\(\)\s*\{[\s\S]*?\breturn\b[\s\S]*?\};?/m;
    const mapperRe  = /function\s+(_0x[0-9a-fA-F]{3,})\s*\(\s*([a-zA-Z0-9_$]+)\s*,\s*([a-zA-Z0-9_$]+)\s*\)\s*\{[\s\S]*?\}/m;

    let factoryM = factoryRe.exec(code);
    let mapperM  = mapperRe.exec(code);

    if(!factoryM || !mapperM) return null;
    return {
      factoryName: factoryM[1],
      factorySrc: factoryM[0],
      mapperName: mapperM[1],
      mapperArg1: mapperM[2],
      mapperArg2: mapperM[3],
      mapperSrc: mapperM[0]
    };
  }

  // ---- build sandbox and compute dictionary ----
  function buildDictionary(pieces){
    // very restricted scope; block network/timers; stub env
    const prelude = [
      "var window = {};",
      "var globalThis = {};",
      "var self = {};",
      "var document = {};",
      "var navigator = {};",
      "var location = { href:'' };",
      "var console = {log:function(){},warn:function(){},error:function(){}};",
      "var setTimeout=function(){}, setInterval=function(){}, clearTimeout=function(){}, clearInterval=function(){};",
      "var $done=function(){}, $response={}, $request={};",
      "var atob = atob || (function(){var b64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';return function(input){var str=String(input).replace(/=+$/,'');if(str.length%4===1)throw new Error('bad b64');var output='';var bc=0, bs, buffer, idx=0;for(;buffer=str.charAt(idx++);~buffer && (bs=bc%4?bs*64+buffer:buffer, bc++%4)?output+=String.fromCharCode(255 & bs >> (-2*bc & 6)):0){buffer=b64.indexOf(buffer);}return output;};})();"
    ].join("\n");

    const source = prelude + "\n" + pieces.factorySrc + "\n" + pieces.mapperSrc + "\n" +
      // expose to result object
      "return { factory:" + pieces.factoryName + ", mapfn:" + pieces.mapperName + " };";
    let result;
    try{
      // build a new Function with no closure access
      const fn = new Function(source);
      result = fn();
    }catch(e){
      logInfo("sandbox build error: " + e);
      return null;
    }
    if(!result || typeof result.factory!=='function' || typeof result.mapfn!=='function') return null;

    let dict = new Map();
    // We'll let caller supply the (index, key) pairs to compute lazily
    return {
      compute: function(idxHex, keyStr){
        try{
          const v = result.mapfn(idxHex, keyStr);
          return v;
        }catch(e){
          return undefined;
        }
      }
    };
  }

  // ---- replace mapper calls with literals ----
  function replaceCalls(code, pieces, dictObj){
    const callRe = new RegExp(pieces.mapperName.replace(/\$/g,'\\$') + String.raw`\(\s*(0x[0-9a-fA-F]+)\s*,\s*['"]([^'"]+)['"]\s*\)`, 'g');
    const seen = new Map();
    let m;
    while ((m = callRe.exec(code))){
      const idxHex = m[1];
      const keyStr = m[2];
      const k = idxHex + "::" + keyStr;
      if (!seen.has(k)){
        const txt = dictObj.compute(Number(idxHex), keyStr);
        if (typeof txt === "string") {
          seen.set(k, txt);
        } else {
          seen.set(k, null);
        }
      }
    }
    // replace in one pass
    let out = code;
    for (const [k, val] of seen.entries()){
      const [idxHex, keyStr] = k.split("::");
      const lit = (val != null) ? JSON.stringify(val) : ("/*v7_unresolved(" + idxHex + "," + JSON.stringify(keyStr) + ")*/");
      const oneCall = new RegExp(pieces.mapperName.replace(/\$/g,'\\$') + String.raw`\(\s*` + idxHex + String.raw`\s*,\s*['"]` + keyStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + String.raw`['"]\s*\)`, 'g');
      out = out.replace(oneCall, lit);
    }
    return out;
  }

  // ---- public API ----
  function deobfSojsonV7(codeRaw){
    const code0 = decodeHtmlEntities(codeRaw);
    const code  = stripComments(code0);
    if (!looksLikeV7(code)) return null;

    const pieces = extractV7Pieces(code);
    if (!pieces) return null;

    const dictObj = buildDictionary(pieces);
    if (!dictObj) return null;

    try{
      const replaced = replaceCalls(code0, pieces, dictObj);
      return replaced;
    }catch(e){
      return null;
    }
  }

  // expose
  window.deobfSojsonV7 = deobfSojsonV7;

  // ---- integrate with existing template (non-invasive) ----
  function getInputEl(){ return document.getElementById("input"); }
  function getOutputEl(){ return document.getElementById("output"); }

  function runIntegrationOnce(){
    // patch startDecrypt if present
    if (typeof window.startDecrypt === "function") {
      const orig = window.startDecrypt;
      window.startDecrypt = function(){
        try {
          const el = getInputEl();
          if (el && el.value) {
            const maybe = deobfSojsonV7(el.value);
            if (typeof maybe === "string" && maybe.length > 0 && maybe !== el.value) {
              el.value = maybe;
              showToastSafe("已替换部分 jsjiami/sojson.v7 字符串，已自动美化通道可继续处理");
              logInfo("v7 addon: replaced mapped strings");
              // if you have detectAndUpdate, call it to refresh panel
              if (typeof detectAndUpdate === "function") {
                detectAndUpdate(maybe);
              }
            }
          }
        } catch(e) { /* ignore */ }
        return orig.apply(this, arguments);
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runIntegrationOnce, { once:true });
  } else {
    runIntegrationOnce();
  }

})();
