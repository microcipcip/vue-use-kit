import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseWindowSizeDemo from './UseWindowSizeDemo.vue'

const functionName = 'useWindowSize'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseWindowSizeDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseWindowSizeDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try to resize the window</strong> to see the <strong>width</strong> and <strong>height</strong> values change on the fly.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useWindowSize', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
