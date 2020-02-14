import { useTimeoutFn } from '@src/components/useTimeoutFn'

const noop = () => null
export function useTimeout(ms = 0, runOnMount = true) {
  const { isReady, isIdle, cancel, start } = useTimeoutFn(noop, ms, runOnMount)
  return { isReady, isIdle, cancel, start }
}
