// plugin/expressionSimplify.js - 表达式简化插件

/**
 * 表达式简化插件
 * 简化复杂的JavaScript表达式
 */
export default function expressionSimplify(code) {
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
        
        result = simplifyBooleanExpressions(result);
        result = simplifyTernaryOperators(result);
        result = simplifyPropertyAccess(result);
        result = simplifyVoidExpressions(result);
        result = simplifyTypeChecks(result);
        result = simplifyRedundantExpressions(result);
        result = simplifyLogicalExpressions(result);
        result = simplifyComparisons(result);
        
        if (result.length !== beforeLength) {
            changed = true;
        } else {
            break;
        }
    }
    
    if (changed) {
        console.log('表达式简化: 简化完成');
        return result;
    }
    
    return code;
}

// 简化布尔表达式
function simplifyBooleanExpressions(code) {
    let result = code;
    
    // 双重否定简化
    result = result.replace(/!!(\w+)/g, 'Boolean($1)');
    result = result.replace(/!!\s*\(([^)]+)\)/g, 'Boolean($1)');
    
    // 布尔值与逻辑运算
    result = result.replace(/true\s*&&\s*(\w+)/g, '$1');
    result = result.replace(/(\w+)\s*&&\s*true/g, '$1');
    result = result.replace(/false\s*\|\|\s*(\w+)/g, '$1');
    result = result.replace(/(\w+)\s*\|\|\s*false/g, '$1');
    
    // 布尔值与条件
    result = result.replace(/false\s*&&\s*[^;]+/g, 'false');
    result = result.replace(/true\s*\|\|\s*[^;]+/g, 'true');
    
    // 简化 !true 和 !false
    result = result.replace(/!true/g, 'false');
    result = result.replace(/!false/g, 'true');
    
    return result;
}

// 简化三元运算符
function simplifyTernaryOperators(code) {
    let result = code;
    
    // condition ? true : false -> Boolean(condition)
    result = result.replace(/(\w+(?:\.\w+)*)\s*\?\s*true\s*:\s*false/g, 'Boolean($1)');
    
    // condition ? false : true -> !condition
    result = result.replace(/(\w+(?:\.\w+)*)\s*\?\s*false\s*:\s*true/g, '!$1');
    
    // true ? a : b -> a
    result = result.replace(/true\s*\?\s*([^:]+)\s*:\s*[^;]+/g, '$1');
    
    // false ? a : b -> b
    result = result.replace(/false\s*\?\s*[^:]+\s*:\s*([^;]+)/g, '$1');
    
    return result;
}

// 简化属性访问
function simplifyPropertyAccess(code) {
    let result = code;
    
    // ['property'] -> .property (只处理有效的标识符)
    result = result.replace(/\['(\w+)'\]/g, '.$1');
    result = result.replace(/\["(\w+)"\]/g, '.$1');
    
    return result;
}

// 简化void表达式
function simplifyVoidExpressions(code) {
    let result = code;
    
    // void 0 -> undefined
    result = result.replace(/void\s+0/g, 'undefined');
    result = result.replace(/void\s+\d+/g, 'undefined');
    result = result.replace(/void\s*\(\s*0\s*\)/g, 'undefined');
    
    return result;
}

// 简化类型检查
function simplifyTypeChecks(code) {
    let result = code;
    
    // typeof x === 'undefined' -> x === undefined
    result = result.replace(/typeof\s+(\w+)\s*===?\s*['"]undefined['"]/g, '$1 === undefined');
    result = result.replace(/typeof\s+(\w+)\s*!==?\s*['"]undefined['"]/g, '$1 !== undefined');
    
    // Array.isArray简化
    result = result.replace(/Array\.isArray\s*\(\s*(\w+)\s*\)\s*===?\s*true/g, 'Array.isArray($1)');
    result = result.replace(/Array\.isArray\s*\(\s*(\w+)\s*\)\s*===?\s*false/g, '!Array.isArray($1)');
    
    return result;
}

// 简化冗余表达式
function simplifyRedundantExpressions(code) {
    let result = code;
    
    // 移除不必要的括号（简单情况）
    result = result.replace(/\(\s*(\w+)\s*\)/g, '$1');
    
    // 简化数学表达式
    result = result.replace(/(\w+)\s*\+\s*0/g, '$1');
    result = result.replace(/0\s*\+\s*(\w+)/g, '$1');
    result = result.replace(/(\w+)\s*\*\s*1/g, '$1');
    result = result.replace(/1\s*\*\s*(\w+)/g, '$1');
    result = result.replace(/(\w+)\s*-\s*0/g, '$1');
    
    // 简化字符串操作
    result = result.replace(/(\w+)\s*\+\s*['"]{2}/g, '$1');
    result = result.replace(/['"]{2}\s*\+\s*(\w+)/g, '$1');
    
    return result;
}

// 简化逻辑表达式
function simplifyLogicalExpressions(code) {
    let result = code;
    
    // x && x -> x
    result = result.replace(/(\w+(?:\.\w+)*)\s*&&\s*\1/g, '$1');
    
    // x || x -> x
    result = result.replace(/(\w+(?:\.\w+)*)\s*\|\|\s*\1/g, '$1');
    
    return result;
}

// 简化比较操作
function simplifyComparisons(code) {
    let result = code;
    
    // x == true -> x (在boolean上下文中)
    result = result.replace(/(\w+)\s*==\s*true/g, '$1');
    result = result.replace(/(\w+)\s*===\s*true/g, '$1');
    
    // x == false -> !x
    result = result.replace(/(\w+)\s*==\s*false/g, '!$1');
    result = result.replace(/(\w+)\s*===\s*false/g, '!$1');
    
    // x != true -> !x
    result = result.replace(/(\w+)\s*!=\s*true/g, '!$1');
    result = result.replace(/(\w+)\s*!==\s*true/g, '!$1');
    
    // x != false -> x
    result = result.replace(/(\w+)\s*!=\s*false/g, '$1');
    result = result.replace(/(\w+)\s*!==\s*false/g, '$1');
    
    // null/undefined比较
    result = result.replace(/(\w+)\s*!==?\s*null\s*&&\s*\1\s*!==?\s*undefined/g, '$1 != null');
    result = result.replace(/(\w+)\s*===?\s*null\s*\|\|\s*\1\s*===?\s*undefined/g, '$1 == null');
    
    return result;
}