import { mount } from '@src/helpers/test'
import { useCookie } from '@src/vue-use-kit'

afterEach(() => {
  document.cookie = ''
  jest.clearAllMocks()
})

const testComponent = (
  cookieName = 'cookieName',
  cookieValue: any = '',
  parseJson = false,
  onMount = true
) => ({
  template: `
    <div>
      <div id="cookie">{{ cookie }}</div>
      <div id="cookieJson">
        {{ cookie && cookie.value1 }} - {{  cookie && cookie.value2 }}
      </div>
      <button id="getCookie" @click="getCookie"></button>
      <button id="setCookie" @click="setCookie(cookieValue)"></button>
      <button id="removeCookie" @click="removeCookie"></button>
    </div>
  `,
  setup() {
    const { cookie, getCookie, setCookie, removeCookie } = useCookie(
      cookieName,
      parseJson,
      onMount
    )

    return {
      cookie,
      getCookie,
      setCookie,
      removeCookie,
      cookieValue
    }
  }
})

describe('useCookie', () => {
  it('should get a cookie with the given value', async () => {
    const cookieName = 'cookieName'
    const cookieValue = 'cookieValue'
    document.cookie = `${cookieName}=${cookieValue}`
    const wrapper = mount(testComponent(cookieName))
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain(cookieValue)
  })

  it('should set a cookie with the given value', async () => {
    const cookieName = 'cookieName'
    const cookieValue = 'cookieValue'
    const wrapper = mount(testComponent(cookieName, cookieValue))
    await wrapper.vm.$nextTick()
    expect(document.cookie).toContain(cookieName)
    expect(document.cookie).toContain(cookieValue)
  })

  it('should remove a cookie with the given value', async () => {
    const cookieName = 'cookieName'
    const cookieValue = 'cookieValue'
    const wrapper = mount(testComponent(cookieName, cookieValue))
    await wrapper.vm.$nextTick()
    expect(document.cookie).toContain(cookieName)
    expect(document.cookie).toContain(cookieValue)
    wrapper.find('#removeCookie').trigger('click')
    await wrapper.vm.$nextTick()
    expect(document.cookie).not.toContain(cookieName)
    expect(document.cookie).not.toContain(cookieValue)
  })

  it('should correctly get and set the parseToJson object', async () => {
    const cookieName = 'cookieName'
    const cookieValue = { value1: 'testValue1', value2: 'testValue2' }
    const wrapper = mount(testComponent(cookieName, cookieValue, true))
    wrapper.find('#setCookie').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#cookieJson').html()).toContain(cookieValue.value1)
    expect(wrapper.find('#cookieJson').html()).toContain(cookieValue.value2)

    // Also check that when clicking #getCookie we still get a proper JSON object
    wrapper.find('#getCookie').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#cookieJson').html()).toContain(cookieValue.value1)
    expect(wrapper.find('#cookieJson').html()).toContain(cookieValue.value2)
  })
})
