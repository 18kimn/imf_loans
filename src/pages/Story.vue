<template>
  <div id="wrapper">
    <Storymap @new-location="location = $event" />
    <div id="leftside">
      <div id="container">
        <!-- annoying nested divs -->
        <div v-if="!location.event_name" style="padding: 5%">
          <h1>The Asian Financial Crisis</h1>
          <p>an extremely cursory global history</p>
        </div>
        <div v-else style="padding: 5%">
          <h1>{{ location.event_name }}</h1>
          <h2>{{ location.location_name + ". " + location.date }}</h2>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Storymap from "../components/Storymap/index.vue"
import { ref } from "vue"

interface Location {
  date: string
  location_name: string
  event_name: string
  description: string
  x: string
  y: string
}

// this i s actually used in the template
const location = ref({} as Location)
</script>

<style scoped>
#container,
#wrapper {
  width: 100%;
  height: 100%;
}

#wrapper {
  display: unset;
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

h1 {
  font-size: 1.5rem !important;
}

h2 {
  font-size: 1.1rem !important;
}

p {
  font-size: 1rem !important;
}
</style>
