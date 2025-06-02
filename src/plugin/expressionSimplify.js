// expressionSimplify.js - 表达式简化插件

function process(code, options = {}) {
    const config = {
        simplifyBoolean: options.simplifyBoolean !== false,
        simplifyTernary: options.simplifyTernary !== false,
        simplifyProperty: options.simplifyProperty !== false,
        simplifyVoid: options.simplifyVoid !== false,
        simplifyTypeChecks: options.simplifyTypeChecks !== false,
        ...options
    };
    
    let result = code;
    let changed = true;
    let iterations = 0;
    const maxIterations = 5;
    
    while (changed && iterations < maxIterations) {
        changed = false;
        iterations++;
        const beforeLength = result.length;
        
        if (config.simplifyBoolean) {
            result = simplifyBooleanExpressions(result);
        }
        
        if (config.simplifyTernary) {
            result = simplifyTernaryOperators(result);
        }
        
        if (config.simplifyProperty) {
            result = simplifyPropertyAccess(result);
        }
        
        if (config.simplifyVoid) {
            result = simplifyVoidExpressions(result);
        }
        
        if (config.simplifyTypeChecks) {
            result = simplifyTypeChecks(result);
        }
        
        result = simplifyRedundantExpressions(result);
        result = simplifyLogicalExpressions(result);
        result = simplifyComparisons(result);
        
        if (result.length !== beforeLength) {
            changed = true;
        }
    }
    
    return result;
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
    
    // 简化嵌套三元运算符为if-else（复杂情况）
    result = result.replace(/(\w+)\s*\?\s*([^:?]+)\s*:\s*([^?:;]+\s*\?\s*[^:;]+\s*:\s*[^;]+)/g, 
        (match, condition, trueExpr, falseExpr) => {
            return `(${condition} ? ${trueExpr} : (${falseExpr}))`;
        }
    );
    
    return result;
}

// 简化属性访问
function simplifyPropertyAccess(code) {
    let result = code;
    
    // ['property'] -> .property (只处理有效的标识符)
    result = result.replace(/\['(\w+)'\]/g, '.$1');
    result = result.replace(/\["(\w+)"\]/g, '.$1');
    
    // 移除不必要的可选链
    result = result.replace(/(\w+)\?\.\s*(\w+)\s*\?\?\s*{}/g, '$1?.$2 || {}');
    
    // 简化连续的属性访问
    result = result.replace(/(\w+)(\?.)?\.(\w+)(\?.)?\.(\w+)/g, (match, obj, opt1, prop1, opt2, prop2) => {
        if (opt1 || opt2) {
            return match; // 保持可选链
        }
        return `${obj}.${prop1}.${prop2}`;
    });
    
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
    
    // typeof x === 'function' 简化
    result = result.replace(/typeof\s+(\w+)\s*===?\s*['"]function['"]/g, 'typeof $1 === "function"');
    
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
    
    // !x && !y -> !(x || y)
    result = result.replace(/!(\w+)\s*&&\s*!(\w+)/g, '!($1 || $2)');
    
    // !x || !y -> !(x && y)
    result = result.replace(/!(\w+)\s*\|\|\s*!(\w+)/g, '!($1 && $2)');
    
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

module.exports = {
    name: 'expressionSimplify',
    description: '简化复杂的JavaScript表达式',
    process: process
};