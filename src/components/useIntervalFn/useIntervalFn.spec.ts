import { mount } from '@src/helpers/test'
import { ref } from '@src/api'
import { useIntervalFn } from '@src/vue-use-kit'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="callbackCounter" v-text="callbackCounter" />
      <div id="isRunning" v-if="isRunning"></div>
      <button id="stop" @click="stop"></button>
      <button id="start" @click="start"></button>
    </div>
  `,
  setup() {
    const callbackCounter = ref(0)
    const { isRunning, start, stop } = useIntervalFn(
      () => {
        callbackCounter.value = callbackCounter.value + 1
      },
      1000,
      onMount
    )
    return { isRunning, start, stop, callbackCounter }
  }
})

describe('useIntervalFn', () => {
  it('should call setInterval onMounted', () => {
    expect(setInterval).toHaveBeenCalledTimes(0)
    mount(testComponent())
    jest.advanceTimersByTime(1500)
    expect(setInterval).toHaveBeenCalled()
  })

  it('should call callback several times', async () => {
    const wrapper = mount(testComponent())
    jest.advanceTimersByTime(25500)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#callbackCounter').text()).toBe('25')
  })

  it('should not show #isRunning when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    jest.advanceTimersByTime(1500)

    // Wait for Vue rerender
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
  })

  it('should show #isRunning when the intervals are called', async () => {
    const wrapper = mount(testComponent())
    jest.advanceTimersByTime(1500)

    // Wait for Vue to append #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
  })

  it('should show #isRunning when start is called', async () => {
    const wrapper = mount(testComponent(false))
    jest.advanceTimersByTime(1500)

    // Wait for Vue to append #isRunning in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
    wrapper.find('#start').trigger('click')
    jest.advanceTimersByTime(2500)

    // Wait for Vue to remove #isRunning from the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
  })

  it('should hide #isRunning when stop is called', async () => {
    const wrapper = mount(testComponent())
    jest.advanceTimersByTime(1500)

    // Wait for Vue to append #isRunning in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
    wrapper.find('#stop').trigger('click')
    jest.advanceTimersByTime(2500)

    // Wait for Vue to remove #isRunning from the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
  })
})
