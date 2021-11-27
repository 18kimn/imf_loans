<template>
  <div id="container">
    <div id="background">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="slides[currentIndex]" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {slides} from '../components/slides.js'
const currentIndex = ref(0)

/** navigate slides with keys */
function onKeyDown(event: Event): void {
  const {code} = event as KeyboardEvent
  let nextIndex: number
  if (['ArrowRight', 'ArrowDown', 'Space', 'PageDown'].includes(code)) {
    nextIndex = Math.min(currentIndex.value + 1, slides.length)
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(code)) {
    nextIndex = Math.max(currentIndex.value - 1, 0)
  } else {
    nextIndex = currentIndex.value
  }
  currentIndex.value = nextIndex
}

onMounted(async () => document.addEventListener('keydown', onKeyDown))
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

#background {
  height: 100%;
  margin: 5%;
  background-color: white;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
}

#container,
#background {
  display: flex;
  flex-direction: column;
  place-content: center;
}

::v-deep(h1),
::v-deep(h2) {
  text-align: center;
}

::v-deep(h2) {
  font-weight: bold;
}

::v-deep(p),
::v-deep() {
  font-size: 2rem;
}

::v-deep(div) {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
}
/*
  fade transitions
  don't adjust these, it took a while to make it work properly
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
