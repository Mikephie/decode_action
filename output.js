//Thu Dec 26 2024 06:43:47 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
function _0x2833a1(_0x15008a) {
  return _0x15008a.replace(/[\/:*?"<>|]/g, "_");
}
async function _0x103968(_0x3bbdfe, _0x5d50bb) {
  try {
    let _0x4b3235 = new Request(_0x3bbdfe);
    let _0x1b1e3d = await _0x4b3235.load();
    const _0x4030f6 = FileManager.iCloud();
    _0x4030f6.write(_0x5d50bb, _0x1b1e3d);
    console.log("✅ 下载成功: " + _0x5d50bb);
  } catch (_0x124f77) {
    console.error("❌ 下载失败: " + _0x124f77.message);
  }
}
async function _0x3f6222() {
  let _0x2ab448 = new Alert();
  _0x2ab448.title = "文件下载";
  _0x2ab448.addTextField("下载链接", "");
  _0x2ab448.addTextField("文件名（可选）", "");
  _0x2ab448.addAction("下载");
  _0x2ab448.addCancelAction("取消");
  let _0x380d83 = await _0x2ab448.presentAlert();
  if (_0x380d83 === -1) {
    console.log("操作已取消");
    return null;
  }
  let _0x3603f3 = _0x2ab448.textFieldValue(0).trim();
  if (!_0x3603f3) {
    console.error("❌ 下载链接不能为空");
    return null;
  }
  let _0x6315b1 = _0x2ab448.textFieldValue(1).trim() || _0x2833a1(_0x3603f3.split("?")[0].split("/").pop());
  return {
    url: _0x3603f3,
    fileName: _0x6315b1
  };
}
async function _0xd21549() {
  let _0x994e6 = await _0x3f6222();
  if (!_0x994e6) {
    return;
  }
  const {
    url: _0x5b0c4f,
    fileName: _0x1264ac
  } = _0x994e6;
  const _0x10af80 = FileManager.iCloud();
  let _0x50cd40 = await DocumentPicker.openFolder();
  if (!_0x50cd40) {
    console.error("❌ 选择文件夹操作取消");
    return;
  }
  let _0x58d79f = _0x10af80.joinPath(_0x50cd40, _0x1264ac);
  await _0x103968(_0x5b0c4f, _0x58d79f);
  let _0x1c7b7f = new Alert();
  _0x1c7b7f.title = "下载成功";
  _0x1c7b7f.message = "文件已保存至 iCloud: " + _0x1264ac;
  _0x1c7b7f.addAction("确定");
  await _0x1c7b7f.presentAlert();
}
await _0xd21549();