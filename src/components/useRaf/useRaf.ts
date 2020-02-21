import { ref, Ref } from '@vue/composition-api'
import { TFps, useRafFn } from '@src/components/useRafFn'

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
