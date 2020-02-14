import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseTimeoutFnDemo from './UseTimeoutFnDemo.vue'

const functionName = 'useTimeoutFn'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseTimeoutFnDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseTimeoutFnDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useTimeoutFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
