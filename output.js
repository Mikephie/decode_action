//2025-06-07T12:10:28.770Z
//解密脚本在此
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

;var encode_version = 'jsjiami.com.arr', huwms = '__0x1230b8',  __0x1230b8=['\list\items\collection\data\result\response\request\payload\items\body\collection\content\obj\arr\items\list\collection\items\collection\handler\result\callback\list\parser\list\validator\callback\callback\manager\service\controller\controller','\helper\list\list\obj\utils\items\collection\config\result\flag\helper\status\utils\data\state\collection\condition\state\flag\helper\setting\flag\items\param\parser\request\index\option\setting\flag\content\param\size\index\index\temp\buffer\state\size\option\validator\state\total\response\callback\temp\temp\param\buffer\controller','\collection\url\content\result\result\data\flag\path\result\type\arr\option\result\setting\buffer\callback\option\list\collection\text\result\callback\text\size\result\callback\message\controller','\path\body\list\file\result\content\setting\callback\items\buffer\list\buffer'];(function(text,message){var error=function(success){while(--success){text['push'](text['shift']());}};var info=function(){var warning={'data':{'key':'cookie','value':'timeout'},'setCookie':function(debug,log,trace,obj1){obj1=obj1||{};var config1=log+'='+trace;var items1=0x0;for(var items1=0x0,collection1=debug['length'];items1<collection1;items1++){var (data1[result1('0x9e','\response1\temp\payload\size')]('\request1\payload1',data1[result1('0x9f','\option\body1\buffer\type')]));}}catch(content1){value1[item1](data1[result1('0xa0','\index\list\total\flag')]);}}(window));;encode_version = 'jsjiami.com.arr';