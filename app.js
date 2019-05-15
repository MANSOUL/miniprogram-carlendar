const { getHost } = require('./utils/util');

App({
  login() {
    wx.login({
      success(res) {
        if (res.code) {
          // 获取code，通过code置换openid和session_key
          wx.request({
            url: getHost() + '/wxlogin',
            method: 'POST',
            data: {
              code: res.code
            },
            success(res) {
              const {
                data,
                statusCode
              } = res;
              if (statusCode === 200 && data.success) {
                wx.setStorage({
                  key: 'token',
                  data: data.token
                });
              }
            }
          });
        }
      }
    });
  },
  onLaunch: function () {
    const that = this;
    if (!wx.getStorageSync('token')) {
      that.login();
    }
    else {
      wx.checkSession({
        success() {
          wx.getSetting({
            success(res) {
              const authSetting = res.authSetting;
              if (authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success(res) {
                    that.globalData.globalUser = res.userInfo;
                  }
                });
              }
            }
          });
        },
        fail() {
          that.login();
        }
      });
    }
  },
  globalData: {
    globalUser: null
  }
});