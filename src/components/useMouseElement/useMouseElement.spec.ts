import { checkOnMountAndUnmountEvents, mount } from '@src/helpers/test'
import { ref } from '@vue/composition-api'
import { useMouseElement } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div ref="divRef">
      <div id="docX" v-if="docX" />
      <div id="docY" v-if="docY" />
      <div id="elX" v-if="elX" />
      <div id="elY" v-if="elY" />
      <div id="elInfoX" v-if="elInfoX" />
      <div id="elInfoY" v-if="elInfoY" />
      <div id="elInfoW" v-if="elInfoW" />
      <div id="elInfoH" v-if="elInfoH" />
    </div>
  `,
  setup() {
    const divRef = ref(null)
    const {
      docX,
      docY,
      elX,
      elY,
      elInfoX,
      elInfoY,
      elInfoW,
      elInfoH
    } = useMouseElement(divRef)
    return { docX, docY, elX, elY, elInfoX, elInfoY, elInfoW, elInfoH, divRef }
  }
})

describe('useMouseElement', () => {
  const events = ['mousemove']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })

  it('should not render any document before onMount since all values are 0 by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#docX').exists()).toBe(false)
    expect(wrapper.find('#docY').exists()).toBe(false)
    expect(wrapper.find('#elX').exists()).toBe(false)
    expect(wrapper.find('#elY').exists()).toBe(false)
    expect(wrapper.find('#elInfoX').exists()).toBe(false)
    expect(wrapper.find('#elInfoY').exists()).toBe(false)
    expect(wrapper.find('#elInfoW').exists()).toBe(false)
    expect(wrapper.find('#elInfoH').exists()).toBe(false)
  })
})
