<script>
import SlotMachine from './components/SlotMachine.vue'
export default {
  components: {
    SlotMachine,
  },
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div>
      <SlotMachine />
    </div>
    <Footer />
  </main>
</template>

<style scoped></style>
