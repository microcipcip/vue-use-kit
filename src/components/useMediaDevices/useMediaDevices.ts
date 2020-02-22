import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export interface UseMediaDevicesState {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

export function useMediaDevices(runOnMount = true) {
  const devicesState: Ref<UseMediaDevicesState[]> = ref([])
  const isTracking = ref(false)
  const isTracked = ref(false)

  const deviceMap = ({
    deviceId,
    groupId,
    kind,
    label
  }: UseMediaDevicesState) => ({
    deviceId,
    groupId,
    kind,
    label
  })

  const handleDeviceChange = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(deviceList => {
        if (!isTracking.value) return
        isTracked.value = true
        devicesState.value = deviceList.map(deviceMap)
      })
      .catch(() => {
        isTracked.value = false
      })
  }

  const start = () => {
    if (isTracking.value) return
    handleDeviceChange()
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    navigator.mediaDevices.removeEventListener(
      'devicechange',
      handleDeviceChange
    )
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { devicesState, isTracking, isTracked, start, stop }
}
