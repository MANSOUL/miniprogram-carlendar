// pages/account/index.js
const util = require('../../utils/util');
const accountModel = require('../../models/AccountModel');
const UploadTip = require('../../models/UploadTip');

Component({
  data: {
    year: '',
    month: '',
    date: '',
    total: 0,
    spendList: [],
    ops: ['删除'],
    monthTotal: 0
  },
  ready() {
    this.refresh();
  },
  methods: {
    onShow() {
      this.refresh();
    },
    refresh() {
      let {year, month, date} = this.data
      if (year !== '') {
        this.getDateList(year, month, date)
        this.getMonthList(year, month)
      }
    },
    getDateList(year, month, date) {
      let spendList = accountModel.getListByDate(`${year}-${month}-${date}`)
      let total = accountModel.getTotalMoney(spendList)
      this.setData({
        year,
        month, 
        date,
        spendList,
        total
      })
    },
    getMonthList(year, month) {
      let spendList = accountModel.getListByDate(`${year}-${month}`)
      let monthTotal = accountModel.getTotalMoney(spendList)
      this.setData({
        monthTotal
      })
    },
    handleMonthChange(e) {
      this.setTitle(e.detail.text)
    },
    handleDateChange(e) {
      let {year, month, date} = e.detail
      year = util.formatNumber(year)
      month = util.formatNumber(month)
      date = util.formatNumber(date)
      this.getDateList(year, month, date)
      if (year !== this.data.year || month !== this.month) {
        this.getMonthList(year, month)
      }
    },
    handleAddTap() {
      let {year, month, date} = this.data
      let query = `year=${year}&month=${month}&date=${date}`
      wx.navigateTo({
        url: '/pages/add/index?'+query
      })
    },
    setTitle(title) {
      wx.setNavigationBarTitle({
        title
      })
    },
    handleViewOpTap(e) {
      const op = e.detail.op
      const id = e.detail.identity
      if (op === '删除') {
        accountModel.remove(id)
        this.getDateList(this.data.year, this.data.month, this.data.date)
        this.getMonthList(this.data.year, this.data.month)
        UploadTip.set(true);
      }
    }
  }
});
