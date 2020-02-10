import { mount } from '../../helpers/test'
import { useTimeout } from '../../vue-use-kit'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isIdle" v-if="isIdle"></div>
      <div id="isReady" v-if="isReady"></div>
    </div>
  `,
  setup() {
    const { isReady, isIdle } = useTimeout(1000)
    return { isReady, isIdle }
  }
})

describe('useTimeout', () => {
  it('should display #isReady when the timers are called, but not #isIdle', async () => {
    const wrapper = mount(testComponent())
    jest.runAllTimers()

    // Wait for Vue to append #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isReady').exists()).toBe(true)
    expect(wrapper.find('#isIdle').exists()).toBe(false)
  })
})