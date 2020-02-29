import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseRafDemo from './UseRafDemo.vue'

const functionName = 'useRaf'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseRafDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseRafDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Click the button below</strong> to stop the Raf loop. <strong>Change the fps value</strong> 
            in the input below to modify the clock update speed on the fly.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useRaf', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
