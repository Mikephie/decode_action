if (isKaomojiFuck(code)) {
   try {
      const fakeWindow = {};  // 无副作用环境
      const fakeEval = (payload) => payload;

      const evalCode = `
        (function(window, self) {
          return ${code}
        })(Object.create(null), Object.create(null))
      `;

      const result = Function('"use strict";return (' + evalCode + ')')();

      return result;
   } catch(e) {
      return simpleFormat(code);
   }
}
