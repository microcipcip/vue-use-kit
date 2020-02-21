import {
  ref,
  isRef,
  computed,
  onMounted,
  onUnmounted,
  Ref
} from '@vue/composition-api'

export type TFps = number | Ref<number>

const getFps = (fps: TFps) => Number(isRef(fps) ? fps.value : fps)
const calcFpsInterval = (fps: number) => 1000 / fps
const fpsLimit = 60

export function useRafFn(
  callback: Function,
  // Note: a value equal to or greater than 60 will disable the fps check logic
  // giving maximum precision and smoothness
  fps: TFps = fpsLimit,
  runOnMount = true
) {
  const isRunning = ref(false)
  // Using a computed here allows us to update fps
  // dynamically from user's input
  const fpsInterval = computed(() => calcFpsInterval(getFps(fps)))

  let itWasIdle = false
  let startTime = 0
  let timeElapsed = 0
  let timePausedTot = 0
  let timeDelta = 0
  const loop = (timeStamp: number) => {
    if (!startTime) startTime = timeStamp
    if (!isRunning.value) return

    // Store the time that the loop is idle so that we can
    // calculate the timeElapsed variable correctly and return
    // it to the user from within the callback
    if (itWasIdle) {
      timePausedTot = timeStamp - startTime - timeElapsed
      itWasIdle = false
    }

    // Adjust timeElapsed to account for startTime and timePausedTot
    timeElapsed = timeStamp - startTime - timePausedTot

    // Always run the callback if fps is greater than fpsLimit
    const callbackShouldAlwaysRun = getFps(fps) >= fpsLimit
    if (callbackShouldAlwaysRun) {
      // Store timeDelta for future computations
      timeDelta = timeElapsed
      callback(timeElapsed)
    }

    // Run callback only when !callbackShouldAlwaysRun
    // and the given fps matches the lapsed time
    if (!callbackShouldAlwaysRun) {
      const elapsedTimeFromPrevLoop = Math.ceil(timeElapsed - timeDelta)
      if (elapsedTimeFromPrevLoop > fpsInterval.value) {
        // Store timeDelta for future computations
        timeDelta = timeElapsed
        callback(timeElapsed)
      }
    }

    // Run loop again recursively
    requestAnimationFrame(loop)
  }

  const start = () => {
    isRunning.value = true
    requestAnimationFrame(loop)
  }

  const stop = () => {
    isRunning.value = false
    itWasIdle = true
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return {
    isRunning,
    start,
    stop
  }
}
