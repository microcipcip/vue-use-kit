import { ref, onMounted, onUnmounted, Ref } from '@src/api'
import { isClient } from '@src/shared/utils'

export function useWindowSize(runOnMount = true) {
  const width = ref(isClient ? window.innerWidth : Infinity)
  const height = ref(isClient ? window.innerHeight : Infinity)
  const isTracking = ref(false)

  const handleWindowResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  const start = () => {
    if (isTracking.value) return
    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('resize', handleWindowResize)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { width, height, isTracking, start, stop }
}
