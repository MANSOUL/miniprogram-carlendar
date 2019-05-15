const app = getApp();

Page({
  data: {
    tabBar: app.globalData.tabBar,
    tabIndex: 0
  },
  handleTabChange(e) {
    this.setData({
      tabIndex: e.detail.index
    });
  },
  onShow() {
    const pageAccount = this.selectComponent('#page-account');
    const pageMe = this.selectComponent('#page-me');
    pageAccount.onShow();
    pageMe.onShow();
  },
  onReady() {
    const pageMe = this.selectComponent('#page-me');
    pageMe.onReady();
  }
});
