/**
 * AADecoder JavaScript
 * 基于 PHP 版本的 AADecoder 移植
 * 原作者: Andrey Izman <izmanw@gmail.com>
 * 原始版本: https://github.com/mervick/php-aaencoder
 * 
 * 该类能够解码 AAEncode 混淆的 JavaScript 代码
 * 不使用 eval，完全基于模式匹配和替换
 */

class AADecoder {
  // AAEncoded 代码的特征开始部分
  static BEGIN_CODE = "ﾟωﾟﾉ=/｀ｍ´）ﾉ~┻━┻/['_'];o=(ﾟｰﾟ)=_=3;c=(ﾟΘﾟ)=(ﾟｰﾟ)-(ﾟｰﾟ);(ﾟДﾟ)=(ﾟΘﾟ)=(o^_^o)/(o^_^o);(ﾟДﾟ)={ﾟΘﾟ:'_',ﾟωﾟﾉ:((ﾟωﾟﾉ==3)+'_')[ﾟΘﾟ],ﾟｰﾟﾉ:(ﾟωﾟﾉ+'_')[o^_^o-(ﾟΘﾟ)],ﾟДﾟﾉ:((ﾟｰﾟ==3)+'_')[ﾟｰﾟ]};(ﾟДﾟ)[ﾟΘﾟ]=((ﾟωﾟﾉ==3)+'_')[c^_^o];(ﾟДﾟ)['c']=((ﾟДﾟ)+'_')[(ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ)];(ﾟДﾟ)['o']=((ﾟДﾟ)+'_')[ﾟΘﾟ];(ﾟoﾟ)=(ﾟДﾟ)['c']+(ﾟДﾟ)['o']+(ﾟωﾟﾉ+'_')[ﾟΘﾟ]+((ﾟωﾟﾉ==3)+'_')[ﾟｰﾟ]+((ﾟДﾟ)+'_')[(ﾟｰﾟ)+(ﾟｰﾟ)]+((ﾟｰﾟ==3)+'_')[ﾟΘﾟ]+((ﾟｰﾟ==3)+'_')[(ﾟｰﾟ)-(ﾟΘﾟ)]+(ﾟДﾟ)['c']+((ﾟДﾟ)+'_')[(ﾟｰﾟ)+(ﾟｰﾟ)]+(ﾟДﾟ)['o']+((ﾟｰﾟ==3)+'_')[ﾟΘﾟ];(ﾟДﾟ)['_']=(o^_^o)[ﾟoﾟ][ﾟoﾟ];(ﾟεﾟ)=((ﾟｰﾟ==3)+'_')[ﾟΘﾟ]+(ﾟДﾟ).ﾟДﾟﾉ+((ﾟДﾟ)+'_')[(ﾟｰﾟ)+(ﾟｰﾟ)]+((ﾟｰﾟ==3)+'_')[o^_^o-ﾟΘﾟ]+((ﾟｰﾟ==3)+'_')[ﾟΘﾟ]+(ﾟωﾟﾉ+'_')[ﾟΘﾟ];(ﾟｰﾟ)+=(ﾟΘﾟ);(ﾟДﾟ)[ﾟεﾟ]='\\\\';(ﾟДﾟ).ﾟΘﾟﾉ=(ﾟДﾟ+ﾟｰﾟ)[o^_^o-(ﾟΘﾟ)];(oﾟｰﾟo)=(ﾟωﾟﾉ+'_')[c^_^o];(ﾟДﾟ)[ﾟoﾟ]='\\\"';(ﾟДﾟ)['_']((ﾟДﾟ)['_'](ﾟεﾟ+(ﾟДﾟ)[ﾟoﾟ]+";

  // AAEncoded 代码的特征结束部分
  static END_CODE = "(ﾟДﾟ)[ﾟoﾟ])(ﾟΘﾟ))('_');";

  // 字节映射表，将 AAEncode 表达式映射到对应的数字
  static BYTES_MAPPING = {
    '((ﾟｰﾟ)+(ﾟｰﾟ)+(ﾟΘﾟ))': 9,
    '((o^_^o)+(o^_^o))': 6,
    '((o^_^o)-(ﾟΘﾟ))': 2,
    '((ﾟｰﾟ)+(o^_^o))': 7,
    '((ﾟｰﾟ)+(ﾟΘﾟ))': 5,
    '((ﾟｰﾟ)+(ﾟｰﾟ))': 8,
    '(ﾟДﾟ).ﾟωﾟﾉ': 10,
    '(ﾟДﾟ).ﾟΘﾟﾉ': 11,
    '(ﾟДﾟ)[\'c\']': 12,
    '(ﾟДﾟ).ﾟｰﾟﾉ': 13,
    '(ﾟДﾟ).ﾟДﾟﾉ': 14,
    '(ﾟДﾟ)[ﾟΘﾟ]': 15,
    '(o^_^o)': 3,
    '(c^_^o)': 0,
    '(ﾟｰﾟ)': 4,
    '(ﾟΘﾟ)': 1
  };

  // 原生表达式替换
  static NATIVE_MAP = {
    '-~': '1+',
    '!': '1',
    '[]': '0'
  };

  /**
   * 解码 AAEncoded 的 JavaScript 代码
   * @param {string} js - 包含 AAEncoded 代码的 JavaScript 字符串
   * @returns {string} - 解码后的 JavaScript 代码
   */
  static decode(js) {
    let result = js;
    let encoded = '';
    let start = 0;
    let next = 0;

    // 尝试查找并解码所有 AAEncoded 片段
    while (this.hasAAEncoded(result, start, next, encoded)) {
      let decoded = this.deobfuscate(encoded);
      
      // 确保解码后的代码以分号结尾
      if (decoded.trim().charAt(decoded.trim().length - 1) !== ';') {
        decoded += ';';
      }

      // 替换原始代码中的 AAEncoded 部分
      result = result.substring(0, start) + decoded + this.decode(result.substring(next));
      break; // 因为递归调用了 decode，所以我们在这里退出循环
    }

    return result;
  }

  /**
   * 解除混淆，将 AAEncoded 代码转换回原始 JavaScript
   * @param {string} js - AAEncoded 代码片段
   * @returns {string} - 解码后的 JavaScript 代码
   */
  static deobfuscate(js) {
    // 使用字节映射替换模式
    for (const [pattern, byte] of Object.entries(this.BYTES_MAPPING)) {
      // 使用正则表达式的 split 和 join 替换所有匹配项
      const parts = js.split(new RegExp(this.escapeRegExp(pattern), 'g'));
      js = parts.join(byte);
    }

    const chars = [];
    const hex = '(oﾟｰﾟo)+';
    const hexLen = hex.length;

    // 处理原生表达式替换
    for (const [search, replace] of Object.entries(this.NATIVE_MAP)) {
      js = js.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
    }

    // 根据 '(ﾟДﾟ)[ﾟεﾟ]+' 分割代码
    const blocks = js.split(new RegExp(this.escapeRegExp('(ﾟДﾟ)[ﾟεﾟ]+'), 'g'));
    
    for (let block of blocks) {
      // 移除前后的加号和空格
      block = block.trim().replace(/^\+|\+$/g, '');
      
      if (block === '') continue;
      
      // 替换原生表达式
      for (const [search, replace] of Object.entries(this.NATIVE_MAP)) {
        block = block.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
      }
      
      // 检查是否为十六进制表示
      const isHex = block.substring(0, hexLen) === hex;
      let code = 0;
      
      if (isHex) {
        // 处理十六进制代码
        const hexValue = this.convertBlock(block.substring(hexLen), this.calculateExpression, num => num.toString(16));
        code = parseInt(hexValue, 16);
      } else {
        // 处理八进制代码
        const octValue = this.convertBlock(block, this.calculateExpression, num => num.toString(8));
        code = parseInt(octValue, 8);
      }
      
      // 转换代码点为字符
      chars.push(String.fromCodePoint(code));
    }
    
    return chars.join('');
  }

  /**
   * 检测字符串中是否包含 AAEncoded 代码
   * @param {string} js - JavaScript 代码
   * @param {number} start - 开始位置的引用
   * @param {number} next - 下一个位置的引用
   * @param {string} encoded - 编码部分的引用
   * @returns {boolean} - 是否找到 AAEncoded 代码
   */
  static hasAAEncoded(js, start = 0, next = 0, encoded = '') {
    // 查找 AAEncoded 的特征开始部分
    while ((start = js.indexOf('ﾟωﾟﾉ', start)) !== -1) {
      // 清除注释和空格
      const clear = js.substring(start)
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/[\x03-\x20]/g, '');
      
      const len = this.BEGIN_CODE.length;
      
      // 检查是否匹配开始和结束标记
      if (clear.substring(0, len) === this.BEGIN_CODE && 
          clear.indexOf(this.END_CODE, len) !== -1) {
        
        // 查找关键点，这里简化了查找逻辑
        const matches = this.findOccurrences(js, 'ﾟoﾟ', start);
        
        if (matches && matches.length >= 2) {
          let beginAt = matches[0];
          let endAt = matches[1];
          
          // 调整边界
          beginAt = js.indexOf('+', beginAt);
          endAt = js.lastIndexOf('(', endAt);
          
          next = js.indexOf(';', endAt) + 1;
          
          // 提取编码部分
          encoded = js.substring(beginAt, endAt).replace(/[\x03-\x20]/g, '');
          return true;
        }
      }
      
      start += 1; // 继续搜索
    }
    
    return false;
  }

  /**
   * 转换代码块
   * @param {string} block - 代码块
   * @param {Function} calcFunc - 计算表达式的函数
   * @param {Function} convertFunc - 转换数字的函数
   * @returns {string} - 转换后的字符串
   */
  static convertBlock(block, calcFunc, convertFunc) {
    // 先计算所有括号内的表达式
    while (block.match(/\([0-9\-\+\*\/]+\)/)) {
      block = block.replace(/\([0-9\-\+\*\/]+\)/g, match => {
        return calcFunc(match);
      });
    }
    
    // 分割和处理每个数字
    const split = [];
    for (const num of block.split('+')) {
      if (num === '') continue;
      split.push(convertFunc(parseInt(num.trim())));
    }
    
    return split.join('');
  }

  /**
   * 计算数学表达式
   * @param {string} expr - 数学表达式
   * @returns {number} - 计算结果
   */
  static calculateExpression(expr) {
    // 安全地计算表达式，不使用 eval
    // 这里只实现了四则运算的简单版本
    try {
      // 移除括号
      expr = expr.replace(/[()]/g, '');
      
      // 处理乘除
      while (expr.match(/[0-9]+[\*\/][0-9]+/)) {
        expr = expr.replace(/([0-9]+)([\*\/])([0-9]+)/, (_, a, op, b) => {
          return op === '*' ? Number(a) * Number(b) : Math.floor(Number(a) / Number(b));
        });
      }
      
      // 处理加减
      while (expr.match(/[0-9]+[\+\-][0-9]+/)) {
        expr = expr.replace(/([0-9]+)([\+\-])([0-9]+)/, (_, a, op, b) => {
          return op === '+' ? Number(a) + Number(b) : Number(a) - Number(b);
        });
      }
      
      return Number(expr);
    } catch (e) {
      console.error('计算表达式时出错:', e);
      return 0;
    }
  }

  /**
   * 在字符串中查找指定子串的多次出现位置
   * @param {string} haystack - 要搜索的字符串
   * @param {string} needle - 要查找的子串
   * @param {number} offset - 开始搜索的位置
   * @returns {Array} - 找到的位置数组
   */
  static findOccurrences(haystack, needle, offset = 0) {
    const matches = [];
    let pos = offset;
    
    // 查找多次出现
    for (let i = 0; i < 10 && pos !== -1; i++) {
      pos = haystack.indexOf(needle, pos);
      if (pos !== -1) {
        matches.push(pos);
        pos += 1;
      }
    }
    
    return matches.length >= 2 ? [matches[matches.length - 2], matches[matches.length - 1]] : null;
  }

  /**
   * 转义正则表达式中的特殊字符
   * @param {string} string - 要转义的字符串
   * @returns {string} - 转义后的字符串
   */
  static escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// 导出 AADecoder 类
export default AADecoder;
