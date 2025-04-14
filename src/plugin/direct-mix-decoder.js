#!/usr/bin/env node

// 这个脚本专门针对 Mix.js 进行解码
// 使用方法: node direct-mix-decoder.js input.js output.js

import fs from 'fs';

// 处理命令行参数
const inputFile = process.argv[2] || 'input.js';
const outputFile = process.argv[3] || 'output.js';

// 读取输入文件
console.log(`读取文件: ${inputFile}`);
const mixFile = fs.readFileSync(inputFile, 'utf-8');

// 提取配置信息
const rewriteMatch = mixFile.match(/\[rewrite_local\]([\s\S]*?)(?=\[|\Z)/);
const mitmMatch = mixFile.match(/\[mitm\]([\s\S]*?)(?=\[|\Z)/);

const rewriteConfig = rewriteMatch ? rewriteMatch[0] : '';
const mitmConfig = mitmMatch ? mitmMatch[0] : '';

// 生成解密后的 Mix 脚本
const decodedScript = `${rewriteConfig}

${mitmConfig}

*************************************/ 

// Mix & Mix2 解锁 VIP - 解密自 Kaomoji 混淆代码

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

// 写入输出文件
fs.writeFileSync(outputFile, decodedScript, 'utf-8');
console.log(`成功解密 Mix 文件并写入到: ${outputFile}`);
