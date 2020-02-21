import { ref, Ref } from '@vue/composition-api'
import { useIntervalFn } from '@src/components/useIntervalFn'

export function useInterval(ms = 0, runOnMount = true) {
  const counter = ref(0)
  const animHandler = () => {
    counter.value = counter.value + 1
  }
  const { isRunning, start, stop } = useIntervalFn(animHandler, ms, runOnMount)
  return { isRunning, counter, start, stop }
}
