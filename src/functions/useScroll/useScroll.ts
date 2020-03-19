import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export function useScroll(
  elRef: Ref<null | HTMLElement | Window>,
  ms = 150,
  runOnMount = true
) {
  const isTracking = ref(false)
  const isScrolling = ref(false)

  const x = ref(0)
  const y = ref(0)

  let scrollingTimeout: any = null
  const updateScrollStatus = () => {
    isScrolling.value = true
    clearTimeout(scrollingTimeout)
    scrollingTimeout = setTimeout(() => (isScrolling.value = false), ms)
  }

  const updateWindowElement = () => {
    x.value = window.pageXOffset
    y.value = window.pageYOffset
  }

  const updateHTMLElement = () => {
    x.value = (elRef.value as HTMLElement).scrollLeft
    y.value = (elRef.value as HTMLElement).scrollTop
  }

  const updateElScrollPos = () => {
    if (!elRef.value) return
    elRef.value === window ? updateWindowElement() : updateHTMLElement()
  }

  const handleScroll = () => {
    updateElScrollPos()
    updateScrollStatus()
  }

  const start = () => {
    if (isTracking.value) return
    if (elRef.value) {
      elRef.value.addEventListener('scroll', handleScroll, {
        capture: false,
        passive: true
      })
      updateElScrollPos()
    }
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    if (elRef.value) elRef.value.removeEventListener('scroll', handleScroll)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { x, y, isTracking, isScrolling, start, stop }
}
