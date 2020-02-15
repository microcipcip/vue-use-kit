import { mount } from '@src/helpers/test'
import { useInterval } from '@src/vue-use-kit'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

const testComponent = () => ({
  template: `
    <div>
      <div id="isRunning" v-if="isRunning"></div>
    </div>
  `,
  setup() {
    const { isRunning } = useInterval(1000)
    return { isRunning }
  }
})

describe('useInterval', () => {
  it('should show #isRunning when the intervals are called', async () => {
    const wrapper = mount(testComponent())
    jest.advanceTimersByTime(1500)

    // Wait for Vue to append #isReady in the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
  })
})
