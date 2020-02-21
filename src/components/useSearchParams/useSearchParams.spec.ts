import { mount } from '@src/helpers/test'
import { useSearchParams } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (onMount = true) => ({
  template: `
    <div>
      <div id="isTracking" v-if="isTracking"></div>
      <div id="searchParams">{{JSON.stringify(searchParams)}}</div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { searchParams, isTracking, start, stop } = useSearchParams(
      ['search', 'filter'],
      onMount
    )
    return { searchParams, isTracking, start, stop }
  }
})

describe('useSearchParams', () => {
  const params = {
    search: 'gattus',
    filter: '[ga, tt, us]',
    nottracked: 'topus'
  }
  const events = ['popstate', 'pushstate', 'replacestate']

  it('should call popstate, pushstate and replacestate onMounted', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(testComponent())
    await wrapper.vm.$nextTick()
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(addEventListenerSpy).toBeCalledWith(event, expect.any(Function))
    })

    // Destroy instance to check if the remove event listener is being called
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
    events.forEach(event => {
      expect(removeEventListenerSpy).toBeCalledWith(event, expect.any(Function))
    })
  })

  it('should call document.addEventListener again when start is called', async () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const wrapper = mount(testComponent())
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length)
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    wrapper.find('#start').trigger('click')
    expect(addEventListenerSpy).toHaveBeenCalledTimes(events.length * 2)
  })

  it('should call document.removeEventListener when stop is called', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const wrapper = mount(testComponent())
    wrapper.find('#stop').trigger('click')

    // Wait for Vue to append #start in the DOM
    await wrapper.vm.$nextTick()
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(events.length)
  })

  it('should show #isTracking when onMount is true', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isTracking').exists()).toBe(true)
  })

  it('should not show #isTracking when onMount is false', async () => {
    const wrapper = mount(testComponent(false))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isTracking').exists()).toBe(false)
  })

  it('should display the searchParams object with all parameter keys', async () => {
    const wrapper = mount(testComponent(true))
    await wrapper.vm.$nextTick()
    expect(wrapper.text().includes('search')).toBe(true)
    expect(wrapper.text().includes('filter')).toBe(true)
  })

  it('should display the searchParams object with all parameter values, except nottracked', async () => {
    const wrapper = mount(testComponent(true))
    history.pushState(
      {},
      '',
      `${window.location.origin}?search=${params.search}&filter=${params.filter}&nottracked=${params.nottracked}`
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.text().includes(params.search)).toBe(true)
    expect(wrapper.text().includes(params.filter)).toBe(true)
    expect(wrapper.text().includes(params.nottracked)).toBe(false)
  })
})
