import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseGeolocationDemo from './UseGeolocationDemo.vue'

const functionName = 'useGeolocation'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseGeolocationDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseGeolocationDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useGeolocation', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
