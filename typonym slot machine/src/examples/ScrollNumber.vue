<script>
/**
 * ScrollNumber
 * @prop {number|string} value input number value
 * @prop {Boolean} numberOnly whether allow number input only
 * @prop {number} transitionTime animation transition time
 * @prop {object} itemStyle css style of each number item
 *
 * @member {Promise<number>} process a promise instance of animation process
 * @method changeTo(value):Promise trigger to change the value
 *
 * @event change(value) emit when animation done
 */
import { getOptions } from '../options'
import ScrollNumberItem, { DIRECTIONS } from './ScrollNumberItem.vue'

const isNumber = val => !Number.isNaN(+val)

export default {
  name: 'ScrollNumber',
  components: {
    ScrollNumberItem,
  },
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    numberOnly: {
      type: Boolean,
      default: () => getOptions().numberOnly,
    },
    transitionTime: {
      type: Number,
      default: () => getOptions().transitionTime,
    },
    itemStyle: Object,
  },
  emits: ['change'],
  data() {
    return {
      innerValue: this.value,
      isNumber,
      direction: DIRECTIONS.FORWARD,

      process: Promise.resolve(),
    }
  },
  computed: {
    numbers() {
      return this.getNumbers(this.innerValue)
    },
  },
  watch: {
    value(newV) {
      this.changeTo(newV)
    },
    innerValue(newV, oldV) {
      let compareFn
      if (isNumber(this.value))
        compareFn = (a, b) => Math.abs(newV) > Math.abs(oldV)

      else
        compareFn = (a, b) => newV > oldV

      if (compareFn(newV, oldV))
        this.direction = DIRECTIONS.FORWARD

      else
        this.direction = DIRECTIONS.BACKWARDG
    },
  },
  mounted() {
    this.changeTo(this.innerValue)
  },
  methods: {
    changeTo(value) {
      if (this.numberOnly && !isNumber(value)) {
        console.warn('[vue-scroll-number]: You can only change value to a number')
        return Promise.reject()
      }
      this.process = this.process.then(() => {
        return new Promise((resolve) => {
          this.innerValue = value
          setTimeout(() => {
            const promises = this.getNumbers(value)
              .filter(isNumber)
              .map((item, index) => {
                const scrollItem = this.$refs.scrollItem[index]
                if (scrollItem)
                  return scrollItem.changeTo(item)

                else
                  return Promise.resolve()
              })
            resolve(
              Promise.all(promises)
                .then(() => (this.$emit('change', value), value)),
            )
          })
        })
      })
      return this.process
    },

    getNumbers(value) {
      return String(value).split('').map(it => isNumber(it) ? Number(it) : it)
    },

    // get index
    // except the non-number chars
    getIndex(numbers, index) {
      let nonNumCount = 0
      for (let i = 0; i < index; i++) {
        if (!isNumber(numbers[i]))
          nonNumCount++
      }
      return index - nonNumCount
    },
  },
}

export {
  DIRECTIONS,
}
</script>

<template>
  <div class="scroll-number">
    <template v-for="(val, index) in numbers">
      <div
        v-if="!isNumber(val)"
        :key="`char-${index}`"
        class="digit"
        :style="itemStyle"
      >
        <span>{{ val }}</span>
      </div>

      <ScrollNumberItem
        v-else
        :key="getIndex(numbers, index)"
        ref="scrollItem"
        :direction="direction"
        :transition-time="transitionTime"
        :item-style="itemStyle"
      />
    </template>
  </div>
</template>

<style scoped>
.scroll-number {
  display: inline-block;
  font-size: 0;
}
.scroll-number .digit {
  display: inline-block;
  vertical-align: text-bottom;
  font-size: 14px;
  text-align: center;
}
</style>
