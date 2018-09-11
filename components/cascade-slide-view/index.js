/**
 * view上向左滑动，出现操作项
 */
const OP_WIDTH = 70
const CRITICAL_RATE = 0.1
Component({
  properties: {
    ops: {
      type: Array,
      value: ['操作1', '操作2']
    },
    optap: {
      type: Function
    },
    height: {
      type: Number,
      value: 120
    }
  },
  data: {
    upperStyle: ''
  },
  methods: {
    handleTouchStart(e) {
      if (this.opend) {
        return
      }
      this.prevPageX = e.touches[0].pageX
    },
    handleTouchMove(e) {
      if (this.opend) {
        return
      }
      let pageX = e.changedTouches[0].pageX
      let x = pageX - this.prevPageX
      this.translateX += x
      // 向右滑动，不处理
      if (this.translateX > 0) {
        return
      }
      this.setData({
        upperStyle: `transform: translateX(${this.translateX}px); transition-duration: 0ms;`
      })
      this.prevPageX = pageX
    },
    handleTouchEnd(e) {
      // 已打开，直接关闭
      if (this.opend) {
        this.translateX = 0
        this.opend = false
      }
      else {
        if (this.translateX < -this.CRITICAL_WIDTH) {
          this.translateX = -this.OP_FULLWIDTH
          this.opend = true
        }
        else {
          this.translateX = 0
          this.opend = false
        }
      }
      this.setData({
        upperStyle: `transform: translateX(${this.translateX}px); transition-duration: 300ms;`
      })
    },
    handleOpTap(e) {
      let optype = e.currentTarget.dataset.op
      this.triggerEvent('optap', {
        op: optype
      })
    },
    getOpWidth() {
      // BUG，本想使用rpx，宽度动态获取，结果下面代码没用，无奈使用px
      // wx.createSelectorQuery().select('#op-wrapper')
      // .boundingClientRect(function(rect){
      // }).exec()
    }
  },
  created() {
    this.prevPageX = 0
    this.translateX = 0
    this.opend = false
    this.OP_FULLWIDTH = OP_WIDTH * this.data.ops.length
    this.CRITICAL_WIDTH = this.OP_FULLWIDTH * CRITICAL_RATE
  },
  ready() {

  }
})