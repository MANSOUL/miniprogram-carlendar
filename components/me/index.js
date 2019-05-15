const { getTimeTrunk, getHost } = require('../../utils/util');
const accountModel = require('../../models/AccountModel');
const UploadTip = require('../../models/UploadTip');

Component({
  data: {
    hasUserInfo: true,
    userInfo: {},
    timeTrunk: getTimeTrunk(),
    totalCount: accountModel.get().length,
    totalDay: accountModel.getTotalDay(accountModel.get()),
    totalMoney: accountModel.getTotalMoney(accountModel.get()),
    uploading: false,
    uploadSuccess: false,
    showUploadTip: UploadTip.get()
  },
  attached() {
    this.onShow();
  },
  ready() {
    this.onReady();
  },
  methods: {
    onShow() {
      this.setData({
        timeTrunk: getTimeTrunk(),
        totalCount: accountModel.get().length,
        totalDay: accountModel.getTotalDay(accountModel.get()),
        totalMoney: accountModel.getTotalMoney(accountModel.get())
      });
    },
    onReady() {
      this.detectSetting();
      this.createChart();
    },
    detectSetting() {
      const that = this;
      wx.getSetting({
        success(res) {
          const authSetting = res.authSetting;
          if (authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success(res) {
                that.setData({
                  userInfo: res.userInfo
                });
              }
            });
          }
          else {
            that.setData({
              hasUserInfo: false
            });
          }
        }
      });
    },
    createChart() {
      const ctx = wx.createCanvasContext('chart__canvas');
      ctx.setFillStyle('red')
      ctx.fillRect(10, 10, 150, 75)
      ctx.draw()
    },
    handleGetUserInfo(e) {
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      });
    },
    handleUploadData() {
      const that = this;
      if (that.data.uploading) {
        return false;
      }
      that.setData({
        uploading: true
      });
      wx.request({
        url: getHost() + '/record',
        method: 'POST',
        data: {
          content: JSON.stringify(accountModel.get())
        },
        header: {
          authorization: wx.getStorageSync('token')
        },
        success(res) {
          const { data, statusCode } = res;
          if (statusCode === 200 && data.success) {
            UploadTip.set(false);
            that.setData({
              uploadSuccess: true,
              uploading: false
            });
            setTimeout(() => {
              that.setData({
                showUploadTip: false
              });
            }, 1000);
          }
          else {
            wx.showToast({
              title: '上传失败',
              icon: 'warn',
              duration: 2000
            });
            that.setData({
              loading: false
            });
          }
        }
      });
    },
    handleDownloadData() {
      const that = this;
      wx.request({
        url: getHost() + '/record',
        method: 'GET',
        header: {
          authorization: wx.getStorageSync('token')
        },
        success(res) {
          const { data, statusCode } = res;
          if (statusCode === 200 && data.success) {
            wx.showToast({
              title: '数据下载成功',
              icon: 'success',
              duration: 2000
            });
            if (data.data.content) {
              accountModel.recoveryData(JSON.parse(data.data.content));
              that.setData({
                totalCount: accountModel.get().length,
                totalDay: accountModel.getTotalDay(accountModel.get()),
                totalMoney: accountModel.getTotalMoney(accountModel.get())
              });
            }
          }
          else {
            wx.showToast({
              title: '数据下载失败',
              icon: 'warn',
              duration: 2000
            });
          }
        }
      });
    }
  }
});