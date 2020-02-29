import { checkOnMountAndUnmountEvents, mount } from '@src/helpers/test'
import { ref } from '@src/api'
import { useHover } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div id="isHovered" v-if="isHovered"></div>
  `,
  setup() {
    const elRef = ref(document.body as any)
    const isHovered = useHover(elRef)
    return { isHovered }
  }
})

describe('useHover', () => {
  const events = ['mouseenter', 'mouseleave']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document.body, events, testComponent)
  })

  it('should return isHovered false by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#isHovered').exists()).toBe(false)
  })
})
