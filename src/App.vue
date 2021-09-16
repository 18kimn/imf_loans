<template>
  <Story />
  <Trademap />
</template>

<script>
import Story from './components/Story.vue'
import Trademap from './components/Trademap/index.vue'

export default {
  name: 'App',
  components: {
    Story,
    Trademap,
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: Lato, 'sans-serif';
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
