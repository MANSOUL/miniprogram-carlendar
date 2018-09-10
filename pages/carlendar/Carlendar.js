class Carlendar {
  constructor() {
    var date = new Date()
    this.originYear = this.year = date.getFullYear()
    this.originMonth = this.month = date.getMonth()
    this.day = date.getDay()
    this.dateDay = date.getDate()
    this.prevDays = []
    this.currentDays = []
    this.nextDays = []
  }

  getDays(monthOffset) {
    this.month += monthOffset
    if (this.month === 12) {
      this.year += 1
      this.month = 0
    }
    else if(this.month === -1) {
      this.year -= 1
      this.month = 11
    }
    this.prevDays = this.getMonthView(this.year, this.month - 1, this.dateDay)
    this.currentDays = this.getMonthView(this.year, this.month, this.dateDay)
    this.nextDays = this.getMonthView(this.year, this.month + 1, this.dateDay)
    return {
      prev: this.prevDays,
      current: this.currentDays,
      next: this.nextDays
    }
  }

  getFullMonth() {
    let month = this.month + 1
    return this.year + '年' + (month > 9 ? month : '0' + month) + '月'
  }

  getYear() {
    return this.year
  }

  getOriginYear() {
    return this.originYear
  }

  getMonth() {
    return this.month
  }

  getOriginMonth() {
    return this.originMonth
  }

  getToday() {
    return this.dateDay
  }

  getMonthView(year, month, date) {
    let nextMonthStart = new Date(year, month + 1, 0) // 下个月的开始，本月最后一天
    let prevMonthEnd = new Date(year, month, 1) // 本月第一天
    let fullDays = nextMonthStart.getDate()
    let beginWeekDay = prevMonthEnd.getDay()
    return this.fillDay(fullDays, beginWeekDay, date)
  }

  fillDay(fullDays, firstday, today) {
    let html = ''
    let arr = []
    let rowArr = []
    let day = 1
    for (let i = 0; i < fullDays + firstday; i++) {
      if ((i + 1) % 7 === 1) {
        rowArr = []
      }
      if (i + 1 > firstday) {
        rowArr.push(day)
        day++
      } else {
        rowArr.push('')
      }
      if ((i + 1) % 7 === 0 || day - 1 === fullDays) {
        arr.push(rowArr)
      }
    }
    // 最后一行
    rowArr = arr[arr.length - 1]
    let fillLen = 7 - rowArr.length
    for (let j = 0; j < fillLen; j++) {
      rowArr.push('')
    }
    return arr
  }
}

export default Carlendar