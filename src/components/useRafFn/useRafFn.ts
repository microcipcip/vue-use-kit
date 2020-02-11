import { ref, isRef, computed, onMounted, onUnmounted, Ref } from '../../api'

type TFps = number | Ref<number>

const getFps = (fps: TFps) => Number(isRef(fps) ? fps.value : fps)
const calcFpsInterval = (fps: number) => 1000 / fps
const fpsLimit = 120

export function useRafFn(
  callback: Function,
  // Note: a value greater than 120 will disable the fps check logic
  // giving maximum precision and smoothness
  fps: TFps = fpsLimit + 1,
  runOnMount = true
) {
  const isRunningRef = ref(false)
  // Using a computed here allows us to update fps
  // dynamically from user's input
  const fpsIntervalRef = computed(() => calcFpsInterval(getFps(fps)))

  let isPausedGuard = false
  let startTime = 0
  let timeNow = 0
  let timeWhenPaused = 0
  let timeDelta = 0
  const loop = (timeStamp: number) => {
    if (!startTime) startTime = timeStamp
    if (!isRunningRef.value) return

    if (isPausedGuard) {
      // Save the time when we pause the loop so that later we can
      // adjust the time we return to the callback
      timeWhenPaused = timeStamp - startTime - timeNow
      isPausedGuard = false
    }

    // Adjust timeNow to account for startTime and timeWhenPaused
    timeNow = timeStamp - startTime - timeWhenPaused

    // Always run the callback if fps is greater than fpsLimit
    const callbackShouldAlwaysRun = getFps(fps) > fpsLimit
    if (callbackShouldAlwaysRun) {
      // Store timeDelta for future computations
      timeDelta = timeNow
      callback(timeNow)
    }

    // Run callback only when !callbackShouldAlwaysRun
    // and the given fps matches the lapsed time
    if (!callbackShouldAlwaysRun) {
      const elapsedTime = Math.ceil(timeNow - timeDelta)
      if (elapsedTime > fpsIntervalRef.value) {
        // Store timeDelta for future computations
        timeDelta = timeNow
        callback(timeNow)
      }
    }

    // Run loop again recursively
    requestAnimationFrame(loop)
  }

  const start = () => {
    isRunningRef.value = true
    requestAnimationFrame(loop)
  }

  const stop = () => {
    isRunningRef.value = false
    isPausedGuard = true
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return {
    isRunning: isRunningRef,
    start,
    stop
  }
}
