<template>
  <router-view v-slot="{ Component }">
    <transition 
      name="fade" 
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import { ref } from '@vue/reactivity'
import { routes, router } from './router'

const currentRouteIndex = ref(0)

const mainRoutes = routes.filter(route => route.name !== 'Slides')
const onKeyDown = (event: KeyboardEvent) => {
  if(router.currentRoute.value.name === 'Slides') return
  const { code } = event
  // if right or down arrow is pressed, go to next page
  if (['ArrowRight', 'ArrowDown'].includes(code)) {
    currentRouteIndex.value = Math.min(currentRouteIndex.value + 1, routes.length - 1)
    // if left or down arrow is pressed, go to previous page
  } else if (['ArrowLeft', 'ArrowUp'].includes(code)) {
    currentRouteIndex.value = Math.max(currentRouteIndex.value - 1, 0)
  }
  router.push(mainRoutes[currentRouteIndex.value].path)
}

onMounted(() => document.addEventListener('keydown', onKeyDown))

</script>

<style>
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
/* ignore */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  background: var(--mainbg);
}

#app {
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2rem;
  font-weight: normal;
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
