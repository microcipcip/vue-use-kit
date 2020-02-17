import { mount } from '@src/helpers/test'
import { useIdle, idleEventsList } from '@src/vue-use-kit'

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
  // the total of the events is idleEventsList + visibilitychange
  const totEvents = idleEventsList.length + 1

  it('should call document.addEventListener', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    expect(addEventListenerSpy).not.toHaveBeenCalled()
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(totEvents)
    expect(addEventListenerSpy).toBeCalledWith(
      'mousemove',
      expect.any(Function)
    )

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(totEvents)
    expect(removeEventListenerSpy).toBeCalledWith(
      'mousemove',
      expect.any(Function)
    )
  })

  it('should call document.addEventListener again when start is called', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalledTimes(totEvents)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(addEventListenerSpy).toHaveBeenCalledTimes(totEvents * 2)
  })

  it('should call document.removeEventListener when stop is called', async () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = mount(testComponent())
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(totEvents)
  })
})
