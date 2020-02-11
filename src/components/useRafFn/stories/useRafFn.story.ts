import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseRafFnDemo from './UseRafFnDemo.vue'

const storiesPath = __dirname
const notes = require('./useRafFn.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseRafFnDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseRafFnDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useRafFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
