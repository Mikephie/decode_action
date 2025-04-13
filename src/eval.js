import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generator = _generate.default;
import _traverse from '@babel/traverse';
const traverse = _traverse.default;
import * as t from '@babel/types';

function unpack(packedCode) {
  let unpacked = '';
  const fakeEval = (code) => {
    unpacked = code;
    return code;
  };

  const modifiedCode = packedCode.replace(/eval\s*\(/, 'fakeEval(');

  try {
    const func = new Function('fakeEval', 'String', 'RegExp', modifiedCode);
    func(fakeEval, String, RegExp);
    return unpacked;
  } catch (e) {
    console.log('解包错误:', e);
    return null;
  }
}

/**
 * JS Decoder Formatter
 * A script to beautifully format decoded JavaScript files from XiaoMao script
 */

function formatScript(code) {
  // Preserve header comments
  const lines = code.split('\n');
  const headerComments = [];
  let codeStart = 0;
  
  // Extract header comments
  while (codeStart < lines.length && (lines[codeStart].trim().startsWith('//') || lines[codeStart].trim() === '')) {
    headerComments.push(lines[codeStart]);
    codeStart++;
  }
  
  // Generate a new formatted header
  let header = '// Generated at ' + new Date().toISOString() + '\n';
  header += '// Base: https://github.com/echo094/decode-js\n';
  header += '// Modify: https://github.com/smallfawn/decode_action\n\n';
  
  // Process the main code content
  let mainCode = lines.slice(codeStart).join(' ');
  
  // Split at semicolons to get statements
  const statements = mainCode.split(';');
  
  // Format the statements
  let formattedCode = '';
  let configSection = true;
  let inEnvFunction = false;
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (!stmt) continue;
    
    // Check for function definition
    if (stmt.startsWith('function Env(')) {
      formattedCode += '\n/**\n * Environment helper function\n */\n';
      formattedCode += formatFunction(stmt + (statements[i+1] || ''));
      inEnvFunction = true;
      continue;
    }
    
    // Check if we're still in the Env function
    if (inEnvFunction) {
      if (stmt.includes('return{')) {
        formattedCode += formatReturnStatement(stmt);
        inEnvFunction = false;
      }
      continue;
    }
    
    // Handle variable declarations
    if (stmt.startsWith('let ')) {
      // First set of variables are configuration
      if (configSection && (
          stmt.includes('names=') || 
          stmt.includes('productName=') || 
          stmt.includes('productType=')
        )) {
        if (formattedCode === '') {
          formattedCode += '// 基础配置变量\n';
        }
        formattedCode += formatVariableDeclaration(stmt) + '\n';
      } else {
        configSection = false;
        formattedCode += formatVariableDeclaration(stmt) + '\n';
      }
    } 
    // Handle subscriber assignment
    else if (stmt.includes('obj.subscriber=')) {
      formattedCode += '\n// 订阅配置\n';
      formattedCode += formatObjectAssignment(stmt) + '\n';
    }
    // Handle non_subscriptions assignment
    else if (stmt.includes('obj.subscriber.non_subscriptions')) {
      formattedCode += '\n// 非订阅配置\n';
      formattedCode += formatArrayAssignment(stmt) + '\n';
    }
    // Handle notify calls
    else if (stmt.includes('$.notify(')) {
      formattedCode += '\n// 通知配置\n';
      formattedCode += formatNotifyCall(stmt) + '\n';
    }
    // Handle $done calls
    else if (stmt.includes('$done(')) {
      formattedCode += '\n// 完成处理\n';
      formattedCode += formatDoneCall(stmt) + '\n';
    }
    // Other statements
    else if (stmt) {
      formattedCode += stmt + ';\n';
    }
  }
  
  return header + formattedCode;
}

function formatVariableDeclaration(stmt) {
  // Split multiple declarations
  if (stmt.includes('let ') && stmt.includes(';let ')) {
    const vars = stmt.split('let ').filter(Boolean);
    return vars.map(v => 'let ' + formatSingleVariable(v)).join('\n');
  }
  
  return 'let ' + formatSingleVariable(stmt.replace('let ', ''));
}

function formatSingleVariable(variable) {
  const parts = variable.split('=');
  if (parts.length === 2) {
    const name = parts[0].trim();
    const value = parts[1].trim();
    
    // Handle object assignments
    if (value.startsWith('{') && value.endsWith('}')) {
      return `${name} = ${formatJSONObject(value)};`;
    }
    
    // Handle function assignments
    if (value.startsWith('function(') || value.startsWith('(')) {
      return `${name} = ${formatInlineFunction(value)};`;
    }
    
    return `${name} = ${value};`;
  }
  
  return variable + ';';
}

function formatObjectAssignment(stmt) {
  const parts = stmt.split('=');
  const leftSide = parts[0].trim();
  const rightSide = parts.slice(1).join('=').trim();
  
  return `${leftSide} = ${formatJSONObject(rightSide)};`;
}

function formatArrayAssignment(stmt) {
  const parts = stmt.split('=');
  const leftSide = parts[0].trim();
  const rightSide = parts.slice(1).join('=').trim();
  
  return `${leftSide} = ${formatJSONArray(rightSide)};`;
}

function formatJSONObject(str) {
  // Remove outer braces for processing
  str = str.trim();
  if (str.startsWith('{')) str = str.substring(1);
  if (str.endsWith('}')) str = str.substring(0, str.length - 1);
  
  const properties = [];
  let currentProp = '';
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  
  // Parse object properties
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if ((char === '"' || char === "'" || char === '`') && 
        (i === 0 || str[i-1] !== '\\')) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{' || char === '[') braceCount++;
      if (char === '}' || char === ']') braceCount--;
      
      if (char === ',' && braceCount === 0) {
        properties.push(currentProp.trim());
        currentProp = '';
        continue;
      }
    }
    
    currentProp += char;
  }
  
  if (currentProp.trim()) {
    properties.push(currentProp.trim());
  }
  
  // Format properties
  const formattedProps = properties.map(prop => {
    const colonPos = prop.indexOf(':');
    if (colonPos > 0) {
      const key = prop.substring(0, colonPos).trim();
      const value = prop.substring(colonPos + 1).trim();
      
      // Handle nested objects
      if (value.startsWith('{') && value.endsWith('}')) {
        return `  ${key}: ${formatJSONObject(value)}`;
      }
      // Handle arrays
      else if (value.startsWith('[') && value.endsWith(']')) {
        return `  ${key}: ${formatJSONArray(value)}`;
      }
      // Handle simple values
      else {
        return `  ${key}: ${value}`;
      }
    }
    return `  ${prop}`;
  });
  
  return `{\n${formattedProps.join(',\n')}\n}`;
}

function formatJSONArray(str) {
  // Remove outer brackets for processing
  str = str.trim();
  if (str.startsWith('[')) str = str.substring(1);
  if (str.endsWith(']')) str = str.substring(0, str.length - 1);
  
  const items = [];
  let currentItem = '';
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  
  // Parse array items
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if ((char === '"' || char === "'" || char === '`') && 
        (i === 0 || str[i-1] !== '\\')) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{' || char === '[') braceCount++;
      if (char === '}' || char === ']') braceCount--;
      
      if (char === ',' && braceCount === 0) {
        items.push(currentItem.trim());
        currentItem = '';
        continue;
      }
    }
    
    currentItem += char;
  }
  
  if (currentItem.trim()) {
    items.push(currentItem.trim());
  }
  
  // Format items
  const formattedItems = items.map(item => {
    if (item.startsWith('{') && item.endsWith('}')) {
      return `  ${formatJSONObject(item)}`;
    } else {
      return `  ${item}`;
    }
  });
  
  return `[\n${formattedItems.join(',\n')}\n]`;
}

function formatNotifyCall(stmt) {
  // Extract parameters
  const match = stmt.match(/\$\.notify\((.*)\)/);
  if (match && match[1]) {
    const params = match[1].split(',');
    if (params.length >= 3) {
      return `$.notify(
  ${params[0].trim()}, 
  ${params[1].trim()}, 
  ${params[2].trim()}${params.length > 3 ? ',\n  ' + params.slice(3).join(',\n  ') : ''}
);`;
    }
  }
  
  return stmt + ';';
}

function formatDoneCall(stmt) {
  const match = stmt.match(/\$done\((.*)\)/);
  if (match && match[1]) {
    if (match[1].startsWith('{') && match[1].endsWith('}')) {
      return `$done(${formatJSONObject(match[1])});`;
    }
  }
  
  return stmt + ';';
}

function formatFunction(str) {
  // Extract function body
  const parts = str.split('{');
  const functionHeader = parts[0] + '{';
  
  return `${functionHeader}\n  // Function implementation...\n}\n`;
}

function formatInlineFunction(str) {
  return str;
}

function formatReturnStatement(stmt) {
  const parts = stmt.split('return');
  if (parts.length === 2) {
    const returnValue = parts[1].trim();
    if (returnValue.startsWith('{') && returnValue.endsWith('}')) {
      return `  return ${formatJSONObject(returnValue)}\n}`;
    }
  }
  
  return stmt + ';\n}';
}

// Example usage:
// const formattedCode = formatScript(decodedScript);
// console.log(formattedCode);

function recursiveUnpack(code, depth = 0) {
  if (depth > 10) return code;
  console.log(`进行第 ${depth + 1} 层解包...`);

  try {
    let result = unpack(code);
    if (result && result !== code) {
      if (result.includes('eval(')) {
        return recursiveUnpack(result, depth + 1);
      }
      return result;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }

  return code;
}

export default {
  unpack: recursiveUnpack,
  formatCode,
};
