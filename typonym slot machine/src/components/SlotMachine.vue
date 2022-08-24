<script lang="ts"></script>

<!-- eslint-disable @typescript-eslint/indent -->
<!-- eslint-disable @typescript-eslint/consistent-type-definitions -->
<!-- eslint-disable no-alert -->
<!-- eslint-disable no-undef-init -->
<!-- eslint-disable prefer-const -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import code from '../assets/pcas-code.json'
import NumberScroll from './NumberScroll.vue'
type pcas = {
    value: string
    label: string
    children?: Array<pcas>
}
let shengMing: Ref<string> = ref('--')
let shiMing: Ref<string> = ref('--')
let xianMing: Ref<string> = ref('--')
let shengHao: Ref<string | undefined> = ref('--')
let shiHao: Ref<string | undefined> = ref('--')
let xianHao: Ref<string | undefined> = ref('--')
let shengLocked = ref(false)
let shiLocked = ref(false)
let xianLocked = ref(false)
let pcas_code: Array<pcas> = code
let cas_code: Array<pcas> | undefined
let as_code: Array<pcas> | undefined

let loading = ref(false)
let reel = ref()

function run() {
    if (!loading.value) {
        loading.value = true
        if (!shengLocked.value)
            cas_code = pickSheng(pcas_code)

        if (!shiLocked.value)
            as_code = pickShi(cas_code)

        if (!xianLocked.value)
            pickXian(as_code)
        console.log('running')
    }
    else {
        console.log('loading...')
    }
}

watch(xianHao, (newxianHao) => {
    reel.value.animation(newxianHao)
})

function pick(codearray?: Array<pcas>) {
    if (codearray === undefined)
        return undefined
    let id = Math.floor(Math.random() * codearray.length)
    return codearray[id]
}
function pickSheng(shengArray?: Array<pcas>) {
    let sheng = pick(shengArray)
    if (sheng === undefined)
        return undefined
    shengMing.value = sheng.label
    shengHao.value = sheng.value
    return sheng.children
}
function pickShi(shiArray?: Array<pcas>) {
    let shi = pick(shiArray)
    if (shi === undefined)
        return undefined
    shiMing.value = shi.label
    shiHao.value = shi.value
    return shi.children
}
function pickXian(xianArray?: Array<pcas>) {
    let xian = pick(xianArray)
    if (xian === undefined)
        return undefined
    xianMing.value = xian.label
    xianHao.value = xian.value
    return undefined
}

function lockSheng() {
    // lock
    if (!shengLocked.value) {
        shengLocked.value = true
    }
    // unlock all the sub locks
    else {
        shengLocked.value = false
        shiLocked.value = false
        xianLocked.value = false
    }
}

function lockShi() {
    // lock all the sup locks
    if (!shiLocked.value) {
        shengLocked.value = true
        shiLocked.value = true
    }
    // unlock all the sub locks
    else {
        shiLocked.value = false
        xianLocked.value = false
    }
}

function lockXian() {
    // lock all the sup locks
    if (!xianLocked.value) {
        shengLocked.value = true
        shiLocked.value = true
        xianLocked.value = true
    }
    // unlock
    else {
        xianLocked.value = false
    }
}
watch(
    [shengLocked, shiLocked, xianLocked],
    ([newshengLocked, newshiLocked, newxianLocked]) => {
        console.log(
            (shengLocked.value && shiLocked.value) || (!shiLocked.value && !xianLocked.value)
                ? 'well'
                : 'bad',
        )
    },
)
</script>

<!-- eslint-disable vue/html-indent -->
<template>
    <div>
        <br>
        <br>
        <button @click="lockSheng">
            lockSheng {{ shengLocked ? "locked" : "unlocked" }}
        </button>
        <br>
        <br>
        <button @click="lockShi">
            lockShi {{ shiLocked ? "locked" : "unlocked" }}
        </button>
        <br>
        <br>
        <button @click="lockXian">
            lockXian {{ xianLocked ? "locked" : "unlocked" }}
        </button>
        <ul>
            <li>省名：{{ shengMing }}</li>
            <li>市名：{{ shiMing }}</li>
            <li>县名：{{ xianMing }}</li>
        </ul>
        <ul>
            <li>省号：{{ shengHao }}</li>
            <li>市号：{{ shiHao }}</li>
            <li>县号：{{ xianHao }}</li>
        </ul>
        <!-- <div v-for="item in 6" :key="item" class="slot-reel">
      <ul class="scroll">
        <li v-for="i in 9" :key="i">
          {{ i }}
        </li>
      </ul>
    </div> -->
    </div>
    <NumberScroll ref="reel" @animation-end="loading = false" />
    <button class="chou" :disabled="loading" @click="run">
        {{ loading ? "进行中" : "开始" }}
    </button>
</template>

<style>
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

.chou:disabled {
    background: #9d9d9d
}
</style>
