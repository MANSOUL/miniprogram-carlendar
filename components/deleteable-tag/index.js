Component({
  properties: {
    value: {
      type: String
    },
    inspectValue: {
      type: String
    },
    customtap: {
      type: Function
    },
    deletetap: {
      type: Function
    }
  },
  data: {
    deleteVisible: false
  },
  methods: {
    handleTagTap(e) {
      if(e.target.dataset.type === 'delete') {
        this.triggerEvent('deletetap', this.data.value)
        return
      }
      this.setData({
        deleteVisible: false
      })
      this.triggerEvent('customtap', this.data.value)
    },

    handleLongTap() {
      this.setData({
        deleteVisible: true
      })
    }
  }
})