import { ref, onMounted, onUnmounted, Ref } from '@src/api'

type UseKeyFilter = string | ((event: KeyboardEvent) => boolean)

export function useKey(
  filter: UseKeyFilter,
  callback = (event: KeyboardEvent) => ``,
  runOnMount = true
) {
  const isTracking = ref(false)
  const isPressed = ref(false)

  const getFilter = () => {
    if (typeof filter === 'function') return filter
    return (event: KeyboardEvent) => event.key === filter
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const filterFn = getFilter()
    if (!filterFn(event)) return

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
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('keyup', handleKeyUp)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isPressed, isTracking, start, stop }
}
