// pages/account/index.js
const util = require('../../utils/util')
const accountModel = require('../../models/AccountModel')
function getTotalMoney(list) {
  let total = 0
  for (let i = 0; i < list.length; i++) {
    total += Number(list[i].money)
  }
  return total
}

Page({
  data: {
    year: '',
    month: '',
    date: '',
    total: 0,
    spendList: [],
    ops: ['操作', '删除']
  },

  onLoad() {
  },

  onShow() {
    let {year, month, date} = this.data
    if (year !== '') {
      this.getDateList(year, month, date)
    }
  },

  getDateList(year, month, date) {
    let spendList = accountModel.getListByDate(`${year}-${month}-${date}`)
    let total = getTotalMoney(spendList)
    this.setData({
      year,
      month, 
      date,
      spendList,
      total
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
    console.log(e.detail)
  }
})
