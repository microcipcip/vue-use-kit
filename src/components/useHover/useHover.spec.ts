import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useHover } from '../../vue-use-kit'

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
    expect(removeEventListenerSpy).not.toHaveBeenCalled()
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalled()
  })

  it('should return isHovered false by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#isHovered').exists()).toBe(false)
  })
})
