import { mount } from '../../helpers/test'
import { useMouse } from '../../vue-use-kit'

const testComponent = () => ({
  template: `
    <div>
      <div id="docX" v-if="docX" />
      <div id="docY" v-if="docY" />
      <div id="elX" v-if="elX" />
      <div id="elY" v-if="elY" />
    </div>
  `,
  setup() {
    const { docX, docY, elX, elY } = useMouse()
    return { docX, docY, elX, elY }
  }
})

describe('useMouse', () => {
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
  })
})
