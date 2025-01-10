var ddm = JSON.parse($response.body);
const expireAt = "2099-09-09 09:09:09";
function calculateDaysToEnd(_0xc9e12e) {
  const _0x56d245 = new Date(_0xc9e12e.replace(" ", "T"));
  const _0x5a168f = new Date();
  const _0x4c9bcd = _0x56d245 - _0x5a168f;
  return _0x4c9bcd > 0 ? Math.ceil(_0x4c9bcd / 86400000) : 0;
}
const daysLeft = calculateDaysToEnd(expireAt);
if (/getUserData/.test($request.url)) {
  Object.assign(ddm.data.data, {
    vip: {
      is_open_vip: 2,
      is_vip: 2
    },
    headPortraitPath: "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
    buy_num: "1",
    reg_date: "2024-01-23",
    nickName: "叮当猫の分享频道"
  });
}
if (/pay\/home/.test($request.url)) {
  Object.assign(ddm.data.user, {
    expireDate: expireAt,
    img: "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
    nickname: "叮当猫の分享频道",
    isVip: "2"
  });
}
if (/home\/getUser/.test($request.url)) {
  ddm.data.nickName = "叮当猫の分享频道";
  ddm.data.img = "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png";
  Object.assign(ddm.data.vip, {
    first_time: "2024-01-23",
    expired_day: "0",
    subTitle: "",
    isVip: 2,
    vipState: "2",
    maturity_time: "2099-09-09",
    color: "#866100",
    level: "2",
    title: "我的会员",
    titleColor: "#866100",
    last_time: "2024-01-23",
    text: "2099-09-09到期",
    xiangdou: 9999,
    maturity_day: "" + daysLeft
  });
}
if (/user\/info/.test($request.url)) {
  Object.assign(ddm.data, {
    nickName: "叮当猫の分享频道",
    img: "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
    vipInfo: {
      isVip: "2",
      url: "xiangha://welcome?VipWebView.app?url=https://appweb.xiangha.com/vip/myvip?payset=2&fullScreen=2&vipFrom=我的页面会员续费按钮",
      vipState: "4"
    }
  });
}
if (/(dish|school)/.test($request.url)) {
  const Params = {
    is_open_vip: 2,
    is_vip: 2,
    isBuy: "2",
    isCollection: 2,
    status: true,
    isShow: "2",
    isVideo: "2",
    isVip: "2"
  };
  searchAndModify(ddm, Params);
}
$done({
  body: JSON.stringify(ddm)
});