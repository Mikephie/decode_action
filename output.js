//2025-06-08T02:18:34.960Z
//解密脚本在此
const isPodcastPath = $request.url.indexOf("/podcast/") !== -1;
if (isPodcastPath) {
  const headers = Object.fromEntries(Object.entries($request.headers).map(([_0x98d3f3, _0x2dfa39]) => [_0x98d3f3.toLowerCase(), _0x2dfa39]));
  Object.assign(headers, {
    "cookie": "_pk_id.19.7c98=10f8e42dcc7f9af6.1749286043.1.1749286492.1749286043.; _pk_ses.19.7c98=1; nav_switch=booklist; PHPSESSID=jpbm62hvbgg0l2p8606tedh786"
  });
  $done({
    "headers": headers
  });
} else {
  $done({});
}
encode_version = "jsjiami.com.v5";