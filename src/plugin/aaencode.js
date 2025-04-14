
// Import the plugin
import aaDecodePlugin from './aadecode-plugin';

// Then modify your recursiveUnpack function
function recursiveUnpack(packedCode, depth = 0) {
  if (depth > 10) return packedCode;
  console.log(`进行第 ${depth + 1} 层解包...`);

  try {
    // First check if it's AAEncoded
    if (aaDecodePlugin.AADecodePlugin.detect(packedCode)) {
      const decoded = aaDecodePlugin.AADecodePlugin.decode(packedCode);
      if (decoded && decoded !== packedCode) {
        console.log("AAEncode layer detected and decoded");
        
        // Check if there are more layers to unpack
        if (decoded.includes('eval(') || aaDecodePlugin.AADecodePlugin.detect(decoded)) {
          return recursiveUnpack(decoded, depth + 1);
        }
        return decoded;
      }
    }
    
    // Continue with your existing unpack flow for other types of encoding
    let result = unpack(packedCode); // Your existing unpack function
    if (result && result !== packedCode) {
      if (result.includes('eval(') || aaDecodePlugin.AADecodePlugin.detect(result)) {
        return recursiveUnpack(result, depth + 1);
      }
      return result;
    }
  } catch (e) {
    console.log(`第 ${depth + 1} 层解包失败:`, e);
  }

  return packedCode;
}
