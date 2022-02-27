import { createApp } from "vue"
import { createStore } from "vuex"
import App from "./App.vue"
import { router } from "./router"

const app = createApp(App)
const apple = [
  1, 2, 3, 12, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 12, 3, 1,
]
const store = createStore({
  state: {
    shapes: fetch("/data/shapes.json").then((res) => res.json()),
  },
})

app.use(store)
app.use(router)
app.mount("#app")
