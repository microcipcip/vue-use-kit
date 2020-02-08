import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseTimeoutDemo from './UseTimeoutDemo.vue'

const storiesPath = __dirname
const notes = require('./useTimeout.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseTimeoutDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseTimeoutDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useTimeout', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
