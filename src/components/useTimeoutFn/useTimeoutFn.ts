import { onMounted, onUnmounted, ref, Ref } from '@src/api'

export function useTimeoutFn(callback: Function, ms = 0, runOnMount = true) {
  const isReady = ref<boolean | null>(null)
  let timeout: any = null

  const start = () => {
    isReady.value = false
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      isReady.value = true
      callback()
      timeout = null
    }, ms)
  }

  const stop = () => {
    isReady.value = null
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isReady, start, stop }
}
