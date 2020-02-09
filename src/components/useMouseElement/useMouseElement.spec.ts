import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useMouseElement } from '../../vue-use-kit'

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
  it('should call document.addEventListener', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    expect(addEventListenerSpy).not.toHaveBeenCalled()
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).not.toHaveBeenCalled()

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    addEventListenerSpy.mockClear()
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
