const KEY = 'every_account_tag'
class TagModel {
  constructor() {
    this.tags = []
    this._getTagsFromStorage()
  }

  _getTagsFromStorage() {
    this.tags = wx.getStorageSync(KEY) || []
  }

  _saveTagsToStorage() {
    wx.setStorageSync(KEY, this.tags)
  }

  get() {
    return this.tags
  }

  add(val) {
    this.tags.push(val)
    this._saveTagsToStorage()
  }

  exists(tag) {
    return this.tags.includes(tag)
  }

  remove(val) {
    let index = this.tags.indexOf(val)
    this.tags.splice(index, 1)
    this._saveTagsToStorage()
    // this._getTagsFromStorage()
  }
}

module.exports = new TagModel()