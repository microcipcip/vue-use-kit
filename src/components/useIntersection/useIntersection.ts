import { ref, onMounted, onUnmounted, Ref } from '@src/api'

const errorMsg =
  'IntersectionObserver is not supported, please install a polyfill'

export function useIntersection(
  elRef: Ref<null | Element>,
  options: IntersectionObserverInit = {},
  runOnMount = true
) {
  const observedEntry: Ref<IntersectionObserverEntry | null> = ref(null)

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    observedEntry.value = entries[0]
  }

  let observer: IntersectionObserver | null = null

  const start = () => {
    if (!('IntersectionObserver' in window)) throw new Error(errorMsg)

    // Do not start if the observer is already initialized
    // or the elRef does not exist
    if (observer || !elRef.value) return
    observer = new IntersectionObserver(handleObserver, options)
    observer.observe(elRef.value)
  }

  const stop = () => {
    if (!observer) return
    observer.disconnect()
    observer = null
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { observedEntry, start, stop }
}
