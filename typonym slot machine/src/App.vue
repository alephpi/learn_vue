<script>
import NumberScroll from './components/NumberScroll.vue'
import NumberScrollTest from './NumberScrollTest.vue'
// import SlotMachine from './components/SlotMachine.vue'
import ScrollNumber from './components/ScrollNumber.vue'

export default {
  components: {
    // SlotMachine,
    // ScrollNumber,
    NumberScroll,
    NumberScrollTest,
  },
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div>
      <router-view />
      <!-- <SlotMachine /> -->
      <!-- <NumberScroll /> -->
      <NumberScrollTest />
      <!-- <YetAnotherSlotReel /> -->
      <!-- <ScrollNumber /> -->
    </div>
    <Footer />
  </main>
</template>

<style scoped>
</style>
