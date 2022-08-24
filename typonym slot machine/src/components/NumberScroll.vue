<!-- eslint-disable prefer-const -->
<script setup>
import { onMounted, ref } from 'vue'
const list = [
  {
    title: '0',
  },
  {
    title: '1',
  },
  {
    title: '2',
  },
  {
    title: '3',
  },
  {
    title: '4',
  },
  {
    title: '5',
  },
  {
    title: '6',
  },
  {
    title: '7',
  },
  {
    title: '8',
  },
  {
    title: '9',
  },
] // 奖品列表，目前最多支持7个，想支持更多，可以手动添加对应的css样式动画

let winner = null // 指定的奖品 null时为不中奖
let loading = false // 抽奖执行状态，防止用户多次点击
let gundongElement = null // 储存获取到的滚动容器的标签
let animationClass = [] // 3个抽奖模块对应的动画属性,方便后来对应添加和移除该class样式
let newResult = '330802'

onMounted(() => {
  // 通过获取奖品个数，来改变css样式中每个奖品动画的旋转角度
  // var(--nums) 实现css动画根据奖品个数，动态改变
  const root = document.querySelector(':root')
  root.style.setProperty('--nums', list.length)
})

function start() {
  if (!loading) {
    gundongElement = document.querySelectorAll('.gundong')
    gundongElement.forEach((element, index) => {
      if (animationClass[index])
        element.classList.remove(animationClass[index].class)
    })
    winCallback()
    loading = true
  }
}
// 中奖返回方法
function winCallback() {
  setTimeout(() => {
    /* 此处是为了解决当下次抽中的奖励与这次相同，动画不重新执行的 */
    /* 添加一个定时器，是为了解决动画属性的替换效果，实现动画的重新执行 */
    gundongElement.forEach((element, index) => {
      element.classList.add(getAnimationClass(index))
      setTimeout(() => {
        element.style.transform = `rotatex(${animationClass[index].rotate}deg)`
      }, 2000)
    })
  }, 0)
  // loading = false
  // 因为动画时间为 3s ，所以这里4s后获取结果，其实结果早就定下了，只是何时显示，告诉用户
  setTimeout(() => {
    loading = false
  }, 2000)
}
// 获取对应的class样式，并储存起来，方便后来的class移除
function getAnimationClass(index) {
  let ran = newResult[index]

  animationClass[index] = {
    num: ran,
    class: `wr${ran}`,
    rotate: (360 / list.length) * -ran,
  }
  return `wr${ran}`
}
// 随机一个整数的方法
function random(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min)
}
</script>

<template>
  <div class="overall">
    <div class="cj-box">
      <div v-for="item in 6" :key="item" class="cj-block">
        <ul class="gundong">
          <li v-for="(i, index) in list" :key="index"
            :style="`transform: rotateX(${360 / list.length * index}deg)  translateZ(${13.6 * list.length}px)`">
            {{ i.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="chou" @click="start">
      抽奖
    </div>
  </div>
</template>

<style scoped>
.overall {
  perspective: 3000px;
}

/* 抽奖按钮 */
.chou {
  user-select: none;
  cursor: pointer;
  padding: 10px;
  margin: 20px auto;
  color: white;
  background: #19aca4;
  width: 100px;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
}

.chou:active {
  transform: scale(0.9);
}

/* 视窗 */
.cj-box {
  height: 140px;
  background: white;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
}

.cj-box .cj-block {
  width: 100px;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 1px;
  background: #FFFFFF;
}

.cj-box .cj-block .gundong {
  display: inline-block;
  transform-style: preserve-3d;
  width: 100px;
  height: 100%;
  list-style: none;
  padding: 0;
  position: relative;
  perspective: 3000px;
  /* 每个奖品格子的样式 */
}

.cj-box .cj-block .gundong li {
  transform-style: preserve-3d;
  display: block;
  height: 100px;
  line-height: 100px;
  font-weight: bold;
  font-size: 30px;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #000000;
  background: #FFFFFF;
}

/* 给每个滚动添加一个延迟动画效果 */
/* .cj-block:nth-child(1) ul {
  animation-delay: 0.2s;
} */

/* .cj-block:nth-child(1) ul li {
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
  animation-duration: 1s;
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
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * 0));
  }
}

@keyframes play1 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -1));
  }
}

@keyframes play2 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -2));
  }
}

@keyframes play3 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -3));
  }
}

@keyframes play4 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -4));
  }
}

@keyframes play5 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -5));
  }
}

@keyframes play6 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -6));
  }
}

@keyframes play7 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -7));
  }
}

@keyframes play8 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -8));
  }
}

@keyframes play9 {
  to {
    transform: rotateX(calc(5 * 360deg + 360deg / var(--nums) * -9));
  }
}
</style>
