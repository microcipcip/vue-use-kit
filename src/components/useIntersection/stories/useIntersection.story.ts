import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseIntersectionDemo from './UseIntersectionDemo.vue'
import UseIntersectionAdvancedDemo from './UseIntersectionAdvancedDemo.vue'

const functionName = 'useIntersection'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseIntersectionDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseIntersectionDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

const advancedDemo = () => ({
  components: { StoryTitle, demo: UseIntersectionAdvancedDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseIntersectionAdvancedDemo.vue"
      >
        <template v-slot:title>Advanced Demo</template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('sensors|useIntersection', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
  .add('Advanced Demo', advancedDemo)
