import { storiesOf } from '@storybook/vue'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseClickAwayDemo from './UseClickAwayDemo.vue'

const storiesPath = __dirname
const notes = require('./useClickAway.md').default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseClickAwayDemo },
  template: `
    <div class="container">
      <story-title stories-path="${storiesPath}" file-name="UseClickAwayDemo.vue">
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            Open the dropdown below then <strong>click anywhere outside</strong> to close it.   
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('ui|useClickAway', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
