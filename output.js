//2025-09-03T02:12:26.014Z
//解密脚本在此
if ($request.url.indexOf("/album/queryAlbumTrackRecordsByPage") != -1) {
  var _0x4dc548 = $request.headers;
  _0x4dc548.cookie = "wxh5_18=; wxunionid_18_1_secure=&&; wxopenid_1=; wxopenid_18_1_secure=; wxtime=; wxopenid_=; unionId=; 1&remember_me=y; 1&_token=540501058&99F9E5B0140N4F29679266EAAA3DC5C5D5304D8764A56DAA3F7A7F9488944131EBD2785959DE44M05F0EC5BAF6323F_";
  $done({
    "headers": _0x4dc548
  });
}
if ($request.url.indexOf("/mobile-playpage/track/v3/baseInfo/") != -1) {
  var _0x4dc548 = $request.headers;
  _0x4dc548.cookie = "wxh5_18=; wxunionid_18_1_secure=&&; wxopenid_1=; wxopenid_18_1_secure=; wxtime=; wxopenid_=; unionId=; 1&remember_me=y; 1&_token=540501058&99F9E5B0140N4F29679266EAAA3DC5C5D5304D8764A56DAA3F7A7F9488944131EBD2785959DE44M05F0EC5BAF6323F_";
  $done({
    "headers": _0x4dc548
  });
} else if ($request.url.indexOf("/revision/user/basic") != -1) {
  var _0x448815 = JSON.parse($response.body);
  _0x448815.data.nickName = "https://t.me/GieGie777";
  _0x448815.data.cover = "https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";
  _0x448815.data.isVip = true;
  var _0x37c52f = JSON.stringify(_0x448815);
  $done({
    "body": _0x37c52f
  });
} else if ($request.url.indexOf("/track/queryMPTrackPage/") != -1) {
  var _0x8ab87a = JSON.parse($response.body);
  _0x8ab87a.data.trackDetailInfo.playInfo.userPermission = true;
  _0x8ab87a.data.trackDetailInfo.playInfo.isPaid = true;
  _0x8ab87a.data.trackDetailInfo.playInfo.isFree = true;
  _0x8ab87a.data.trackDetailInfo.trackInfo.isAuthorized = true;
  _0x8ab87a.context.currentUser.isVip = true;
  var _0xefdd86 = JSON.stringify(_0x8ab87a);
  $done({
    "body": _0xefdd86
  });
} else {
  $done({});
}
encode_version = "jsjiami.com.v5";