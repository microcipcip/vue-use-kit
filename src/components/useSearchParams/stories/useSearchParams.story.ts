import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseSearchParamsDemo from './UseSearchParamsDemo.vue'

const functionName = 'useSearchParams'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseSearchParamsDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseSearchParamsDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Try populating 'Search' and 'filter' param fields</strong> to see the searchParams change
            on the fly. 
          </p>
          <p>
            <strong>Please note that in this demo you won't see the browser's bar navigation change</strong> 
            because this example is within an iframe. Click the "Open canvas in new tab" button on the 
            top right hand corner to see the demo without iframe.
          </p>        
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useSearchParams', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
