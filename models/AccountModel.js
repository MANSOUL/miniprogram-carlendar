const KEY = 'every_account_list'
function idGenerator() {
  return Date.now() + ''
}

function fillZero(n) {
  return n > 9 ? n : '0' + n
}

function getToday(dateObj = {}) {
  let date = new Date()
  let dateString = ''
  let hourString = fillZero(date.getHours()) + ':' + fillZero(date.getMinutes())
  if (!dateObj.year) {
    dateString = date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate())
  }
  else {
    dateString =  dateObj.year + '-' + dateObj.month + '-' + dateObj.date
  }
  return dateString + ' ' + hourString
}

class AccountModel {
  constructor() {
    this.lists = []
    this._getTagsFromStorage()
  }

  _getTagsFromStorage() {
    this.lists = wx.getStorageSync(KEY) || []
  }

  _saveTagsToStorage() {
    wx.setStorageSync(KEY, this.lists)
  }

  _filterLists(lists, date) {
    return lists.filter(item => {
      item.dateHourString = item.date.split(' ')[1]
      return item.date.indexOf(date) > -1
    })
  }

  get() {
    return this.lists
  }

  getListByDate(date) {
    this._getTagsFromStorage()
    return this._filterLists(this.lists, date)
  }

  add(money, tag, dateObj) {
    let item = {
      id: idGenerator(),
      date: getToday(dateObj),
      money,
      tag
    }
    this.lists.push(item)
    this._saveTagsToStorage()
  }

  remove(id) {
    let index = -1
    let i = 0
    let item = null
    for (i = 0; i < this.lists.length; i++) {
      item = this.lists[i]
      if (item.id === id) {
        index = i
        break
      }
    }
    this.lists.splice(index, -1)
    this._saveTagsToStorage()
  }
}

module.exports = new AccountModel()