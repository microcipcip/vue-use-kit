import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useRafFn } from '../../vue-use-kit'

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
  rafSpy.mockClear()
})

const testComponent = (onMount = false) => ({
  template: `
    <div>
      <div id="isRunning" v-if="isRunning" />
      <div id="counter" v-text="counter"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const counter = ref(0)

    const { isRunning, start, stop } = useRafFn(
      () => {
        counter.value = counter.value + 1
      },
      60,
      onMount
    )

    return { isRunning, counter, start, stop }
  }
})

describe('useRafFn', () => {
  it('should not display #isRunning when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(rafSpy).not.toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(false)
    expect(wrapper.find('#counter').text()).toBe('0')
  })

  it('should display #isRunning when onMount is true', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(rafSpy).toHaveBeenCalled()
    expect(wrapper.find('#isRunning').exists()).toBe(true)
    expect(wrapper.find('#counter').text()).toBe(`${totCalls}`)
  })
})
