import fs from 'fs'

/**
 * 检测是否为 Kaomoji 或 JSFuck 混淆
 */
export function isKaomojiFuck(code) {
  return (
    code.length > 200 &&
    /^[\[\]\(\)\!\+\-\*\?\/\_\|\<\>\^\~\=\{\}\\\'\"\:\;\s\n\r\u0000-\u00ff\u3000-\u303F\u3040-\u30FF\u31F0-\u31FF\uFF00-\uFFEF]+$/.test(code)
  )
}

/**
 * 简单格式化备用
 */
export function simpleFormat(code) {
  return code
    .replace(/;/g, ';\n')
    .replace(/{/g, '{\n')
    .replace(/}/g, '\n}')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
}

/**
 * 检测是否为不需要解包的脚本（自动跳过）
 */
export function isNeverDecode(code) {
  if (isKaomojiFuck(code) && !/eval|new Function/.test(code)) {
    return true
  }
  if (code.includes('Mix、Mix2解锁Vip')) {
    return true
  }
  return false
}

/**
 * 文件读取
 */
export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

/**
 * 文件写入
 */
export function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8')
}

export default {
  isKaomojiFuck,
  isNeverDecode,
  simpleFormat,
  readFile,
  writeFile
}
