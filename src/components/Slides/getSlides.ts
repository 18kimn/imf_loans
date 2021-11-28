import {marked} from 'marked'
import Trademap from '../Trademap/index.vue'
import Title from '../Titlemap/index.vue'
import List from './List.vue'
import {defineComponent} from '@vue/runtime-dom'
export const slideComponents = {
  Trademap,
  Title,
  List,
}


const compPatterns = Object.keys(slideComponents)
    .map((name) => '<' + name).join('|')

/** Custom parser for markdown so
 * that I can optionally use Vue components in slides */
async function getSlides(path: string) {
  const fetched = await fetch(path)
      .then((res) => res.text())
  return fetched.split('---').map((text) => {
    const componentsUsed = text.match(compPatterns)
        ?.map((pattern) => pattern.substring(1))
        .reduce((prev, curr) => {
          return {[curr]: slideComponents[curr],
            ...prev}
        }, {})

    let isShowcase = false
    if (text.match('^showcase')) {
      text = text.split('showcase')[1]
      isShowcase = true
    }

    return defineComponent({
      name: isShowcase ? 'showcase' : '',
      template: `<div class="content">\n\n${marked(text)}\n\n</div>`,
      ...(componentsUsed ? {components: componentsUsed} : {}),
    })
  })
}

export default getSlides
