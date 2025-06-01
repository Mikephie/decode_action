//2025-06-01T14:53:11.616Z
//解密脚本在此
// 重构后的清晰代码
const opName = $request?.url?.pathname || '';

let body;

if (/Ads/i.test(opName)) {
  $done({'body': '{}'});
} else {
  try {
    // 解析响应并移除限制
    let responseText = $response.body;
    
    // 应用所有替换
    responseText = responseText
      .replace(/"isObfuscated":true/g, '"isObfuscated":false')
      .replace(/"obfuscatedPath":"[^"]*"/g, '"obfuscatedPath":null')
      .replace(/"isNsfw":true/g, '"isNsfw":false')
      .replace(/"isAdPersonalizationAllowed":true/g, '"isAdPersonalizationAllowed":false')
      .replace(/"isThirdPartyInfoAdPersonalizationAllowed":true/g, '"isThirdPartyInfoAdPersonalizationAllowed":false')
      .replace(/"isNsfwMediaBlocked":true/g, '"isNsfwMediaBlocked":false')
      .replace(/"isNsfwContentShown":true/g, '"isNsfwContentShown":false')
      .replace(/"isPremiumMember":false/g, '"isPremiumMember":true')
      .replace(/"isEmployee":false/g, '"isEmployee":true');
    
    body = JSON.parse(responseText);
    
    // 处理数据结构，移除广告
    const data = body.data ?? {};
    
    Object.keys(data).forEach(key => {
      const edges = data[key]?.data?.children;
      if (!Array.isArray(edges)) return;
      
      // 过滤广告节点
      data[key].data.children = edges.filter(({node}) => {
        if (!node) return true;
        if (node.__typename === 'Ad') return false;
        if (node.adPayload) return false;
        if (Array.isArray(node.cells)) {
          return !node.cells.some(cell => cell?.__typename === 'AdUnit');
        }
        return true;
      });
    });
    
    body = JSON.stringify(body);
    
  } catch (error) {
    console.log('处理响应时出错:', error);
  } finally {
    $done(body ? {'body': body} : {});
  }
}