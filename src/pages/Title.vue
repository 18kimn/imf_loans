<template>
  <div id="wrapper">
    <Titlemap />
    <div id="leftside">
      <div id="container">
        <!-- annoying nested divs -->
        <div style="padding: 5%">
          <h1>The IMF and <br />Global Dispossession</h1>
          <h2>Nathan Kim</h2>
          <p>
            This site is a just-barely-started accompaniment to my
            thesis. Some sketches and ideas for maps are illustrated
            here, but everything here is subject to change. Feel free
            to take a look, though!
          </p>
          <p>Press the right arrow key to go to the next map.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Titlemap from "../components/Titlemap/index.vue"
</script>

<style scoped>
#container,
#wrapper {
  width: 100%;
  height: 100%;
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
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
</style>
