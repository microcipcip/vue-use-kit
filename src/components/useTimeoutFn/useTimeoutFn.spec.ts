import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useTimeoutFn } from '../../vue-use-kit'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isIdle" v-if="isIdle"></div>
      <div id="isReady" v-if="isReady">
        <button id="cancel" @click="cancel"></button>
        <button id="reset" @click="reset"></button>
        <div id="isCallbackCalled" v-if="isCallbackCalled"></div>
      </div>
    </div>
  `,
  setup() {
    const isCallbackCalled = ref(false)
    const { isReady, isIdle, cancel, reset } = useTimeoutFn(
      () => {
        isCallbackCalled.value = true
      },
      1000,
      onMount
    )
    return { isReady, isIdle, cancel, reset, isCallbackCalled }
  }
})

describe('useTimeoutFn', () => {
  it('should call setTimeout when initialized', () => {
    expect(setTimeout).toHaveBeenCalledTimes(0)
    mount(testComponent())
    expect(setTimeout).toHaveBeenCalledTimes(1)
  })

  it('should call setTimeout again when reset is called', async () => {
    expect(setTimeout).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    expect(setTimeout).toHaveBeenCalledTimes(1)
    jest.runAllTimers()

    // Wait for Vue to append #reset in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#reset').trigger('click')
    expect(setTimeout).toHaveBeenCalledTimes(2)
  })

  it('should hide all elements when cancel is called', async () => {
    const wrapper = mount(testComponent())
    jest.runAllTimers()

    // Wait for Vue to append #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(true)
    wrapper.find('#cancel').trigger('click')
    jest.runAllTimers()

    // Wait for Vue to remove #isReady from the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(false)
  })

  it('should display #isReady when the timers are called', async () => {
    const wrapper = mount(testComponent())
    jest.runAllTimers()

    // Wait for Vue to append #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(true)
  })

  it('should not display #isReady when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    jest.runAllTimers()

    // Wait for Vue rerender
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(false)
    expect(wrapper.find('#isIdle').exists()).toBe(true)
  })
})
