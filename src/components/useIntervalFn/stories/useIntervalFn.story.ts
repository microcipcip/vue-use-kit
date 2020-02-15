import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseIntervalFnDemo from './UseIntervalFnDemo.vue'

const functionName = 'useIntervalFn'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseIntervalFnDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseIntervalFnDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useIntervalFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
