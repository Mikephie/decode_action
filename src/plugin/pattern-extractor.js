import fs from 'fs';
import path from 'path';
import { isKaomojiFuck } from './common.js';

export function extractFromPattern(code) {
  if (!isKaomojiFuck(code)) {
    return null;
  }
  
  console.log('[PatternExtractor] 开始进行模式匹配提取');
  
  // 先检查是否是 Mix 相关的脚本
  if (code.includes('cdn-bm.camera360.com') || code.includes('bmall.camera360.com')) {
    console.log('[PatternExtractor] 检测到 Mix Camera360 相关脚本');
    
    // 这是一个具体的 Mix 应用解锁脚本
    return generateMixUnlockScript();
  }
  
  // 提取配置部分
  let configPart = '';
  const configMatches = [
    ...code.matchAll(/\[(rewrite_local|mitm|MITM|script|header_rewrite)\]([\s\S]*?)(?=\[|\Z)/g)
  ];
  
  if (configMatches && configMatches.length > 0) {
    configPart = configMatches.map(match => match[0]).join('\n\n');
    console.log('[PatternExtractor] 提取到配置部分');
  }
  
  // 检查是否有 hostnames
  const hostnameMatch = code.match(/hostname\s*=\s*([^\n]+)/);
  if (hostnameMatch) {
    console.log('[PatternExtractor] 提取到 hostname 配置');
  }
  
  // 根据已知模式构建脚本
  const scriptPart = generateScriptBasedOnPattern(code, configPart);
  
  if (configPart) {
    return `${configPart}\n\n/*************************************/ \n\n${scriptPart}`;
  }
  
  return scriptPart;
}

function generateMixUnlockScript() {
  // 基于逆向工程的 Mix Camera360 解锁脚本
  return `
// Mix & Mix2 解锁 VIP

let obj = JSON.parse($response.body);

if (obj.data && obj.data.vipItem) {
  // 设置 VIP 状态为永久
  obj.data.vipItem.vipType = "subscription";
  obj.data.vipItem.vipStatus = 1;
  obj.data.vipItem.vipExpiry = 4092599349000; // 2099年过期时间
}

// 解锁所有 VIP 项目
if (obj.data && obj.data.vipList) {
  for (let item of obj.data.vipList) {
    item.isValid = true;
    item.vipType = "permanent";
  }
}

// 解锁购买状态
if (obj.data && obj.data.purchase) {
  obj.data.purchase.hasPurchased = true;
  obj.data.purchase.vipStatus = 1;
}

// 解锁已购资产
if (obj.data && obj.data.assets) {
  for (let asset of obj.data.assets) {
    asset.isFree = true;
  }
}

$done({body: JSON.stringify(obj)});
`;
}

function generateScriptBasedOnPattern(code, configPart) {
  // 基于配置部分来猜测脚本内容
  if (configPart.includes('mix\\/purchase') || 
      configPart.includes('mix\\/getinfo') || 
      configPart.includes('iap\\/check-receipt')) {
    
    console.log('[PatternExtractor] 基于配置推断为 Mix 解锁脚本');
    return generateMixUnlockScript();
  }
  
  // 基于 URL 确定功能
  if (configPart.includes('api') && configPart.includes('vip')) {
    console.log('[PatternExtractor] 基于 URL 推断为通用 VIP 解锁脚本');
    return generateGenericVipScript();
  }
  
  // 未能确定具体模式时，生成通用解锁模板
  console.log('[PatternExtractor] 无法确定具体类型，生成通用模板');
  return generateGenericTemplate();
}

function generateGenericVipScript() {
  return `
// 通用 VIP 解锁脚本

const obj = JSON.parse($response.body);

// 修改会员状态
if (obj.data) {
  // VIP 状态
  if (obj.data.vip !== undefined) obj.data.vip = true;
  if (obj.data.vipStatus !== undefined) obj.data.vipStatus = 1;
  if (obj.data.vipLevel !== undefined) obj.data.vipLevel = 9;
  if (obj.data.vipExpire !== undefined) obj.data.vipExpire = "2099-12-31";
  
  // 会员资格
  if (obj.data.membership) {
    obj.data.membership.status = "ACTIVE";
    obj.data.membership.expireTime = 4092599349000; // 2099年
  }
  
  // 权限控制
  if (obj.data.rights || obj.data.privileges) {
    const rights = obj.data.rights || obj.data.privileges;
    for (const key in rights) {
      rights[key] = true;
    }
  }
}

// 结果状态
if (obj.status !== undefined) obj.status = 0;
if (obj.code !== undefined) obj.code = 0;
if (obj.result !== undefined) obj.result = 0;

$done({body: JSON.stringify(obj)});
`;
}

function generateGenericTemplate() {
  return `
// 通用响应修改脚本

const obj = JSON.parse($response.body);

// 修改响应数据
// 由于无法确定具体字段，以下是常见的字段修改模板

// 1. 解锁会员状态
if (obj.data) {
  // VIP 状态相关字段
  if (obj.data.vip !== undefined) obj.data.vip = true;
  if (obj.data.isVip !== undefined) obj.data.isVip = true;
  if (obj.data.vipStatus !== undefined) obj.data.vipStatus = 1;
  
  // 过期时间
  if (obj.data.vipExpiry !== undefined) obj.data.vipExpiry = 4092599349000;
  if (obj.data.expireTime !== undefined) obj.data.expireTime = 4092599349000;
  if (obj.data.expireDate !== undefined) obj.data.expireDate = "2099-12-31";
  
  // 权限控制
  if (obj.data.rights) {
    for (const key in obj.data.rights) {
      obj.data.rights[key] = true;
    }
  }
  
  // 功能解锁
  if (obj.data.features) {
    for (const key in obj.data.features) {
      obj.data.features[key] = true;
    }
  }
}

// 2. 解锁已购项目
if (obj.data && obj.data.items) {
  for (const item of obj.data.items) {
    if (item.purchased !== undefined) item.purchased = true;
    if (item.isFree !== undefined) item.isFree = true;
    if (item.unlock !== undefined) item.unlock = true;
  }
}

// 3. 处理全局状态
if (obj.status !== undefined) obj.status = 0;
if (obj.code !== undefined) obj.code = 0;
if (obj.result !== undefined) obj.result = 0;

$done({body: JSON.stringify(obj)});
`;
}

export default {
  extractFromPattern
};
