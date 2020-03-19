import {
  checkElementExistenceOnMount,
  checkOnStartEvents,
  checkOnStopEvents,
  mount
} from '@src/helpers/test'
import { ref } from '@src/api'
import { useScroll } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="isScrolling" v-if="isScrolling"></div>
      <div id="x" v-if="x === 0">{{ x }}px</div>
      <div id="y" v-if="y === 0">{{ y }}px</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { x, y, isScrolling, isTracking, start, stop } = useScroll(
      ref(window),
      150,
      onMount
    )
    return { x, y, isScrolling, isTracking, start, stop }
  }
})

describe('useScroll', () => {
  const events = ['scroll']

  it('should add events on mounted and remove them on unmounted', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(addEventListenerSpy).toBeCalledWith(
        event,
        expect.any(Function),
        expect.any(Object)
      )
    })

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(removeEventListenerSpy).toBeCalledWith(event, expect.any(Function))
    })
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

  it('should show #x and #y elements and not show #isScrolling', async () => {
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#x').exists()).toBe(true)
    expect(wrapper.find('#y').exists()).toBe(true)
    expect(wrapper.find('#isScrolling').exists()).toBe(false)
  })
})
