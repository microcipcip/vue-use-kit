import { mount } from '@src/helpers/test'
import { useIdle } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isIdle" v-if="isIdle"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { isIdle, stop, start } = useIdle(3000)
    return { isIdle, stop, start }
  }
})

describe('useIdle', () => {
  it('should do something', () => {
    // Add test here
  })
})
