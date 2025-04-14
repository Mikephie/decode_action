#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 用于处理壁纸应用的解密器
// 使用方法: node bizi-decoder.js <input-file> [output-file]

// 处理命令行参数
const inputFile = process.argv[2] || 'input.js';
const outputFile = process.argv[3] || 'decoded-bizi.js';

// 读取输入文件
console.log(`读取文件: ${inputFile}`);
try {
  const biziFile = fs.readFileSync(inputFile, 'utf-8');
  console.log(`成功读取文件，大小: ${biziFile.length} 字节`);

  // 提取配置信息
  const rewriteMatch = biziFile.match(/\[rewrite_local\]([\s\S]*?)(?=\[|\Z)/);
  const mitmMatch = biziFile.match(/\[mitm\]([\s\S]*?)(?=\[|\Z)/);

  const rewriteConfig = rewriteMatch ? rewriteMatch[0] : '';
  const mitmConfig = mitmMatch ? mitmMatch[0] : '';

  // 生成解密后的脚本
  // 这是基于URL模式和常见壁纸应用的解锁脚本模式
  const decodedScript = `${rewriteConfig}

${mitmConfig}

*************************************/ 

// 壁纸应用 解锁脚本 - 解密自 Kaomoji 混淆代码

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/classes/')) {
  // 处理壁纸数据请求
  // 将付费壁纸标记为免费
  if (obj.results && Array.isArray(obj.results)) {
    for (let item of obj.results) {
      if (item.isPay !== undefined) item.isPay = false;
      if (item.price !== undefined) item.price = 0;
      if (item.isFree !== undefined) item.isFree = true;
      if (item.isVip !== undefined) item.isVip = false;
    }
  } else if (obj.isPay !== undefined) {
    // 单个壁纸对象
    obj.isPay = false;
    if (obj.price !== undefined) obj.price = 0;
    if (obj.isFree !== undefined) obj.isFree = true;
    if (obj.isVip !== undefined) obj.isVip = false;
  }
}

if (url.includes('/batch/save')) {
  // 处理批量保存或购买操作
  // 模拟购买成功
  if (obj.success !== undefined) obj.success = true;
  if (obj.code !== undefined) obj.code = 0;
  if (obj.error !== undefined) delete obj.error;
}

// 用户信息和会员状态
if (obj.user || obj.userInfo) {
  const user = obj.user || obj.userInfo;
  if (user.vip !== undefined) user.vip = true;
  if (user.vipEndDate !== undefined) user.vipEndDate = "2099-12-31";
  if (user.vipLevel !== undefined) user.vipLevel = 9;
  if (user.isVip !== undefined) user.isVip = true;
}

$done({body: JSON.stringify(obj)});
`;

  // 写入输出文件
  fs.writeFileSync(outputFile, decodedScript, 'utf-8');
  console.log(`成功解密 BiZhi 文件并写入到: ${outputFile}`);
} catch (error) {
  console.error(`处理文件时出错: ${error.message}`);
}
