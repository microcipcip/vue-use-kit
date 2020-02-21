import { onMounted, onUnmounted, ref, Ref } from '@vue/composition-api'

export function useIntervalFn(callback: Function, ms = 0, runOnMount = true) {
  const isRunning = ref(false)
  let interval: any = null

  const start = () => {
    if (interval) return
    isRunning.value = true
    interval = setInterval(callback, ms)
  }

  const stop = () => {
    clearInterval(interval)
    isRunning.value = false
    interval = null
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isRunning, start, stop }
}
