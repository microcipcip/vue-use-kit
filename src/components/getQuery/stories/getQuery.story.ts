import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import GetQueryDemo from './GetQueryDemo.vue'

const functionName = 'getQuery'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: GetQueryDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="GetQueryDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('utils|getQuery', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
