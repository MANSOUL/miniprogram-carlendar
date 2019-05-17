let charBarHeight = 0;
let charBarOffTop = 0;
let tagTopArr = [];

const data = {};
for (let index = 97; index < 123; index++) {
  const c = String.fromCharCode(index);
  const arr = [];
  for (let i = 0; i < (2 + Math.floor(Math.random() * 8)); i++) {
    arr.push(`${c}${Math.floor(Math.random() * 1000)}`);
  }
  data[c] = arr;
}

Component({
  properties: {
    data: {
      type: Object,
      value: data
    },
    chars: {
      type: Array,
      value: Object.keys(data)
    }
  },
  data: {
    scrollTop: 0,
    currentIndex: -1
  },
  ready() {
    this.getBoundingRect('#char__bar', res => {
      charBarOffTop = res.top;
      charBarHeight = res.height;
    });
    this.data.chars.forEach(c => {
      this.getBoundingRect(`#tag-${c}`, res => {
        tagTopArr.push(res.top);
      });
    });
  },
  methods: {
    getBoundingRect(id, fn) {
      const q = this.createSelectorQuery();
      const $bar = q.select(id);
      $bar.boundingClientRect(fn);
      q.exec();
    },
    handleTouchStart(e) {
      this.move(e.touches[0]);
    },
    handleTouchMove(e) {
      this.move(e.changedTouches[0]);
    },
    handleTouchEnd(e) {
      // this.move(e.changedTouches[0]);
      this.setData({
        currentIndex: -1
      });
    },
    move(t) {
      const len = this.data.chars.length;
      const clientY = t.clientY;
      const rY = clientY - charBarOffTop;
      let index = Math.floor(rY / (charBarHeight / len));
      index = index < 0 ? 0 : index;
      index = index >= len ? len - 1 : index;
      this.scroll(index);
    },
    scroll(index) {
      this.setData({
        scrollTop: tagTopArr[index],
        currentIndex: index
      });
    }
  }
});