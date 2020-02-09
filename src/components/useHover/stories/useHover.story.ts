import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseHoverDemo from './UseHoverDemo.vue'

const storiesPath = __dirname
const notes = require('./useHover.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseHoverDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseHoverDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro>
          Try to move the mouse hover the box below to see the emoji change of expression. 
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useHover', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
