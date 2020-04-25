import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseFetchDemo from './UseFetchDemo.vue'

const functionName = 'useFetch'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseFetchDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseFetchDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('side effects|useFetch', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
