import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseRafFnDemo from './UseRafFnDemo.vue'

const functionName = 'useRafFn'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseRafFnDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseRafFnDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Click the button below</strong> to start the Raf loop. <strong>Change the fps value</strong> 
            in the input below to see the animation speed change on the fly.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useRafFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
