import { throttle } from 'throttle-debounce'
import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export const idleEventsList = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
]
const oneMinute = 60e3

export function useIdle(
  ms = oneMinute,
  events = idleEventsList,
  runOnMount = true
) {
  let timeout: any = null
  const isIdle = ref(false)
  const isTracking = ref(false)

  const handleChange = throttle(50, () => {
    isIdle.value = false

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      isIdle.value = true
    }, ms)
  })

  const handleVisibility = () => {
    if (!document.hidden) return
    handleChange()
  }

  const start = () => {
    if (isTracking.value) return
    events.forEach(evtName => document.addEventListener(evtName, handleChange))
    document.addEventListener('visibilitychange', handleVisibility)

    // Initialize it since the events above may not run immediately
    handleChange()
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    events.forEach(evtName =>
      document.removeEventListener(evtName, handleChange)
    )
    document.removeEventListener('visibilitychange', handleVisibility)

    // Stop timer if it is still running
    if (timeout) clearTimeout(timeout)

    // Restore initial status
    timeout = null
    isIdle.value = false
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isIdle, isTracking, start, stop }
}
