import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '../../../helpers/StoryTitle.vue'
import UseClickAwayDemo from './UseClickAwayDemo.vue'

const functionName = 'useClickAway'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseClickAwayDemo },
  template: `
    <div class="container">
      <story-title function-path="${functionPath}" source-name="${functionName}" demo-name="UseClickAwayDemo.vue">
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
