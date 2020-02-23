import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseCookieDemo from './UseCookieDemo.vue'

const functionName = 'useCookie'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseCookieDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseCookieDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro></template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('side effects|useCookie', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
