import { useTimeoutFn } from '../../vue-use-kit'

const noop = () => null
export function useTimeout(ms = 0, runOnMount = true) {
  const { isReady, isIdle, cancelTimer, resetTimer } = useTimeoutFn(
    noop,
    ms,
    runOnMount
  )
  return { isReady, isIdle, cancelTimer, resetTimer }
}
