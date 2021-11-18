<template>
  <div class="container">
    <Story />
    <Trademap />
  </div>
</template>

<script setup>
import Story from '../components/Story.vue'
import Trademap from '../components/Trademap/index.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>