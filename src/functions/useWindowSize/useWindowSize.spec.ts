import { useWindowSize } from '@src/vue-use-kit'
import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="width" v-if="width">{{width}}</div>
      <div id="height" v-if="height">{{height}}</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { width, height, isTracking, start, stop } = useWindowSize(onMount)
    return { width, height, isTracking, start, stop }
  }
})

describe('useWindowSize', () => {
  const events = ['resize']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(window, events, testComponent)
  })

  it('should add events again when start is called', async () => {
    await checkOnStartEvents(window, events, testComponent)
  })

  it('should remove events when stop is called', async () => {
    await checkOnStopEvents(window, events, testComponent)
  })

  it('should show #isTracking when runOnMount is true', async () => {
    await checkElementExistenceOnMount(true, testComponent(true))
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent(false))
  })

  it('should display the width and height values', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#width').text()).toEqual(`${window.innerWidth}`)
    expect(wrapper.find('#height').text()).toEqual(`${window.innerHeight}`)
  })
})
