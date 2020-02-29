import { mount } from '@src/helpers/test'
import { useLocalStorage } from '@src/vue-use-kit'

const localStorageMock = () => {
  let store = {} as any
  return {
    getItem(key: any) {
      return store[key]
    },
    setItem(key: any, value: any) {
      store[key] = String(value)
    },
    clear() {
      store = {}
    },
    removeItem(key: any) {
      delete store[key]
    }
  }
}

beforeEach(() => {
  ;(window as any).localStorage = localStorageMock()
})

afterEach(() => {
  jest.clearAllMocks()
})

const testComponent = (
  key = 'key',
  itemValue: any = '',
  opts = { isParsing: false } as any,
  onMount = true
) => ({
  template: `
    <div>
      <div id="item">{{ item }}</div>
      <div id="itemJson">
        {{ item && item.value1 }} - {{  item && item.value2 }}
      </div>
      <button id="getItem" @click="getItem"></button>
      <button id="setItem" @click="setItem(itemValue)"></button>
      <button id="removeItem" @click="removeItem"></button>
    </div>
  `,
  setup() {
    const { item, getItem, setItem, removeItem } = useLocalStorage(
      key,
      opts,
      onMount
    )

    return {
      item,
      getItem,
      setItem,
      removeItem,
      itemValue
    }
  }
})

describe('useItem', () => {
  it('should get a item with the given value', async () => {
    const itemKey = 'itemKey'
    const itemValue = 'itemValue'
    ;(window as any).localStorage.setItem(itemKey, itemValue)
    const wrapper = mount(testComponent(itemKey))
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain(itemValue)
  })

  it('should set a item with the given value', async () => {
    const itemKey = 'itemKey'
    const itemValue = 'itemValue'
    const wrapper = mount(testComponent(itemKey, itemValue))
    await wrapper.vm.$nextTick()
    expect(localStorage.getItem(itemKey)).toContain(itemValue)
  })

  it('should remove a item with the given value', async () => {
    const itemKey = 'itemKey'
    const itemValue = 'itemValue'
    const wrapper = mount(testComponent(itemKey, itemValue))
    await wrapper.vm.$nextTick()
    expect(localStorage.getItem(itemKey)).toContain(itemValue)
    wrapper.find('#removeItem').trigger('click')
    await wrapper.vm.$nextTick()
    expect(localStorage.getItem(itemKey)).toBeFalsy()
  })

  it('should correctly get and set the isParsing object', async () => {
    const itemKey = 'itemKey'
    const itemValue = { value1: 'testValue1', value2: 'testValue2' }
    const wrapper = mount(
      testComponent(itemKey, itemValue, { isParsing: true })
    )
    wrapper.find('#setItem').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#itemJson').html()).toContain(itemValue.value1)
    expect(wrapper.find('#itemJson').html()).toContain(itemValue.value2)

    // Also check that when clicking #getItem we still get a proper JSON object
    wrapper.find('#getItem').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#itemJson').html()).toContain(itemValue.value1)
    expect(wrapper.find('#itemJson').html()).toContain(itemValue.value2)
  })

  it('should correctly get using the deserializer', async () => {
    const itemKey = 'itemKey'
    const itemValue = { value1: 'testValue1', value2: 'testValue2' }
    const deserializerVal = { value1: 'gatto', value2: 'topo' }
    const wrapper = mount(
      testComponent(itemKey, itemValue, {
        isParsing: true,
        deserializer: () => deserializerVal
      })
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#itemJson').html()).toContain(deserializerVal.value1)
    expect(wrapper.find('#itemJson').html()).toContain(deserializerVal.value2)
  })

  it('should ignore deserializer when isParsing is false', async () => {
    const itemKey = 'itemKey'
    const itemValue = { value1: 'testValue1', value2: 'testValue2' }
    const deserializerVal = { value1: 'gatto', value2: 'topo' }
    const wrapper = mount(
      testComponent(itemKey, itemValue, {
        isParsing: false,
        deserializer: () => deserializerVal
      })
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#item').html()).toContain(itemValue.value1)
    expect(wrapper.find('#item').html()).toContain(itemValue.value2)
    expect(wrapper.find('#itemJson').html()).not.toContain(
      deserializerVal.value1
    )
    expect(wrapper.find('#itemJson').html()).not.toContain(
      deserializerVal.value2
    )
  })

  it('should correctly set using the serializer', async () => {
    const itemKey = 'itemKey'
    const itemValue = { value1: 'testValue1', value2: 'testValue2' }
    const serializerVal = { value1: 'testValue1+1', value2: 'testValue2+1' }
    const wrapper = mount(
      testComponent(itemKey, itemValue, {
        isParsing: true,
        serializer: (obj: any) =>
          JSON.stringify({
            value1: `${obj.value1}+1`,
            value2: `${obj.value2}+1`
          })
      })
    )
    wrapper.find('#setItem').trigger('click')
    wrapper.find('#getItem').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#itemJson').html()).toContain(serializerVal.value1)
    expect(wrapper.find('#itemJson').html()).toContain(serializerVal.value2)
  })

  it('should ignore serializer when isParsing is false', async () => {
    const itemKey = 'itemKey'
    const itemValue = { value1: 'testValue1', value2: 'testValue2' }
    const serializerVal = { value1: 'testValue1+1', value2: 'testValue2+1' }
    const wrapper = mount(
      testComponent(itemKey, itemValue, {
        isParsing: false,
        serializer: (obj: any) =>
          JSON.stringify({
            value1: `${obj.value1}+1`,
            value2: `${obj.value2}+1`
          })
      })
    )
    wrapper.find('#setItem').trigger('click')
    wrapper.find('#getItem').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#item').html()).toContain('[object Object]')
    expect(wrapper.find('#itemJson').html()).not.toContain(serializerVal.value1)
    expect(wrapper.find('#itemJson').html()).not.toContain(serializerVal.value2)
  })
})
