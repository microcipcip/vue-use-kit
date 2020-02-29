import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export interface UseGeolocation {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | PositionError
}

const defaultOpts = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
}

export function useGeolocation(
  options: PositionOptions = {},
  runOnMount = true
) {
  options = Object.assign({}, defaultOpts, options)

  // Note: surprisingly the watchId can be 0 (not positive) so
  // we have to check if watchId !== null every time
  let watchId: number | null = null

  const geoInitData = {
    loading: false,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null
  }

  const isTracking = ref(false)
  const geo: Ref<UseGeolocation> = ref({ ...geoInitData })

  const onEventError = (error: PositionError) => {
    if (watchId === null) return
    geo.value.loading = false
    geo.value.error = {
      code: error.code,
      message: error.message
    } as PositionError
    isTracking.value = false
  }

  const handleGeolocation = ({ coords, timestamp }: Position) => {
    geo.value = {
      loading: false,
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
      timestamp
    }
    isTracking.value = true
  }

  const start = () => {
    if (watchId !== null) return
    geo.value.loading = true
    geo.value.timestamp = Date.now()

    navigator.geolocation.getCurrentPosition(
      handleGeolocation,
      onEventError,
      options
    )

    watchId = navigator.geolocation.watchPosition(
      handleGeolocation,
      onEventError,
      options
    )
  }

  const stop = () => {
    if (watchId === null) return
    navigator.geolocation.clearWatch(watchId)
    watchId = null
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { isTracking, geo, start, stop }
}
