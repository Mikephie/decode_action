// plugin/deadCodeElimination.js - 死代码消除插件

/**
 * 死代码消除插件
 * 移除永远不会执行的死代码
 */
export default function deadCodeElimination(code) {
    if (!code || typeof code !== 'string') {
        return code;
    }
    
    let result = code;
    let changed = false;
    let iterations = 0;
    const maxIterations = 3;
    
    while (iterations < maxIterations) {
        iterations++;
        const beforeLength = result.length;
        
        result = removeFalseConditions(result);
        result = removeUnreachableCode(result);
        result = removeEmptyBlocks(result);
        result = removeEmptyStatements(result);
        result = removeUselessCode(result);
        
        if (result.length !== beforeLength) {
            changed = true;
        } else {
            break;
        }
    }
    
    if (changed) {
        console.log('死代码消除: 清理完成');
        return result;
    }
    
    return code;
}

// 移除永假条件
function removeFalseConditions(code) {
    let result = code;
    
    // 移除 if (false) 语句
    result = result.replace(/if\s*\(\s*(?:false|0|!1)\s*\)\s*\{[^}]*\}/g, '');
    
    // 移除 if (false) {...} else {...} 中的false分支，保留else
    result = result.replace(/if\s*\(\s*(?:false|0|!1)\s*\)\s*\{[^}]*\}\s*else\s*\{([^}]*)\}/g, '$1');
    
    // 移除永真条件的else分支
    result = result.replace(/if\s*\(\s*(?:true|1|!0)\s*\)\s*\{([^}]*)\}\s*else\s*\{[^}]*\}/g, '$1');
    
    // 移除while(false)循环
    result = result.replace(/while\s*\(\s*(?:false|0|!1)\s*\)\s*\{[^}]*\}/g, '');
    
    // 移除永假的三元运算符
    result = result.replace(/(?:false|0|!1)\s*\?\s*[^:]+\s*:\s*([^;]+)/g, '$1');
    result = result.replace(/(?:true|1|!0)\s*\?\s*([^:]+)\s*:\s*[^;]+/g, '$1');
    
    return result;
}

// 移除不可达代码
function removeUnreachableCode(code) {
    let result = code;
    
    // 移除return后的代码（在同一个函数块中）
    result = result.replace(/return\s+[^;]+;\s*([^}]+)(?=\})/g, (match, afterReturn) => {
        // 检查afterReturn是否包含函数定义，如果是则保留
        if (/function\s+\w+/.test(afterReturn)) {
            return match;
        }
        return match.split('\n')[0]; // 只保留return语句
    });
    
    // 移除throw后的代码
    result = result.replace(/throw\s+[^;]+;\s*([^}]+)(?=\})/g, (match) => {
        return match.split('\n')[0]; // 只保留throw语句
    });
    
    // 移除break后的代码（在switch case中）
    result = result.replace(/break\s*;\s*([^}]+)(?=case|default|\})/g, 'break;');
    
    // 移除continue后的代码（在循环中）
    result = result.replace(/continue\s*;\s*