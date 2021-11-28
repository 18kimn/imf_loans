<template>
  <div id="container" />
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useStore} from 'vuex'
import drawMap from './index'

const store = useStore()

onMounted(() => drawMap(store.state.shapes))

</script>

<style scoped>
#introMapContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
