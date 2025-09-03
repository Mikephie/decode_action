//2025-09-03T12:56:25.919Z
//解密脚本在此
var Mike = JSON.parse($response.body);
Mike.payload.active = true;
$done({
  "body": JSON.stringify(Mike)
});