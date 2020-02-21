import { mount } from '@src/helpers/test'
import { ref } from '@vue/composition-api'
import { useFullscreen } from '@src/vue-use-kit'

// This feature is difficult to test therefore
// I've only written a simple test

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div id="divRef" ref="divRef">
      <div id="isFullscreen" v-if="isFullscreen"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const divRef = ref(null)
    const { isFullscreen, start, stop } = useFullscreen(divRef)
    return { isFullscreen, start, stop, divRef }
  }
})

describe('useFullscreen', () => {
  it('should not be fullscreen onMounted', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#isFullscreen').exists()).toBe(false)
  })
})
