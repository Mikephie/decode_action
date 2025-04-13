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
 * 递归解包多层嵌套的 eval 代码 (增强版 - 添加计时和统计)
 * @param {string} code - 需要解包的代码
 * @param {number} depth - 当前解包深度
 * @param {object} stats - 统计信息对象
 * @returns {object} 解包结果对象，包含代码和统计信息
 */
function recursiveUnpack(code, depth = 0, stats = { layers: 0, startTime: Date.now() }) {
    if (depth > 10) {
        console.log('达到最大解包深度 (10层)，停止解包');
        return { 
            code: code, 
            layers: stats.layers,
            time: Date.now() - stats.startTime 
        };
    }
    
    console.log(`正在解码第${depth + 1}次...`);
    const layerStartTime = Date.now();
    
    try {
        let result = unpack(code);
        if (result && result !== code) {
            // 记录此层的统计信息
            stats.layers++;
            const layerTime = Date.now() - layerStartTime;
            console.log(`第 ${depth + 1} 层解包完成，用时 ${layerTime} 毫秒`);
            
            if (result.includes('eval(')) {
                return recursiveUnpack(result, depth + 1, stats);
            }
            
            return { 
                code: result, 
                layers: stats.layers,
                time: Date.now() - stats.startTime 
            };
        }
    } catch(e) {
        console.log(`第 ${depth + 1} 层解包失败: ${e.message}`);
    }
    
    return { 
        code: code, 
        layers: stats.layers,
        time: Date.now() - stats.startTime 
    };
}

/**
 * 检测并处理不同类型的混淆
 * @param {string} code - 混淆后的代码
 * @returns {object} 处理结果对象，包含代码和统计信息
 */
function detectAndHandle(code) {
    const startTime = Date.now();
    const result = { code: code, layers: 0, techniques: [] };
    
    // 检测是否为eval混淆
    if (code.includes('eval(')) {
        console.log('检测到eval混淆，使用unpack处理...');
        result.techniques.push('eval');
        const unpackResult = recursiveUnpack(code);
        result.code = unpackResult.code;
        result.layers = unpackResult.layers;
        
        // 如果解包成功且结果不同于原始代码
        if (result.code !== code) {
            return result;
        }
    }
    
    // 检测是否为字符串数组混淆 (常见特征：大数组定义后通过下标访问)
    const stringArrayPattern = /var\s+[a-zA-Z0-9_$]+\s*=\s*\[\s*(['"].*?['"],?\s*){10,}\s*\]/;
    if (stringArrayPattern.test(code)) {
        console.log('检测到字符串数组混淆，尝试还原...');
        result.techniques.push('string_array');
        const deobfuscated = deobfuscateStringArray(code);
        if (deobfuscated !== code) {
            result.code = deobfuscated;
            result.layers++;
        }
    }
    
    // 检测是否为函数别名混淆 (常见特征：大量单字母函数定义)
    const functionAliasPattern = /(function\s+[a-z_$][\w$]?\s*\([^)]*\)\s*\{[^}]*\}\s*){10,}/;
    if (functionAliasPattern.test(code)) {
        console.log('检测到函数别名混淆，尝试还原...');
        result.techniques.push('function_alias');
        // 这里可以添加函数别名解混淆的实现
    }
    
    result.time = Date.now() - startTime;
    return result;
}

/**
 * 处理字符串数组混淆 (简化实现)
 * @param {string} code - 混淆后的代码
 * @returns {string} 处理后的代码
 */
function deobfuscateStringArray(code) {
    // 实现字符串数组混淆的还原逻辑
    // 这里仅为示例框架，实际实现需要更复杂的处理
    try {
        const ast = parse(code, {
            sourceType: "module"
        });
        
        // 查找字符串数组定义
        let stringArrayName = null;
        let stringArray = null;
        
        // 使用traverse查找字符串数组
        traverse(ast, {
            VariableDeclarator(path) {
                if (path.node.init && 
                    path.node.init.type === 'ArrayExpression' && 
                    path.node.init.elements.length > 10 &&
                    path.node.init.elements.every(el => el && el.type === 'StringLiteral')) {
                    
                    stringArrayName = path.node.id.name;
                    stringArray = path.node.init.elements.map(el => el.value);
                    path.stop();
                }
            }
        });
        
        if (stringArrayName && stringArray) {
            console.log(`找到字符串数组: ${stringArrayName}，包含 ${stringArray.length} 个字符串`);
            
            // 替换所有对数组的引用
            let newCode = code;
            const accessPattern = new RegExp(`${stringArrayName}\\[(\\d+)\\]`, 'g');
            newCode = newCode.replace(accessPattern, (match, index) => {
                const idx = parseInt(index);
                if (idx >= 0 && idx < stringArray.length) {
                    return `"${stringArray[idx]}"`;
                }
                return match;
            });
            
            return newCode;
        }
        
        return code;
    } catch (e) {
        console.log('字符串数组处理错误:', e);
        return code;
    }
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
            .replace(/let.*?;\n\n(?=let)/g, '                if (path.node.left.object?.name === 'obj') {
                    if (path.node')
            // 保持对象属性的缩进
            .replace(/^(\s*[a-zA-Z_$][a-zA-Z0-9_$]*:)/gm, '  $1');

        return formatted;

    } catch(e) {
        console.log('格式化错误:', e);
        return code;
    }
}

/**
 * 代码分析 - 提取关键信息
 * @param {string} code - 解包后的代码
 * @returns {object} 代码分析结果
 */
function analyzeCode(code) {
    const analysis = {
        variables: [],
        functions: 0,
        objects: [],
        apis: [],
        suspicious: []
    };
    
    try {
        // 解析代码
        const ast = parse(code, {
            sourceType: "module"
        });
        
        // 遍历AST提取信息
        traverse(ast, {
            // 分析变量声明
            VariableDeclarator(path) {
                if (path.node.id.type === 'Identifier') {
                    const name = path.node.id.name;
                    if (['names', 'productName', 'productType', 'appVersion'].includes(name)) {
                        // 提取关键配置变量
                        if (path.node.init && path.node.init.type === 'StringLiteral') {
                            analysis.variables.push({
                                name,
                                value: path.node.init.value
                            });
                        }
                    }
                }
            },
            
            // 统计函数数量
            FunctionDeclaration() {
                analysis.functions++;
            },
            
            // 分析对象属性
            ObjectProperty(path) {
                if (path.parent.type === 'ObjectExpression' &&
                    path.node.key.type === 'Identifier') {
                    // 记录对象属性名称
                    const objectName = path.parent.type === 'ObjectExpression' ? 
                        path.parent.properties[0]?.key?.name : '';
                    
                    if (objectName && !analysis.objects.includes(objectName)) {
                        analysis.objects.push(objectName);
                    }
                }
            },
            
            // 检测API调用
            CallExpression(path) {
                if (path.node.callee.type === 'MemberExpression') {
                    const obj = path.node.callee.object?.name;
                    const method = path.node.callee.property?.name;
                    
                    if (obj && method) {
                        const api = `${obj}.${method}`;
                        if (!analysis.apis.includes(api)) {
                            analysis.apis.push(api);
                        }
                        
                        // 检测可疑API调用
                        const suspiciousAPIs = ['eval', 'Function', 'setTimeout', 'setInterval'];
                        if (suspiciousAPIs.includes(method)) {
                            analysis.suspicious.push(api);
                        }
                    }
                }
            }
        });
        
        return analysis;
    } catch(e) {
        console.log('代码分析错误:', e);
        return analysis;
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
        console.log('分析代码特征...');
        
        // 检测代码是否包含eval
        const hasEval = code.includes('eval(');
        if (!hasEval) {
            console.log('没有检测到eval混淆，尝试其他解混淆方法...');
            const result = detectAndHandle(code);
            if (result.code !== code) {
                // 解混淆成功
                console.log(`解包成功，使用了 ${result.techniques.join(', ')} 技术，共处理 ${result.layers} 层混淆`);
                const analysis = analyzeCode(result.code);
                
                // 格式化并添加统计信息
                return formatCode(result.code, result);
            }
            console.log('未能识别混淆类型');
            return code;
        }
        
        console.log('检测到eval混淆，开始解包...');
        
        // 解密并格式化
        const startTime = Date.now();
        const result = recursiveUnpack(code);
        const totalTime = Date.now() - startTime;
        
        if (result.code && result.code !== code) {
            // 解密成功后进行分析和格式化
            console.log(`解包成功，共解包 ${result.layers} 层，总用时 ${result.time} 毫秒`);
            
            // 分析代码结构
            const analysis = analyzeCode(result.code);
            console.log('代码分析完成，发现以下信息:');
            console.log(`- 关键变量: ${analysis.variables.length} 个`);
            console.log(`- 函数: ${analysis.functions} 个`);
            console.log(`- 对象: ${analysis.objects.length} 个`);
            console.log(`- API调用: ${analysis.apis.length} 个`);
            
            if (analysis.suspicious.length > 0) {
                console.log(`- 发现可疑API: ${analysis.suspicious.join(', ')}`);
            }
            
            // 格式化代码并添加统计信息
            return formatCode(result.code, { 
                layers: result.layers, 
                time: result.time,
                techniques: ['eval']
            });
        }

        console.log('未能成功解包代码');
        return code;
    } catch (error) {
        console.error('处理失败:', error);
        return code;
    }
}

/**
 * 创建一个具有完整解混淆功能的插件对象
 */
const PluginEval = function(code) {
    return plugin(code);
};

// 添加所有需要的方法
PluginEval.plugin = plugin;
PluginEval.unpack = unpack;
PluginEval.recursiveUnpack = recursiveUnpack; 
PluginEval.formatCode = formatCode;
PluginEval.analyzeCode = analyzeCode;
PluginEval.detectAndHandle = detectAndHandle;
PluginEval.deobfuscateStringArray = deobfuscateStringArray;

// 导出插件
export default PluginEval;
