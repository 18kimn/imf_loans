<template>
  <div id="mapcontainer">
    <div id="slidecontainer">
      <label
        id="sliderLabel"
        for="slider"
      >
        <input
          id="slider"
          v-model="year"
          name="yearPicker"
          type="range"
          min="1993"
          max="2020"
          step="1"
        >
        Year: {{ year }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {geoOrthographic} from 'd3-geo'
import {ref} from '@vue/reactivity'
import {onMounted, onUnmounted, onUpdated} from '@vue/runtime-core'
import {Timer} from 'd3-timer'
import updateMap from './Update'
import drawMap from './Draw'


const year = ref(1993)
const timer = ref({} as unknown as Timer)

onMounted(() => {
  timer.value = drawMap(projection)
})
onUpdated(() => updateMap(projection))
onUnmounted(() => timer.value.stop())

const projection = geoOrthographic()
    .translate([(window.innerWidth * 0.7) / 2,
      window.innerHeight / 2])
    .scale((window.innerWidth * 0.7) / 3)

</script>

<style>
#mapcontainer {
  position: relative;
  width: 100%;
}
#map {
  width: 100%;
  height: 100%;
  background: #eee8d5;
}
#slidecontainer {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 70%;
  z-index: 3;
}

.nation:hover {
  stroke: #000000;
  stroke-width: 1px;
}

#slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

#slider:hover {
  opacity: 1;
}

#slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #838383;
  cursor: pointer;
}

#slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #838383;
  cursor: pointer;
}

#sliderLabel {
  margin-top: 10px;
}

g {
  cursor: pointer;
}

#outline {
  fill: #ffffff;
  stroke: #000000;
  stroke-width: 1;
}

.graticule {
  fill: none;
  stroke: black;
  stroke-opacity: 0.5;
  stroke-width: 0.3;
}

.nation {
  fill: #7ab199;
  stroke-width: 1;
}

.countryLabel {
  opacity: 1;
  color: black;
  font-size: 12;
}
</style>
