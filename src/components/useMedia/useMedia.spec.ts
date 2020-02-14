import { mount } from '@src/helpers/test'
import { getQuery, useMedia } from '@src/vue-use-kit'

const createMediaQueryListMock = (matchingQuery: string) => (
  query: string
): any => ({
  listeners: {},
  matches: query === matchingQuery,
  addListener(cb: Function) {
    this.listeners.cb = cb
  },
  removeListener() {
    delete this.listeners.cb
  }
})

const testComponent = (
  mobileQuery: string,
  desktopQuery: string,
  defaultState = false
) => ({
  template: `
    <div>
      <div id="mobile" v-if="isMobile" />
      <div id="desktop" v-if="isDesktop" />
    </div>
  `,
  setup() {
    const isMobile = useMedia(mobileQuery, defaultState)
    const isDesktop = useMedia(desktopQuery, defaultState)
    return { isMobile, isDesktop }
  }
})

describe('useMedia', () => {
  const desktopQuery = getQuery(1024)
  const mobileQuery = getQuery(0, 1024)

  it('should call window.matchMedia', () => {
    window.matchMedia = createMediaQueryListMock(desktopQuery)
    const matchMediaSpy = jest.spyOn(window, 'matchMedia')

    expect(matchMediaSpy).not.toHaveBeenCalled()
    mount(testComponent(mobileQuery, desktopQuery))
    expect(matchMediaSpy).toHaveBeenCalled()

    matchMediaSpy.mockClear()
  })

  it('display the #desktop element when it matches', async () => {
    window.matchMedia = createMediaQueryListMock(desktopQuery)
    const wrapper = mount(testComponent(mobileQuery, desktopQuery))
    expect(wrapper.find('#mobile').exists()).toBe(false)
    expect(wrapper.find('#desktop').exists()).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#mobile').exists()).toBe(false)
    expect(wrapper.find('#desktop').exists()).toBe(true)
  })

  it('display the #mobile element when it matches', async () => {
    window.matchMedia = createMediaQueryListMock(mobileQuery)
    const wrapper = mount(testComponent(mobileQuery, desktopQuery))
    expect(wrapper.find('#mobile').exists()).toBe(false)
    expect(wrapper.find('#desktop').exists()).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#mobile').exists()).toBe(true)
    expect(wrapper.find('#desktop').exists()).toBe(false)
  })

  it('should always return a boolean value type', () => {
    window.matchMedia = createMediaQueryListMock(desktopQuery)
    const { vm } = mount(testComponent(mobileQuery, desktopQuery))
    expect(typeof (vm as any).isDesktop === 'boolean').toBe(true)
    expect(typeof (vm as any).isMobile === 'boolean').toBe(true)
  })

  it('should return false when initialized with defaultState false, for SSR fallback', () => {
    window.matchMedia = createMediaQueryListMock(desktopQuery)
    const wrapper = mount(testComponent(mobileQuery, desktopQuery))
    expect(wrapper.find('#mobile').exists()).toBe(false)
    expect(wrapper.find('#desktop').exists()).toBe(false)
  })

  it('should return true when initialized with defaultState true, for SSR fallback', () => {
    window.matchMedia = createMediaQueryListMock(desktopQuery)
    const wrapper = mount(testComponent(mobileQuery, desktopQuery, true))
    expect(wrapper.find('#mobile').exists()).toBe(true)
    expect(wrapper.find('#desktop').exists()).toBe(true)
  })
})
