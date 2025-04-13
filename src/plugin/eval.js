// 最基础的eval解混淆插件 - 专注于核心功能
import { parse } from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';

/**
 * 最简单的eval解包函数
 */
function unpackEval(code) {
    // 如果没有eval，直接返回
    if (!code.includes('eval(')) {
        return code;
    }
    
    let result = code;
    
    try {
        // 1. 替换eval为捕获函数
        let unpacked = '';
        const captureEval = function(str) {
            unpacked = str;
            return str;
        };
        
        // 2. 用Function构造器执行，避免污染全局作用域
        const funcBody = result.replace(/eval\(/g, 'captureEval(');
        new Function('captureEval', funcBody)(captureEval);
        
        // 3. 如果成功捕获，使用结果
        if (unpacked && typeof unpacked === 'string') {
            result = unpacked;
        }
    } catch (e) {
        console.error('基本解包失败:', e);
    }
    
    return result;
}

/**
 * 简单的递归解包
 */
function recursiveUnpack(code, depth = 0) {
    // 限制最大深度
    if (depth > 10) {
        return code;
    }
    
    console.log('解包层级:', depth + 1);
    
    const unpacked = unpackEval(code);
    
    // 如果解包结果中还有eval，继续解包
    if (unpacked !== code && unpacked.includes('eval(')) {
        return recursiveUnpack(unpacked, depth + 1);
    }
    
    return unpacked;
}

/**
 * 最基本的代码格式化
 */
function formatCode(code) {
    try {
        // 使用babel解析和生成格式化代码
        const ast = parse(code, {
            sourceType: "module"
        });
        
        const formatted = generator(ast, {
            comments: true,
            compact: false,
            retainLines: false,
            indent: {
                style: '  '
            }
        }).code;
        
        return formatted;
    } catch (e) {
        console.error('格式化失败:', e);
        return code;
    }
}

/**
 * 插件主函数
 */
function plugin(code) {
    try {
        // 1. 解包
        const unpacked = recursiveUnpack(code);
        
        // 2. 如果解包成功，格式化
        if (unpacked !== code) {
            return formatCode(unpacked);
        }
        
        return code;
    } catch (e) {
        console.error('插件执行出错:', e);
        return code;
    }
}

// 创建导出对象
const PluginEval = function(code) {
    return plugin(code);
};

// 添加方法
PluginEval.unpack = unpackEval;
PluginEval.recursiveUnpack = recursiveUnpack;
PluginEval.formatCode = formatCode;

export default PluginEval;
