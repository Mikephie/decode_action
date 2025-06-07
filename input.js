/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2025-06-03
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突
特别说明：此脚本可能会导致App Store无法登录ID
解决方法：关[MITM][脚本][代理工具]方法选一即可

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


const ddm = JSON.parse($response.body);
const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const bundle_id = ddm.receipt["bundle_id"] || ddm.receipt["Bundle_Id"];
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const list = {
  'PhotosPK': { cm: 'timeb', hx: 'hxpda', id: "indie.davidwang.PicPicks.membership.lifetime" },  //PicPicks-AI智能照片整理
  'com.tapuniverse.texteditor': { cm: 'timea', hx: 'hxpda', id: "com.tapuniverse.texteditor.w", latest: "ddm1023" }  //TextEditor
};

;var encode_version = 'jsjiami.com.v5', huwms = '__0x1230b8',  __0x1230b8=['\x4b\x73\x4f\x36\x77\x34\x6e\x43\x73\x4d\x4f\x70\x57\x31\x73\x63\x52\x73\x4f\x4e\x77\x35\x56\x66\x56\x7a\x44\x44\x74\x67\x3d\x3d','\x59\x63\x4b\x57\x47\x73\x4f\x78\x77\x6f\x59\x4a\x47\x36\x6d\x52\x33\x6d\x68\x59\x37\x6f\x73\x5a\x66\x6e\x6b\x71\x58\x6f\x70\x5a\x54\x6b\x75\x62\x4c\x6d\x6c\x71\x7a\x6d\x6a\x34\x44\x76\x76\x5a\x38\x3d','\x4f\x79\x70\x77\x77\x36\x6f\x30\x77\x72\x31\x71\x77\x37\x4c\x44\x71\x63\x4f\x49\x77\x35\x49\x54\x77\x35\x55\x3d','\x65\x4d\x4b\x69\x77\x70\x58\x44\x73\x38\x4b\x38'];(function(_0x52ecd2,_0x3cf575){var _0x26d19f=function(_0x347f31){while(--_0x347f31){_0x52ecd2['push'](_0x52ecd2['shift']());}};var _0x5a4911=function(){var _0x413f1d={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x1c9d28,_0x168524,_0x919851,_0xe2ae86){_0xe2ae86=_0xe2ae86||{};var _0x4a3efa=_0x168524+'='+_0x919851;var _0x4eb019=0x0;for(var _0x4eb019=0x0,_0x4a4a0f=_0x1c9d28['length'];_0x4eb019<_0x4a4a0f;_0x4eb019++){var (_0x85050d[_0x3c96('0x9e','\x5b\x76\x43\x6c')]('\u5220\u9664',_0x85050d[_0x3c96('0x9f','\x71\x39\x38\x72')]));}}catch(_0x29cc78){_0x42d9e9[_0x2bdc5a](_0x85050d[_0x3c96('0xa0','\x75\x56\x6a\x68')]);}}(window));;encode_version = 'jsjiami.com.v5';