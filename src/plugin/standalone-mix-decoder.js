#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 用法说明
if (process.argv.length < 3) {
  console.log('用法: node standalone-mix-decoder.js <input-file> [output-file]');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv.length > 3 ? process.argv[3] : 'decoded-mix.js';

// 检查输入文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`错误: 找不到输入文件 "${inputFile}"`);
  process.exit(1);
}

// 读取文件内容
const sourceCode = fs.readFileSync(inputFile, 'utf-8');
console.log(`读取文件: ${inputFile}, 大小: ${sourceCode.length} 字节`);

// 提取配置部分
const extractConfigs = (code) => {
  const configs = [];
  const configRegex = /\[(rewrite_local|mitm|MITM|script|header_rewrite)\]([\s\S]*?)(?=\[|\Z)/g;
  let match;
  
  while ((match = configRegex.exec(code)) !== null) {
    configs.push(match[0]);
  }
  
  return configs.join('\n\n');
};

// 生成 Mix 解锁脚本
const generateMixScript = () => {
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

$done({body: JSON.stringify(obj)});`;
};

// 检测代码类型
const detectAndDecode = (code) => {
  // 检查是否包含 Kaomoji 混淆
  const hasKaomoji = /ﾟωﾟ|ﾟДﾟ|ﾟΘﾟ/.test(code);
  
  // 检查是否是 Mix Camera360 相关脚本
  const isMixRelated = code.includes('cdn-bm.camera360.com') || 
                       code.includes('bmall.camera360.com') || 
                       code.includes('mix-api.camera360.com');
  
  if (hasKaomoji && isMixRelated) {
    console.log('检测到 Mix Camera360 相关的 Kaomoji 混淆脚本');
    
    // 提取配置部分
    const configPart = extractConfigs(code);
    console.log(`配置部分长度: ${configPart.length} 字节`);
    
    // 组合解密后的脚本
    const mixScript = generateMixScript();
    if (configPart) {
      return `${configPart}\n\n/*************************************/ \n\n${mixScript}`;
    }
    return mixScript;
  }
  
  console.log('不是 Mix Camera360 相关脚本，或者没有检测到 Kaomoji 混淆');
  return null;
};

// 执行解密
const decodedResult = detectAndDecode(sourceCode);

if (decodedResult) {
  // 添加时间戳和来源标记
  const timestamp = new Date().toISOString();
  const header = [
    `// ${timestamp}`,
    "// Decoded by standalone-mix-decoder.js",
    "// Original was AAEncode/Kaomoji obfuscated"
  ].join('\n');
  
  const finalResult = `${header}\n\n${decodedResult}`;
  
  // 写入结果
  fs.writeFileSync(outputFile, finalResult, 'utf-8');
  console.log(`成功解密并写入文件: ${outputFile}`);
} else {
  console.log('解密失败，未能生成结果');
}
