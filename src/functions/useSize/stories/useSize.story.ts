import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseSizeDemo from './UseSizeDemo.vue'

const functionName = 'useSize'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseSizeDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseSizeDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try to resize the box below by dragging the handle</strong> in the bottom right hand corner.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useSize', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
