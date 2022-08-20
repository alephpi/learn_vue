<script lang="ts">

</script>

<!-- eslint-disable @typescript-eslint/consistent-type-definitions -->
<!-- eslint-disable no-alert -->
<!-- eslint-disable no-undef-init -->
<!-- eslint-disable prefer-const -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import code from '../assets/pcas-code.json'
type pcas = {
  value: string
  label: string
  children?: Array<pcas>
}

const name = $ref('')
const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
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
function run() {
  if (!shengLocked.value)
    cas_code = pickSheng(pcas_code)

  if (!shiLocked.value)
    as_code = pickShi(cas_code)

  if (!xianLocked.value)
    pickXian(as_code)
}
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
watch([shengLocked, shiLocked, xianLocked], ([newshengLocked, newshiLocked, newxianLocked]) => {
  console.log((shengLocked.value && shiLocked.value) || (!shiLocked.value && !xianLocked.value) ? 'well' : 'bad')
})
</script>

<template>
  <div>
    <button @click="run">
      run
    </button>
    <br>
    <br>
    <button @click="lockSheng">
      lockSheng {{ shengLocked ? 'locked' : 'unlocked' }}
    </button>
    <br>
    <br>
    <button @click="lockShi">
      lockShi {{ shiLocked ? 'locked' : 'unlocked' }}
    </button>
    <br>
    <br>
    <button @click="lockXian">
      lockXian {{ xianLocked ? 'locked' : 'unlocked' }}
    </button>
    <ul>
      <li>省名：{{ shengMing }}</li>
      <li>
        市名：{{ shiMing }}
      </li>
      <li>
        县名：{{ xianMing }}
      </li>
    </ul>
    <ul>
      <li>
        省号：{{ shengHao }}
      </li>
      <li>市号：{{ shiHao }}</li>
      <li>县号：{{ xianHao }}</li>
    </ul>
  </div>
</template>
