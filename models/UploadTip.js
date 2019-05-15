/**
 * 判断是否有需要上传的数据
 */
const KEY = 'upload_tip_key';

function get() {
  if (wx.getStorageSync(KEY) === false) {
    return false
  }
  return true;
}

function set(t) {
  wx.setStorageSync(KEY, t);
}

module.exports = {
  get,
  set
};