import {
  checkElementExistenceOnMount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents
} from '@src/helpers/test'
import { ref } from '@src/api'
import { useBeforeUnload } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const isDirty = ref(false)
    const { isTracking, start, stop } = useBeforeUnload(isDirty, onMount)
    return { isTracking, start, stop }
  }
})

describe('useBeforeUnload', () => {
  const events = ['beforeunload']

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
})
