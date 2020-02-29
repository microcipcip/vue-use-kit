import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
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
    await checkElementExistenceOnMount(true, testComponent)
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent)
  })

  it('should display the locationState object', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    locationStateKeys.forEach(locationKey => {
      expect(wrapper.text().includes(locationKey)).toBe(true)
    })
  })
})
