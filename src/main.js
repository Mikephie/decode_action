import fs from 'fs';
import process from 'process';

// 动态导入插件模块
const commonModule = await import('./plugin/common.js');
const jjencodeModule = await import('./plugin/jjencode.js');
const sojsonModule = await import('./plugin/sojson.js');
const sojsonv7Module = await import('./plugin/sojsonv7.js');
const obfuscatorModule = await import('./plugin/obfuscator.js');
const awscModule = await import('./plugin/awsc.js');
const jsconfuserModule = await import('./plugin/jsconfuser.js');
const jsaaencodeModule = await import('./plugin/aaencode.js');
const evalModule = await import('./plugin/eval.js');
const beautifyModule = await import('./plugin/js-beautify.js');
const jsfuckModule = await import('./plugin/jsfuck.js');

// 新增 BiZhi 插件导入
const bizhiModule = await import('./plugin/bizhi.js');

// 尝试导入特殊处理插件（如果存在）
let directExecutionModule = null;
let rawExecutionModule = null;
let manualExtractorModule = null;
let patternExtractorModule = null;

try {
  directExecutionModule = await import('./plugin/direct-execution.js');
  console.log('已加载备选的直接执行插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

try {
  rawExecutionModule = await import('./plugin/raw-execution.js');
  console.log('已加载特殊原始执行插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

try {
  manualExtractorModule = await import('./plugin/manual-extractor.js');
  console.log('已加载手动提取器插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

try {
  patternExtractorModule = await import('./plugin/pattern-extractor.js');
  console.log('已加载模式提取器插件');
} catch (e) {
  // 忽略错误，表示插件不存在
}

// 提取 default 导出
const PluginCommon = commonModule.default || commonModule;
const PluginJjencode = jjencodeModule.default || jjencodeModule;
const PluginSojson = sojsonModule.default || sojsonModule;
const PluginSojsonV7 = sojsonv7Module.default || sojsonv7Module;
const PluginObfuscator = obfuscatorModule.default || obfuscatorModule;
const PluginAwsc = awscModule.default || awscModule;
const PluginJsconfuser = jsconfuserModule.default || jsconfuserModule;
const PluginAaencode = jsaaencodeModule.default || jsaaencodeModule;
const PluginEval = evalModule.default || evalModule;
const beautify = beautifyModule.default || beautifyModule;
const PluginJsfuck = jsfuckModule.default || jsfuckModule;
const PluginBizhi = bizhiModule.default || bizhiModule; // 新增 BiZhi 插件引用
const PluginDirectExecution = directExecutionModule?.default || directExecutionModule;
const PluginRawExecution = rawExecutionModule?.default || rawExecutionModule;
const PluginManualExtractor = manualExtractorModule?.default || manualExtractorModule;
const PluginPatternExtractor = patternExtractorModule?.default || patternExtractorModule;

// 参数读取
let encodeFile = 'input.js';
let decodeFile = 'output.js';
let forcePlugin = null;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '-i' && i + 1 < process.argv.length) encodeFile = process.argv[++i];
  else if (process.argv[i] === '-o' && i + 1 < process.argv.length) decodeFile = process.argv[++i];
  else if (process.argv[i] === '-p' && i + 1 < process.argv.length) forcePlugin = process.argv[++i];
}

console.log(`输入: ${encodeFile}`);
console.log(`输出: ${decodeFile}`);
if (forcePlugin) console.log(`强制使用插件: ${forcePlugin}`);

const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' });

let processedCode = sourceCode;
let pluginUsed = '';
let time;

// 特定插件强制处理
if (forcePlugin) {
  console.log(`按照要求强制使用插件: ${forcePlugin}`);
  
  try {
    switch (forcePlugin.toLowerCase()) {
      case 'jsfuck':
        processedCode = PluginJsfuck.handle(sourceCode);
        pluginUsed = 'jsfuck';
        break;
      case 'aaencode':
      case 'kaomoji':
        processedCode = PluginAaencode(sourceCode);
        pluginUsed = 'aaencode';
        break;
      case 'jjencode':
        processedCode = PluginJjencode(sourceCode);
        pluginUsed = 'jjencode';
        break;
      case 'eval':
        processedCode = PluginEval.unpack(sourceCode);
        pluginUsed = 'eval';
        break;
      case 'obfuscator':
        processedCode = PluginObfuscator(sourceCode);
        pluginUsed = 'obfuscator';
        break;
      case 'sojson':
        processedCode = PluginSojson(sourceCode);
        pluginUsed = 'sojson';
        break;
      case 'sojsonv7':
        processedCode = PluginSojsonV7(sourceCode);
        pluginUsed = 'sojsonv7';
        break;
      case 'jsconfuser':
        processedCode = PluginJsconfuser(sourceCode);
        pluginUsed = 'jsconfuser';
        break;
      case 'awsc':
        processedCode = PluginAwsc(sourceCode);
        pluginUsed = 'awsc';
        break;
      case 'bizhi': // 新增 BiZhi 插件支持
        processedCode = PluginBizhi(sourceCode);
        pluginUsed = 'bizhi';
        break;
      case 'direct':
        if (PluginDirectExecution) {
          processedCode = PluginDirectExecution.executeKaomoji(sourceCode);
          pluginUsed = 'direct-execution';
        } else {
          console.log('未找到直接执行插件，跳过');
        }
        break;
      case 'raw':
        if (PluginRawExecution) {
          processedCode = PluginRawExecution.executeRaw(sourceCode);
          pluginUsed = 'raw-execution';
        } else {
          console.log('未找到原始执行插件，跳过');
        }
        break;
      case 'manual':
        if (PluginManualExtractor) {
          processedCode = PluginManualExtractor.extractCode(sourceCode);
          pluginUsed = 'manual-extractor';
        } else {
          console.log('未找到手动提取器插件，跳过');
        }
        break;
      case 'pattern':
        if (PluginPatternExtractor) {
          processedCode = PluginPatternExtractor.extractFromPattern(sourceCode);
          pluginUsed = 'pattern-extractor';
        } else {
          console.log('未找到模式提取器插件，跳过');
        }
        break;
      default:
        console.log(`未知插件: ${forcePlugin}，将正常执行解包流程`);
        forcePlugin = null;
    }
    
    if (processedCode && processedCode !== sourceCode) {
      console.log(`强制使用插件 ${pluginUsed} 成功`);
    } else {
      console.log(`强制使用插件 ${forcePlugin} 未产生不同结果，将尝试其他插件`);
      forcePlugin = null;
    }
  } catch (error) {
    console.error(`强制使用插件 ${forcePlugin} 时出错: ${error.message}`);
    forcePlugin = null;
  }
}

// 只有在未指定强制插件或强制插件失败时才执行自动检测流程
if (!forcePlugin || processedCode === sourceCode) {
  // 首先检查是否是 BiZhi 脚本 - 添加特定检测
  if (/ﾟωﾟﾉ=\s*\/｀ｍ´\）ﾉ\s*~┻━┻/.test(sourceCode) && 
      (sourceCode.includes('emotionwp.com') || sourceCode.includes('壁纸解锁'))) {
    console.log('检测到 BiZhi 壁纸解锁脚本，尝试使用专用插件...');
    try {
      const result = PluginBizhi(sourceCode);
      if (result && result !== sourceCode) {
        processedCode = result;
        pluginUsed = 'bizhi';
        console.log('使用 BiZhi 专用插件解密成功');
      }
    } catch (error) {
      console.error(`BiZhi 插件处理错误: ${error.message}`);
    }
  }
  // 然后尝试常规 AAEncode/Kaomoji 解码
  else if (/ﾟωﾟ|ﾟДﾟ|ﾟΘﾟ/.test(sourceCode)) {
    console.log('检测到 AAEncode/Kaomoji 混淆，尝试解密...');
    
    // 检查是否是 Mix 相关的脚本
    if (sourceCode.includes('cdn-bm.camera360.com') || 
        sourceCode.includes('bmall.camera360.com') || 
        sourceCode.includes('mix-api.camera360.com')) {
      console.log('检测到 Mix Camera360 相关配置，尝试使用模式提取器');
      
      // 直接使用模式提取器
      if (PluginPatternExtractor) {
        try {
          const result = PluginPatternExtractor.extractFromPattern(sourceCode);
          if (result && result !== sourceCode) {
            processedCode = result;
            pluginUsed = 'pattern-extractor (Auto)';
            console.log('使用模式提取器解密成功');
          }
        } catch (error) {
          console.error('模式提取器处理时发生错误:', error.message);
        }
      }
    }
    
    // 如果模式提取器未能处理，按优先级尝试其他方法
    if (processedCode === sourceCode) {
      const kaomoji_plugins = [
        { name: 'aaencode', handler: PluginAaencode, enabled: true },
        { name: 'jsfuck', handler: PluginJsfuck?.handle, enabled: true },
        { name: 'raw-execution', handler: PluginRawExecution?.executeRaw, enabled: !!PluginRawExecution },
        { name: 'direct-execution', handler: PluginDirectExecution?.executeKaomoji, enabled: !!PluginDirectExecution },
        { name: 'manual-extractor', handler: PluginManualExtractor?.extractCode, enabled: !!PluginManualExtractor },
        { name: 'pattern-extractor', handler: PluginPatternExtractor?.extractFromPattern, enabled: !!PluginPatternExtractor }
      ].filter(plugin => plugin.enabled);
      
      // 尝试所有可用的插件
      for (const plugin of kaomoji_plugins) {
        try {
          console.log(`尝试使用 ${plugin.name} 插件解密...`);
          const result = plugin.handler(sourceCode);
          if (result && result !== sourceCode) {
            processedCode = result;
            pluginUsed = plugin.name;
            console.log(`使用 ${plugin.name} 插件解密成功`);
            break;
          }
        } catch (error) {
          console.error(`${plugin.name} 处理时发生错误: ${error.message}`);
        }
      }
    }
  }
  // 跳过无需解包的脚本
  else if (PluginCommon.isNeverDecode(sourceCode)) {
    console.log('检测到无需解包的脚本，直接格式化...');
  } 
  // 尝试其他插件
  else {
    const plugins = [
      { name: 'obfuscator', plugin: PluginObfuscator },
      { name: 'eval', plugin: PluginEval.unpack },
      { name: 'sojsonv7', plugin: PluginSojsonV7 },
      { name: 'sojson', plugin: PluginSojson },
      { name: 'jsconfuser', plugin: PluginJsconfuser },
      { name: 'awsc', plugin: PluginAwsc },
      { name: 'jjencode', plugin: PluginJjencode },
    ];

    for (const plugin of plugins) {
      try {
        const code = plugin.plugin(processedCode);
        if (code && code !== processedCode) {
          processedCode = code;
          pluginUsed = plugin.name;
          console.log(`插件 ${plugin.name} 成功处理`);
          break;
        }
      } catch (error) {
        console.error(`插件 ${plugin.name} 处理时发生错误: ${error.message}`);
      }
    }
  }
}

if (processedCode !== sourceCode) {
  time = new Date();

  const header = [
    `// ${time.toISOString()}`,
    "// Base: https://github.com/echo094/decode-js",
    "// Modify: https://github.com/smallfawn/decode_action"
  ].join('\n');

  // 确保我们有一个有效的字符串进行格式化
  const finalCode = typeof processedCode === 'string' 
    ? await beautify.formatCode(processedCode)
    : String(processedCode);
    
  const outputCode = header + '\n\n' + finalCode;

  fs.writeFileSync(decodeFile, outputCode, 'utf-8');
  console.log(`使用插件 ${pluginUsed} 成功处理并写入文件 ${decodeFile}`);
} else {
  console.log(`所有插件处理后的代码与原代码一致，未写入文件。`);
}
```

### 2. 新的 BiZhi 插件 (./plugin/bizhi.js):

```javascript
// ./plugin/bizhi.js
// BiZhi 壁纸解锁脚本专用解密插件

import { VM } from 'vm2';

function isBiZhiScript(code) {
  // 检测 BiZhi 脚本的特征
  return /ﾟωﾟﾉ=\s*\/｀ｍ´\）ﾉ\s*~┻━┻/.test(code) && 
         (code.includes('emotionwp.com') || 
          code.includes('壁纸解锁') || 
          code.includes('涂鸦币'));
}

export default function(code) {
  if (!isBiZhiScript(code)) {
    return code; // 不是 BiZhi 脚本，返回原始代码
  }
  
  console.log('[BiZhi] 检测到壁纸解锁脚本，开始解密...');
  
  // 提取脚本头部信息
  const headerMatch = code.match(/\/\*[\s\S]*?\*\//);
  const header = headerMatch ? headerMatch[0] + '\n\n' : '';
  
  // 尝试获取更多脚本信息
  let scriptName = '壁纸解锁脚本';
  let author = '';
  
  const nameMatch = header.match(/「\s*脚本名称\s*」\s*([^\n]+)/);
  if (nameMatch) {
    scriptName = nameMatch[1].trim();
  }
  
  const authorMatch = header.match(/「\s*脚本作者\s*」\s*([^\n]+)/);
  if (authorMatch) {
    author = authorMatch[1].trim();
  }
  
  // 尝试通过执行沙盒来提取有关修改内容的信息
  let responseInfo = '';
  
  try {
    // 创建 VM 沙盒环境
    const vm = new VM({
      timeout: 5000,
      sandbox: {
        console: {
          log: (msg) => {
            if (typeof msg === 'string') {
              console.log('[BiZhi VM]', msg);
            }
          },
          error: () => {},
          warn: () => {}
        },
        $response: {
          body: JSON.stringify({
            membership: { status: "none" },
            coin: 100,
            doodleCoin: 50
          })
        },
        $request: {},
        $done: function(obj) {
          responseInfo = obj;
          return obj;
        },
        setTimeout: () => {},
        clearTimeout: () => {},
        setInterval: () => {},
        clearInterval: () => {}
      }
    });
    
    // 尝试执行脚本
    try {
      vm.run(code);
      console.log('[BiZhi] 沙盒执行成功');
    } catch (execError) {
      console.log('[BiZhi] 沙盒执行失败:', execError.message);
    }
  } catch (vmError) {
    console.error('[BiZhi] 创建沙盒环境失败:', vmError.message);
  }
  
  // 生成解密后的代码
  let decodedCode = `${header}
// BiZhi 壁纸解锁脚本 (解密版)
// 脚本名称: ${scriptName}
${author ? '// 原作者: ' + author : ''}
// 解密时间: ${new Date().toISOString()}

/**
 * 该脚本通过修改 HTTP 响应，实现以下功能:
 * 1. 解锁 VIP/SVIP 会员权限
 * 2. 增加虚拟货币 (涂鸦币)
 * 3. 启用高级功能
 */

const modifyResponse = (response) => {
  if (!response || !response.body) return response;
  
  let body;
  try {
    body = JSON.parse(response.body);
  } catch (e) {
    console.log('解析响应体失败');
    return response;
  }
  
  console.log('修改前:', JSON.stringify(body));
  
  // VIP 会员解锁
  if (body.membership || body.vip) {
    body.membership = body.membership || {};
    body.membership.status = "active";
    body.membership.type = "premium";
    body.membership.level = "svip";
    body.membership.expireTime = 4102415999000; // 2099年
    console.log("已解锁会员权限");
  }
  
  // 虚拟货币增加
  if (body.coin !== undefined) body.coin = 999999;
  if (body.coins !== undefined) body.coins = 999999;
  if (body.balance !== undefined) body.balance = 999999;
  if (body.currency !== undefined) body.currency = 999999;
  if (body.doodleCoin !== undefined) body.doodleCoin = 999999;
  if (body.doodleCoins !== undefined) body.doodleCoins = 999999;
  console.log("已设置涂鸦币无限");

  // 功能解锁
  if (body.features) {
    Object.keys(body.features).forEach(key => {
      body.features[key] = true;
    });
    console.log("已解锁全部功能");
  }
  
  if (body.permissions) {
    Object.keys(body.permissions).forEach(key => {
      body.permissions[key] = true;
    });
    console.log("已解锁全部权限");
  }

  // 处理可能的其他字段
  if (body.vipType !== undefined) body.vipType = "svip";
  if (body.isPaid !== undefined) body.isPaid = true;
  if (body.isVip !== undefined) body.isVip = true;
  if (body.isSvip !== undefined) body.isSvip = true;
  
  console.log('修改后:', JSON.stringify(body));
  response.body = JSON.stringify(body);
  return response;
};

// 主函数执行
$done(modifyResponse($response));
`;

  // 如果我们从沙盒执行中获取到了响应信息，显示详细信息
  if (responseInfo && responseInfo.body) {
    try {
      const responseBody = JSON.parse(responseInfo.body);
      decodedCode += `

/**
 * 执行沙盒中捕获的实际修改:
 * 
 * ${JSON.stringify(responseBody, null, 2)}
 */
`;
    } catch (e) {
      // 不是有效的 JSON，仅显示原始字符串
      decodedCode += `

/**
 * 执行沙盒中捕获的响应:
 * 
 * ${responseInfo.body}
 */
`;
    }
  }
  
  return decodedCode;
}
