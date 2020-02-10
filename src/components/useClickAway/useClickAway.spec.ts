import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useClickAway } from '../../vue-use-kit'

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
    expect(addEventListenerSpy).not.toHaveBeenCalled()
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalled()

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalled()
    addEventListenerSpy.mockClear()
  })
})
