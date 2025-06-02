// plugin/beautify.js - 代码美化插件

/**
 * 代码美化插件
 * 格式化JavaScript代码，提升可读性
 */
export default function beautify(code) {
    if (!code || typeof code !== 'string') {
        return code;
    }
    
    const config = {
        indent: 4,
        maxLineLength: 120,
        spaceBeforeParen: false,
        spaceInParen: false
    };
    
    let result = code;
    let level = 0;
    let output = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let commentType = '';
    
    // 预处理：标准化空白字符
    result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    for (let i = 0; i < result.length; i++) {
        const char = result[i];
        const prevChar = result[i - 1] || '';
        const nextChar = result[i + 1] || '';
        
        // 处理注释
        if (!inString) {
            // 单行注释
            if (char === '/' && nextChar === '/' && !inComment) {
                inComment = true;
                commentType = 'single';
                output += char;
                continue;
            }
            
            // 多行注释开始
            if (char === '/' && nextChar === '*' && !inComment) {
                inComment = true;
                commentType = 'multi';
                output += char;
                continue;
            }
            
            // 多行注释结束
            if (char === '/' && prevChar === '*' && inComment && commentType === 'multi') {
                inComment = false;
                commentType = '';
                output += char;
                continue;
            }
            
            // 单行注释结束
            if (char === '\n' && inComment && commentType === 'single') {
                inComment = false;
                commentType = '';
                output += char;
                if (nextChar && !isWhitespace(nextChar)) {
                    output += ' '.repeat(level * config.indent);
                }
                continue;
            }
        }
        
        // 在注释中直接输出
        if (inComment) {
            output += char;
            continue;
        }
        
        // 处理字符串
        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                // 检查是否是真正的字符串结束（处理转义）
                let escapeCount = 0;
                let j = i - 1;
                while (j >= 0 && result[j] === '\\') {
                    escapeCount++;
                    j--;
                }
                if (escapeCount % 2 === 0) {
                    inString = false;
                    stringChar = '';
                }
            }
            output += char;
            continue;
        }
        
        if (inString) {
            output += char;
            continue;
        }
        
        // 处理格式化
        switch (char) {
            case '{':
                output += char;
                if (nextChar !== '}') {
                    output += '\n' + ' '.repeat((++level) * config.indent);
                }
                break;
                
            case '}':
                if (output.trim().endsWith('{')) {
                    output += char;
                } else {
                    if (!output.trim().endsWith('\n')) {
                        output += '\n';
                    }
                    output += ' '.repeat((--level) * config.indent) + char;
                }
                
                // 在}后添加换行，除非后面是特定字符
                if (nextChar && ![')', ';', ',', '}', '.'].includes(nextChar)) {
                    output += '\n' + ' '.repeat(level * config.indent);
                }
                break;
                
            case ';':
                output += char;
                // 在;后添加换行，除非在for循环中或后面是}
                if (nextChar && nextChar !== '}' && nextChar !== ')' && !isInForLoop(result, i)) {
                    output += '\n' + ' '.repeat(level * config.indent);
                }
                break;
                
            case ',':
                output += char;
                // 在函数参数或数组中添加适当的空格或换行
                if (isInArrayOrObject(output, level)) {
                    output += '\n' + ' '.repeat(level * config.indent);
                } else if (nextChar !== ' ' && nextChar !== '\n') {
                    output += ' ';
                }
                break;
                
            case '(':
                if (config.spaceBeforeParen && prevChar && isAlphanumeric(prevChar)) {
                    output += ' ';
                }
                output += char;
                if (config.spaceInParen && nextChar !== ')') {
                    output += ' ';
                }
                break;
                
            case ')':
                if (config.spaceInParen && prevChar !== '(') {
                    output += ' ';
                }
                output += char;
                break;
                
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
            case '!':
            case '<':
            case '>':
            case '&':
            case '|':
            case '^':
                // 为操作符添加空格
                if (isOperator(char, nextChar, prevChar)) {
                    if (prevChar !== ' ' && prevChar !== '\n' && prevChar !== '(' && !isOperator(prevChar)) {
                        output += ' ';
                    }
                    output += char;
                    if (nextChar !== ' ' && nextChar !== '\n' && nextChar !== ')' && !isOperator(nextChar)) {
                        output += ' ';
                    }
                } else {
                    output += char;
                }
                break;
                
            case ' ':
            case '\t':
            case '\n':
                // 跳过多余的空白字符
                if (!isWhitespace(prevChar)) {
                    // 保留必要的空格
                    if (needsSpace(prevChar, nextChar)) {
                        output += ' ';
                    }
                }
                break;
                
            default:
                output += char;
        }
    }
    
    // 后处理：清理多余的空行和空格
    output = output
        .replace(/\n\s*\n\s*\n/g, '\n\n')  // 移除多个连续空行
        .replace(/[ \t]+$/gm, '')          // 移除行末空格
        .replace(/\n+$/, '\n');            // 确保文件以单个换行符结束
    
    // 检查是否有改变
    if (output.trim() !== code.trim()) {
        console.log('代码美化: 格式化完成');
        return output;
    }
    
    return code;
}

// 辅助函数
function isWhitespace(char) {
    return /\s/.test(char);
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9_$]/.test(char);
}

function isOperator(char, nextChar = '', prevChar = '') {
    const operators = ['+', '-', '*', '/', '=', '!', '<', '>', '&', '|', '^'];
    const doubleOperators = ['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/='];
    
    if (operators.includes(char)) {
        // 检查是否是双字符操作符
        const double = char + nextChar;
        const doublePrev = prevChar + char;
        
        if (doubleOperators.includes(double) || doubleOperators.includes(doublePrev)) {
            return true;
        }
        
        // 单字符操作符
        return true;
    }
    
    return false;
}

function needsSpace(prevChar, nextChar) {
    if (!prevChar || !nextChar) return false;
    
    // 在关键字和标识符之间需要空格
    if (isAlphanumeric(prevChar) && isAlphanumeric(nextChar)) {
        return true;
    }
    
    return false;
}

function isInForLoop(code, position) {
    // 简单检查是否在for循环中
    const before = code.substring(Math.max(0, position - 100), position);
    const forMatch = before.lastIndexOf('for');
    const braceMatch = before.lastIndexOf('{');
    
    return forMatch > braceMatch && forMatch !== -1;
}

function isInArrayOrObject(output, level) {
    // 简单检查是否在数组或对象字面量中
    const lastBrace = Math.max(output.lastIndexOf('['), output.lastIndexOf('{'));
    const lastCloseBrace = Math.max(output.lastIndexOf(']'), output.lastIndexOf('}'));
    
    return lastBrace > lastCloseBrace;
}