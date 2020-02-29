import { checkOnMountAndUnmountEvents, mount } from '@src/helpers/test'
import { useMouse } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="docX" v-if="docX" />
      <div id="docY" v-if="docY" />
    </div>
  `,
  setup() {
    const { docX, docY } = useMouse()
    return { docX, docY }
  }
})

describe('useMouse', () => {
  const events = ['mousemove']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })

  it('should not render any document before mounted since all values are 0 by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#docX').exists()).toBe(false)
    expect(wrapper.find('#docY').exists()).toBe(false)
  })
})
