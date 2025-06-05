//2025-06-05T06:07:19.031Z
//解密脚本在此
const opName = $request?.["headers"]?.["X-APOLLO-OPERATION-NAME"] || "";
let body;
if (/Ads/i.test(opName)) $done({
  "body": "{}"
});else try {
  body = JSON.parse($response.body.replace(/"isObfuscated":true/g, "\"isObfuscated\":false").replace(/"obfuscatedPath":"[^"]*"/g, "\"obfuscatedPath\":null").replace(/"isNsfw":true/g, "\"isNsfw\":false").replace(/"isAdPersonalizationAllowed":true/g, "\"isAdPersonalizationAllowed\":false").replace(/"isThirdPartyInfoAdPersonalizationAllowed":true/g, "\"isThirdPartyInfoAdPersonalizationAllowed\":false").replace(/"isNsfwMediaBlocked":true/g, "\"isNsfwMediaBlocked\":false").replace(/"isNsfwContentShown":true/g, "\"isNsfwContentShown\":false").replace(/"isPremiumMember":false/g, "\"isPremiumMember\":true").replace(/"isEmployee":false/g, "\"isEmployee\":true"));
  const data = body.data ?? {};
  Object.keys(data).forEach(_0x264ed5 => {
    const _0xe804f6 = data[_0x264ed5]?.["elements"]?.["edges"];
    if (!Array.isArray(_0xe804f6)) return;
    data[_0x264ed5].elements.edges = _0xe804f6.filter(({
      node: _0x2d14e2
    }) => {
      {
        if (!_0x2d14e2) return true;
        if (_0x2d14e2.__typename === "AdPost") return false;
        if (_0x2d14e2.adPayload) return false;
        if (Array.isArray(_0x2d14e2.cells)) return !_0x2d14e2.cells.some(_0x3835ab => _0x3835ab?.["__typename"] === "AdMetadataCell");
        return true;
      }
    });
  });
  body = JSON.stringify(body);
} catch (_0x2d423f) {
  console.log("Parse error:", _0x2d423f);
} finally {
  $done(body ? {
    "body": body
  } : {});
}