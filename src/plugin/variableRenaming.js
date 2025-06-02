// plugin/variableRenaming.js - 变量重命名插件

/**
 * 变量重命名插件
 * 将混淆的变量名改为有意义的名称
 */
export default function variableRenaming(code) {
    if (!code || typeof code !== 'string') {
        return code;
    }
// variableRenaming.js - 变量重命名插件

function process(code, options = {}) {
    const config = {
        nameStyle: options.nameStyle || 'meaningful', // 'meaningful' | 'short' | 'camelCase'
        contextAware: options.contextAware !== false,
        excludePatterns: options.excludePatterns || ['console', 'window', 'document', '$request', '$response', '$done'],
        ...options
    };
    
    let result = code;
    const varMap = new Map();
    let counter = 0;
    
    // 有意义的变量名词库
    const meaningfulNames = [
        // 数据相关
        'data', 'result', 'response', 'request', 'payload', 'body', 'content',
        'value', 'item', 'element', 'node', 'obj', 'arr', 'list', 'collection',
        
        // 功能相关
        'handler', 'callback', 'processor', 'parser', 'validator', 'formatter',
        'manager', 'service', 'controller', 'helper', 'utils', 'config',
        
        // 状态相关
        'flag', 'status', 'state', 'condition', 'option', 'setting', 'param',
        'index', 'count', 'length', 'size', 'total', 'temp', 'buffer',
        
        // 特定用途
        'key', 'name', 'type', 'id', 'url', 'path', 'file', 'text', 'message',
        'error', 'success', 'info', 'warning', 'debug', 'log', 'trace'
    ];
    
    // 排除不需要重命名的变量
    const excludePatterns = [
        'console', 'window', 'document', '$request', '$response', '$done',
        'Array', 'Object', 'String', 'Number', 'Boolean', 'JSON', 'Date',
        'Math', 'RegExp', 'Error', 'Promise', 'setTimeout', 'setInterval'
    ];
    
    // 生成有意义的变量名
    function generateMeaningfulName(originalName, context = '') {
        // 根据上下文推断变量用途
        const contextHints = {
            'error': ['error', 'err', 'exception', 'failure'],
            'data': ['data', 'result', 'response', 'info'],
            'array': ['arr', 'list', 'items', 'collection'],
            'object': ['obj', 'config', 'options', 'params'],
            'function': ['handler', 'callback', 'processor'],
            'index': ['index', 'i', 'counter', 'position'],
            'temp': ['temp', 'tmp', 'buffer', 'cache']
        };
        
        // 分析上下文
        let suggestedNames = meaningfulNames;
        for (const [ctx, names] of Object.entries(contextHints)) {
            if (context.toLowerCase().includes(ctx)) {
                suggestedNames = names.concat(meaningfulNames);
                break;
            }
        }
        
        const baseName = suggestedNames[counter % suggestedNames.length];
        const suffix = Math.floor(counter / suggestedNames.length);
        
        return suffix > 0 ? `${baseName}${suffix}` : baseName;
    }
    
    // 分析变量上下文
    function analyzeVariableContext(code, varName) {
        const contexts = [];
        
        // 查找变量周围的代码
        const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedVarName}\\b`, 'g');
        let match;
        
        while ((match = regex.exec(code)) !== null) {
            const start = Math.max(0, match.index - 50);
            const end = Math.min(code.length, match.index + varName.length + 50);
            const context = code.substring(start, end);
            
            // 分析上下文关键词
            if (/catch\s*\(/i.test(context)) contexts.push('error');
            if (/\.data|data\.|response|result/i.test(context)) contexts.push('data');
            if (/\.length|Array\.isArray|\[|\]/i.test(context)) contexts.push('array');
            if (/\{|\}|Object\.|\.keys|\.values/i.test(context)) contexts.push('object');
            if (/function|=>\s*|callback|handler/i.test(context)) contexts.push('function');
            if (/forEach|map|filter|some|every|find/i.test(context)) contexts.push('index');
            if (/temp|tmp|cache|buffer/i.test(context)) contexts.push('temp');
        }
        
        return contexts.join(' ');
    }
    
    // 检测混淆变量名
    function isObfuscatedVariable(varName) {
        const obfuscatedPatterns = [
            /^_0x[a-f0-9]+$/i,          // _0x123abc 格式
            /^[a-zA-Z]\$[a-zA-Z0-9$]+$/,  // a$bc 格式  
            /^[a-zA-Z]{1,2}\d+[a-zA-Z]*$/  // a1b, ab2 格式
        ];
        
        return obfuscatedPatterns.some(pattern => pattern.test(varName)) &&
               !excludePatterns.some(exclude => varName.includes(exclude));
    }
    
    // 收集所有混淆变量名
    const variablePattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
    const collectedVars = new Set();
    let match;
    
    while ((match = variablePattern.exec(result)) !== null) {
        const varName = match[1];
        if (isObfuscatedVariable(varName)) {
            collectedVars.add(varName);
        }
    }
    
    // 生成短变量名
    function generateShortName() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let name = '';
        let num = counter;
        
        do {
            name = chars[num % 26] + name;
            num = Math.floor(num / 26);
        } while (num > 0);
        
        return name;
    }
    
    // 生成驼峰命名
    function generateCamelCaseName() {
        const words = ['get', 'set', 'is', 'has', 'can', 'should', 'will', 'data', 'info', 'item', 'list', 'value'];
        const word1 = words[counter % words.length];
        const word2 = words[(counter + 1) % words.length];
        const suffix = Math.floor(counter / words.length);
        
        return suffix > 0 ? `${word1}${word2.charAt(0).toUpperCase() + word2.slice(1)}${suffix}` : 
                           `${word1}${word2.charAt(0).toUpperCase() + word2.slice(1)}`;
    }
    
    // 生成变量名
    function generateVariableName(originalName, context = '') {
        switch (config.nameStyle) {
            case 'short':
                return generateShortName();
            case 'camelCase':
                return generateCamelCaseName();
            case 'meaningful':
            default:
                return generateMeaningfulName(originalName, context);
        }
    }
    
    // 收集混淆变量名
    const obfuscatedPatterns = [
        /_0x[a-f0-9]+/gi,           // _0x123abc 格式
        /\b[a-zA-Z]\$[a-zA-Z0-9$]+/g, // a$bc 格式
        /\b[a-zA-Z]{1,2}\d+[a-zA-Z]*\b/g // a1b, ab2 格式
    ];
    
    const collectedVars = new Set();
    
    obfuscatedPatterns.forEach(pattern => {
        const matches = result.match(pattern) || [];
        matches.forEach(match => {
            // 排除不需要重命名的变量
            if (!config.excludePatterns.some(exclude => match.includes(exclude))) {
                collectedVars.add(match);
            }
        });
    });
    
    // 为每个变量分配新名称
    Array.from(collectedVars).forEach(oldName => {
        // 分析变量的上下文
        const context = analyzeVariableContext(result, oldName);
        const newName = generateMeaningfulName(oldName, context);
        const newName = generateVariableName(oldName, context);
        
        varMap.set(oldName, newName);
        counter++;
    });
    
    // 替换变量名（确保词边界匹配）
    for (const [oldName, newName] of varMap) {
        const escapedOldName = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedOldName}\\b`, 'g');
        result = result.replace(regex, newName);
    }
    
    // 如果有变量被重命名，返回新代码，否则返回原代码
    if (varMap.size > 0) {
        console.log(`变量重命名: 重命名了 ${varMap.size} 个变量`);
        return result;
    }
    
    return code; // 没有变化时返回原代码
}
    return result;
}

// 分析变量上下文
function analyzeVariableContext(code, varName) {
    const contexts = [];
    
    // 查找变量周围的代码
    const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedVarName}\\b`, 'g');
    let match;
    
    while ((match = regex.exec(code)) !== null) {
        const start = Math.max(0, match.index - 50);
        const end = Math.min(code.length, match.index + varName.length + 50);
        const context = code.substring(start, end);
        
        // 分析上下文关键词
        if (/catch\s*\(/i.test(context)) contexts.push('error');
        if (/\.data|data\.|response|result/i.test(context)) contexts.push('data');
        if (/\.length|Array\.isArray|\[|\]/i.test(context)) contexts.push('array');
        if (/\{|\}|Object\.|\.keys|\.values/i.test(context)) contexts.push('object');
        if (/function|=>\s*|callback|handler/i.test(context)) contexts.push('function');
        if (/forEach|map|filter|some|every|find/i.test(context)) contexts.push('index');
        if (/temp|tmp|cache|buffer/i.test(context)) contexts.push('temp');
    }
    
    return contexts.join(' ');
}

// 验证JavaScript语法
function isValidJavaScript(code) {
    try {
        new Function(code);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    name: 'variableRenaming',
    description: '将混淆的变量名改为有意义的名称',
    process: process
};
