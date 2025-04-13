// ESM版本 - 带方法的增强插件对象
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
    
    console.log("正在解码第" + (depth + 1) + "次...");
    
    try {
        let result = unpack(code);
        if (result && result !== code) {
            if (result.includes('eval(')) {
                return recursiveUnpack(result, depth + 1);
            }
            return result;
        }
    } catch(e) {
        console.log("第 " + (depth + 1) + " 层解包失败: " + (e.message || e));
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
                if (path.node.left.object && path.node.left.object.name === 'obj') {
                    if (path.node.left.property && path.node.left.property.name === 'subscriber') {
                        path.addComment('leading', ' 订阅配置');
                    }
                }
            },
            CallExpression(path) {
                if (path.node.callee.property && path.node.callee.property.name === 'notify') {
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
            .replace(/\/\* (.*?)\*\/\s*/g, '// $1\n')
            .replace(/(\/\/.*?\n)+/g, '$1')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\/\/ .*?\/\//g, '//')
            .replace(/;(?=\s*(?:let|\/\/|obj\.|function))/g, ';\n')
            .replace(/\/\/ 订阅配置\s*obj\.subscriber =/, '// 订阅配置\nobj.subscriber =')
            .replace(/\/\/ 通知配置\s*\$\.notify/, '// 通知配置\n$.notify');

        // 添加文件头注释
        const now = new Date().toISOString();
        let header = "//Generated at " + now + "\n";

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
        console.log('开始解包混淆代码...');
        
        // 检测代码是否包含eval
        const hasEval = code.includes('eval(');
        if (!hasEval) {
            console.log('没有检测到eval混淆');
            return code;
        }
        
        console.log('检测到eval混淆，开始解包...');
        
        // 解密并格式化
        const decrypted = recursiveUnpack(code);
        
        if (decrypted && decrypted !== code) {
            // 解密成功后进行格式化
            return formatCode(decrypted);
        }

        console.log('未能成功解包代码');
        return code;
    } catch (error) {
        console.error('处理失败:', error);
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
