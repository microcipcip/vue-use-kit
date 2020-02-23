import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
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
  const events = ['mouseout']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })

  it('should add events again when start is called', async () => {
    await checkOnStartEvents(document, events, testComponent)
  })

  it('should remove events when stop is called', async () => {
    await checkOnStopEvents(document, events, testComponent)
  })

  it('should show #isTracking when runOnMount is true', async () => {
    await checkElementExistenceOnMount(true, testComponent)
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent)
  })

  it('should not show #hasLeftPage when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent, '#hasLeftPage')
  })
})
