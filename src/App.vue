<template>
  <div id="app" class="bingo">
    <h1 class="bingo__title">BINGO!!!!</h1>
    <button class="bingo__btn" v-if="complate" @click="reset">Reset( ˘ω˘)</button>
    <button class="bingo__btn" v-else @click="lottery">Select Start!!</button>
    <span class="bingo__answer">
      <template v-if="output === 0">Ready...</template>
      <template v-else-if="complate">Finish!!</template>
      <template v-else>{{ output }}</template>
    </span>
    <ul id="bingo-num" class="bingo-num-list">
      <li
        :class="['bingo-num-list__item', {'is-selected': bool}]"
        v-for="(bool, index) in list"
        :key="index">
        {{ index + 1 }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data () {
    return {
      max: 75,
      count: 0,
      list: [false],
      winList: [0],
      output: 0,
      complate: false
    }
  },
  mounted () {
    this.list = Array(this.max).fill(false)
  },
  methods: {
    selectNum (): number {
      const randNum = Math.floor(Math.random() * Math.floor(this.max) + 1)
      if (this.winList.includes(randNum)) return this.selectNum()
      else return randNum
    },
    lottery () {
      const winNum = this.selectNum()
      this.output = winNum
      this.winList.push(winNum)
      this.list.splice(winNum - 1, 1, true)
      this.count++
      if (this.count === this.max) this.complate = true
    },
    reset () {
      this.count = 0
      this.list = Array(this.max).fill(false)
      this.output = 0
      this.complate = false
    }
  }
})
</script>

<style lang="scss">
html {
  font-size: 62.5%;
}

.bingo {
  max-width: 1000px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
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
  &.is-selected {
    background-color: #000;
    color: #fff;
  }
}
</style>
