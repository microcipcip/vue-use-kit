import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export interface UseOrientationState {
  angle: number
  type: string
}

const defaultState: UseOrientationState = {
  angle: 0,
  type: 'landscape-primary'
}

export function useOrientation(
  initialState: UseOrientationState = defaultState,
  runOnMount = true
) {
  const isTracking = ref(false)
  const orientation = ref(initialState)

  const handleOrientationChange = () => {
    if (screen.orientation) {
      const { angle, type } = screen.orientation
      orientation.value = { angle, type }
    } else if (window.orientation) {
      orientation.value = {
        angle: typeof window.orientation === 'number' ? window.orientation : 0,
        type: ''
      }
    } else {
      orientation.value = initialState
    }
  }

  const start = () => {
    if (isTracking.value) return
    window.addEventListener('orientationchange', handleOrientationChange)
    handleOrientationChange()
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('orientationchange', handleOrientationChange)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { orientation, isTracking, start, stop }
}
