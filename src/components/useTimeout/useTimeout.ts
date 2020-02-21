import { Ref } from '@vue/composition-api'
import { useTimeoutFn } from '@src/components/useTimeoutFn'

const noop = () => null
export function useTimeout(ms = 0, runOnMount = true) {
  const { isReady, start, stop } = useTimeoutFn(noop, ms, runOnMount)
  return { isReady, start, stop }
}
