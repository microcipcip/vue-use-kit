import { mount } from '@src/helpers/test'
import { useRaf } from '@src/vue-use-kit'

let rafSpy: any = null
// Logic to avoid infinite loop
const totCalls = 4
let count = 0
beforeEach(() => {
  window.requestAnimationFrame = (cb: any) => {
    if (count >= totCalls) return
    count++
    return cb()
  }
  rafSpy = jest.spyOn(window, 'requestAnimationFrame')
})

afterEach(() => {
  count = 0
  jest.clearAllMocks()
})

const testComponent = (onMount = false) => ({
  template: `
    <div>
      <div id="isRunning" v-if="isRunning" />
      <div id="elapsed" v-text="elapsed"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { isRunning, elapsed, start, stop } = useRaf(60, onMount)
    return { isRunning, elapsed, start, stop }
  }
})

describe('useRaf', () => {
  it('should not show #isRunning when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(rafSpy).not.toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
    expect(wrapper.find('#elapsed').text()).toBe('0')
  })

  it('should show #isRunning when onMount is true', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(rafSpy).toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
  })
})
