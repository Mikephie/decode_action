// 专业AADecode插件
(function() {
const module = { exports: {} };

```
function extractHeader(code) {
    const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);
    
    if (aaStartIndex > 0) {
        const header = code.substring(0, aaStartIndex).trim();
        const encodedPart = code.substring(aaStartIndex);
        return { header, encodedPart };
    }
    
    return { header: '', encodedPart: code };
}

function plugin(code) {
    try {
        const { header, encodedPart } = extractHeader(code);
        
        if (!(encodedPart.includes('ﾟДﾟ') || encodedPart.includes('(ﾟΘﾟ)') || 
              encodedPart.includes('ﾟωﾟﾉ') || encodedPart.includes('ﾟдﾟ'))) {
            return null;
        }
        
        let decodePart = encodedPart;
        decodePart = decodePart.replace(") ('_')", "");
        decodePart = decodePart.replace("(ﾟДﾟ) ['_'] (", "return ");
        
        const x = new Function(decodePart);
        const decodedContent = x();
        
        if (header) {
            return `${header}\n\n${decodedContent}`;
        }
        
        return decodedContent;
    } catch (error) {
        console.error('AADecode解码错误:', error);
        return null;
    }
}

module.exports = plugin;

window.DecodePlugins = window.DecodePlugins || {};
window.DecodePlugins.aadecode = {
    detect: function(code) {
        return code.includes('ﾟωﾟﾉ') || code.includes('ﾟДﾟ') || 
               code.includes('ﾟдﾟ') || code.includes('ﾟΘﾟ');
    },
    plugin: function(code) {
        try {
            console.log("尝试解密AADecode编码...");
            const result = module.exports(code);
            return result !== null ? result : code;
        } catch (e) {
            console.error("AADecode插件错误:", e);
            return code;
        }
    }
};

window.professionalAADecode = module.exports;
console.log("专业AADecode插件已加载");
```

})();

// Eval解包工具包装器
(function() {
const module = { exports: {} };
const exports = module.exports;

function plugin(code) {
try {
if (!code.includes(‘eval(’) && !code.includes(‘eval (’)) {
return null;
}

```
  let modifiedCode = code.replace(/eval\s*\(/g, '(function(x) { return x; })(');
  
  try {
    const env = {
      window: {},
      document: {},
      navigator: { userAgent: "Mozilla/5.0" },
      location: {}
    };
    
    const result = Function('window', 'document', 'navigator', 'location',
                          `return ${modifiedCode}`)(
                          env.window, env.document, env.navigator, env.location);
    
    if (typeof result === 'string') {
      if (result.includes('eval(')) {
        return plugin(result);
      }
      return result;
    }
    
    return String(result);
  } catch (err) {
    console.log("执行替换eval的方法失败，尝试直接替换方法");
    
    try {
      modifiedCode = code.replace(/eval\s*\(/g, '(');
      return modifiedCode;
    } catch (replaceErr) {
      console.error("直接替换eval方法也失败:", replaceErr);
      return null;
    }
  }
} catch (error) {
  console.error("Eval解包发生错误:", error);
  return null;
}
```

}

exports.plugin = function(code) {
return plugin(code);
};

window.DecodePlugins = window.DecodePlugins || {};
window.DecodePlugins.eval = {
detect: function(code) {
return code.includes(‘eval(’) || code.includes(‘eval (’);
},
plugin: function(code) {
return module.exports.plugin(code);
}
};

console.log("Eval解包插件已加载");
})();

// 应用配置
const APP_CONFIG = {
VERSION: ‘6.0’,
VERSION_NAME: ‘增强版AADecode+Eval解密工具’,
UPDATE_NOTES: ‘集成专业AADecode和Eval解包插件，支持头部注释保留和智能检测’
};

window.appData = {
token: localStorage.getItem(‘github_token’) || ‘’,
repo: localStorage.getItem(‘repo_name’) || ‘’,
isAAEncodeMode: false,
isEvalMode: false,
lastDetection: null
};

// 检测函数
function detectAAEncode(input) {
const aaencodeChars = /[ﾟωノΘΔДεｰｍ’∇｀~┻━_=3o^c/*\"()[]!+]/g;
const matches = input.match(aaencodeChars) || [];
const ratio = matches.length / input.length;

```
const aaencodePatterns = [
    /ﾟωﾟﾉ/, /ﾟｰﾟ/, /ﾟΘﾟ/, /ﾟДﾟ/, /ﾟдﾟ/,
    /o\^_\^o/, /c\^_\^o/, /\(ﾟΘﾟ\)/, /\['_'\]/
];

const patternMatches = aaencodePatterns.filter(pattern => pattern.test(input)).length;

const hasMinLength = input.length >= 100;
const hasAASignature = input.includes('ﾟДﾟ') && input.includes('ﾟωﾟﾉ');

let confidence = 0;
if (hasAASignature) confidence += 40;
if (patternMatches >= 3) confidence += 30;
if (ratio > 0.3) confidence += Math.min(ratio * 50, 25);
if (hasMinLength) confidence += 5;

const isAAEncode = confidence >= 70 || (hasAASignature && patternMatches >= 2);

return {
    type: 'AAEncode',
    isDetected: isAAEncode,
    confidence: Math.min(confidence, 100),
    ratio: Math.round(ratio * 100),
    patternMatches,
    hasAASignature,
    length: input.length,
    features: aaencodePatterns.filter(pattern => pattern.test(input)).map(p => p.source)
};
```

}

function detectEval(input) {
const evalPatterns = [
/eval\s*(/gi,
/eval\s+(/gi,
/window\s*[\s*[’"]eval[’"]\s*]/gi,
/this\s*[\s*[’"]eval[’"]\s*]/gi,
/Function\s*(/gi,
/setTimeout\s*(\s*[’"`]/gi, /setInterval\s*\(\s*['"`]/gi,
/new\s+Function\s*(/gi,
/[\s*[’"]eval[’"]\s*]/gi,
/window[[’"]eval[’"]]/gi,
/eval\w*\s*(/gi
];

```
const evalMatches = evalPatterns.map(pattern => {
    const matches = input.match(pattern);
    return matches ? matches.length : 0;
});

const totalEvalMatches = evalMatches.reduce((sum, count) => sum + count, 0);
const nestedEvalDepth = checkNestedEvalDepth(input);
const hasStringEncoding = /['"]\s*\+\s*['"]/.test(input);
const hasUnicodeEscape = /\\u[0-9a-fA-F]{4}/.test(input);
const hasHexEncoding = /\\x[0-9a-fA-F]{2}/.test(input);
const hasObfuscatedStrings = /['"`][A-Za-z0-9+/=]{20,}['"`]/.test(input);
const hasPackedCode = /function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*d\s*\)/.test(input);
const hasEvalString = /eval\s*\(\s*['"`]/.test(input);
const hasBase64Like = /[A-Za-z0-9+/]{50,}=*/.test(input);
const hasUnescape = /unescape\s*\(/gi.test(input);
const hasAtob = /atob\s*\(/gi.test(input);
const hasCharCodeAt = /charCodeAt\s*\(/gi.test(input);
const hasFromCharCode = /fromCharCode\s*\(/gi.test(input);

const specialEvalPatterns = [
    /eval\s*\(\s*function\s*\(/i,
    /eval\s*\(\s*unescape\s*\(/i,
    /eval\s*\(\s*atob\s*\(/i,
    /eval\s*\(\s*decode/i,
    /eval\s*\(\s*String\s*\./i,
    /eval\s*\(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/i
];

const specialMatches = specialEvalPatterns.filter(pattern => pattern.test(input)).length;

let confidence = 0;

if (totalEvalMatches >= 1) confidence += 35;
if (totalEvalMatches >= 2) confidence += 20;
if (totalEvalMatches >= 3) confidence += 15;
if (totalEvalMatches >= 5) confidence += 10;

if (hasEvalString) confidence += 30;
if (specialMatches >= 1) confidence += 25;
if (specialMatches >= 2) confidence += 15;

if (hasPackedCode) confidence += 35;

if (nestedEvalDepth >= 1) confidence += 25;
if (nestedEvalDepth >= 2) confidence += 20;
if (nestedEvalDepth >= 3) confidence += 15;

if (hasStringEncoding) confidence += 12;
if (hasUnicodeEscape) confidence += 15;
if (hasHexEncoding) confidence += 15;
if (hasObfuscatedStrings) confidence += 20;
if (hasBase64Like) confidence += 12;
if (hasUnescape) confidence += 18;
if (hasAtob) confidence += 18;
if (hasCharCodeAt) confidence += 10;
if (hasFromCharCode) confidence += 10;

if (input.length > 1000 && totalEvalMatches >= 1) confidence += 15;
if (input.length > 5000 && totalEvalMatches >= 1) confidence += 10;

const evalDensity = totalEvalMatches / Math.max(input.length / 1000, 1);
if (evalDensity > 0.3) confidence += 15;
if (evalDensity > 0.5) confidence += 10;
if (evalDensity > 1.0) confidence += 8;

const obfuscationFeatures = [
    /\w{1,2}\[\w{1,2}\]\[\w{1,2}\]/.test(input),
    /\+\s*!!\s*\[\]/.test(input),
    /\[\]\[['"][a-zA-Z]+['"]\]/.test(input),
    /\(\s*!\s*\[\]\s*\+\s*\[\]\s*\)/.test(input)
];

const obfuscationCount = obfuscationFeatures.filter(Boolean).length;
if (obfuscationCount >= 1) confidence += 10;
if (obfuscationCount >= 2) confidence += 8;
if (obfuscationCount >= 3) confidence += 5;

const stringConcatCount = (input.match(/['"][^'"]*['"]\s*\+\s*['"][^'"]*['"]/g) || []).length;
if (stringConcatCount >= 3) confidence += 10;
if (stringConcatCount >= 10) confidence += 8;

const shortVarNames = (input.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]{0,2}\b/g) || []).length;
const totalTokens = (input.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g) || []).length;
const shortVarRatio = totalTokens > 0 ? shortVarNames / totalTokens : 0;

if (shortVarRatio > 0.7 && totalTokens > 20) confidence += 8;

const isEval = confidence >= 25 || totalEvalMatches >= 1 || specialMatches >= 1;
const forceDetect = totalEvalMatches >= 1 || hasEvalString || hasPackedCode;

return {
    type: 'Eval',
    isDetected: isEval || forceDetect,
    confidence: Math.min(confidence, 100),
    evalCount: totalEvalMatches,
    nestedDepth: nestedEvalDepth,
    hasStringEncoding,
    hasUnicodeEscape,
    hasHexEncoding,
    hasObfuscatedStrings,
    hasPackedCode,
    hasEvalString,
    hasBase64Like,
    hasUnescape,
    hasAtob,
    hasCharCodeAt,
    hasFromCharCode,
    specialMatches,
    obfuscationCount,
    stringConcatCount,
    shortVarRatio: Math.round(shortVarRatio * 100),
    patterns: evalMatches,
    length: input.length,
    density: Math.round(evalDensity * 100) / 100,
    forceDetect
};
```

}

function checkNestedEvalDepth(code) {
let maxDepth = 0;
const evalRegex = /eval\s*(/gi;
let match;

```
while ((match = evalRegex.exec(code)) !== null) {
    let pos = match.index;
    let parenDepth = 0;
    let nestedEvals = 0;
    
    for (let i = pos + match[0].length; i < code.length; i++) {
        if (code[i] === '(') {
            parenDepth++;
        } else if (code[i] === ')') {
            if (parenDepth === 0) break;
            parenDepth--;
        } else if (code.substr(i, 4).toLowerCase() === 'eval' && parenDepth > 0) {
            nestedEvals++;
        }
    }
    
    maxDepth = Math.max(maxDepth, nestedEvals + 1);
}

return maxDepth;
```

}

function comprehensiveDetection(input) {
if (input.includes(‘jsjiami.com.v5’) || input.includes(‘jsjiami.com.v6’) || input.includes(‘jsjiami.com.v7’)) {
return {
primaryType: ‘jsjiami’,
primaryConfidence: 95,
primaryResult: {
type: ‘jsjiami’,
confidence: 95,
method: ‘Unicode转义’,
isDetected: true
},
aaResult: { isDetected: false, confidence: 0 },
evalResult: { isDetected: false, confidence: 0 },
hasMultipleEncodings: false
};
}

```
const aaResult = detectAAEncode(input);
const evalResult = detectEval(input);

let primaryType = 'Unknown';
let primaryConfidence = 0;
let primaryResult = null;

if (aaResult.isDetected && aaResult.confidence > evalResult.confidence) {
    primaryType = 'AAEncode';
    primaryConfidence = aaResult.confidence;
    primaryResult = aaResult;
} else if (evalResult.isDetected) {
    primaryType = 'Eval';
    primaryConfidence = evalResult.confidence;
    primaryResult = evalResult;
}

return {
    primaryType,
    primaryConfidence,
    primaryResult,
    aaResult,
    evalResult,
    hasMultipleEncodings: aaResult.isDetected && evalResult.isDetected
};
```

}

function decodeAAEncode(code) {
try {
addLog(‘🔤 使用专业AADecode插件解密…’, ‘info’);

```
    const result = window.professionalAADecode(code);
    
    if (result !== null && result !== undefined && result !== code) {
        const resultStr = String(result);
        addLog('✅ 专业AADecode解密成功！', 'success');
        return {
            success: true,
            method: '专业AADecode插件',
            result: resultStr,
            preservedHeader: result.includes('\n\n') && code.search(/ﾟωﾟﾉ|ﾟДﾟ/) > 0
        };
    } else {
        throw new Error('专业插件返回空结果或未改变');
    }
    
} catch (error) {
    addLog('❌ 专业AADecode解密失败: ' + error.message, 'error');
    
    try {
        addLog('🔄 尝试通用AADecode插件...', 'info');
        if (window.DecodePlugins && window.DecodePlugins.aadecode) {
            const backupResult = window.DecodePlugins.aadecode.plugin(code);
            if (backupResult && backupResult !== code) {
                addLog('✅ 通用AADecode解密成功！', 'success');
                return {
                    success: true,
                    method: '通用AADecode插件',
                    result: String(backupResult),
                    warning: '使用备用解密方案'
                };
            }
        }
    } catch (e2) {
        addLog('❌ 备用插件也失败: ' + e2.message, 'error');
    }
    
    return {
        success: false,
        method: '解密失败',
        result: null,
        error: 'AAEncode解密失败: ' + error.message
    };
}
```

}

function decodeEval(code) {
try {
addLog(‘🔧 使用专业Eval解包插件解密…’, ‘info’);

```
    const result = window.DecodePlugins.eval.plugin(code);
    
    if (result !== null && result !== undefined && result !== code) {
        const resultStr = String(result);
        addLog('✅ 专业Eval解包成功！', 'success');
        
        const detection = comprehensiveDetection(resultStr);
        if (detection.primaryType !== 'Unknown' && detection.primaryConfidence > 60) {
            addLog('🔄 检测到嵌套编码，开始递归解密...', 'info');
            const recursiveResult = performDecryption(resultStr);
            if (recursiveResult.success) {
                return {
                    success: true,
                    method: 'Eval解包+递归解密',
                    result: recursiveResult.result,
                    recursive: true,
                    steps: 2
                };
            }
        }
        
        return {
            success: true,
            method: '专业Eval解包插件',
            result: resultStr,
            recursive: false
        };
    } else {
        throw new Error('Eval插件返回空结果或未改变');
    }
    
} catch (error) {
    addLog('❌ 专业Eval解包失败: ' + error.message, 'error');
    
    return {
        success: false,
        method: '解密失败',
        result: null,
        error: 'Eval解包失败: ' + error.message
    };
}
```

}

function performDecryption(code) {
const detection = comprehensiveDetection(code);

```
if (detection.primaryType === 'AAEncode') {
    return decodeAAEncode(code);
} else if (detection.primaryType === 'Eval') {
    return decodeEval(code);
} else {
    return tryOtherDecryptMethods(code);
}
```

}

function updateDetectionPanel(detection) {
const panel = document.getElementById(‘detectionPanel’);
const aaIndicator = document.getElementById(‘aaencodeIndicator’);
const evalIndicator = document.getElementById(‘evalIndicator’);

```
aaIndicator.classList.remove('show');
evalIndicator.classList.remove('show');
window.appData.isAAEncodeMode = false;
window.appData.isEvalMode = false;

if (detection.primaryType !== 'Unknown') {
    panel.style.display = 'block';
    
    document.getElementById('detectionType').textContent = detection.primaryType;
    document.getElementById('detectionConfidence').textContent = detection.primaryConfidence + '%';
    
    if (detection.primaryType === 'AAEncode') {
        aaIndicator.classList.add('show');
        window.appData.isAAEncodeMode = true;
        document.getElementById('detectionFeatures').textContent = detection.aaResult.patternMatches + '/9';
        document.getElementById('detectionDetails').textContent = detection.aaResult.ratio + '%字符占比';
    } else if (detection.primaryType === 'Eval') {
        evalIndicator.classList.add('show');
        window.appData.isEvalMode = true;
        document.getElementById('detectionFeatures').textContent = detection.evalResult.evalCount + '个eval';
        document.getElementById('detectionDetails').textContent = '嵌套深度' + detection.evalResult.nestedDepth;
    }
    
    if (detection.hasMultipleEncodings) {
        aaIndicator.classList.add('show');
        evalIndicator.classList.add('show');
        document.getElementById('detectionDetails').textContent = '多重编码';
    }
    
    const confidenceEl = document.getElementById('detectionConfidence');
    if (detection.primaryConfidence >= 90) {
        confidenceEl.style.color = '#10b981';
    } else if (detection.primaryConfidence >= 70) {
        confidenceEl.style.color = '#f59e0b';
    } else {
        confidenceEl.style.color = '#ef4444';
    }
    
    window.appData.lastDetection = detection;
} else {
    panel.style.display = 'none';
    window.appData.lastDetection = null;
}
```

}

function showRemoteUrlDialog() {
const url = prompt(‘请输入远程文件URL地址:’, ‘’);
if (url && url.trim()) {
let finalUrl = url.trim();
if (!finalUrl.startsWith(‘http://’) && !finalUrl.startsWith(‘https://’)) {
finalUrl = ‘https://’ + finalUrl;
}
loadRemoteFile(finalUrl);
}
}

function loadRemoteFile(url) {
addLog(’开始加载远程文件: ’ + url, ‘info’);

```
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应错误: ' + response.status);
        }
        return response.text();
    })
    .then(content => {
        document.getElementById('input').value = content;
        addLog('远程文件加载成功', 'success');
        showToast('✅ 远程文件加载成功');
    })
    .catch(error => {
        addLog('远程文件加载失败: ' + error.message, 'error');
        showToast('❌ 远程文件加载失败: ' + error.message);
    });
```

}

async function pasteFromClipboard() {
try {
const text = await navigator.clipboard.readText();
if (text) {
document.getElementById(‘input’).value = text;
showToast(‘📋 剪贴板内容已粘贴’);
addLog(‘从剪贴板粘贴内容’, ‘success’);

```
        setTimeout(() => {
            const detection = comprehensiveDetection(text);
            updateDetectionPanel(detection);
            if (detection.primaryType !== 'Unknown') {
                showToast(`🎯 检测到${detection.primaryType}！置信度: ${detection.primaryConfidence}%`);
            }
        }, 300);
    } else {
        showToast('❌ 剪贴板为空');
    }
} catch (error) {
    addLog('剪贴板访问失败: ' + error.message, 'error');
    showToast('❌ 无法访问剪贴板，请手动粘贴');
}
```

}

function cleanInput() {
const inputEl = document.getElementById(‘input’);
const input = inputEl.value.trim();

```
if (!input) {
    showToast('请先输入代码');
    return;
}

addLog('开始智能清理代码...', 'info');

const patterns = [
    {
        name: 'jsjiami格式(单引号)',
        test: input => input.indexOf(';var encode_version') !== -1,
        extract: input => {
            const jsjiamiStart = input.indexOf(';var encode_version');
            const fromStart = input.substring(jsjiamiStart);
            const jsjiamiEnd = fromStart.indexOf(";encode_version = 'jsjiami.com.v5';");
            if (jsjiamiEnd !== -1) {
                return fromStart.substring(0, jsjiamiEnd + ";encode_version = 'jsjiami.com.v5';".length);
            }
            return null;
        }
    },
    {
        name: 'jsjiami格式(双引号)',
        test: input => input.indexOf(';var encode_version') !== -1,
        extract: input => {
            const jsjiamiStart = input.indexOf(';var encode_version');
            const fromStart = input.substring(jsjiamiStart);
            const jsjiamiEnd = fromStart.indexOf(';encode_version = "jsjiami.com.v5";');
            if (jsjiamiEnd !== -1) {
                return fromStart.substring(0, jsjiamiEnd + ';encode_version = "jsjiami.com.v5";'.length);
            }
            return null;
        }
    }
];

for (const pattern of patterns) {
    if (pattern.test(input)) {
        const extracted = pattern.extract(input);
        if (extracted) {
            inputEl.value = extracted;
            showToast(`🎯 提取${pattern.name}完成`);
            addLog(`提取: ${input.length} → ${extracted.length} 字符`, 'success');
            return;
        }
    }
}

let cleaned = input
    .replace(/\/\/.*$/gm, '')                    // 单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '')           // 多行注释
    .replace(/<!--[\s\S]*?-->/g, '')            // HTML注释
    .replace(/^\s*console\.(log|warn|error)\s*\([^)]*\)\s*;?\s*$/gm, '') // console语句
    .replace(/^\s*alert\s*\([^)]*\)\s*;?\s*$/gm, '') // alert语句
    .replace(/^\s*[\r\n]+/gm, '')               // 空行
    .replace(/\s+/g, ' ')                       // 多余空白
    .trim();

if (cleaned === input) {
    showToast('🔍 未发现需要清理的内容');
    addLog('代码已经是纯净格式', 'info');
} else {
    inputEl.value = cleaned;
    showToast('🧹 代码清理完成');
    addLog(`清理: ${input.length} → ${cleaned.length} 字符`, 'success');
}
```

}

function clearInput() {
document.getElementById(‘input’).value = ‘’;
const remoteUrlElement = document.getElementById(‘remoteUrl’);
if (remoteUrlElement) {
remoteUrlElement.value = ‘’;
}
showToast(‘代码输入已清空’);
addLog(‘清空代码输入内容’, ‘info’);
}

async function startDecrypt() {
const input = document.getElementById(‘input’).value.trim();

```
if (!input) {
    showToast('请先输入需要解密的代码');
    return;
}

try {
    addLog('🚀 开始解密流程...', 'info');
    displayResult('');
    setProgress(0);
    
    const detection = comprehensiveDetection(input);
    updateDetectionPanel(detection);
    
    if (detection.primaryType !== 'Unknown') {
        addLog(`🎯 检测到${detection.primaryType} (置信度: ${detection.primaryConfidence}%)`, 'info');
        
        setProgress(30);
        const decodeResult = performDecryption(input);
        setProgress(80);
        
        if (decodeResult.success) {
            displayResult(decodeResult.result);
            showToast(`🎉 ${detection.primaryType}解密成功！`);
            addLog(`解密完成: ${decodeResult.method}`, 'success');
            
            if (decodeResult.preservedHeader) {
                addLog('✨ 头部注释已保留', 'info');
            }
            if (decodeResult.recursive) {
                addLog(`🔄 执行了${decodeResult.steps || '多'}步递归解密`, 'info');
            }
            if (decodeResult.warning) {
                addLog(`⚠️ ${decodeResult.warning}`, 'warning');
            }
            
            setProgress(100);
            
            document.getElementById('output').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            return;
        } else {
            addLog(`${detection.primaryType}解密失败，尝试其他方法`, 'warning');
        }
    }
    
    addLog('🔍 尝试其他解密方法...', 'info');
    setProgress(50);
    
    const result = await tryOtherDecryptMethods(input);
    if (result.success) {
        displayResult(result.content);
        showToast(`🎉 ${result.method}解密成功！`);
        addLog(`解密完成: ${result.method}`, 'success');
        setProgress(100);
    } else {
        if (window.appData.token && window.appData.repo) {
            addLog('🌐 使用GitHub Actions解密...', 'info');
            await submitToGitHub(input);
            await waitForResult();
        } else {
            showToast('❌ 解密失败，请检查输入格式');
            addLog('所有解密方法都失败了', 'error');
            setProgress(0);
        }
    }
    
} catch (error) {
    addLog('解密失败: ' + error.message, 'error');
    showToast('解密失败: ' + error.message);
    setProgress(0);
}
```

}

async function tryOtherDecryptMethods(input) {
// Base64解密
if (/^[A-Za-z0-9+/]+=*$/.test(input.replace(/\s/g, ‘’))) {
try {
const decoded = atob(input.replace(/\s/g, ‘’));
if (decoded.length > 10) {
return { success: true, method: ‘Base64’, content: decoded };
}
} catch (e) {
// 继续尝试其他方法
}
}

```
// URL解码
if (/%[0-9a-fA-F]{2}/.test(input)) {
    try {
        const decoded = decodeURIComponent(input);
        if (decoded !== input) {
            return { success: true, method: 'URL解码', content: decoded };
        }
    } catch (e) {
        // 继续尝试其他方法
    }
}

// 十六进制解密
if (/^[0-9a-fA-F\s]+$/.test(input) && input.length > 20) {
    try {
        const hex = input.replace(/\s/g, '');
        const decoded = hex.replace(/../g, (h) => String.fromCharCode(parseInt(h, 16)));
        if (decoded.length > 10) {
            return { success: true, method: '十六进制', content: decoded };
        }
    } catch (e) {
        // 继续尝试其他方法
    }
}

return { success: false, method: null, content: null };
```

}

function displayResult(content) {
const output = document.getElementById(‘output’);

```
if (!content || content.includes('解密结果将显示在这里')) {
    output.innerHTML = '<span style="color: #6b7280;">// 解密结果将显示在这里...</span>';
    return;
}

content = content.replace(/<[^>]*>/g, '');

if (content.includes('function') || content.includes('var ') || content.includes('let ') || 
    content.includes('const ') || content.includes('{') || content.includes('}')) {
    output.innerHTML = highlightJS(content);
} else {
    output.textContent = content;
}
```

}

function highlightJS(code) {
return code
.replace(/&/g, ‘&’)
.replace(/</g, ‘<’)
.replace(/>/g, ‘>’)
.replace(/"/g, ‘"’)
.replace(/’/g, ‘'’)
.replace(/\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|typeof|instanceof|in|of|class|extends|import|export|default|async|await|yield|true|false|null|undefined)\b/g, ‘<span class="hljs-keyword">$1</span>’)
.replace(/('|")(.*?)\1/g, ‘<span class="hljs-string">$1$2$1</span>’)
.replace(/\b(\d+.?\d*)\b/g, ‘<span class="hljs-number">$1</span>’)
.replace(///.*$/gm, ‘<span class="hljs-comment">$&</span>’)
.replace(//*[\s\S]*?*//g, ‘<span class="hljs-comment">$&</span>’)
.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=()/g, ‘<span class="hljs-function">$1</span>’)
.replace(/.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, ‘.<span class="hljs-property">$1</span>’);
}

function setProgress(percent) {
document.getElementById(‘progress’).style.width = percent + ‘%’;
}

async function submitToGitHub(code) {
if (!window.appData.token || !window.appData.repo) {
throw new Error(‘GitHub配置不完整’);
}

```
addLog('📤 提交代码到GitHub...', 'info');

const url = `https://api.github.com/repos/${window.appData.repo}/contents/input.js`;

let sha = null;
try {
    const checkResp = await fetch(url, {
        headers: {
            'Authorization': `token ${window.appData.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (checkResp.ok) {
        const data = await checkResp.json();
        sha = data.sha;
    }
} catch (e) {
    // 文件不存在，创建新文件
}

const payload = {
    message: `Update input.js - ${new Date().toISOString()}`,
    content: btoa(unescape(encodeURIComponent(code))),
    branch: 'main'
};

if (sha) payload.sha = sha;

const response = await fetch(url, {
    method: 'PUT',
    headers: {
        'Authorization': `token ${window.appData.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
});

if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API错误: ${error.message}`);
}

addLog('✅ 代码已提交，等待Actions处理...', 'success');
```

}

async function waitForResult() {
const startTime = Date.now();
const timeout = 60000;

```
return new Promise((resolve) => {
    const checkLoop = async () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / timeout) * 100, 100);
        setProgress(progress);
        
        if (elapsed >= timeout) {
            addLog('⏰ 等待超时，尝试获取结果...', 'warning');
            const success = await getResult();
            if (!success) {
                showToast('⏰ GitHub Actions处理中，请稍后点击"获取结果"');
            }
            resolve();
            return;
        }
        
        setTimeout(checkLoop, 3000);
    };
    
    checkLoop();
});
```

}

async function getResult() {
addLog(‘📥 获取解密结果…’, ‘info’);

```
if (!window.appData.token || !window.appData.repo) {
    showToast('请先配置GitHub Token和仓库地址');
    return false;
}

const timestamp = Date.now();

try {
    const apiUrl = `https://api.github.com/repos/${window.appData.repo}/contents/output.js`;
    const response = await fetch(`${apiUrl}?ref=main&_=${timestamp}`, {
        headers: {
            'Authorization': `token ${window.appData.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        const content = decodeBase64(data.content);
        
        if (content && content.trim().length > 10) {
            displayResult(content);
            addLog('✅ GitHub API获取成功！', 'success');
            showToast('🎉 解密成功！');
            setProgress(0);
            
            document.getElementById('output').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            return true;
        }
    } else if (response.status === 404) {
        addLog('❌ output.js文件不存在', 'warning');
    }
} catch (error) {
    addLog('GitHub API失败: ' + error.message, 'warning');
}

try {
    const rawUrl = `https://raw.githubusercontent.com/${window.appData.repo}/main/output.js?_=${timestamp}`;
    const response = await fetch(rawUrl);
    
    if (response.ok) {
        const content = await response.text();
        if (content && content.trim().length > 10) {
            displayResult(content);
            addLog('✅ Raw URL获取成功！', 'success');
            showToast('🎉 解密成功！');
            setProgress(0);
            return true;
        }
    }
} catch (error) {
    addLog('Raw URL失败: ' + error.message, 'warning');
}

addLog('❌ 获取失败，请稍后重试', 'error');
showToast('❌ 获取失败，请稍后重试');
return false;
```

}

function decodeBase64(base64) {
try {
const binaryString = atob(base64.replace(/\n/g, ‘’));
const bytes = new Uint8Array(binaryString.length);
for (let i = 0; i < binaryString.length; i++) {
bytes[i] = binaryString.charCodeAt(i);
}
return new TextDecoder(‘utf-8’).decode(bytes);
} catch (e) {
return atob(base64.replace(/\n/g, ‘’));
}
}

function beautifyJavaScript(code) {
let beautified = code.replace(/\s+/g, ’ ’).trim();

```
beautified = beautified.replace(/;/g, ';\n');
beautified = beautified.replace(/\{/g, '{\n');
beautified = beautified.replace(/\}/g, '\n}\n');
beautified = beautified.replace(/,\s*(?=[a-zA-Z_$\[])/g, ',\n');

beautified = beautified.replace(/\n\s*\n/g, '\n');
beautified = beautified.replace(/;\s*\n\s*\}/g, ';\n}');

const lines = beautified.split('\n');
const result = [];
let indentLevel = 0;
const indent = '  ';

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    if (line.includes('}') && !line.includes('{')) {
        indentLevel = Math.max(0, indentLevel - 1);
    }
    
    let indentedLine = indent.repeat(indentLevel) + line;
    
    if (line.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/)) {
        if (indentLevel > 0) {
            indentedLine = indent.repeat(indentLevel) + line;
        }
    }
    
    result.push(indentedLine);
    
    if (line.includes('{') && !line.includes('}')) {
        indentLevel++;
    } else if (line.includes('=') && line.includes('{') && !line.includes('}')) {
        indentLevel++;
    }
}

let formatted = result.join('\n');

const timestamp = new Date().toLocaleString();
const header = `//解密时间: ${timestamp}\n//解密工具: 羊毛助手 v6.0\n//解密插件: eval\n\n`;

formatted = formatted
    .replace(/(\w+)\s*=\s*\{/g, '$1 = {')
    .replace(/\{\s*\n\s*\}/g, '{}')
    .replace(/\[\s*\n\s*\]/g, '[]')
    .replace(/,\s*\]/g, ',\n]')
    .replace(/\{\s*([^}]{1,50})\s*\}/g, '{ $1 }')
    .replace(/\n{3,}/g, '\n\n');

return header + formatted;
```

}

function beautifyCode() {
const output = document.getElementById(‘output’);
let content = output.innerHTML.includes(’<span’) ?
stripHTMLTags(output.innerHTML) :
output.textContent;

```
if (!content || content.includes('解密结果将显示在这里')) {
    showToast('请先获取解密结果');
    return;
}

try {
    const beautified = beautifyJavaScript(content);
    displayResult(beautified);
    showToast('🎨 代码美化完成');
    addLog('代码美化成功', 'success');
    
    document.getElementById('output').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
} catch (error) {
    showToast('❌ 代码美化失败: ' + error.message);
    addLog('代码美化失败: ' + error.message, 'error');
}
```

}

function stripHTMLTags(html) {
const div = document.createElement(‘div’);
div.innerHTML = html;
return div.textContent || div.innerText || ‘’;
}

function copyResult() {
const output = document.getElementById(‘output’);
let content;

```
if (output.innerHTML.includes('<span')) {
    content = stripHTMLTags(output.innerHTML);
} else {
    content = output.textContent || output.innerText;
}

if (!content || content.includes('解密结果将显示在这里')) {
    showToast('❌ 没有可复制的内容');
    return;
}

if (navigator.clipboard) {
    navigator.clipboard.writeText(content).then(() => {
        showToast('📋 结果已复制到剪贴板');
        addLog('复制成功', 'success');
    }).catch(() => {
        fallbackCopy(content);
    });
} else {
    fallbackCopy(content);
}
```

}

function fallbackCopy(content) {
const textarea = document.createElement(‘textarea’);
textarea.value = content;
textarea.style.position = ‘fixed’;
textarea.style.opacity = ‘0’;
document.body.appendChild(textarea);
textarea.select();
document.execCommand(‘copy’);
document.body.removeChild(textarea);
showToast(‘📋 结果已复制到剪贴板’);
addLog(‘复制成功（备用方案）’, ‘success’);
}

function clearAll() {
document.getElementById(‘input’).value = ‘’;
displayResult(’’);
setProgress(0);
updateDetectionPanel({ primaryType: ‘Unknown’ });

```
showToast('🗑 已清除所有内容');
addLog('清除所有内容', 'info');

window.scrollTo({ top: 0, behavior: 'smooth' });
```

}

function handleFileSelect(event) {
const file = event.target.files[0];
if (file) {
readFile(file);
}
}

function handleDragOver(event) {
event.preventDefault();
event.currentTarget.classList.add(‘dragover’);
}

function handleDragLeave(event) {
event.currentTarget.classList.remove(‘dragover’);
}

function handleDrop(event) {
event.preventDefault();
event.currentTarget.classList.remove(‘dragover’);

```
const files = event.dataTransfer.files;
if (files.length > 0) {
    readFile(files[0]);
}
```

}

function readFile(file) {
addLog(`📁 开始读取文件: ${file.name}`, ‘info’);

```
const reader = new FileReader();
reader.onload = function(e) {
    try {
        let content = e.target.result;
        
        document.getElementById('input').value = content;
        showToast(`📁 文件加载成功: ${file.name}`);
        addLog(`文件加载成功 (${content.length} 字符)`, 'success');
        
        setTimeout(() => {
            const detection = comprehensiveDetection(content);
            updateDetectionPanel(detection);
            if (detection.primaryType !== 'Unknown') {
                showToast(`🎯 检测到${detection.primaryType}文件！置信度: ${detection.primaryConfidence}%`);
            }
        }, 500);
        
    } catch (error) {
        addLog(`文件处理失败: ${error.message}`, 'error');
        showToast('❌ 文件处理失败');
    }
};

reader.onerror = function() {
    addLog(`文件读取失败: ${file.name}`, 'error');
    showToast('❌ 文件读取失败');
};

reader.readAsText(file, 'UTF-8');
```

}

function addLog(message, type = ‘info’) {
const logs = document.getElementById(‘logs’);
const time = new Date().toLocaleTimeString();
const div = document.createElement(‘div’);
div.className = ‘log-’ + type;
div.textContent = `${time} ${message}`;
logs.appendChild(div);
logs.scrollTop = logs.scrollHeight;

```
if (logs.children.length > 50) {
    logs.removeChild(logs.firstChild);
}
```

}

function showToast(message, duration = 3000) {
const toast = document.getElementById(‘toast’);
toast.textContent = message;
toast.classList.add(‘show’);
setTimeout(() => toast.classList.remove(‘show’), duration);
}

document.addEventListener(‘DOMContentLoaded’, function() {
document.getElementById(‘token’).value = window.appData.token;
document.getElementById(‘repo’).value = window.appData.repo;

```
document.getElementById('token').addEventListener('input', function(e) {
    window.appData.token = e.target.value;
    localStorage.setItem('github_token', e.target.value);
});

document.getElementById('repo').addEventListener('input', function(e) {
    window.appData.repo = e.target.value;
    localStorage.setItem('repo_name', e.target.value);
});

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

const fileUpload = document.querySelector('.file-upload');
fileUpload.addEventListener('dragover', handleDragOver);
fileUpload.addEventListener('dragleave', handleDragLeave);
fileUpload.addEventListener('drop', handleDrop);

document.getElementById('input').addEventListener('input', function() {
    const input = this.value.trim();
    if (input.length > 50) {
        const detection = comprehensiveDetection(input);
        updateDetectionPanel(detection);
    } else {
        updateDetectionPanel({ primaryType: 'Unknown' });
    }
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        startDecrypt();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadResult();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        copyResult();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        clearAll();
    }
});

addLog(`🚀 系统初始化完成 v${APP_CONFIG.VERSION}`, 'success');
addLog('🎯 专业AADecode插件已加载，支持头部注释保留', 'info');
addLog('🔧 专业Eval解包插件已加载，支持递归解密', 'info');
addLog('💡 快捷键: Ctrl+Enter解密, Ctrl+S下载, Ctrl+C复制, Esc清除', 'info');
```

});

window.addEventListener(‘error’, function(e) {
addLog(’❌ 发生错误: ’ + e.message, ‘error’);
console.error(‘Global error:’, e);
});

window.addEventListener(‘unhandledrejection’, function(e) {
addLog(’❌ Promise错误: ’ + e.reason, ‘error’);
console.error(‘Unhandled promise rejection:’, e);
});