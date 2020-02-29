import { Ref } from '@src/api'
import { useTimeoutFn } from '@src/functions/useTimeoutFn'

const noop = () => null
export function useTimeout(ms = 0, runOnMount = true) {
  const { isReady, start, stop } = useTimeoutFn(noop, ms, runOnMount)
  return { isReady, start, stop }
}
