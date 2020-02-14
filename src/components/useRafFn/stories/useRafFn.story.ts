import { storiesOf } from '@storybook/vue'
import path from 'path'
import StoryTitle from '@src/helpers/StoryTitle.vue'
import UseRafFnDemo from './UseRafFnDemo.vue'
import UseRafFnAdvancedDemo from './UseRafFnAdvancedDemo.vue'

const functionName = 'useRafFn'
const functionPath = path.resolve(__dirname, '..')
const notes = require(`./${functionName}.md`).default

const basicDemo = () => ({
  components: { StoryTitle, demo: UseRafFnDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseRafFnDemo.vue"
      >
        <template v-slot:title></template>
        <template v-slot:intro>
          <p>
            <strong>Click the button below</strong> to start the Raf loop. <strong>Change the fps value</strong> 
            in the input below to see the animation speed change on the fly.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

const advancedDemo = () => ({
  components: { StoryTitle, demo: UseRafFnAdvancedDemo },
  template: `
    <div class="container">
      <story-title 
        function-path="${functionPath}" 
        source-name="${functionName}" 
        demo-name="UseRafFnAdvancedDemo.vue"
      >
        <template v-slot:title>Advanced demo</template>
        <template v-slot:intro>
          <p>
            The following is <a href="demo/muybridge.png" target="_blank">the sprite</a> of the famous
            Muybridge's work <a href="https://en.wikipedia.org/wiki/The_Horse_in_Motion">Horse in motion</a>.  
          </p>        
          <p>
            You can play with the animation with the play, pause, forward and backward buttons.
            You can also change the 'fps' value to make the horse run faster/slower.
          </p>
        </template>
      </story-title>
      <demo />
    </div>`
})

storiesOf('animations|useRafFn', module)
  .addParameters({ notes })
  .add('Demo', basicDemo)
  .add('Advanced Demo', advancedDemo)
