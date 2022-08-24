<script>
import SlotMachine from './components/SlotMachine.vue'
export default {
  components: {
    SlotMachine,
    // ScrollNumber,
    // NumberScroll,
  },
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div>
      <router-view />
      <SlotMachine />
      <!-- <NumberScroll /> -->
    </div>
    <Footer />
  </main>
</template>

<style scoped>
</style>
