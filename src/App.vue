<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import { routes, router } from './router'
import { ref } from '@vue/reactivity'
const currentRouteIndex = ref(0)

const onKeyDown = (event: KeyboardEvent) => {
  const { code } = event
  if (['ArrowRight', 'ArrowDown'].includes(code)) {
    currentRouteIndex.value = Math.min(currentRouteIndex.value + 1, routes.length - 1)
  } else if (['ArrowLeft', 'ArrowUp'].includes(code)) {
    currentRouteIndex.value = Math.max(currentRouteIndex.value - 1, 0)
  }
  console.log(currentRouteIndex.value)
  router.push(routes[currentRouteIndex.value].path)
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap");

:root {
  --mainbg: #fdf6e3;
  --textbg: #ffffff;
  --textcolor: #000000;
  --yellow: #b58900;
  --orange: #cb4616;
  --red: #dc322f;
  --magenta: #d33682;
  --violet: #6c71c4;
  --blue: #268db2;
  --cyan: #2aa198;
  --green: #869900;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: "EB Garamond", Georgia, "serif";
  background: var(--mainbg);
}

#app {
  width: 100%;
  height: 100%;
}

/* 
  fade transitions between different parts of the thesis
  don't adjust these, it took a while to make it work properly
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
