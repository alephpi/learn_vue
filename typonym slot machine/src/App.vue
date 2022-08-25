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
    <h1>地名老虎机</h1>
    <div>
      <router-view />
      <SlotMachine />
      <!-- <NumberScroll /> -->
    </div>
    <Footer />
  </main>
</template>

<style>
:root {
  --size: 90px
}
</style>
