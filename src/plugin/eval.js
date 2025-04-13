// ESM版本 - 带方法的增强插件对象
import { parse } from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

/**
 * 解包 eval 混淆的代码 - 增强版
 * @param {string} packedCode - 混淆后的代码
 * @returns {string} 解包后的代码或null
 */
function unpack(packedCode) {
    let unpacked = '';
    
    // 定义替代eval的函数
    const fakeEval = function(code) {
        unpacked = code;
        return code;
    };
    
    // 尝试多种匹配模式
    let modifiedCode = packedCode;
    
    // 增强模式1: 简单的eval替换
    modifiedCode = modifiedCode.replace(/eval\s*\(/g, 'fakeEval(');
    
    // 增强模式2: 处理可能的自执行函数
    modifiedCode = modifiedCode.replace(/\)\s*\(\s*\)\s*;/g, ')(fakeEval);');
    
    // 增强模式3: 处理可能的参数传递
    modifiedCode = modifiedCode.replace(/\)\.call\(this\);/g, ').call(this, fakeEval);');
    modifiedCode = modifiedCode.replace(/\)\.apply\(this\s*,\s*arguments\);/g, ').apply(this, [fakeEval].concat(Array.prototype.slice.call(arguments)));');
    
    try {
        // 直接尝试执行修改后的代码
        const func = new Function(
            'fakeEval',
            'String',
            'RegExp',
            modifiedCode
        );
        
        func(fakeEval, String, RegExp);
        
        if (unpacked && unpacked !== packedCode) {
            return unpacked;
        }
        
        // 如果上面的方法没有成功，尝试构建自执行函数
        const wrapperCode = `
            (function() {
                let result = '';
                const fakeEval = function(code) {
                    result = code;
                    return code;
                };
                ${modifiedCode.replace(/eval\(/g, 'fakeEval(')}
                return result;
            })()
        `;
        
        unpacked = new Function('return ' + wrapperCode)();
        
        if (unpacked && unpacked !== packedCode) {
            return unpacked;
        }
    } catch(e) {
        console.log('标准解包失败，尝试备用方法...', e);
        
        // 备用方法: 提取eval中的内容
        try {
            const evalMatch = packedCode.match(/eval\s*\(\s*(['"])(.*?)\1\s*\)/);
            if (evalMatch && evalMatch[2]) {
                // 检查是否是字符串编码
                let extracted = evalMatch[2];
                
                // 尝试处理特殊的字符串编码
                extracted = extracted
                    .replace(/\\x([0-9A-Fa-f]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
                    .replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
                    .replace(/\\([0-7]{1,3})/g, (match, p1) => String.fromCharCode(parseInt(p1, 8)));
                
                return extracted;
            }
        } catch(ex) {
            console.log('备用方法失败:', ex);
        }
    }
    
    // 如果所有方法都失败，返回原始代码
    return null;
}

/**
 * 递归解包多层嵌套的 eval 代码
 * @param {string} code - 需要解包的代码
 * @param {number} depth - 当前解包深度
 * @returns {string} 完全解包后的代码
 */
function recursiveUnpack(code, depth = 0) {
    if (depth > 20) {
        console.log("达到最大解包深度 (20层)，停止解包");
        return code;
    }
    
    console.log("正在解码第" + (depth + 1) + "次...");
    
    try {
        let result = unpack(code);
        if (result && result !== code) {
            console.log("第" + (depth + 1) + "层解包成功");
            
            // 检查是否还有eval需要继续解包
            if (result.includes('eval(')) {
                return recursiveUnpack(result, depth + 1);
            }
            
            // 尝试检测其他混淆方式
            if (hasOtherObfuscation(result)) {
                console.log("检测到其他混淆方式，尝试处理...");
                result = handleOtherObfuscation(result);
            }
            
            return result;
        } else {
            console.log("第" + (depth + 1) + "层解包无变化或失败");
            
            // 如果常规解包失败，检查是否有其他混淆模式
            if (depth === 0 && hasOtherObfuscation(code)) {
                console.log("尝试处理其他类型的混淆...");
                return handleOtherObfuscation(code);
            }
        }
    } catch(e) {
        console.log("第" + (depth + 1) + "层解包出错:", e);
    }
    
    return code;
}

/**
 * 检查是否有其他类型的混淆
 */
function hasOtherObfuscation(code) {
    // 检查是否存在常见的混淆特征
    return (
        // 字符串数组混淆特征
        /var\s+[a-zA-Z0-9_$]+\s*=\s*\[\s*(['"].*['"],?\s*){5,}\s*\]/.test(code) ||
        // 十六进制编码特征
        /\\x[0-9a-f]{2,}/i.test(code) ||
        // 数字运算混淆特征
        /String\.fromCharCode\([0-9+*\s-]+\)/.test(code) ||
        // 全局变量替换特征
        /var\s+[a-zA-Z0-9_$]+\s*=\s*([a-zA-Z0-9_$]+\s*=\s*){5,}/.test(code)
    );
}

/**
 * 处理其他类型的混淆
 */
function handleOtherObfuscation(code) {
    // 尝试处理字符串数组
    if (/var\s+[a-zA-Z0-9_$]+\s*=\s*\[\s*(['"].*['"],?\s*){5,}\s*\]/.test(code)) {
        console.log("尝试处理字符串数组混淆...");
        return deobfuscateStringArray(code);
    }
    
    // 尝试处理十六进制编码
    if (/\\x[0-9a-f]{2,}/i.test(code)) {
        console.log("尝试处理十六进制编码...");
        return code.replace(/\\x([0-9a-f]{2})/gi, (_, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        });
    }
    
    return code;
}

/**
 * 简单字符串数组解混淆
 */
function deobfuscateStringArray(code) {
    try {
        // 尝试提取字符串数组定义
        const arrayMatch = code.match(/var\s+([a-zA-Z0-9_$]+)\s*=\s*\[((?:['"].*?['"],?\s*)+)\]/);
        if (!arrayMatch) return code;
        
        const arrayName = arrayMatch[1];
        const arrayContent = arrayMatch[2];
        
        // 解析数组内容
        const stringArray = [];
        const stringMatches = arrayContent.match(/(['"]).*?\1/g);
        
        if (stringMatches) {
            for (const str of stringMatches) {
                // 去掉引号并处理转义字符
                const processed = str.slice(1, -1).replace(/\\(['"])/g, '$1');
                stringArray.push(processed);
            }
            
            // 替换对数组的引用
            const accessPattern = new RegExp(arrayName + '\\[(\\d+)\\]', 'g');
            return code.replace(accessPattern, (match, index) => {
                const idx = parseInt(index);
                if (idx >= 0 && idx < stringArray.length) {
                    return JSON.stringify(stringArray[idx]);
                }
                return match;
            });
        }
    } catch (e) {
        console.log("字符串数组解混淆失败:", e);
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
        header += "//Base:https://github.com/echo094/decode-js\n";
        header += "//Modify:https://github.com/smallfawn/decode_action\n\n";

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
        
        // 解密并格式化
        const startTime = Date.now();
        const decrypted = recursiveUnpack(code);
        const endTime = Date.now();
        
        if (decrypted && decrypted !== code) {
            console.log('解包成功，用时: ' + (endTime - startTime) + ' 毫秒');
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
PluginEval.deobfuscateStringArray = deobfuscateStringArray;

// 导出插件
export default PluginEval;
