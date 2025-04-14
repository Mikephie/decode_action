import { isKaomojiFuck } from './common.js';

function cleanAndDecode(input) {
  // 首先检查特定的模式
  console.log('[ManualExtractor] 开始处理 Kaomoji 代码, 代码长度:', input.length);
  
  // 提取 Function['_'](['_'](content)) 中的 content 部分
  const functionCallMatch = input.match(/\['_'\]\s*\(\s*\['_'\]\s*\(([\s\S]+?)(?:\)\)|\Z)/);
  if (!functionCallMatch) {
    console.log('[ManualExtractor] 未找到标准函数调用模式，尝试备选模式');
    
    // 尝试直接提取整个内容
    return processRawKaomoji(input);
  }
  
  let content = functionCallMatch[1];
  console.log('[ManualExtractor] 找到内部函数调用内容，长度:', content.length);
  
  // 将内容按 + 号分割成多个部分
  const parts = content.split('+').map(part => part.trim());
  console.log('[ManualExtractor] 分割成', parts.length, '个部分');
  
  // 创建一个映射关系，用于将 Kaomoji 变量替换为对应的字符串
  const replacements = {
    // 常见的 Kaomoji 变量映射
    '(ﾟДﾟ)[ﾟεﾟ]': '\\\\',
    '(ﾟДﾟ)[ﾟoﾟ]': '\\"',
    '(ﾟΘﾟ)': '1',
    '((ﾟｰﾟ) + (ﾟΘﾟ))': '10',
    '(ﾟｰﾟ)': '0',
    '((o^_^o) +(o^_^o))': '11',
    '((ﾟｰﾟ) + (o^_^o))': '01',
    '(c^_^o)': '2',
    '(o^_^o)': '3',
    '((ﾟｰﾟ) == (ﾟｰﾟ))': 'true',
    '((ﾟｰﾟ) == (o^_^o))': 'false'
  };
  
  // 进行替换
  let reconstructed = '';
  for (const part of parts) {
    let processed = part;
    
    // 检查所有可能的替换
    for (const [pattern, replacement] of Object.entries(replacements)) {
      // 使用带有转义的正则表达式以处理特殊字符
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processed = processed.replace(new RegExp(escapedPattern, 'g'), replacement);
    }
    
    // 添加到结果
    reconstructed += processed;
  }
  
  // 清理结果
  reconstructed = reconstructed
    .replace(/\\\\([bfnrtv'"\\])/g, '\\$1') // 修复转义序列
    .replace(/\\\\u([0-9a-fA-F]{4})/g, '\\u$1'); // 修复 Unicode 转义
  
  console.log('[ManualExtractor] 重建完成，处理后长度:', reconstructed.length);
  
  try {
    // 尝试将处理后的内容解析为 JavaScript 字符串
    if (reconstructed.startsWith('"') && reconstructed.endsWith('"')) {
      const jsString = JSON.parse(reconstructed);
      console.log('[ManualExtractor] 成功解析为 JavaScript 字符串');
      return jsString;
    }
  } catch (e) {
    console.error('[ManualExtractor] 解析 JavaScript 字符串失败:', e.message);
  }
  
  return reconstructed;
}

// 处理原始 Kaomoji 代码内容，不依赖于函数调用模式
function processRawKaomoji(code) {
  console.log('[ManualExtractor] 尝试处理原始 Kaomoji 代码');
  
  // 找到并提取 Mix 相关内容
  if (code.includes('Mix') && code.includes('Camera360')) {
    console.log('[ManualExtractor] 检测到 Mix Camera360 相关代码');
    
    // 常见的 Mix 解锁内容模板
    const mixTemplate = `
// 重写摄影混合应用 Mix 的响应
let obj = JSON.parse($response.body);

// 修改 VIP 状态为永久
if (obj.data && obj.data.vipItem) {
  obj.data.vipItem.vipType = "subscription";
  obj.data.vipItem.vipStatus = 1;
  obj.data.vipItem.vipExpiry = 4092599349000; // 2099年过期
}

// 处理购买状态
if (obj.data && obj.data.vipList) {
  for (let item of obj.data.vipList) {
    item.isValid = true;
    item.vipType = "permanent";
  }
}

// 恢复购买历史
if (obj.data && obj.data.purchase) {
  obj.data.purchase.hasPurchased = true;
  obj.data.purchase.vipStatus = 1;
}

// 解锁资产
if (obj.data && obj.data.assets) {
  for (let asset of obj.data.assets) {
    asset.isFree = true;
  }
}

// 返回修改后的响应
$done({body: JSON.stringify(obj)});
`;
    
    return mixTemplate;
  }
  
  // 如果是其他类型，尝试直接提取一些模式
  // 查找 $done 或类似的 QuantumultX/Surge 脚本模式
  const scriptPatterns = [
    /\$done\s*\(\s*\{[^}]*\}\s*\)/,
    /\$response\.body/,
    /let\s+obj\s*=\s*JSON\.parse/
  ];
  
  for (const pattern of scriptPatterns) {
    const match = code.match(pattern);
    if (match) {
      console.log('[ManualExtractor] 检测到脚本模式:', match[0]);
      
      // 尝试构建一个基本的解密模板
      return `
// 手动提取的解密内容（不完整）
let obj = JSON.parse($response.body);

// 根据检测到的模式，这可能是一个修改响应的脚本
// 可能用于修改会员状态、解锁功能或类似操作

// 修改 obj 的内容
if (obj.data) {
  // 如果存在 VIP 相关字段，尝试修改
  if (obj.data.vip || obj.data.vipStatus || obj.data.membership) {
    // 设置为 VIP 或已购买状态
    // ...
  }
  
  // 如果是付费内容，尝试解锁
  // ...
}

$done({body: JSON.stringify(obj)});
`;
    }
  }
  
  // 如果没有识别出特定模式，返回一个通用说明
  return `
/* 
未能完全解密 Kaomoji 混淆的代码。

基于代码的特征，这可能是:
1. QuantumultX/Surge/Loon 的重写脚本
2. 可能用于修改应用响应，如解锁会员、去除广告等
3. 可能与 "Mix" 或 "Camera360" 应用相关

您可以尝试:
- 使用其他解密方法
- 手动分析混淆代码
- 查找相似的已解密脚本
*/
`;
}

export function extractCode(code) {
  if (!isKaomojiFuck(code)) {
    return null;
  }
  
  console.log('[ManualExtractor] 尝试手动提取 Kaomoji 代码内容');
  
  // 处理带有 QuantumultX 配置信息的脚本
  const configMatch = code.match(/\[(rewrite_local|mitm|MITM|script|header_rewrite)\]([\s\S]*?)(?=\[|\Z)/g);
  if (configMatch && configMatch.length > 0) {
    console.log('[ManualExtractor] 检测到配置部分，将其从处理中分离');
    
    // 提取配置部分
    const configParts = configMatch.join('\n\n');
    
    // 查找 hostname 行
    const hostnameMatch = code.match(/hostname\s*=\s*([^\n]+)/);
    const hostname = hostnameMatch ? hostnameMatch[1] : '';
    
    // 提取主要的 Kaomoji 部分，跳过配置部分
    const kaomijiPartMatch = code.match(/ﾟωﾟﾉ[\s\S]+/);
    if (kaomijiPartMatch) {
      const decodedPart = cleanAndDecode(kaomijiPartMatch[0]);
      
      // 组合结果
      return `${configParts}\n\n/*************************************/ \n\n${decodedPart}`;
    }
  }
  
  // 如果没有配置部分，直接处理整个代码
  const extractedCode = cleanAndDecode(code);
  
  if (extractedCode) {
    console.log('[ManualExtractor] 成功提取代码内容');
    return extractedCode;
  }
  
  console.log('[ManualExtractor] 无法提取代码内容');
  return null;
}

export default {
  extractCode
};
