import { mount } from '../../helpers/test'
import { ref } from '../../api'
import { useMouseElement } from '../../vue-use-kit'

const testComponent = () => ({
  template: `
    <div ref="div">
      <div id="docX" v-if="docX" />
      <div id="docY" v-if="docY" />
      <div id="elX" v-if="elX" />
      <div id="elY" v-if="elY" />
      <div id="el.x" v-if="el.x" />
      <div id="el.y" v-if="el.y" />
      <div id="el.w" v-if="el.w" />
      <div id="el.h" v-if="el.h" />
    </div>
  `,
  setup() {
    const divRef = ref(null)
    const { docX, docY, elX, elY, el } = useMouseElement(divRef)
    return { docX, docY, elX, elY, el }
  }
})

describe('useMouseElement', () => {
  it('should call document.addEventListener', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    expect(addEventListenerSpy).not.toHaveBeenCalled()
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    expect(removeEventListenerSpy).not.toHaveBeenCalled()

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    addEventListenerSpy.mockClear()
  })

  it('should not render any document before onMount since all values are 0 by default', () => {
    const wrapper = mount(testComponent())
    expect(wrapper.find('#docX').exists()).toBe(false)
    expect(wrapper.find('#docY').exists()).toBe(false)
    expect(wrapper.find('#elX').exists()).toBe(false)
    expect(wrapper.find('#elY').exists()).toBe(false)
    expect(wrapper.find('#el.x').exists()).toBe(false)
    expect(wrapper.find('#el.y').exists()).toBe(false)
    expect(wrapper.find('#el.w').exists()).toBe(false)
    expect(wrapper.find('#el.h').exists()).toBe(false)
  })
})
