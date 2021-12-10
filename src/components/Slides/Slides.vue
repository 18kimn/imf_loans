<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="slides[currentIndex].name !== 'showcase'"
      class="container"
    >
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
    <transition
      v-else
      style="height: 100%; width: 100%"
      name="fade"
      mode="out-in"
    >
      <component
        :is="slides[currentIndex]"
        :key="currentIndex"
      />
    </transition>
  </transition>
</template>

<script setup lang="ts">
import {defineComponent} from '@vue/runtime-dom'
import {ref, shallowRef, onMounted} from 'vue'
import getSlides from './getSlides'
import nextAction from '../../utils/nextAction'
import Titlemap from '../Titlemap/index.vue'
const slides = shallowRef([defineComponent({template: '<div/>'})])
const currentIndex = ref(0)

const props = defineProps({
  path: String,
})
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
  if (!props.path) return
  slides.value = await getSlides(props.path)
  window.addEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  place-content: center;
  place-items: center;
}

.background {
  height: 90%;
  width: 80%;
  background-color: white;
  box-shadow: var(--shadow);
}

::v-deep(.text-background) {
  padding: 4%;
  width: 30%;
  height: 70%;
  background-color: white;
  box-shadow: var(--shadow);
  z-index: 1;
}
.content {
  height: 80%;
  z-index: 3;
}

::v-deep(.overlay) {
  position: absolute;
  height: 100%;
  width: 100%;
  flex-direction: row;
  top: 0;
  pointer-events: none;
}
::v-deep(h1),
::v-deep(h2) {
  text-align: center;
}

::v-deep(h2) {
  font-weight: bold;
}

::v-deep(p),
::v-deep(h3),
::v-deep(li) {
  font-size: 2rem;
}

::v-deep(div) {
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
}

::v-deep(td), ::v-deep(th) {
  font-size: 18pt;
  padding-left: 1rem;
}
</style>
