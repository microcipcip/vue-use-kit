import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseMediaDemo from './UseMediaDemo.vue'
import UseMediaAdvancedDemo from './UseMediaAdvancedDemo.vue'

const functionName = 'useMedia'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMediaDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseMediaDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            Try to resize the browser's window to see how the value below changes.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

const advancedDemo = () => ({
  components: { StoryTitle, demo: UseMediaAdvancedDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseMediaAdvancedDemo.vue">
        <template v-slot:title>Advanced demo</template>
        <template v-slot:intro>
          <p>
            Try to resize the browser's window to see how the values below change.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useMedia', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
  .add('Advanced demo', advancedDemo)
