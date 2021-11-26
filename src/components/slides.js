/*
increddibly ugly syntax but whatever

I need to ask a senior person what the best way to do this is
*/

export const slides = [
  {
    template: `
    <div>
      <h1>The IMF and Global Dispossession</h1>
      <h2>Nathan Kim</h2>
    </div>
  `,
  },
  {
    template: `
  <div>
    <h1>Intro</h1>
    <ol>
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ol>
  </div>`,
    data() {
      return {
        items: [
          'Theoretical background',
          'The history',
          'My argument',
          'The viz (sort of)',
          'Re: methods and grounding',
        ],
      }
    },
  },
  {
    template: '<h1>1: Theoretical background</h1>',
  },
  {
    template: `
    <div>
      <h2>Racialized accumulation by dispossession</h2>
      <ul>
        <li v-for="item in items" :key="item" v-html="item"/>
      </ul>
    </div>
    `,
    data() {
      return {
        items: [
          "David Harvey's <em>The New Imperialism</em>",
          'Traditional primitive accumulation',
          'A turn towards the social processes of capitalism',
        ],
      }
    },
  },
]
