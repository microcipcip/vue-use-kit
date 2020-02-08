import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseTimeoutFnDemo from './UseTimeoutFnDemo.vue'

const storiesPath = __dirname
const notes = require('./useTimeoutFn.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseTimeoutFnDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseTimeoutFnDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useTimeoutFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
