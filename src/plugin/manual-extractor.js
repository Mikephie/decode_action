import { isKaomojiFuck } from './common.js';

function cleanAndDecode(input) {
  // 提取 Function['_'](['_'](content)) 中的 content 部分
  const functionCallMatch = input.match(/\['_'\]\s*\(\s*\['_'\]\s*\(([\s\S]+?)\)\)/);
  if (!functionCallMatch) return null;
  
  let content = functionCallMatch[1];
  console.log('[ManualExtractor] 找到内部函数调用内容，长度:', content.length);
  
  // 将内容按 + 号分割成多个部分
  const parts = content.split('+').map(part => part.trim());
  console.log('[ManualExtractor] 分割成', parts.length, '个部分');
  
  // 创建一个映射关系，用于将 Kaomoji 变量替换为对应的字符串
  const replacements = {
    // 常见的 Kaomoji 变量映射
    '(ﾟДﾟ)[ﾟεﾟ]': '\\',
    '(ﾟДﾟ)[ﾟoﾟ]': '"',
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
      processed = processed.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
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

export function extractCode(code) {
  if (!isKaomojiFuck(code)) {
    return null;
  }
  
  console.log('[ManualExtractor] 尝试手动提取 Kaomoji 代码内容');
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
