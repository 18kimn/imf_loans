import {createRouter, createWebHistory} from 'vue-router'
import Title from './pages/Title.vue'
import Exports from './pages/Exports.vue'
import Slides from './pages/Slides.vue'
export const routes = [
  {
    path: '/',
    name: 'Title',
    component: Title,
  },
  {
    path: '/exports',
    name: 'Exports',
    component: Exports,
  },
  {
    path: '/slides',
    name: 'Slides',
    component: Slides,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
