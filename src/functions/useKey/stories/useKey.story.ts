import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseKeyDemo from './UseKeyDemo.vue'

const functionName = 'useKey'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseKeyDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseKeyDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useKey', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
