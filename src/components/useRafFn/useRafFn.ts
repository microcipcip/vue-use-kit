import { ref, isRef, watch, onMounted, onUnmounted, Ref } from '../../api'

type TFps = number | Ref<number>

const getFps = (fps: TFps) => (isRef(fps) ? fps.value : fps)
const calcFpsInterval = (fps: number) => 1000 / fps

export function useRafFn(
  callback: Function,
  fps: TFps = 60,
  runOnMount = true
) {
  const isRunningRef = ref(false)
  const fpsIntervalRef = ref(calcFpsInterval(getFps(fps)))
  let startTime = 0
  let timeNow = 0
  let isPaused = false
  let prevTime = 0
  let timeLast = 0
  function loop(timeStamp: number) {
    if (!startTime) startTime = timeStamp
    if (!isRunningRef.value) return

    if (!isPaused) {
      timeNow = timeStamp - startTime - prevTime
    } else {
      prevTime = timeStamp - startTime - timeNow
      timeNow = timeStamp - startTime - prevTime
      isPaused = false
    }

    // Run callback only on the given fps
    if (Math.ceil(timeNow - timeLast) > fpsIntervalRef.value) {
      callback(timeNow)
      timeLast = timeNow
    }

    requestAnimationFrame(loop)
  }

  const start = () => {
    isRunningRef.value = true
    requestAnimationFrame(loop)
  }

  const stop = () => {
    isRunningRef.value = false
    isPaused = true
  }

  // Watch fps value since it could potentially be a ref and we may want
  // to change the Raf speed from user's input
  const updateFpsInterval = () => {
    // If fps is not a ref there is no point in updating it
    if (!isRef(fps)) return
    watch(fps, () => {
      fpsIntervalRef.value = calcFpsInterval(getFps(fps))
    })
  }
  updateFpsInterval()

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return {
    isRunning: isRunningRef,
    start,
    stop
  }
}
