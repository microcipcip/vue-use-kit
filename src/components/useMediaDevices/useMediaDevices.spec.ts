import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
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
  const events = ['devicechange']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(
      navigator.mediaDevices,
      events,
      testComponent
    )
  })

  it('should add events again when start is called', async () => {
    await checkOnStartEvents(navigator.mediaDevices, events, testComponent)
  })

  it('should remove events when stop is called', async () => {
    await checkOnStopEvents(navigator.mediaDevices, events, testComponent)
  })

  it('should show #isTracking when runOnMount is true', async () => {
    await checkElementExistenceOnMount(true, testComponent)
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent)
  })
})
