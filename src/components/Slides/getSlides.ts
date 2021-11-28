import {marked} from 'marked'
import Trademap from '../Trademap/index.vue'
import Title from '../../pages/Title.vue'
import List from './List.vue'
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

    console.log({matches: text.match(compPatterns)})

    // console.log({componentsUsed, text,
    //   compPatterns, match: text.match(compPatterns)})
    return {
      template: `<div>\n\n${marked(text)}\n\n</div>`,
      ...(componentsUsed ? {components: componentsUsed} : {}),
    }
  })
}

export default getSlides
