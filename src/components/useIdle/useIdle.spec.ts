import {
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
import { useIdle, idleEventsList } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isIdle" v-if="isIdle"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { isIdle, stop, start } = useIdle(3000)
    return { isIdle, stop, start }
  }
})

describe('useIdle', () => {
  const events = [...idleEventsList, 'visibilitychange']

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(document, events, testComponent)
  })

  it('should add events again when start is called', async () => {
    await checkOnStartEvents(document, events, testComponent)
  })

  it('should remove events when stop is called', async () => {
    await checkOnStopEvents(document, events, testComponent)
  })
})
