import { mount } from '@src/helpers/test'
import { useMouseLeavePage } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="hasLeftPage" v-if="hasLeftPage"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { hasLeftPage, isTracking, start, stop } = useMouseLeavePage(onMount)
    return { hasLeftPage, isTracking, start, stop }
  }
})

describe('useMouseLeavePage', () => {
  const eventName = 'mouseout'
  it('should call mouseout onMounted', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(addEventListenerSpy).toBeCalledWith(eventName, expect.any(Function))

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).toBeCalledWith(
      eventName,
      expect.any(Function)
    )
  })

  it('should call addEventListener again when start is called', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1 * 2)
  })

  it('should call removeEventListener when stop is called', async () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = mount(testComponent())
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
  })

  it('should show #isTracking when onMount is true', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isTracking').exists()).toBe(true)
  })

  it('should not show #isTracking when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isTracking').exists()).toBe(false)
  })

  it('should not show #hasLeftPage when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#hasLeftPage').exists()).toBe(false)
  })
})
