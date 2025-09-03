;(function () {
  // 小工具
  const has = (code, re) => re.test(code);
  const count = (code, re, g = 'g') => ((code.match(new RegExp(re.source, g)) || []).length);
  const len = s => (s || '').length;

  // ====== 各类型检测 ======

  // 1) jsjiami v5/6/7（优先级最高）
  function detectJsJiami(code) {
    const mark      = /jsjiami\.com\.v(5|6|7)/i;
    const verDecl   = /(?:^|;)\s*var\s+encode_version\s*=/i;
    const tailGuard = /;?\s*encode_version\s*=\s*['"]jsjiami\.com\.v[0-9]+['"]\s*;?/i;

    const hit = has(code, mark) || (has(code, verDecl) && has(code, tailGuard));
    if (!hit) return { isDetected: false, confidence: 0 };

    // 置信度估计：包含标识 + 头尾守卫 + 体量
    let conf = 60;
    if (has(code, mark)) conf += 20;
    if (has(code, verDecl) && has(code, tailGuard)) conf += 10;
    if (len(code) > 2000) conf += 10;
    return { isDetected: true, confidence: Math.min(conf, 98), variant: (code.match(mark)||[])[1] || 'x' };
  }

  // 2) sojson / sojsonv7
  function detectSojson(code) {
    const v7Sig   = /(?:sojson\.v7|window\['_\w{6,8}'\]\[\w{2,4}\]\['\w{2,4}'\])/i;
    const common  = /sojson|敏感词过滤|版权声明|协议禁止|返回顶部/i;
    const packed  = /(function\s*\(p,\s*a,\s*c,\s*k,\s*e,\s*d\)\s*\{[\s\S]+?return\s+p\))/; // packer 结合

    const hitV7 = has(code, v7Sig);
    const hit   = hitV7 || has(code, common);
    if (!hit) return { isDetected: false, confidence: 0 };

    let conf = 55 + (hitV7 ? 20 : 0) + (has(code, packed) ? 10 : 0);
    if (len(code) > 1500) conf += 5;
    return { isDetected: true, confidence: Math.min(conf, 96), variant: hitV7 ? 'v7' : 'common' };
  }

  // 3) AAEncode / JJEncode（字符特征）
  function detectAAEncode(code) {
    const aaSig = /ﾟωﾟﾉ|ﾟДﾟ|ﾟдﾟ|ﾟΘﾟ|\/｀ｍ'）ﾉ|o\^_\^o|c\^_\^o/;
    if (!has(code, aaSig)) return { isDetected: false, confidence: 0 };
    const feats = count(code, /ﾟ|ﾉ|\(|\)|\^|_|o|c|Θ|Д/g);
    const ratio = feats / Math.max(1, len(code));
    let conf = 60 + Math.min(30, Math.floor(ratio * 80));
    return { isDetected: true, confidence: Math.min(conf, 95), features: feats };
  }

  function detectJJEncode(code) {
    // 常见 JJEncode 头：$=~[];_$=... 或者 ﾟεﾟ 变体较少，这里用变量模式
    const sig = /\$=\~\[\];_\$=|_\$=\[\];\$=\$\.constructor|\$\$=\![]/;
    if (!has(code, sig)) return { isDetected: false, confidence: 0 };
    let conf = 70;
    if (len(code) > 800) conf += 10;
    return { isDetected: true, confidence: Math.min(conf, 90) };
  }

  // 4) JSFuck（仅 []()+! 字符集合）
  function detectJSFuck(code) {
    const only = /^[\s\[\]\(\)\+\!]+$/;
    const mixed = /[\[\]\(\)\+\!]{20,}/;
    if (only.test(code) || mixed.test(code)) {
      const conf = only.test(code) ? 95 : 75;
      return { isDetected: true, confidence: conf };
    }
    return { isDetected: false, confidence: 0 };
  }

  // 5) Obfuscator.io（典型结构）
  function detectObfuscator(code) {
    const selfDefending = /function\s*\(\)\s*\{\s*return\s*!\[\]\.constructor\(['"]return\s+this['"]\)\(\)\;\s*\}\(\)/;
    const controlFlow  = /while\s*\(\s*!!\[\]\s*\)\s*\{\s*switch/;
    const heavyArray   = /var\s+_0x[a-f0-9]{4,}\s*=\s*\[\s*(?:['"][^'"]+['"]\s*,\s*){5,}/i;

    const hits = [has(code, selfDefending), has(code, controlFlow), has(code, heavyArray)].filter(Boolean).length;
    if (!hits) return { isDetected: false, confidence: 0 };
    return { isDetected: true, confidence: 70 + hits * 8 };
  }

  // 6) Packer（Dean Edwards eval(function(p,a,c,k,e,d){...})）
  function detectPacker(code) {
    const packer = /eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*d\s*\)\s*\{/;
    if (!has(code, packer)) return { isDetected: false, confidence: 0 };
    let conf = 85;
    if (has(code, /String\.fromCharCode|toString\(\s*36\s*\)/)) conf += 5;
    return { isDetected: true, confidence: Math.min(conf, 95) };
  }

  // 7) Base64/URL/Hex（方便后续 fallback）
  function detectSimpleEnc(code) {
    const compact = code.replace(/\s+/g, '');
    const base64  = /^[A-Za-z0-9+/]+=*$/;
    const urlEnc  = /%[0-9a-fA-F]{2}/;
    const hex     = /^[0-9a-fA-F\s]+$/;

    const res = { base64: false, url: false, hex: false };
    if (compact.length > 32 && base64.test(compact)) res.base64 = true;
    if (urlEnc.test(code)) res.url = true;
    if (hex.test(code) && code.length > 32) res.hex = true;
    return res;
  }

  // ====== 归一化综合判断 ======
  function comprehensiveDetectionPatched(code) {
    const text = (code || '').trim();
    if (!text) return { primaryType: 'Unknown', primaryConfidence: 0 };

    // 先判明显且优先级高的
    const jjRes  = detectJsJiami(text);
    if (jjRes.isDetected) {
      return {
        primaryType: 'jsjiami',
        primaryConfidence: jjRes.confidence,
        primaryResult: jjRes,
        aaResult: { isDetected: false, confidence: 0 },
        evalResult: { isDetected: false, confidence: 0 },
        other: {},
        hasMultipleEncodings: false
      };
    }

    const soRes  = detectSojson(text);
    if (soRes.isDetected) {
      return {
        primaryType: 'sojson' + (soRes.variant ? '_' + soRes.variant : ''),
        primaryConfidence: soRes.confidence,
        primaryResult: soRes,
        aaResult: { isDetected: false, confidence: 0 },
        evalResult: { isDetected: false, confidence: 0 },
        other: {},
        hasMultipleEncodings: false
      };
    }

    // 次级：AAEncode / JJEncode / JSFuck / Packer / Obfuscator
    const aaRes   = detectAAEncode(text);
    const jjEnc   = detectJJEncode(text);
    const jsfRes  = detectJSFuck(text);
    const packRes = detectPacker(text);
    const obfRes  = detectObfuscator(text);

    // Eval（packer 归到 eval 家族）
    const evalRes = {
      isDetected: packRes.isDetected,
      confidence: packRes.confidence,
      evalCount: packRes.isDetected ? 1 : 0,
      nestedDepth: 0
    };

    // 简单编码提示
    const simple = detectSimpleEnc(text);

    // 选主类型（最高置信度胜出）
    const candidates = [
      { t: 'AAEncode',     c: aaRes.confidence, cond: aaRes.isDetected,   meta: aaRes },
      { t: 'JJEncode',     c: jjEnc.confidence, cond: jjEnc.isDetected,   meta: jjEnc },
      { t: 'JSFuck',       c: jsfRes.confidence,cond: jsfRes.isDetected,  meta: jsfRes },
      { t: 'Eval(Packer)', c: evalRes.confidence, cond: evalRes.isDetected, meta: evalRes },
      { t: 'Obfuscator',   c: obfRes.confidence,cond: obfRes.isDetected,  meta: obfRes }
    ].filter(x => x.cond);

    let primaryType = 'Unknown';
    let primaryConfidence = 0;
    let primaryResult = null;

    if (candidates.length) {
      candidates.sort((a,b)=> b.c - a.c);
      primaryType = candidates[0].t;
      primaryConfidence = candidates[0].c;
      primaryResult = candidates[0].meta;
    }

    // 是否多重（例如 AA + Eval）
    const multi = (aaRes.isDetected ? 1 : 0) + (evalRes.isDetected ? 1 : 0) + (jjEnc.isDetected ? 1 : 0) + (jsfRes.isDetected ? 1 : 0) + (obfRes.isDetected ? 1 : 0) >= 2;

    return {
      primaryType,
      primaryConfidence,
      primaryResult,
      aaResult: aaRes,
      evalResult: evalRes,
      other: {
        jjencode: jjEnc,
        jsfuck: jsfRes,
        obfuscator: obfRes,
        simple
      },
      hasMultipleEncodings: multi
    };
  }

  // 覆盖页面原有函数（若存在）
  window.comprehensiveDetection = comprehensiveDetectionPatched;

  // 对输入框做自动检测联动（保持你现有逻辑不变，仅兜底增强）
  document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById('input');
    if (!inputEl) return;

    const safeUpdate = () => {
      const v = inputEl.value.trim();
      if (v.length < 50) return;
      const det = comprehensiveDetectionPatched(v);
      if (typeof window.updateDetectionPanel === 'function') {
        window.updateDetectionPanel(det);
      }
    };

    // 输入后 300ms 去抖检测
    let t;
    inputEl.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(safeUpdate, 300);
    });

    // 初次载入若有内容
    if (inputEl.value.trim()) {
      safeUpdate();
    }
  });

  console.log('[detect_patch] detection override is active');
})();