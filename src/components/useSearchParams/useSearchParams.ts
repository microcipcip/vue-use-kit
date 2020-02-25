import { ref, onMounted, onUnmounted, Ref } from '@src/api'
import { patchHistoryMethodsOnce, normalizeEntriesData } from '@src/utils'

const normalizeParams = (urlParamsObj: { [key: string]: string }) => (
  paramAcc: any,
  param: string
) => {
  paramAcc[param] = param in urlParamsObj ? urlParamsObj[param] : null
  return paramAcc
}

const getUrlParams = (parameters: string[]) => {
  const urlParamsObj = normalizeEntriesData(
    Array.from(new URLSearchParams(location.search).entries())
  )
  return parameters.reduce(normalizeParams(urlParamsObj), {})
}

export function useSearchParams<T extends string>(
  parameters: T[],
  runOnMount = true
) {
  const searchParams = ref(
    parameters.reduce(normalizeParams({}), {} as { [key in T]: any })
  )
  const isTracking = ref(false)

  const handleParamsChange = () =>
    (searchParams.value = getUrlParams(parameters))

  const start = () => {
    if (isTracking.value) return
    patchHistoryMethodsOnce()
    handleParamsChange()
    window.addEventListener('popstate', handleParamsChange)
    window.addEventListener('pushstate', handleParamsChange)
    window.addEventListener('replacestate', handleParamsChange)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('popstate', handleParamsChange)
    window.removeEventListener('pushstate', handleParamsChange)
    window.removeEventListener('replacestate', handleParamsChange)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { searchParams, isTracking, start, stop }
}
