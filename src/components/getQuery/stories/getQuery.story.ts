import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import GetQueryDemo from './GetQueryDemo.vue'

const storiesPath = __dirname
const notes = require('./getQuery.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: GetQueryDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}"  file-name="GetQueryDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('utils|getQuery', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
