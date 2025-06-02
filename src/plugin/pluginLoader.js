// pluginLoader.js - 插件加载器和使用示例

// 导入所有插件
const variableRenaming = require('./variableRenaming');
const beautify = require('./beautify');
const expressionSimplify = require('./expressionSimplify');
const deadCodeElimination = require('./deadCodeElimination');

// 插件注册表
const PLUGIN_REGISTRY = {
    // 新增的强力插件
    'variableRenaming': variableRenaming,
    'beautify': beautify,
    'expressionSimplify': expressionSimplify,
    'deadCodeElimination': deadCodeElimination,
    
    // 原有插件的包装器（需要你实现具体逻辑）
    'unwrapIIFE': createBasicPlugin('unwrapIIFE'),
    'eval': createBasicPlugin('eval'),
    'sojsonv7': createBasicPlugin('sojsonv7'),
    'sojson': createBasicPlugin('sojson'),
    'jsconfuser': createBasicPlugin('jsconfuser'),
    'awsc': createBasicPlugin('awsc'),
    'jjencode': createBasicPlugin('jjencode'),
    'obfuscator': createBasicPlugin('obfuscator'),
    'common': createBasicPlugin('common')
};

// 创建基础插件包装器
function createBasicPlugin(name) {
    return {
        name: name,
        description: `${name} 反混淆插件`,
        process: (code, options = {}) => {
            console.log(`执行插件: ${name}`);
            // 这里应该调用你现有的插件逻辑
            // 暂时返回原代码，你需要替换为实际的处理函数
            return code;
        }
    };
}

// 插件执行器
class PluginExecutor {
    constructor() {
        this.plugins = new Map();
        this.loadPlugins();
    }
    
    // 加载所有插件
    loadPlugins() {
        Object.entries(PLUGIN_REGISTRY).forEach(([name, plugin]) => {
            this.plugins.set(name, plugin);
        });
        console.log(`已加载 ${this.plugins.size} 个插件`);
    }
    
    // 执行单个插件
    executePlugin(pluginName, code, options = {}) {
        const plugin = this.plugins.get(pluginName);
        if (!plugin) {
            throw new Error(`插件 ${pluginName} 未找到`);
        }
        
        const startTime = Date.now();
        const beforeSize = code.length;
        
        try {
            const result = plugin.process(code, options);
            const endTime = Date.now();
            const afterSize = result.length;
            const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(2);
            
            console.log(`✓ ${pluginName}: ${endTime - startTime}ms, 减少 ${reduction}%`);
            return result;
        } catch (error) {
            console.error(`✗ 插件 ${pluginName} 执行失败:`, error.message);
            return code; // 返回原代码
        }
    }
    
    // 执行插件序列
    executePluginSequence(code, pluginNames, options = {}) {
        let result = code;
        const log = [];
        
        console.log(`开始执行 ${pluginNames.length} 个插件...`);
        
        for (const pluginName of pluginNames) {
            const beforeSize = result.length;
            const startTime = Date.now();
            
            try {
                result = this.executePlugin(pluginName, result, options[pluginName] || {});
                
                const endTime = Date.now();
                const afterSize = result.length;
                const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(2);
                
                log.push({
                    plugin: pluginName,
                    success: true,
                    duration: endTime - startTime,
                    sizeBefore: beforeSize,
                    sizeAfter: afterSize,
                    reduction: reduction + '%'
                });
                
            } catch (error) {
                log.push({
                    plugin: pluginName,
                    success: false,
                    error: error.message
                });
            }
        }
        
        return { code: result, log };
    }
}

// 预设配置
const PRESETS = {
    // 针对你的代码的最佳配置
    'yourCode': [
        'variableRenaming',    // 最重要！解决混淆变量名
        'expressionSimplify',  // 简化表达式
        'deadCodeElimination', // 移除无用代码
        'beautify'            // 美化格式
    ],
    
    // 最大净化
    'maximum': [
        'unwrapIIFE',
        'eval',
        'sojsonv7',
        'variableRenaming',
        'expressionSimplify',
        'deadCodeElimination',
        'beautify',
        'common'
    ],
    
    // 快速净化
    'fast': [
        'variableRenaming',
        'beautify'
    ],
    
    // sojson专用
    'sojson': [
        'sojsonv7',
        'sojson',
        'variableRenaming',
        'deadCodeElimination',
        'beautify'
    ]
};

// 主要使用函数
function deobfuscateCode(code, preset = 'yourCode', customOptions = {}) {
    const executor = new PluginExecutor();
    const pluginNames = PRESETS[preset] || PRESETS['yourCode'];
    
    console.log(`使用预设: ${preset}`);
    console.log(`插件序列: ${pluginNames.join(' -> ')}`);
    
    const result = executor.executePluginSequence(code, pluginNames, customOptions);
    
    console.log('\n=== 净化完成 ===');
    console.log(`原始大小: ${code.length} 字符`);
    console.log(`净化后大小: ${result.code.length} 字符`);
    console.log(`总体减少: ${((code.length - result.code.length) / code.length * 100).toFixed(2)}%`);
    
    return result;
}

// 使用示例
function example() {
    const yourObfuscatedCode = `
//2025-06-01T15:08:34.093Z
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
}`;

    // 基础净化
    const basicResult = deobfuscateCode(yourObfuscatedCode, 'yourCode');
    
    // 带自定义选项的净化
    const advancedResult = deobfuscateCode(yourObfuscatedCode, 'yourCode', {
        variableRenaming: {
            nameStyle: 'meaningful',
            contextAware: true
        },
        beautify: {
            indent: 2,
            maxLineLength: 100
        }
    });
    
    return advancedResult.code;
}

// 单独的插件测试函数
function testSinglePlugin() {
    const executor = new PluginExecutor();
    const testCode = `const _0x264ed5 = "test"; const _0xe804f6 = _0x264ed5;`;
    
    console.log('原始代码:', testCode);
    
    // 测试变量重命名插件
    const renamed = executor.executePlugin('variableRenaming', testCode);
    console.log('重命名后:', renamed);
    
    // 测试美化插件
    const beautified = executor.executePlugin('beautify', renamed);
    console.log('美化后:', beautified);
}

// 直接处理你的代码
function processYourCode(code) {
    const executor = new PluginExecutor();
    
    // 按顺序执行最重要的插件
    let result = code;
    
    console.log('1. 执行变量重命名...');
    result = executor.executePlugin('variableRenaming', result, {
        nameStyle: 'meaningful',
        contextAware: true
    });
    
    console.log('2. 执行表达式简化...');
    result = executor.executePlugin('expressionSimplify', result);
    
    console.log('3. 执行死代码消除...');
    result = executor.executePlugin('deadCodeElimination', result);
    
    console.log('4. 执行代码美化...');
    result = executor.executePlugin('beautify', result, {
        indent: 4,
        maxLineLength: 120
    });
    
    return result;
}

// 导出
module.exports = {
    PluginExecutor,
    PLUGIN_REGISTRY,
    PRESETS,
    deobfuscateCode,
    processYourCode,
    example,
    testSinglePlugin
};

// 如果直接运行此文件
if (require.main === module) {
    example();
}