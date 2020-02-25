import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export function useMouseLeavePage(runOnMount = true) {
  const isTracking = ref(false)
  const hasLeftPage = ref(false)

  const handleMouseOut = (e: any) => {
    const from = e.relatedTarget || e.toElement
    const mouseHasLeftPage = !from || from.nodeName === 'HTML'
    hasLeftPage.value = mouseHasLeftPage
  }

  const start = () => {
    if (isTracking.value) return
    document.addEventListener('mouseout', handleMouseOut)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    document.removeEventListener('mouseout', handleMouseOut)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { hasLeftPage, isTracking, start, stop }
}
