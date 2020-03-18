import {
  mount,
  checkOnMountAndUnmountEvents,
  checkOnStartEvents,
  checkOnStopEvents,
  checkElementExistenceOnMount
} from '@src/helpers/test'
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

  it('should add events on mounted and remove them on unmounted', async () => {
    await checkOnMountAndUnmountEvents(window, events, testComponent)
  })

  it('should add events again when start is called', async () => {
    await checkOnStartEvents(window, events, testComponent)
  })

  it('should remove events when stop is called', async () => {
    await checkOnStopEvents(window, events, testComponent)
  })

  it('should show #isTracking when runOnMount is true', async () => {
    await checkElementExistenceOnMount(true, testComponent(true))
  })

  it('should not show #isTracking when runOnMount is false', async () => {
    await checkElementExistenceOnMount(false, testComponent(false))
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
