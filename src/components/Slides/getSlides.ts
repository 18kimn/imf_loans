import {marked} from 'marked'
import Trademap from '../Trademap/index.vue'
import Title from '../Titlemap/index.vue'
import Story from '../../pages/Story.vue'
import List from './List.vue'
import {defineComponent} from '@vue/runtime-dom'
export const slideComponents = {
  Trademap,
  Title,
  List,
  Story,
}

const compPatterns = Object.keys(slideComponents)
    .map((name) => '<' + name)
    .join('|')

/**
 * rules for marked to insert custom components
 * see https://github.com/markedjs/marked/blob/master/src/Renderer.js
 * for default implementations
 */
const renderer = {
  list(body: string, ordered: Boolean, start: number) {
    const type = ordered ? 'ol' : 'ul'
    const startatt =
      ordered && start !== 1 ? ' start="' + start + '"' : ''
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n'
  },
}

marked.use({renderer})

/** Given markdonw text, parses it into a Vue component with
 *  marked and defineComponent
 */
function parseMd(text: string) {
  console.log(text)
  const componentsUsed = text
      .match(compPatterns)
      ?.map((pattern) => pattern.substring(1))
      .reduce((prev, curr) => {
        return {[curr]: slideComponents[curr], ...prev}
      }, {})

  let isShowcase = false
  if (text.match('^showcase')) {
    text = text.split('showcase')[1]
    isShowcase = true
  }

  return defineComponent({
    name: isShowcase ? 'showcase' : '',
    template: `<div ${
      isShowcase ? '' : 'style="max-width: 85ch;"'
    }>\n\n${marked(text)}\n\n</div>`,
    ...(componentsUsed ? {components: componentsUsed} : {}),
  })
}

/** Given a path relative to the public directory, fetches and then parses
 * markdown into Vue components
 */
async function getSlides(path: string) {
  const fetched = await fetch(`/slides/${path}.md`).then((res) =>
    res.text(),
  )
  return fetched.split('---\n').map(parseMd)
}

export default getSlides
