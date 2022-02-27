<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { ref } from "@vue/reactivity"
import { routes, router } from "./router"
import nextAction from "./utils/nextAction"

const currentRouteIndex = ref(0)
const mainRoutes = routes.filter(
  (route) => !route.name.match(/slides-/)
)
console.log(mainRoutes)
/** Handles site navigation via arrow keys */
function onKeyDown(event: KeyboardEvent): void {
  // triple-check that we're on the correct route
  // mismatch could occur bc currentRouteIndex starts at 0
  // while we might start on a non-home page
  currentRouteIndex.value = mainRoutes.findIndex((route) => {
    return route.path === router.currentRoute.value.path
  })
  if (currentRouteIndex.value === -1) return
  const nextRoute = nextAction(
    event,
    () =>
      Math.min(currentRouteIndex.value + 1, mainRoutes.length - 1),
    () => Math.max(currentRouteIndex.value - 1, 0)
  )
  if (!mainRoutes[nextRoute]) return
  router.push({ path: mainRoutes[nextRoute].path })
  currentRouteIndex.value = nextRoute
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown)
})
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
  --shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
}
/* ignore */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
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
  transition: opacity 0.3s ease;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
