import {createRouter, createWebHistory} from 'vue-router'
import Title from './pages/Title.vue'
import Exports from './pages/Exports.vue'
import slides from './pages/slides'
import Story from './pages/Story.vue'

const slideRoutes = slides.map((slide) => ({
  path: `/slides/${slide.name}`,
  name: `slides-${slide.name}`,
  component: slide,
}))

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
    path: '/story',
    name: 'Story',
    component: Story,
  },
  ...slideRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
