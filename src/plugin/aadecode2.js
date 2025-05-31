/**
 * AADecode 第二阶段 - 处理嵌套或非典型 aaencode 剩余层
 */
function decodeAA2(code) {
  if (!/ﾟωﾟ|･ﾟ･|｀;'|==3|\/\*.*\*\//.test(code)) return code;

  try {
    // 如果是纯字符串结果，直接返回
    if (!code.includes('(') && !code.includes('{') && !code.includes(';')) {
      return code;
    }
    
    // 防止环境变量污染
    const fn = new Function('return ' + code);
    const result = fn();
    if (typeof result === 'string') return result;
    if (typeof result === 'function') return result.toString();
  } catch (e) {
    console.warn('[aadecode2] 执行失败:', e.message);
  }
  return code;
}

export default decodeAA2;
```

### 3. 创建测试文件 `testDirect.js`

```javascript
// 直接测试，不依赖框架
import fs from 'fs';

const code = fs.readFileSync('input.js', 'utf8');

console.log('原始代码长度:', code.length);

// 直接执行解码
const decoder = new Function(`
  var ﾟωﾟﾉ, o, c, ﾟΘﾟ, ﾟｰﾟ, ﾟДﾟ, ﾟεﾟ, ﾟoﾟ, oﾟｰﾟo;
  var _result = '';
  var alert = function(msg) { _result = String(msg); };
  
  try {
    ${code}
  } catch(e) {
    if (e.message && e.message.includes('is not defined')) {
      var match = e.message.match(/([\\w]+) is not defined/);
      if (match) _result = match[1];
    }
  }
  
  return _result;
`);

const result = decoder();
console.log('解码结果:', result);

// 保存结果
if (result) {
  fs.writeFileSync('output.js', `// Decoded result\n"${result}"`, 'utf8');
  console.log('已保存到 output.js');
}