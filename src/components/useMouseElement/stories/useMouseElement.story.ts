import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseMouseElementDemo from './UseMouseElementDemo.vue'

const functionName = 'useMouseElement'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMouseElementDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseMouseElementDemo.vue">
        <template v-slot:title></template>
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

storiesOf('sensors|useMouseElement', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
