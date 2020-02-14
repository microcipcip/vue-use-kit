import { useTimeoutFn } from '../useTimeoutFn'

const noop = () => null
export function useTimeout(ms = 0, runOnMount = true) {
  const { isReady, isIdle, cancel, reset } = useTimeoutFn(noop, ms, runOnMount)
  return { isReady, isIdle, cancel, reset }
}
