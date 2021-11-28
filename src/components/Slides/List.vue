<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
  >
    <transition-group
      name="flip-list"
      tag="ul"
    >
      <h1>{{ title }}</h1>
      <li
        v-for="item in parsedItems.slice(0, activeItemsIndex)"
        :key="item"
      >
        {{ item }}
      </li>
    </transition-group>
  </component>
</template>

<script setup>
import {ref, toRefs, defineProps, onMounted, onBeforeUnmount} from 'vue'
const props = defineProps({
  items: String,
  ordered: Boolean,
  title: String,
})


const {items} = toRefs(props)
// this is actually used, just only in the template
// so eslint throws an error, but it can be ignored
// eslint-disable-next-line no-unused-vars
const parsedItems = JSON.parse(items.value)

const activeItemsIndex = ref(0)

/** When the appropriate key is clicked, show the next item
 * and when all items are shown, emit an event to move on to the next slide
 */
function onKeyDown(event) {
  const {code} = event
  if (['KeyN'].includes(code)) {
    activeItemsIndex.value++
  } else if (['KeyB'].includes(code)) {
    activeItemsIndex.value--
  }
}

onMounted(() => document.addEventListener('keydown', onKeyDown))

onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>

.flip-list-move {
  transition: transform 0.2s;
}

</style>
