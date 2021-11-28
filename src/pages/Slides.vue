<template>
  <div id="container">
    <div class="background">
      <transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="slides[currentIndex]"
          :key="currentIndex"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from '@vue/runtime-dom'
import {ref, shallowRef, onMounted} from 'vue'
import getSlides from '../components/Slides/getSlides'
import nextAction from '../utils/nextAction'

const slides = shallowRef([defineComponent({template: '<div/>'})])
const currentIndex = ref(0)

/** navigate slides with keys */
function onKeyDown(event: KeyboardEvent): void {
  const nextIndex = nextAction(
      event,
      () => Math.min(currentIndex.value + 1, slides.value.length - 1),
      () => Math.max(currentIndex.value - 1, 0),
  )

  currentIndex.value =
    typeof nextIndex !== 'undefined' ? nextIndex : currentIndex.value
}

onMounted(async () => {
  slides.value = await getSlides('/slides.md')
  console.log(slides.value)
  document.addEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

.background {
  height: 90%;
  margin: 3%;
  background-color: white;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
}

::v-deep(.text-background){
  width: 45%;
  height: 80%;
  background-color: white;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  z-index: 1;
}
::v-deep(.content) {
  height: 80%;
}

::v-deep(h1),
::v-deep(h2) {
  text-align: center;
}

::v-deep(h2) {
  font-weight: bold;
}

::v-deep(p), ::v-deep(h3),
::v-deep(li) {
  font-size: 2rem;
}

::v-deep(div) {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
}
</style>
