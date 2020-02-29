import { ref, Ref } from '@src/api'
import { TFps, useRafFn } from '@src/functions/useRafFn'

const fpsLimit = 60
export function useRaf(fps: TFps = fpsLimit, runOnMount = true) {
  const elapsed = ref(0)
  const animHandler = (elapsedTime: number) => {
    elapsed.value = elapsedTime
  }

  const { isRunning, start, stop } = useRafFn(animHandler, fps, runOnMount)

  return {
    isRunning,
    elapsed,
    start,
    stop
  }
}
