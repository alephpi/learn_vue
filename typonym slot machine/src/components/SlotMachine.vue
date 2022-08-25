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
let full_code = ref()

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
            full_code.value = pickXian(as_code)

        reel.value.animation(full_code.value)
        console.log('running')
    }
    else {
        console.log('loading...')
    }
}

// watch(full_code, (newFullCode) => {
//     reel.value.animation(newFullCode)
// })

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
    return xianHao.value
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
        <NumberScroll ref="reel" :sheng-locked="shengLocked" :shi-locked="shiLocked" :xian-locked="xianLocked"
            @animation-end="loading = false" />
        <div class="info-container">
            <div class="info sheng">
                <div class="info-title">
                    省：
                </div>
                <div class="info-value">
                    {{ (loading && !shengLocked) ? "--" : shengMing }}
                </div>
            </div>
            <div class="info shi">
                <div class="info-title">
                    市：
                </div>
                <div class="info-value">
                    {{ (loading && !shiLocked) ? "--" : shiMing }}
                </div>
            </div>
            <div class="info xian">
                <div class="info-title">
                    县：
                </div>
                <div class="info-value">
                    {{ (loading && !xianLocked) ? "--" : xianMing }}
                </div>
            </div>
        </div>
        <div class="actions">
            <button class="play lock" :disabled="loading" :class="{ locked: shengLocked }" @click="lockSheng">
                {{ !shengLocked ? "锁定省" : "解锁省" }}
            </button>
            <button class="play lock" :disabled="loading" :class="{ locked: shiLocked }" @click="lockShi">
                {{ !shiLocked ? "锁定市" : "解锁市" }}
            </button>
            <button class="play lock" :disabled="loading" :class="{ locked: xianLocked }" @click="lockXian">
                {{ !xianLocked ? "锁定县" : "解锁县" }}
            </button>
            <button class="play" :disabled="loading || shengLocked && shiLocked && xianLocked" @click="run">
                {{ loading ? "进行中" : "开始" }}
            </button>
        </div>
    </div>
</template>

<style scoped>
/* 抽奖按钮 */
.play {
    /* user-select: none;
    cursor: pointer;
    padding: 10px;
    /* margin: 20px auto; */
    color: white;
    background: #19aca4;
    width: 70px;
    /* font-size: 20px; */
    /* border-radius: 5px; */
    /* box-shadow: 0 0 10px #ccc; */

    font-size: 17px;
    font-weight: bold;
    padding: 14px 12px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2px 2px rgb(0, 0, 0);
    box-shadow: 0 1px 2px 2px rgb(0, 0, 0);
}

.play.lock {
    background: rgb(38, 179, 38);
}

.play:active {
    transform: scale(0.9);
}

.play:disabled {
    background: #9d9d9d
}

.play.locked {
    background: rgb(182, 30, 30)
}

.info-container {
    width: calc(300px);
    background: rgba(75, 209, 236, 0.5);
    padding: 10px 0;
    flex-direction: column;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: auto;
    box-shadow: 0 0 10px #ccc;
}

.info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    margin-right: 10px;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.info-title {
    font-size: 15px;
    /* font-weight: bold; */
    color: rgb(251, 167, 0);
    text-align: left;
    align-self: flex-start;
}

.info-value {
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    /* border: 1px solid rgb(0, 0, 0); */
    font-size: 20px;
    text-align: right;
    color: rgba(0, 0, 0, 0.8);
    /* text-shadow: 0 0 4px rgba(0, 0, 0, 0.5); */
}

.actions {
    width: calc(300px);
    padding: 10px 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    background: rgb(48, 48, 48);
    border-radius: 0 0 4px 4px;
    margin: auto;
    box-shadow: 0 0 10px #ccc;
}
</style>
