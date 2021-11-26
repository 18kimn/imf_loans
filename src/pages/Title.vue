<template>
  <div id="wrapper">
    <div id="introMapContainer" />
    <div id="leftside">
      <div id="container">
        <!-- annoying nested divs -->
        <div style="padding: 5%;"> 
          <h1>The IMF and <br>Global Dispossession</h1>
          <h2>Nathan Kim</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import drawMap from '../components/Titlemap/index'

const store = useStore()

onMounted(() => drawMap(store.state.shapes))

</script>

<style scoped>
#container,
#wrapper {
  width: 100%;
  height: 100%;
}

#introMapContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#leftside {
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  place-items: center;
  place-content: center;
}

#container {
  display: flex;
  flex-direction: column;
  place-items: flex-start;
  place-content: center;
  z-index: 1;
  max-width: 80%;
  max-height: 80%;
  background: var(--textbg);
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
}

</style>
