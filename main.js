const vue = new Vue ({
  el: "#app",
  data: {
    buttonText: 'Start!!',
    outputNum: 'Ready...',
    count: 0,
    countMaxNum: 75,
    lotteryComplete: false
  },
  methods: {
    selectNum: function() {
      const lotteryNum = Math.floor(Math.random() * Math.floor(this.countMaxNum) + 1);
      this.outputNum = lotteryNum;
      const selectNumElm = document.querySelector(`#num-${lotteryNum}`);
      const selectNumElmBackground = selectNumElm.getAttribute('data-bg-color');
      if(selectNumElmBackground === 'white') {
        return selectNumElm;
      } else {
        return this.selectNum();
      };
    },
    lottery: function() {
      this.selectNum().setAttribute('data-bg-color', 'black');
      this.count++;

      if(this.count === 75) {
        this.lotteryComplete = true;
        this.outputNum = 'Finish!!';
      }
    },
    reset: function() {
      this.lotteryComplete = false;
      this.count = 0;
      this.outputNum = 'Ready...';
      document.querySelectorAll('#bingo-num li').forEach((elm) => {
        elm.setAttribute('data-bg-color', 'white');
      })
    }
  }
})