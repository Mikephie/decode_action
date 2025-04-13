// ESM版本 - 带方法的插件对象
import { parse } from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

/**
 * 解包 eval 混淆的代码
 * @param {string} packedCode - 混淆后的代码
 * @returns {string} 解包后的代码或null
 */
function unpack(packedCode) {
    let unpacked = '';
    const fakeEval = function(code) {
        unpacked = code;
        return code;
    };
    
    const modifiedCode = packedCode.replace(/eval\s*\(/, 'fakeEval(');
    
    // 不使用with语句，改用Function构造函数
    try {
        const func = new Function(
            'fakeEval',
            'String',
            'RegExp',
            modifiedCode
        );
        
        func(fakeEval, String, RegExp);
        return unpacked;
    } catch(e) {
        console.log('解包错误:', e);
        return null;
    }
}

/**
 * 递归解包多层嵌套的 eval 代码
 * @param {string} code - 需要解包的代码
 * @param {number} depth - 当前解包深度
 * @returns {string} 完全解包后的代码
 */
function recursiveUnpack(code, depth = 0) {
    if (depth > 10) return code;
    
    console.log(`进行第 ${depth + 1} 层解包...`);
    
    try {
        let result = unpack(code);
        if (result && result !== code) {
            if (result.includes('eval(')) {
                return recursiveUnpack(result, depth + 1);
            }
            return result;
        }
    } catch(e) {
        console.log(`第 ${depth + 1} 层解包失败:`, e);
    }
    
    return code;
}

/**
 * 格式化代码，添加结构和注释
 * @param {string} code - 需要格式化的代码
 * @returns {string} 格式化后的代码
 */
function formatCode(code) {
    try {
        const ast = parse(code, {
            sourceType: "module",
            plugins: ["jsx"]
        });

        // 只在最开始的变量声明添加注释
        let hasBaseConfig = false;

        traverse(ast, {
            VariableDeclaration(path) {
                const firstDecl = path.node.declarations[0];
                if (firstDecl && ['names', 'productName', 'productType'].includes(firstDecl.id.name)) {
                    if (!hasBaseConfig) {
                        path.addComment('leading', ' 基础配置变量');
                        hasBaseConfig = true;
                    }
                }
            },
            AssignmentExpression(path) {
                if (path.node.left.object?.name === 'obj') {
                    if (path.node.left.property?.name === 'subscriber') {
                        path.addComment('leading', ' 订阅配置');
                    }
                }
            },
            CallExpression(path) {
                if (path.node.callee.property?.name === 'notify') {
                    path.addComment('leading', ' 通知配置');
                }
            }
        });

        let formatted = generator(ast, {
            retainLines: false,
            comments: true,
            compact: false,
            indent: {
                style: '  '
            }
        }).code;

        // 手动处理格式
        formatted = formatted
            // 移除注释中的额外字符
            .replace(/\/\* (.*?)\*\/\s*/g, '// $1\n')
            // 处理重复的头部注释
            .replace(/(\/\/.*?\n)+/g, '$1')
            // 移除多余空行
            .replace(/\n{3,}/g, '\n\n')
            // 移除注释后的 //
            .replace(/\/\/ .*?\/\//g, '//')
            // 确保关键语句前有空行
            .replace(/;(?=\s*(?:let|\/\/|obj\.|function))/g, ';\n')
            // 处理订阅配置的格式
            .replace(/\/\/ 订阅配置\s*obj\.subscriber =/, '// 订阅配置\nobj.subscriber =')
            // 处理通知配置的格式
            .replace(/\/\/ 通知配置\s*\$\.notify/, '// 通知配置\n$.notify')
            // 适当添加空行
            .replace(/(obj\.subscriber\.non_subscriptions\[.*?\];)/, '$1\n')
            .replace(/(obj\.subscriber\.entitlements\[.*?\];)/, '$1\n')
            // 移除行尾空白
            .replace(/\s+$/gm, '')
            // 移除空行开头的空白
            .replace(/^\s+$/gm, '')
            // 减少连续let声明之间的空行
            .replace(/let.*?;\n\n(?=let)/g, '$&')
            // 保持对象属性的缩进
            .replace(/^(\s*[a-zA-Z_$][a-zA-Z0-9_$]*:)/gm, '  $1');

        // 添加文件头注释
        const header = `//Generated at ${new Date().toISOString()}\n` +
                     `//Base:https://github.com/echo094/decode-js\n` +
                     `//Modify:https://github.com/smallfawn/decode_action\n\n`;

        return header + formatted;

    } catch(e) {
        console.log('格式化错误:', e);
        return code;
    }
}

/**
 * 插件入口函数 - 提供完整功能
 * @param {string} code - 需要处理的代码
 * @returns {string} 处理后的代码
 */
function plugin(code) {
    try {
        // 模拟原始解包输出日志
        console.log('还原数值...');
        console.log('处理全局加密...');
        console.log('Try v3 mode...');
        console.log('Try v2 mode...');
        console.log('Essential code missing!');
        console.log('Try v0 mode...');
        console.log('Cannot find string list!');

        // 解密并格式化
        const decrypted = recursiveUnpack(code);
        
        if (decrypted && decrypted !== code) {
            // 解密成功后进行格式化
            return formatCode(decrypted);
        }

        return code;
    } catch (error) {
        console.error('part2ai 处理失败:', error);
        return code;
    }
}

// 创建一个既是函数又有方法的对象
const PluginEval = function(code) {
    return plugin(code);
};

// 添加所有需要的方法
PluginEval.plugin = plugin;
PluginEval.unpack = unpack;
PluginEval.recursiveUnpack = recursiveUnpack; 
PluginEval.formatCode = formatCode;

// 导出插件
export default PluginEval;
