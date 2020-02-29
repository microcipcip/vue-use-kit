import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseTimeoutDemo from './UseTimeoutDemo.vue'

const functionName = 'useTimeout'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseTimeoutDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseTimeoutDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useTimeout', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
