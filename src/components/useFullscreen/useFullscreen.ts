import { ref, Ref, onUnmounted } from '@src/api'

export function useFullscreen(elRef: Ref<null | HTMLElement>) {
  const isFullscreen = ref(false)

  const handleFullscreenChange = () => {
    if (!isFullscreen.value) return
    const isCurrentlyFullscreen = !!document.fullscreenElement
    isFullscreen.value = isCurrentlyFullscreen
  }

  const startTracking = () => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  }

  const stopTracking = () => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }

  const start = () => {
    if (!elRef.value) return
    if (isFullscreen.value) return
    elRef.value.requestFullscreen().then(() => {
      isFullscreen.value = true
      startTracking()
    })
  }

  const stop = () => {
    if (!isFullscreen.value) return
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
      stopTracking()
    })
  }

  onUnmounted(stopTracking)

  return { isFullscreen, start, stop }
}
