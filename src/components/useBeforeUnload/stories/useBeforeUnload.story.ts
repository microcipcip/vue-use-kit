import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseBeforeUnloadDemo from './UseBeforeUnloadDemo.vue'

const functionName = 'useBeforeUnload'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseBeforeUnloadDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseBeforeUnloadDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try typing some text in the field below</strong> then hit the 'Change page' 
            button to see the alert message. 
          </p>
          <p>
            You can also try to leave the field empty and hit again the 'Change page' button and you'll 
            be able to change page without any confirmation message.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('side effects|useBeforeUnload', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
