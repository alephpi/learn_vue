<script>
import NumberScroll from './components/NumberScroll.vue'
import SlotMachine from './components/SlotMachine.vue'
import ScrollNumber from './components/ScrollNumber.vue'

export default {
  components: {
    SlotMachine,
    NumberScroll,
    ScrollNumber,
  },
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div>
      <SlotMachine />
      <!-- <NumberScroll :value="110010" :time="1" /> -->
      <ScrollNumber />
    </div>
    <Footer />
  </main>
</template>

<style scoped></style>
