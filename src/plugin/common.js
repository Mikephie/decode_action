/**
 * decode-js 项目专用通用函数库
 * Author: Mikephie
 */

import fs from 'fs'

/**
 * 判断是否为 JSFuck / 颜文字混淆代码
 * @param {string} code
 * @returns {boolean}
 */
export function isKaomojiFuck(code) {
  // 特征1：全是符号、日文、特殊字符 且 长度较大
  if (
    code.length > 200 &&
    /^[\[\]\(\)\!\+\-\*\?\/\_\|\<\>\^\~\=\{\}\\\'\"\:\;\s\n\r\u0000-\u00ff\u3000-\u303F\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]+$/.test(
      code
    )
  ) {
    return true
  }

  // 特征2：连续出现大量颜文字结构 ()
  const kaomojiPattern = /[（(][^A-Za-z0-9]{1,20}[）)]/g
  const match = code.match(kaomojiPattern)

  if (match && match.length >= 5) {
    return true
  }

  return false
}

/**
 * 简单格式化备用方案（用于 js-beautify 失败时）
 * @param {string} code
 * @returns {string}
 */
export function simpleFormat(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
}

/**
 * 添加头部信息
 * @param {string} code
 * @returns {string}
 */
export function addHeader(code) {
  const header = [
    `// Generated at ${new Date().toISOString()}`,
    '// Base: https://github.com/echo094/decode-js',
    '// Modify: https://github.com/smallfawn/decode_action',
    ''
  ].join('\n')
  return header + code
}

/**
 * 读取文件
 * @param {string} filePath
 * @returns {string}
 */
export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

/**
 * 写入文件
 * @param {string} filePath
 * @param {string} content
 */
export function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

export default {
  isKaomojiFuck,
  simpleFormat,
  addHeader,
  readFile,
  writeFile
}
