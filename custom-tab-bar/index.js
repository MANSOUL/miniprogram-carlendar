Component({
  properties: {
    config: {
      type: Object,
      value: {
        list: []
      }
    },
    tapchange: {
      type: Function
    },
    tabIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    handleTap(e) {
      const index = e.target.dataset.index;
      // wx.redirectTo({
      //   url: this.data.config.list[index].pagePath
      // });
      this.triggerEvent('tapchange', {
        index
      });
    }
  },
  created() {
  },
  attached() {
  },
});