import { ref, onMounted, onUnmounted, Ref } from '@src/api'
import {
  ResizeObserver as ResizeObserverInterface,
  ResizeObserverEntry,
  ResizeObserverObserveOptions
} from '@src/types/ResizeObserver'

const errorMsg = 'ResizeObserver is not supported, please install a polyfill'

export function useSize(
  elRef: Ref<null | HTMLElement>,
  options: ResizeObserverObserveOptions = {},
  runOnMount = true
) {
  const isTracking = ref(false)
  const observedEntry: Ref<ResizeObserverEntry | null> = ref(null)

  const handleObserver = (entries: ResizeObserverEntry[]) => {
    observedEntry.value = entries[0]
  }

  let observer: ResizeObserverInterface | null = null

  const start = () => {
    if (isTracking.value) return
    if (!('ResizeObserver' in window)) throw new Error(errorMsg)

    // Do not start if the observer is already initialized
    // or the elRef does not exist
    if (!elRef.value) return
    observer = new (window as any).ResizeObserver(
      handleObserver
    ) as ResizeObserverInterface
    observer.observe(elRef.value, options)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    if (!observer) return
    observer.disconnect()
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { observedEntry, isTracking, start, stop }
}
