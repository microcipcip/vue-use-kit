import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseSampleComponentDemo from './UseSampleComponentDemo.vue'

const storiesPath = __dirname
const notes = require('./useSampleComponent.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseSampleComponentDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseSampleComponentDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('category|useSampleComponent', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
