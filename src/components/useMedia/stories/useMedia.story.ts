import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseMediaDemo from './UseMediaDemo.vue'
import UseMediaAdvancedDemo from './UseMediaAdvancedDemo.vue'

const storiesPath = __dirname
const notes = require('./useMedia.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMediaDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseMediaDemo.vue">
        <template v-slot:title>Basic demo</template>
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
      <story-title stories-path="${storiesPath}" file-name="UseMediaAdvancedDemo.vue">
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
  .add('Basic demo', basicDemo)
  .add('Advanced demo', advancedDemo)
