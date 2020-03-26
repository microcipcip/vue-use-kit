import { mount } from '@src/helpers/test'
import { useScrollbarWidth } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="scrollbarWidth">{{ scrollbarWidth }}</div>
      <button id="getScrollbarWidth" @click="getScrollbarWidth"></button>
    </div>
  `,
  setup() {
    const { scrollbarWidth, getScrollbarWidth } = useScrollbarWidth(onMount)
    return { scrollbarWidth, getScrollbarWidth }
  }
})

describe('useScrollbarWidth', () => {
  it('should return a scrollbarWidth as a numeric value', async () => {
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#scrollbarWidth').text()).toBe('0')
  })
})
