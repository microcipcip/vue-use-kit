import { mount } from '@src/helpers/test'
import { ref } from '@vue/composition-api'
import { useClickAway } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = () => ({
  template: `
    <div id="outside-el">
      <div ref="dropdownRef" id="dropdown-trigger"></div>
      <div id="dropdown" v-if="isDropdownOpen"></div>
    </div>
  `,
  setup() {
    const dropdownRef = ref(null)
    const isDropdownOpen = ref(false)

    useClickAway(dropdownRef, () => {
      isDropdownOpen.value = true
    })

    return { dropdownRef, isDropdownOpen }
  }
})

describe('useClickAway', () => {
  it('should call document.addEventListener', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalled()
    expect(addEventListenerSpy).toBeCalledWith(
      'mousedown',
      expect.any(Function)
    )

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toBeCalledWith(
      'mousedown',
      expect.any(Function)
    )
  })
})
