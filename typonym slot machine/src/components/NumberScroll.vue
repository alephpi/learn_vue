<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable prefer-const -->
<script setup>
import { onMounted, reactive, ref } from 'vue'
const props = defineProps(['shengLocked', 'shiLocked', 'xianLocked'])
const emit = defineEmits(['animationEnd'])
// 暴露animation方法给父组件
defineExpose({ animation })
// let props = defineProps(['code'])
const numerals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 奖品列表，目前最多支持7个，想支持更多，可以手动添加对应的css样式动画
const digits = 6
// let loading = ref(false)
const scroll_activated = ref(false)
const isLocked = reactive([false, false, false, false, false, false])
const rotations = reactive([
  { id: 0, degree: 0 },
  { id: 1, degree: 0 },
  { id: 2, degree: 0 },
  { id: 3, degree: 0 },
  { id: 4, degree: 0 },
  { id: 5, degree: 0 },
])
let current_code = ref('')

onMounted(() => {
  // 通过获取奖品个数，来改变css样式中每个奖品动画的旋转角度
  // var(--nums) 实现css动画根据奖品个数，动态改变
  const root = document.querySelector(':root')
  root.style.setProperty('--nums', numerals.length)
})

function animation(code) {
  for (let id in rotations) {
    // rotations[id].degree = Math.floor(Math.random() * numerals.length)
    rotations[id].degree = code[id]
    console.log(rotations[id].degree)
  }
  // 让class属性中的wr项重新加载而非直接更新，以免wr项不变时不渲染新动画
  scroll_activated.value = false
  setTimeout(() => {
    lock()
    scroll_activated.value = true
  }, 2)
  // 在动画中止时调整转轮至新结果，下次转动直接继续而非归零。
  setTimeout(() => {
    current_code.value = code
    emit('animationEnd')
  }, 2000)
}

function lock() {
  isLocked[0] = props.shengLocked
  isLocked[1] = props.shengLocked
  isLocked[2] = props.shiLocked
  isLocked[3] = props.shiLocked
  isLocked[4] = props.xianLocked
  isLocked[5] = props.xianLocked
}
</script>

<template>
  <div id="number-scroll-container" class="overall">
    <div class="number-scroll-box">
      <div v-for="{ id, degree } in rotations" :key="id" class="number-scroll-block">
        <ul class="gundong" :class="(scroll_activated && !isLocked[id]) ? `wr${degree}` : ``"
          :style="{ transform: `rotateX(${360 / numerals.length * -current_code[id]}deg)` }">
          <li v-for="i in numerals" :key="i"
            :style="`transform: rotateX(${360 / numerals.length * i}deg)  translateZ(${9 * numerals.length}px)`">
            {{ i }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#number-scroll-container {
  --loop: 2
}

.overall {
  /* perspective: 3000px; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

/* 视窗 */
.number-scroll-box {
  height: 90px;
  width: 300px;
  background: white;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-content: center;

}

.number-scroll-box .number-scroll-block {
  /* width: 100px; */
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 1px;
  background: #FFFFFF;
}

.number-scroll-box .number-scroll-block .gundong {
  display: inline-block;
  transform-style: preserve-3d;
  width: 50px;
  height: 100%;
  list-style: none;
  padding: 0;
  position: relative;
  perspective: 3000px;
  /* 每个奖品格子的样式 */
}

.number-scroll-box .number-scroll-block .gundong li {
  transform-style: preserve-3d;
  display: block;
  height: 50px;
  line-height: 70px;
  font-weight: bold;
  font-size: 30px;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #000000;
  background: #FFFFFF;
  text-align: center;
}

/* 给每个滚动添加一个延迟动画效果 */
/* .number-scroll-block:nth-child(1) ul {
  animation-delay: 0.2s;
} */

/* .number-scroll-block:nth-child(1) ul li {
  background: #14e4b7;
} */

/* 下面的css样式为每个奖品的旋转动画，这里写了对应8个奖品的动画，如果想要更多的话，可以添加 */
/* 例如： .wr8  @keyframes play8 */
.wr0,
.wr1,
.wr2,
.wr3,
.wr4,
.wr5,
.wr6,
.wr7,
.wr8,
.wr9 {
  /* 每个转动的时间 */
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}

.wr0 {
  animation-name: play0;
}

.wr1 {
  animation-name: play1;
}

.wr2 {
  animation-name: play2;
}

.wr3 {
  animation-name: play3;
}

.wr4 {
  animation-name: play4;
}

.wr5 {
  animation-name: play5;
}

.wr6 {
  animation-name: play6;
}

.wr7 {
  animation-name: play7;
}

.wr8 {
  animation-name: play8;
}

.wr9 {
  animation-name: play9;
}

@keyframes play0 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) * 0));
  }
}

@keyframes play1 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-1));
  }
}

@keyframes play2 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-2));
  }
}

@keyframes play3 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-3));
  }
}

@keyframes play4 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-4));
  }
}

@keyframes play5 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-5));
  }
}

@keyframes play6 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-6));
  }
}

@keyframes play7 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-7));
  }
}

@keyframes play8 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-8));
  }
}

@keyframes play9 {
  to {
    transform: rotateX(calc(var(--loop) * 360deg + 360deg / var(--nums) *-9));
  }
}
</style>
