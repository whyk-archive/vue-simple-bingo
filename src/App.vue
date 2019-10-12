<template>
  <div id="app" class="bingo">
    <h1 class="bingo__title">BINGO!!!!</h1>

    <button class="bingo__btn" v-if="lotteryComplete" v-on:click="reset">Reset( ˘ω˘)</button>
    <button class="bingo__btn" v-else v-on:click="lottery">Select Start!!</button>

    <span class="bingo__answer">{{ outputNum }}</span>

    <ul id="bingo-num" class="bingo-num-list">
      <li v-bind:id="`num-${n}`" class="bingo-num-list__item" data-bg-color="white" v-for="n in 75" :key="n">{{ n }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  buttonText: string = 'Start!!';
  outputNum: string | number = 'Ready...';
  count: number = 0
  countMaxNum: number = 75
  lotteryComplete: boolean = false

  selectNum(): void | Element | null {
      const lotteryNum = Math.floor(Math.random() * Math.floor(this.countMaxNum) + 1);
      this.outputNum = lotteryNum;
      const selectNumElm = document.querySelector(`#num-${lotteryNum}`);
      const selectNumElmBackground = selectNumElm.getAttribute('data-bg-color');
      if(selectNumElmBackground === 'white') {
        return selectNumElm;
      } else {
        return this.selectNum();
      };
    };
    lottery(): void {
      this.selectNum().setAttribute('data-bg-color', 'black');
      this.count++;
      if(this.count === 75) {
        this.lotteryComplete = true;
        this.outputNum = 'Finish!!';
      }
    };
    reset(): void {
      this.lotteryComplete = false;
      this.count = 0;
      this.outputNum = 'Ready...';
      document.querySelectorAll('#bingo-num li').forEach((elm) => {
        elm.setAttribute('data-bg-color', 'white');
      })
    }
}
</script>

<style lang="scss">
html {
  font-size: 62.5%;
}

.bingo__btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 3rem;
  background: #666;
  padding: 20px 0;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  color: #fff;
  display: block;
  border-radius: 5px;
}

.bingo__answer {
  display: block;
  font-size: 5rem;
  background-color: #333;
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  padding: 50px;
  text-align: center;
  color: #fff;
}

.bingo-num-list {
  list-style: none;
  padding-left: 0;
}

.bingo-num-list__item {
  font-size: 1.8rem;
  display: inline-block;
  padding: 10px;
}

[data-bg-color="white"] {
  background-color: #fff;
  color: #000;
}

[data-bg-color="black"] {
  background-color: #000;
  color: #fff;
}
</style>
