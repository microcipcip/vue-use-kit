import { mount } from '@src/helpers/test'
import { ref } from '@vue/composition-api'
import { useHover } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div id="isHovered" v-if="isHovered"></div>
  `,
  setup() {
    const elRef = ref(document.body as any)
    const isHovered = useHover(elRef)
    return { isHovered }
  }
})

describe('useHover', () => {
  it('should call document.body hover events', () => {
    const addEventListenerSpy = jest.spyOn(document.body, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(
      document.body,
      'removeEventListener'
    )
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalled()
    expect(addEventListenerSpy).toBeCalledWith(
      'mouseenter',
      expect.any(Function)
    )
    expect(removeEventListenerSpy).not.toHaveBeenCalled()
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toBeCalledWith(
      'mouseenter',
      expect.any(Function)
    )
  })

  it('should return isHovered false by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#isHovered').exists()).toBe(false)
  })
})
