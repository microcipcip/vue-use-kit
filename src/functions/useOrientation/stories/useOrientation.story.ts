import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseOrientationDemo from './UseOrientationDemo.vue'

const functionName = 'useOrientation'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseOrientationDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseOrientationDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try to rotate your device</strong> to see the value changes.
            Please note that this will work only on supported devices.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useOrientation', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
