import Carlendar from './Carlendar'
const carlendar = new Carlendar()
const WINDOW_WIDTH = wx.getSystemInfoSync().windowWidth  
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    monthchange: {
      type: Function
    },
    datechange: {
      type: Function
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    translaterStyle: '',
    prevDates: [],
    currentDates: [],
    nextDates: [],
    year: 0,
    month: 0,
    today: 0,
    originYear: 0,
    originMonth: 0,
    selectedDate: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    triggerDateChange(year, month, date) {
      // 触发日期变化
      this.triggerEvent('datechange', {
        year,
        month,
        date,
        text: year+'年'+month+'月'+date+'日'
      })
    },
    handleCarlendarTap(e) {
      let target = e.target
      let date = target.dataset.date
      if (!date) {
        return
      }
      this.setData({
        selectedDate: date
      })
      let year = this.data.year
      let month = this.data.month + 1
      // 触发日期变化
      this.triggerDateChange(year, month, date)
    },
    handleTouchStart(e) {
      let touch = e.touches[0]
      this.prevPageX = this.touchStartX = touch.pageX
    },
    handleTouchMove(e) {
      let touch = e.changedTouches[0]
      let curPageX = touch.pageX
      let offsetX = curPageX - this.prevPageX
      let percentX = offsetX / WINDOW_WIDTH
      this.translate += (percentX * 100)
      this.prevPageX = curPageX
      if (offsetX > 0) { // prev
        this.dir = 'prev'
      }
      else { // next
        this.dir = 'next'
      }
      this.setData({
        translaterStyle: `transform: translateX(${this.translate}%);transition-duration: 0ms;`
      })
    },
    handleTouchEnd(e) {
      if (Math.abs(e.changedTouches[0].pageX - this.touchStartX) < 15) {
        return
      }
      if (this.dir === 'prev') {
        this.translate = 0
      }
      else {
        this.translate = -200
      }
      this.setData({
        translaterStyle: `transform: translateX(${this.translate}%);`
      })
    },
    handleTransitionEnd() {
      let offIndex = 0
      if (this.translate === -200) { // prev
        offIndex = 1
      }
      else if(this.translate === 0) { // next
        offIndex = -1
      }
      // this.setData({
      //   translaterStyle: `transform: translateX(-100%); transition-duration: 0ms;`
      // })
      this.translate = -100
      this.setDateDatas(offIndex)
    },
    setDateDatas(offset, firstEnter) {
      if (firstEnter) {
        this.fillData(offset)
      }
      else {
        // 为了防抖
        let currentDates = null
        if (offset === 1) {
          currentDates = this.data.nextDates
        }
        else {
          currentDates = this.data.prevDates
        }
        this.setData({
          currentDates
        }, () => {
          this.fillData(offset, `transform: translateX(-100%); transition-duration: 0ms;`)
        })
      }
    },

    fillData(offset, translaterStyle = null) {
      let dayObj = carlendar.getDays(offset)
      let year = carlendar.getYear()
      let month = carlendar.getMonth()
      let originYear = carlendar.getOriginYear()
      let originMonth = carlendar.getOriginMonth()
      let today = carlendar.getToday()
      this.setData({
        prevDates: dayObj.prev,
        currentDates: dayObj.current,
        nextDates: dayObj.next,
        year: year,
        month: month,
        today: today,
        // 月份改变，默认选中第一天
        selectedDate: (month === originMonth && year === originYear ? today : 1),
        originYear: originYear,
        originMonth: originMonth,
        translaterStyle
      }, () => {
        // triggle month change
        let year = this.data.year
        let month = this.data.month + 1
        let date = this.data.selectedDate
        this.triggerEvent('monthchange', {
          year,
          month,
          text: year+'年'+month+'月'
        })
        this.triggerDateChange(year, month, date)
      })
    }
  },

  created() {
    this.dir = ''
    this.prevPageX = 0
    this.touchStartX = 0
    this.translate = -100
    this.isTap = false
  },

  attached() {
    this.setDateDatas(0, true)
  }
})
