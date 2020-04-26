import { mount, flushPromises } from '@src/helpers/test'
import { useFetch } from '@src/vue-use-kit'

afterEach(() => {
  jest.clearAllMocks()
})

const abortError = 'AbortError'

const mockFetch = ({
  data = { text: 'Message here' },
  header = 'abcd;application/json',
  isAborted = false
} = {}) => {
  ;(window as any).fetch = () => {
    if (isAborted) {
      const err = new Error()
      err.name = abortError
      throw err
    }

    return {
      headers: {
        get: () => header
      },
      json: () => data
    }
  }
}

const testComponent = (url = '', opts: RequestInit = {}, onMount = true) => ({
  template: `
    <div>
      <div id="isLoading" v-if="isLoading"></div>
      <div id="isFailed" v-if="isFailed"></div>
      <div id="isAborted" v-if="isAborted"></div>
      <div id="data" v-if="data" v-text="data.text"></div>
      <button id="start" @click="start"></button>
      <button id="stop" @click="stop"></button>
    </div>
  `,
  setup() {
    const { data, isLoading, isFailed, isAborted, start, stop } = useFetch(
      url,
      opts,
      onMount
    )
    return { data, isLoading, isFailed, isAborted, start, stop }
  }
})

describe('useFetch', () => {
  const url = 'http://test.com'

  it('should show #isLoading in the correct order', async () => {
    mockFetch()
    const wrapper = mount(testComponent(url))
    expect(wrapper.find('#isLoading').exists()).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#isLoading').exists()).toBe(true)
  })

  it('should show #data when provided', async () => {
    const data = { text: 'Here is some data' }
    mockFetch({ data })
    const wrapper = mount(testComponent(url))
    await flushPromises()
    expect(wrapper.find('#data').text()).toBe(data.text)
  })

  it('should show #isFailed when the header is not of json type', async () => {
    mockFetch({ header: 'brokenHeader' })
    const wrapper = mount(testComponent(url))
    await flushPromises()
    expect(wrapper.find('#isFailed').exists()).toBe(true)
  })

  it('should show #isAborted when aborted is triggered', async () => {
    mockFetch({ isAborted: true })
    const wrapper = mount(testComponent(url))
    await flushPromises()
    expect(wrapper.find('#isFailed').exists()).toBe(true)
    expect(wrapper.find('#isAborted').exists()).toBe(true)
  })
})
