let canvasHeight = 50;
const MIN_HEIGHT = 10;
const LINE_WIDTH = 4;
const HALF_LINE_WIDTH = LINE_WIDTH / 2;
const LINE_GAP = 6;

function createLinearLine(ctx, index) {
  const grd = ctx.createLinearGradient(0, 0, 0, 40);
  grd.addColorStop(0, '#2ebf73');
  grd.addColorStop(1, '#5cb2d3');

  const x = HALF_LINE_WIDTH + (LINE_WIDTH + LINE_GAP) * index;
  const h = MIN_HEIGHT + Math.floor(Math.random() * 30) + LINE_WIDTH;
  const y = (canvasHeight - h) / 2;
  // console.log(h, y)
  ctx.setStrokeStyle(grd);
  // ctx.beginPath();
  ctx.setLineCap('round');
  ctx.setLineWidth(LINE_WIDTH);
  ctx.moveTo(x, y);
  ctx.lineTo(x, h + y);
  // ctx.closePath();
  // ctx.stroke();
  // ctx.draw();
}


Component({
  properties: {
    url: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    musician: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    }
  },
  data: {
    play: false,
    percent: '0%'
  },
  methods: {
    draw() {
      this.ctx = wx.createCanvasContext('beats__canvas', this);
      setInterval(() => this.animte(), 300);
      this.animte();
    },
    animte() {
      this.ctx.clearRect(0, 0, 138, 50);
      for (let index = 0; index < 32; index++) {
        createLinearLine(this.ctx, index); 
      }
      this.ctx.stroke();
      this.ctx.draw();
    },
    play() {
      if (!this.data.url) {
        return false;
      }
      this.audioContext = wx.createInnerAudioContext();
      this.audioContext.src = this.data.url;
      this.audioContext.onCanplay(() => {
        console.log(`duration: ${this.audioContext.duration}`)
      });
      this.audioContext.onTimeUpdate(() => {
        console.log(`timeupdate duration: ${this.audioContext.duration}`)
        console.log(`currentTime: ${this.audioContext.currentTime}`)
        this.setData({
          percent: this.audioContext.currentTime / this.audioContext.duration * 100 + '%'
        })
      });
      this.audioContext.onPlay(() => {
        console.log(`play duration: ${this.audioContext.duration}`)
        this.setData({
          play: true
        });
      });
      this.audioContext.onPause(() => {
        this.setData({
          play: false
        })
      });
      this.audioContext.play();
    },
    pause() {
      this.audioContext.pause();
    },
    handleTap() {
      if (this.data.play) {
        this.pause();
      }
      else {
        if (this.audioContext) {
          this.audioContext.play();
        }
        else {
          this.play();
        }
      }
    }
  },
  created() {
  },
  attached() {
    // this.draw();
  },
  detached() {
    this.audioContext && this.audioContext.stop();
  },
  ready() {
    console.log(0)
    wx.getSystemInfo({success: info => console.log(info)})
  }
});