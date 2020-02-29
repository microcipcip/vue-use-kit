import {
  createSerializer,
  createDeserializer,
  SerializerFunction,
  DeserializerFunction,
  trySerialize,
  tryDeserialize,
  isNullOrUndefined
} from '@src/shared/utils'
import { ref, Ref } from '@src/api'

export interface StorageOptions {
  isParsing: boolean
  serializer?: SerializerFunction
  deserializer?: DeserializerFunction
}

const defaultOptions = {
  isParsing: false
}

export function createStorage(
  storage: Storage,
  key: string,
  options?: StorageOptions
) {
  const { isParsing, ...opts } = Object.assign({}, defaultOptions, options)
  const serializer = createSerializer(opts.serializer)
  const deserializer = createDeserializer(opts.deserializer)

  const item: Ref<any> = ref(null)

  const getItem = () => {
    try {
      const itemVal = tryDeserialize(
        storage.getItem(key),
        deserializer,
        isParsing
      )
      if (!isNullOrUndefined(itemVal)) item.value = itemVal
    } catch (error) {
      // If user is in private mode or has storage restriction
      // sessionStorage/locationStorage can throw
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
      storage.setItem(key, newItemVal)
      item.value = tryDeserialize(newItemVal, deserializer, isParsing)
    } catch (error) {
      // If user is in private mode or has storage restriction
      // sessionStorage/locationStorage can throw
    }
  }

  const removeItem = () => {
    try {
      storage.removeItem(key)
      item.value = null
    } catch (error) {
      // If user is in private mode or has storage restriction
      // sessionStorage/locationStorage can throw
      item.value = null
    }
  }

  return {
    item,
    getItem,
    setItem,
    removeItem
  }
}
