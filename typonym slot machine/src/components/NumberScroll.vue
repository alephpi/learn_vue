<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      numberList: ['0', '0', ',', '0', '0', '0', ',', '0', '0', '0'],
    }
  },
  watch: {
    value(newValue) {
      this.formatNumber(newValue)
      this.increaseNumber(this.time)
    },
  },
  mounted() {
    this.formatNumber(this.value)
    this.increaseNumber(this.time)
  },
  methods: {
    // 定时增长数字
    increaseNumber(time) {
      this.timer = setTimeout(() => {
        this.numberScroll()
      }, time * 1000)
    },
    // 设置文字滚动
    numberScroll() {
      const numbers = this.$refs.numbers
      const numberList = this.numberList.filter(item => !isNaN(item))
      for (let index = 0; index < numbers.length; index++) {
        const element = numbers[index]
        element.style.transform = `translate(0, -${numberList[index] * 10}%)`
      }
    },
    // 给数字加入逗号分隔
    toThousands(number) {
      number = (number || 0).toString()
      let result = ''
      while (number.length > 3) {
        result = `,${number.slice(-3)}${result}`
        number = number.slice(0, number.length - 3)
      }
      if (number)
        result = number + result

      return result
    },
    // 处理传过来的数字
    formatNumber(number) {
      this.numberList = this.toThousands(number).split('')
    },
  },
}
</script>

<template>
  <ul class="number-scroll-container">
    <li
      v-for="(number, index) in numberList"
      :key="index"
      :class="{ 'number-item': !isNaN(number), 'mark-item': isNaN(number) }"
    >
      <template v-if="!isNaN(number)">
        <span ref="numbers">0123456789</span>
      </template>
      <template v-else>
        {{ number }}
      </template>
    </li>
  </ul>
</template>

<style scoped>
.number-scroll-container {
    list-style: none;
    display: flex;
    align-items: center;
    overflow: hidden;
}
.number-scroll-container li {
    writing-mode: vertical-lr;
    text-orientation: upright;
    line-height: 24px;
    height: 40px;
    /*文字禁止编辑*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}
.number-item span {
    position: relative;
    width: 100%;
    writing-mode: vertical-rl;
    letter-spacing: 10px;
    transition: transform 1s ease-in-out;
}
.number-scroll-container .mark-item {
    line-height: 10px;
}
</style>
