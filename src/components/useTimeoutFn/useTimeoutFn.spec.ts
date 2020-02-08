import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useTimeoutFn } from '../../vue-use-kit'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isReady" v-if="isReady">
        <button id="cancelTimer" @click="cancelTimer"></button>
        <button id="resetTimer" @click="resetTimer"></button>
        <div id="isCallbackCalled" v-if="isCallbackCalled"></div>
      </div>
    </div>
  `,
  setup() {
    const isCallbackCalled = ref(false)
    const { isReady, cancelTimer, resetTimer } = useTimeoutFn(() => {
      isCallbackCalled.value = true
    }, 1000)
    return { isReady, cancelTimer, resetTimer, isCallbackCalled }
  }
})

describe('useTimeoutFn', () => {
  it('should call setTimeout when initialized', () => {
    expect(setTimeout).toHaveBeenCalledTimes(0)
    mount(testComponent())
    expect(setTimeout).toHaveBeenCalledTimes(1)
  })

  it('should call setTimeout again when resetTimer is called', async () => {
    expect(setTimeout).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    expect(setTimeout).toHaveBeenCalledTimes(1)
    jest.runAllTimers()

    // Vue is inserting #resetTimer in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#resetTimer').trigger('click')
    expect(setTimeout).toHaveBeenCalledTimes(2)
  })

  it('should hide all elements when cancelTimer is called', async () => {
    const wrapper = mount(testComponent())
    jest.runAllTimers()

    // Vue is inserting #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(true)
    wrapper.find('#cancelTimer').trigger('click')
    jest.runAllTimers()

    // Vue is removing #isReady from the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(false)
  })

  it('should display #isReady when the timers are called', async () => {
    const wrapper = mount(testComponent())
    jest.runAllTimers()

    // Vue is inserting #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(true)
  })
})
