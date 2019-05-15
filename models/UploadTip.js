/**
 * 判断是否有需要上传的数据
 */
const KEY = 'upload_tip_key';

function get() {
  return wx.getStorageSync(KEY) || true;
}

function set(t) {
  wx.setStorageSync(KEY, t);
}

module.exports = {
  get,
  set
};