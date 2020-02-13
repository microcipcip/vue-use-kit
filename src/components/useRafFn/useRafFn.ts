import { ref, isRef, computed, onMounted, onUnmounted, Ref } from '../../api'

type TFps = number | Ref<number>

const getFps = (fps: TFps) => Number(isRef(fps) ? fps.value : fps)
const calcFpsInterval = (fps: number) => 1000 / fps
const fpsLimit = 60

export function useRafFn(
  callback: Function,
  // Note: a value greater than 60 will disable the fps check logic
  // giving maximum precision and smoothness
  fps: TFps = fpsLimit + 1,
  runOnMount = true
) {
  const isRunning = ref(false)
  // Using a computed here allows us to update fps
  // dynamically from user's input
  const fpsInterval = computed(() => calcFpsInterval(getFps(fps)))

  let itWasIdle = false
  let startTime = 0
  let timeNow = 0
  let timePausedTot = 0
  let timeDelta = 0
  const loop = (timeStamp: number) => {
    if (!startTime) startTime = timeStamp
    if (!isRunning.value) return

    // Store the time that the loop is idle so that we can
    // calculate the timeNow variable correctly and return
    // it to the user from within the callback
    if (itWasIdle) {
      timePausedTot = timeStamp - startTime - timeNow
      itWasIdle = false
    }

    // Adjust timeNow to account for startTime and timePausedTot
    timeNow = timeStamp - startTime - timePausedTot

    // Always run the callback if fps is greater than fpsLimit
    const callbackShouldAlwaysRun = getFps(fps) >= fpsLimit
    if (callbackShouldAlwaysRun) {
      // Store timeDelta for future computations
      timeDelta = timeNow
      callback(timeNow)
    }

    // Run callback only when !callbackShouldAlwaysRun
    // and the given fps matches the lapsed time
    if (!callbackShouldAlwaysRun) {
      const elapsedTime = Math.ceil(timeNow - timeDelta)
      if (elapsedTime > fpsInterval.value) {
        // Store timeDelta for future computations
        timeDelta = timeNow
        callback(timeNow)
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
