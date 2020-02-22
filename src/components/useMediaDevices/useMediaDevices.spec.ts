import { mount } from '@src/helpers/test'
import { useMediaDevices } from '@src/vue-use-kit'

const mediaDeviceInfo = {
  deviceId: 'string',
  groupId: 'string',
  kind: 'string',
  label: 'string'
}
const mediaDevices = [mediaDeviceInfo, mediaDeviceInfo]
let enumerateDevices: any
beforeEach(() => {
  enumerateDevices = () => Promise.resolve(mediaDevices)
  ;(navigator as any).mediaDevices = {
    enumerateDevices,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="devicesState">{{JSON.stringify(devicesState)}}</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { devicesState, isTracking, start, stop } = useMediaDevices(onMount)
    return { devicesState, isTracking, start, stop }
  }
})

describe('useMediaDevices', () => {
  const event = 'devicechange'
  it('should call devicechange onMounted', async () => {
    const addEventListenerSpy = jest.spyOn(
      navigator.mediaDevices,
      'addEventListener'
    )
    const removeEventListenerSpy = jest.spyOn(
      navigator.mediaDevices,
      'removeEventListener'
    )
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(addEventListenerSpy).toBeCalledWith(event, expect.any(Function))

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).toBeCalledWith(event, expect.any(Function))
  })

  it('should call document.addEventListener again when start is called', async () => {
    const addEventListenerSpy = jest.spyOn(
      navigator.mediaDevices,
      'addEventListener'
    )
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1 * 2)
  })

  it('should call document.removeEventListener when stop is called', async () => {
    const removeEventListenerSpy = jest.spyOn(
      navigator.mediaDevices,
      'removeEventListener'
    )
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
})
