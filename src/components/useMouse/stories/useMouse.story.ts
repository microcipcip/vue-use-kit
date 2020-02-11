import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseMouseDemo from './UseMouseDemo.vue'
import UseMouseAdvancedDemo from './UseMouseAdvancedDemo.vue'

const functionName = 'useMouse'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMouseDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseMouseDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

const advancedDemo = () => ({
  components: { StoryTitle, demo: UseMouseAdvancedDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseMouseAdvancedDemo.vue">
        <template v-slot:title>Advanced demo</template>
        <template v-slot:intro>
          <p>
            <strong>Click anywhere</strong> in the document to start/stop the <i>emoji element</i> 
            tracking of the mouse 'x' and 'y' position. 
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useMouse', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
  .add('Advanced Demo', advancedDemo)
