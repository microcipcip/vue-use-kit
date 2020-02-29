import { createStorage, StorageOptions } from '@src/shared/createStorage'
import { onMounted, Ref } from '@src/api'

export function useLocalStorage(
  key: string,
  options?: StorageOptions,
  runOnMount = true
) {
  const { item, getItem, setItem, removeItem } = createStorage(
    localStorage,
    key,
    options
  )

  onMounted(() => runOnMount && getItem())

  return {
    item,
    getItem,
    setItem,
    removeItem
  }
}
