import { mount } from '@src/helpers/test'
import { useGeolocation } from '@src/vue-use-kit'

let watchPosition: any
let clearWatch: any
let getCurrentPosition: any

beforeEach(() => {
  watchPosition = jest.fn()
  clearWatch = jest.fn()
  getCurrentPosition = jest.fn().mockImplementationOnce(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })
    )
  )
  ;(navigator as any).geolocation = {
    watchPosition,
    clearWatch,
    getCurrentPosition
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { isTracking, geo, start, stop } = useGeolocation()
    return { isTracking, geo, start, stop }
  }
})

describe('useGeolocation', () => {
  it('should call getCurrentPosition and watchPosition onMounted', () => {
    expect(getCurrentPosition).toHaveBeenCalledTimes(0)
    expect(watchPosition).toHaveBeenCalledTimes(0)
    mount(testComponent())
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    expect(watchPosition).toHaveBeenCalledTimes(1)
  })

  it('should call clearWatch onUnmounted', () => {
    expect(clearWatch).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    wrapper.vm.$destroy()
    expect(clearWatch).toHaveBeenCalledTimes(1)
  })

  it('should call getCurrentPosition again when start is called', async () => {
    expect(getCurrentPosition).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(getCurrentPosition).toHaveBeenCalledTimes(2)
  })

  it('should call clearWatch when stop is called', async () => {
    expect(clearWatch).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    expect(clearWatch).toHaveBeenCalledTimes(1)
  })
})
