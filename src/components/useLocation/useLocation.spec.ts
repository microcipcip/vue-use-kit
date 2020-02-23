import { mount } from '@src/helpers/test'
import { useLocation } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="locationState">{{JSON.stringify(locationState)}}</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { locationState, isTracking, start, stop } = useLocation(onMount)
    return { locationState, isTracking, start, stop }
  }
})

describe('useLocation', () => {
  const locationStateKeys = [
    'trigger',
    'state',
    'length',
    'hash',
    'host',
    'hostname',
    'href',
    'origin',
    'pathname',
    'port',
    'protocol',
    'search'
  ]
  const events = ['popstate', 'pushstate', 'replacestate']

  it('should call popstate, pushstate and replacestate onMounted', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(addEventListenerSpy).toBeCalledWith(event, expect.any(Function))
    })

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(removeEventListenerSpy).toBeCalledWith(event, expect.any(Function))
    })
  })

  it('should call addEventListener again when start is called', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length * 2)
  })

  it('should call removeEventListener when stop is called', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(testComponent())
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
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

  it('should display the locationState object', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    locationStateKeys.forEach(locationKey => {
      expect(wrapper.text().includes(locationKey)).toBe(true)
    })
  })
})
