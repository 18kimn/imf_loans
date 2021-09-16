<template>
  <div id="mapcontainer">
    <div id="slidecontainer">
      <input
        type="range"
        min="1993"
        max="2020"
        step="1"
        v-model="year"
        id="slider"
      />
      <p id="sliderLabel">Year: {{ year }}</p>
    </div>
  </div>
</template>

<script>
import drawMap from './Draw'
import updateMap from './Update'
import {geoOrthographic} from 'd3-geo'

const projection = geoOrthographic()
  .translate([(window.innerWidth * 0.7) / 2, window.innerHeight / 2])
  .scale((window.innerWidth * 0.7) / 3)

export default {
  data: function () {
    return {
      year: 1993,
    }
  },
  mounted() {
    drawMap(projection)
  },
  updated() {
    updateMap(projection)
  },
}
</script>

<style></style>
