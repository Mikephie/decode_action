// 字符串解密插件集合

// 1. 字符串数组索引还原
function restoreStringArray(code) {
    // 匹配字符串数组定义: var _0x1234 = ['str1', 'str2', ...];
    const arrayMatch = code.match(/var\s+(_0x[a-f0-9]+)\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return code;
    
    const arrayName = arrayMatch[1];
    const arrayContent = arrayMatch[2];
    
    // 解析字符串数组
    const strings = [];
    const stringMatches = arrayContent.match(/'([^'\\]|\\.)*'|"([^"\\]|\\.)*"/g);
    if (stringMatches) {
        strings.push(...stringMatches.map(s => s.slice(1, -1)));
    }
    
    // 替换所有 _0x1234[index] 为实际字符串
    let result = code;
    const indexPattern = new RegExp(`${arrayName}\\[(\\d+)\\]`, 'g');
    result = result.replace(indexPattern, (match, index) => {
        const idx = parseInt(index);
        return strings[idx] ? `"${strings[idx]}"` : match;
    });
    
    // 移除原始数组定义
    result = result.replace(arrayMatch[0], '');
    return result;
}

// 2. 多层编码解密
function decodeStrings(code) {
    return code
        // Base64解码
        .replace(/atob\(['"]([A-Za-z0-9+/=]+)['"]\)/g, (match, encoded) => {
            try {
                return `"${atob(encoded)}"`;
            } catch (e) {
                return match;
            }
        })
        // Unicode解码
        .replace(/\\u([0-9a-fA-F]{4})/g, (match, code) => {
            return String.fromCharCode(parseInt(code, 16));
        })
        // 十六进制字符串解码
        .replace(/String\.fromCharCode\(0x([0-9a-fA-F]+)\)/g, (match, hex) => {
            return `"${String.fromCharCode(parseInt(hex, 16))}"`;
        })
        // 数字编码解码
        .replace(/String\.fromCharCode\((\d+)\)/g, (match, num) => {
            return `"${String.fromCharCode(parseInt(num))}"`;
        });
}

// 3. 动态字符串构建还原
function restoreDynamicStrings(code) {
    // 还原字符串拼接: 'a' + 'b' + 'c' -> 'abc'
    return code.replace(/(['"][^'"]*['"])\s*\+\s*(['"][^'"]*['"])/g, (match, str1, str2) => {
        const val1 = str1.slice(1, -1);
        const val2 = str2.slice(1, -1);
        return `"${val1}${val2}"`;
    });
}

// 4. 字符串混淆还原
function deobfuscateStrings(code) {
    // 还原反转字符串
    code = code.replace(/(['"][^'"]*['"])\.split\(['"]['"]\)\.reverse\(\)\.join\(['"]['"]\)/g, (match, str) => {
        const original = str.slice(1, -1);
        const reversed = original.split('').reverse().join('');
        return `"${reversed}";
    });
    
    // 还原字符替换
    code = code.replace(/(['"][^'"]*['"])\.replace\(/g, (match, str) => {
        return `"${str.slice(1, -1)}".replace(`;
    });
    
    return code;
}