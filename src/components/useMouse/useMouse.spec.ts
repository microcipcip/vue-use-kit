import { mount } from '@src/helpers/test'
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
  it('should call document.addEventListener', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(addEventListenerSpy).toBeCalledWith(
      'mousemove',
      expect.any(Function)
    )
    expect(removeEventListenerSpy).not.toHaveBeenCalled()

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).toBeCalledWith(
      'mousemove',
      expect.any(Function)
    )
  })

  it('should not render any document before onMount since all values are 0 by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#docX').exists()).toBe(false)
    expect(wrapper.find('#docY').exists()).toBe(false)
  })
})
