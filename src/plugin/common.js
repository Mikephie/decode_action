import fs from 'fs';

export function isKaomojiFuck(code) {
  return (
    code.length > 200 &&
    /^[\[\]\(\)\!\+\-\*\?\/\_\|\<\>\^\~\=\{\}\\\'\"\:\;\s\n\r\u0000-\u00ff\u3000-\u303F\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]+$/.test(code)
  );
}

export function simpleFormat(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

export function isNeverDecode(code) {
  // 修改逻辑，不再跳过 Kaomoji 格式
  // if (isKaomojiFuck(code) && !/eval|new Function/.test(code)) {
  //   return true;
  // }
  if (code.includes('Mix、Mix2解锁Vip')) {
    return true;
  }
  return false;
}

export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

// ES Module default export
export default {
  isKaomojiFuck,
  isNeverDecode,
  simpleFormat,
  readFile,
  writeFile
};
