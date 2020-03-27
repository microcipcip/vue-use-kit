import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export type UseKeyFilter = string | ((event: KeyboardEvent) => boolean)
export type UseKeyCallback = (event: KeyboardEvent) => void

export interface UseKeyOptions {
  callback?: UseKeyCallback
  triggerRef?: Ref<null | HTMLElement>
  triggerOnce?: boolean
}

const defaultOptions = {
  callback: () => ``,
  triggerRef: { value: null },
  triggerOnce: false
}

export function useKey(
  filter: UseKeyFilter,
  options?: UseKeyOptions,
  runOnMount = true
) {
  const { callback, triggerRef, triggerOnce } = Object.assign(
    {},
    defaultOptions,
    options
  )
  const isTracking = ref(false)
  const isPressed = ref(false)

  const getTriggerRef = (): any => triggerRef.value || document

  const getFilter = () => {
    if (typeof filter === 'function') return filter
    return (event: KeyboardEvent) => event.key === filter
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const filterFn = getFilter()
    if (!filterFn(event)) return

    if (triggerOnce && isPressed.value) return
    isPressed.value = true
    callback(event)
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    const filterFn = getFilter()
    if (!filterFn(event)) return

    isPressed.value = false
    callback(event)
  }

  const start = () => {
    if (isTracking.value) return
    const $el = getTriggerRef()
    $el.addEventListener('keydown', handleKeyDown)
    $el.addEventListener('keyup', handleKeyUp)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    const $el = getTriggerRef()
    $el.removeEventListener('keydown', handleKeyDown)
    $el.removeEventListener('keyup', handleKeyUp)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isPressed, isTracking, start, stop }
}
