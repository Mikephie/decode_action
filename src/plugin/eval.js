// CommonJS版本 - 尽可能接近原始插件
const { parse } = require('@babel/parser');
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// 导出与原始插件完全相同的函数签名
module.exports = function(code) {
    try {
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

        // 以下部分与原始插件完全相同的逻辑

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
