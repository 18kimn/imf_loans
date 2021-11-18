import {createRouter, createWebHistory} from 'vue-router'
import Title from './pages/Title.vue'
import Exports from './pages/Exports.vue'

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
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
