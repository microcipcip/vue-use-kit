import { mount } from '@src/helpers/test'
import { ref } from '@src/api'
import { useRafFn } from '@src/vue-use-kit'

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
      <div id="elapsedTime" v-text="elapsedTime"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const elapsedTime = ref(0)

    const { isRunning, start, stop } = useRafFn(
      () => {
        elapsedTime.value = elapsedTime.value + 1
      },
      60,
      onMount
    )

    return { isRunning, elapsedTime, start, stop }
  }
})

describe('useRafFn', () => {
  it('should not show #isRunning when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(rafSpy).not.toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
    expect(wrapper.find('#elapsedTime').text()).toBe('0')
  })

  it('should show #isRunning when onMount is true', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(rafSpy).toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
    expect(wrapper.find('#elapsedTime').text()).toBe(`${totCalls}`)
  })
})
