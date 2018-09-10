const tagModel = require('../models/TagModel')
const accountModel = require('../models/AccountModel')
Page({
  data: {
    year: '',
    month: '',
    date: '',
    money: 0,
    tag: '',
    newTag: '',
    newTagActive: false,
    inputTagShow: false,
    tags: [],
    buttonColors: ['#bbb', '#fa8080'],
    buttonIndex: 0
  },

  onLoad(query) {
    let {year, month, date} = query
    this.setData({
      year, 
      month, 
      date,
      tags: tagModel.get()
    })
  },

  handleTagTap(e) {
    this.setData({
      tag: e.detail
    }, () => {
      this.switchButtonState()
    })
  },

  handleTagDelete(e) {
    console.log(e)
    // 删除tag
    let detailTag = e.detail
    tagModel.remove(detailTag)
    console.log(tagModel.get())
    this.setData({
      tags: tagModel.get(),
      tag: this.data.tag === detailTag ? '' : this.data.tag,
      newTag: '',
      newTagActive: false,
      inputTagShow: false
    })
  },

  handleNewTagTap(e) {
    if (!this.data.inputTagShow) {
      this.setData({
        inputTagShow: true
      })
      return 
    }
    // 
    if (!this.data.newTagActive) {
      return false
    }
    // 新标签是否已存在
    if (tagModel.exists(this.data.newTag)) {
      wx.showToast({
        title: '标签已存在',
        icon: 'none'
      })
      return
    }

    // 添加新tag
    tagModel.add(this.data.newTag)
    this.setData({
      tags: tagModel.get(),
      newTag: '',
      newTagActive: false,
      inputTagShow: false
    })
  },

  handleInput(e) {
    this.setData({
      money: e.detail.value
    }, () => {
      this.switchButtonState()
    })
  },

  handleTagInput(e) {
    let value = e.detail.value.trim()
    let newData = {
        newTag: value
    }
    if (value.length > 0) {
      newData.newTagActive = true
    }
    else {
      newData.newTagActive = false
    }
    this.setData(newData)
  },

  handleSaveItem() {
    if (this.data.buttonIndex !== 1) {
      return
    }
    let {year, month, date} = this.data
    accountModel.add(this.data.money, this.data.tag, {
      year,month,date
    })
    wx.showToast({title: '保存成功'})
    this.setData({
      money: 0,
      tag: '',
      buttonIndex: 0
    })
    wx.navigateBack()
  },

  switchButtonState() {
    if (this.data.money > 0 && this.data.tag !== '') {
      this.setData({
        buttonIndex: 1
      })
    }
    else {
      this.setData({
        buttonIndex: 0
      })
    }
  }
})
