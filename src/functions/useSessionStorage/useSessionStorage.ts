import { createStorage, StorageOptions } from '@src/shared/createStorage'
import { onMounted, Ref } from '@src/api'

export function useSessionStorage(
  key: string,
  options?: StorageOptions,
  runOnMount = true
) {
  const { item, getItem, setItem, removeItem } = createStorage(
    sessionStorage,
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
