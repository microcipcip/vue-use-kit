import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export function useBeforeUnload(isPageDirty: Ref<boolean>, runOnMount = true) {
  const isTracking = ref(false)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    // Show alert message only when isPageDirty is true
    if (isPageDirty.value) e.preventDefault()
  }

  const start = () => {
    if (isTracking.value) return
    window.addEventListener('beforeunload', handleBeforeUnload)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('beforeunload', handleBeforeUnload)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isTracking, start, stop }
}
