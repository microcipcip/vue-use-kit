import {
  createSerializer,
  createDeserializer,
  SerializerFunction,
  DeserializerFunction,
  trySerialize,
  tryDeserialize,
  isNullOrUndefined
} from '@src/utils'
import { ref, onMounted, Ref } from '@src/api'

export interface UseLocalStorageOptions {
  isParsing: boolean
  serializer?: SerializerFunction
  deserializer?: DeserializerFunction
}

const defaultOptions = {
  isParsing: false
}

export function useLocalStorage(
  key: string,
  options?: UseLocalStorageOptions,
  runOnMount = true
) {
  const { isParsing, ...opts } = Object.assign({}, defaultOptions, options)
  const serializer = createSerializer(opts.serializer)
  const deserializer = createDeserializer(opts.deserializer)

  const item: Ref<any> = ref(null)

  const getItem = () => {
    try {
      const itemVal = tryDeserialize(
        localStorage.getItem(key),
        deserializer,
        isParsing
      )
      if (!isNullOrUndefined(itemVal)) item.value = itemVal
    } catch (error) {
      // If user is in private mode or has storage restriction localStorage can throw
    }
  }

  const setItem = (
    // The user may pass a 'string', a 'number', a valid JSON object/array
    // or even a custom object when serializer/deserializer are defined
    // so it is better to set allowed newItemVal as 'any'
    newVal: any
  ) => {
    try {
      const newItemVal = trySerialize(newVal, serializer, isParsing)
      localStorage.setItem(key, newItemVal)
      item.value = tryDeserialize(newItemVal, deserializer, isParsing)
    } catch (error) {
      // If user is in private mode or has storage restriction localStorage can throw
    }
  }

  const removeItem = () => {
    try {
      localStorage.removeItem(key)
      item.value = null
    } catch (error) {
      // If user is in private mode or has storage restriction localStorage can throw
      item.value = null
    }
  }

  onMounted(() => runOnMount && getItem())

  return {
    item,
    getItem,
    setItem,
    removeItem
  }
}
