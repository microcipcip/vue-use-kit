import { onMounted, onUnmounted, ref } from '../../api'

export function useTimeoutFn(callback: Function, ms = 0, runOnMount = true) {
  const isReady = ref<boolean | null>(false)
  const isIdle = ref(!runOnMount)
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
    if (isIdle.value) isIdle.value = false
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      isReady.value = true
      callback()
      timeout = null
    }, ms)
  }

  onMounted(() => runOnMount && setTimer())
  onUnmounted(cancelTimer)

  return { isReady, isIdle, cancelTimer, resetTimer: setTimer }
}
