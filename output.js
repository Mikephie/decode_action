//Thu May 29 2025 14:19:40 GMT+0000 (Coordinated Universal Time)
//解密脚本在此
/*************************************


>「 注意事项 」         使用此脚本，会导致AppleStore无法切换账户，解决方法[关闭QX切换账户，或关闭MITM，或删除脚本，或去设置媒体与购买项目处切换ID]
>「 额外说明 」         请勿传播或售卖此脚本

[rewrite_local]
^https?:\/\/leancloud\.emotionwp\.com\/.+\/(classes|batch\/save) url script-response-body https://raw.githubusercontent.com/Mike-offers/Rewrite/refs/heads/master/QuantumultX/BiZhi.js

[mitm]
hostname = leancloud.emotionwp.com

*************************************/

执行过程出错: $response is not defined