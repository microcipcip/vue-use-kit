import { onMounted, onUnmounted, ref } from '../../api'

export function useTimeoutFn(callback: Function, ms = 0) {
  const isReady = ref<boolean | null>(false)
  let timeout: any = null

  const cancelTimer = () => {
    isReady.value = null
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  const setTimer = () => {
    isReady.value = false
    if (timeout) cancelTimer()

    timeout = setTimeout(() => {
      isReady.value = true
      callback()
      timeout = null
    }, ms)
  }

  onMounted(setTimer)
  onUnmounted(cancelTimer)

  return { isReady, cancelTimer, resetTimer: setTimer }
}
