// deadCodeElimination.js - 死代码消除插件

function process(code, options = {}) {
    const config = {
        removeUnreachable: options.removeUnreachable !== false,
        removeUnusedVars: options.removeUnusedVars !== false,
        removeEmptyBlocks: options.removeEmptyBlocks !== false,
        removeFalseConditions: options.removeFalseConditions !== false,
        aggressive: options.aggressive || false,
        ...options
    };
    
    let result = code;
    let changed = true;
    let iterations = 0;
    const maxIterations = 5;
    
    while (changed && iterations < max