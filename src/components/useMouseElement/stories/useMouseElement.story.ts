import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseMouseElementDemo from './UseMouseElementDemo.vue'

const storiesPath = __dirname
const notes = require('./useMouseElement.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseMouseElementDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseMouseElementDemo.vue">
        <template v-slot:title>Demo</template>
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
