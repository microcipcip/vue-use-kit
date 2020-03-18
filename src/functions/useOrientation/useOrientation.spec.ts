import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
import { useOrientation } from '@src/vue-use-kit'

const screenOrientationMock = () => ({
  angle: 0,
  type: 'landscape-primary'
})

beforeEach(() => {
  ;(window as any).screen = {
    orientation: screenOrientationMock()
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

const defaultState = {
  angle: 0,
  type: 'landscape-primary'
}

const testComponent = (state = defaultState, onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="orientation">{{JSON.stringify(orientation)}}</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { orientation, isTracking, start, stop } = useOrientation(
      state,
      onMount
    )
    return { orientation, isTracking, start, stop }
  }
})

describe('useOrientation', () => {
  const events = ['orientationchange']
  const orientationKeys = Object.keys(defaultState)
  const orientationValues = Object.values(defaultState)

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
    await checkElementExistenceOnMount(true, testComponent(defaultState, true))
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(
      false,
      testComponent(defaultState, false)
    )
  })

  it('should display the orientation object keys and values', async () => {
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    orientationKeys.forEach(orientationKey => {
      expect(wrapper.text().includes(orientationKey)).toBe(true)
    })
    orientationValues.forEach(orientationValue => {
      expect(wrapper.text().includes(`${orientationValue}`)).toBe(true)
    })
  })
})
