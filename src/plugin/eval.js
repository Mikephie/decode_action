
// 保存原始的 eval 函数
const evalHolder = window.eval;

// 重写 window.eval 函数，使其直接返回传入的代码而不执行
window.eval = function (jsCode) {
    return jsCode;
};

/**
 * 对eval加密过的JS代码进行解密
 * @param evalJsCode {String}
 * @returns {*} 解密后的代码
 */
function evalDecode(evalJsCode) {
    return evalHolder.apply(this, evalJsCode);
}

// 导出与主程序调用方式匹配的插件对象
const plugin = {
    unpack: evalDecode  // 匹配主程序中的 PluginEval.unpack 调用
};

export default plugin;