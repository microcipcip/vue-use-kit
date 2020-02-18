import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseLocationDemo from './UseLocationDemo.vue'

const functionName = 'useLocation'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseLocationDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseLocationDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try pressing the 'Fire push event' and 'Fire replace event' buttons</strong> to see the state change
            on the fly. 
          </p>
          <p>
            <strong>Please note that in this demo you won't see the browser's bar navigation change</strong> 
            because this example is within an iframe. Click the "Open canvas in new tab" button on the 
            top right hand corner to see the demo without iframe.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useLocation', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
