import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseMouseLeavePageDemo from './UseMouseLeavePageDemo.vue'

const functionName = 'useMouseLeavePage'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMouseLeavePageDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseMouseLeavePageDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try moving the mouse outside the page boundaries</strong> to see the 
            hasLeftPage variable change on the fly. 
          </p>
          <p>
            Please note that because this demo is within an iframe 
            <strong>it will seem that the callback is firing when you are still within the page.</strong> 
            Click the "Open canvas in new tab" button on the 
            top right hand corner to see the demo without iframe.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useMouseLeavePage', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
