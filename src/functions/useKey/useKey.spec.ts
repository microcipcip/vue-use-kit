import {
  mount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  checkElementExistenceOnMount
} from '@src/helpers/test'
import { useKey } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (filter = 'a', callback = () => ``, onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="isPressed" v-if="isPressed"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { isPressed, isTracking, start, stop } = useKey(
      filter,
      callback,
      onMount
    )
    return { isPressed, isTracking, start, stop }
  }
})

describe('useKey', () => {
  const noop = () => ``
  const events = ['keyup', 'keydown']

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
    await checkElementExistenceOnMount(true, testComponent('a', noop, true))
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent('a', noop, false))
  })

  it('should not show #isPressed when no key has been pressed', async () => {
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isPressed').exists()).toBe(false)
  })
})
