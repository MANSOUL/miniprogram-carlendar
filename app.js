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
  editTabBar () {
    const tabBar = this.globalData.tabBar;
    const currentPages = getCurrentPages();
    const thatPage = currentPages[currentPages.length - 1];
    let pagePath = thatPage.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabBar.list) {
      tabBar.list[i].selected = false;
      (tabBar.list[i].pagePath === pagePath) && (tabBar.list[i].selected = true);
    }
    thatPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    globalUser: null,
    tabBar: {
      color: "#ffffff",
      selectedColor: "#5cb2d3",
      backgroundColor: "#323039",
      list: [{
        pagePath: "/pages/account/index",
        text: "首页",
        iconPath: "../image/account-book.png",
        selectedIconPath: "../image/account-book1.png",
        selected: true
      }, {
        pagePath: "/pages/account/index",
        text: "首页",
        iconPath: "../image/plus.png",
        selectedIconPath: "../image/plus1.png",
        selected: true
      }, {
        pagePath: "/pages/me/index",
        text: "主页",
        iconPath: "../image/me.png",
        selectedIconPath: "../image/me1.png",
        selected: false
      }]
    }
  }
});