import { defineComponent } from "vue"
import Slides from "../components/Slides/Slides.vue"

// all of the slides are the same except with
const slides = ["kr", "mainSlides", "kr_symposium"].map((path) =>
  defineComponent({
    name: `${path}`,
    components: { Slides },
    template: `<Slides path="${path}"/>`,
  })
)

export default slides
