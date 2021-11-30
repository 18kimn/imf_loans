<template>
  <div id="storyMapContainer" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {select} from 'd3-selection'
import {ExtendedFeatureCollection, GeoProjection} from 'd3-geo'
import drawFrame from './drawFrame'
import {
  zoom,
  zoomIdentity,
  csv,
  geoEquirectangular,
  geoPath,
  timer,
} from 'd3'

const activeIndex = ref(0)
const story = ref([] as any)
const currentTransform = ref(zoomIdentity)

const emit = defineEmits(['new-location'])
const changeLocation = ({code}) => {
  let nextIndex: number
  if (code === 'KeyN') {
    nextIndex = Math.min(activeIndex.value + 1, story.value.length - 1)
  } else if (code === 'KeyB') {
    nextIndex = Math.max(activeIndex.value - 1, 0)
  } else {
    return
  }
  activeIndex.value = nextIndex
}

/** Given a row of the story CSV file, returns that location's
 * appropriate (projected and transformed) pixel coordinate
 */
function getCoords(
    projection: GeoProjection,
    {x, y},
): [number, number] | undefined {
  const coords = projection([x, y])
  if (!coords) return
  return [
    currentTransform.value.x + currentTransform.value.k * coords[0],
    currentTransform.value.y + currentTransform.value.k * coords[1],
  ]
}

const baseZoom = zoom()
    .scaleExtent([0.1, 12])
    .on('zoom', ({transform}) => {
      currentTransform.value = transform
    })

/** Draws ...the...map... */
async function drawMap(dataPromise: Promise<ExtendedFeatureCollection>) {
  const shapes = await dataPromise
  const canvas = select('#storyMapContainer')
      .append('canvas')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)
      .style('position', 'absolute')
      .style('width', '100%')
      .style('height', '100%')
      .style('cursor', 'pointer')
  const context = canvas.node()?.getContext('2d')
  if (!canvas || !context) return

  const projection = geoEquirectangular().fitExtent(
      [
        [0, 0],
        [window.innerWidth, window.innerHeight],
      ],
      shapes,
  )
  const path2d = new Path2D() as any
  const path = geoPath().projection(projection).context(path2d)
  path(shapes)

  const zoomTo = ({x, y}) => {
    const coords = projection([x, y])
    if (!coords) return
    const zoomerTo = zoomIdentity
        .translate(1.5 * window.innerWidth / 2, window.innerHeight / 2)
        .translate(-coords[0], -coords[1])
    canvas.transition()
        .duration(500)
        .call(baseZoom.transform as any, zoomerTo)
  }
  // typescript throws a nonsensical error here without as any
  canvas.call(baseZoom as any)

  // note that drawFrame is accepting the raw refs so that updates can be
  // automagically passed down (objects are copied by reference etc etc)
  let lastIndex = 0
  timer((elapsed) => {
    // goes from 0 to 1 and repeats
    const time = elapsed / 1000 - Math.floor(elapsed / 1000)
    const location = story.value[activeIndex.value]
    const pixelCoords = getCoords(projection, location)
    if (activeIndex.value !== lastIndex && pixelCoords) {
      emit('new-location', location)
      zoomTo(location)
      lastIndex = activeIndex.value
    }
    drawFrame(context, path2d, time, pixelCoords, currentTransform.value)
  })
}

const store = useStore()
// on mount, draw the intitial map and listen for updates
onMounted(async () => {
  window.addEventListener('keydown', changeLocation)
  story.value = await csv('/data/content.csv')
  drawMap(store.state.shapes)
})
</script>

<style scoped>
#storyMapContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
