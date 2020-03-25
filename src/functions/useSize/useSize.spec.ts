import { ref } from '@src/api'
import { mount } from '@src/helpers/test'
import { useSize } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

let observe: any
let unobserve: any
let disconnect: any
beforeEach(() => {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  ;(window as any).ResizeObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect
  }))
})

const testComponent = (onMount = true) => ({
  template: `
    <div ref="elRef">
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const elRef = ref(null)
    const { start, stop } = useSize(elRef, {}, onMount)
    return { start, stop, elRef }
  }
})

describe('useSize', () => {
  it('should call ResizeObserver on mounted', () => {
    expect(observe).toHaveBeenCalledTimes(0)
    mount(testComponent())
    expect(observe).toHaveBeenCalledTimes(1)
  })

  it('should call ResizeObserver again when start is called', async () => {
    expect(observe).toHaveBeenCalledTimes(0)
    const wrapper = mount(testComponent())
    expect(observe).toHaveBeenCalledTimes(1)
    wrapper.find('#stop').trigger('click')
    wrapper.find('#start').trigger('click')
    await wrapper.vm.$nextTick()
    expect(observe).toHaveBeenCalledTimes(2)
  })
})
