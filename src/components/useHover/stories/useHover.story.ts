import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseHoverDemo from './UseHoverDemo.vue'

const functionName = 'useHover'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseHoverDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseHoverDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro>
          <strong> Try to move the mouse hover the box below</strong> to see the emoji change of expression. 
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useHover', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
