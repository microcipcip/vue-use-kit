import { ref, onMounted, onUnmounted, Ref } from '@src/api'
import { patchHistoryMethodsOnce } from '@src/shared/utils'

export interface UseLocationState {
  trigger: string
  state: any
  length: number
  hash: string
  host: string
  hostname: string
  href: string
  origin: string
  pathname: string
  port: string
  protocol: string
  search: string
}

export function useLocation(runOnMount = true) {
  const buildState = (trigger: string) => {
    const { state, length } = history

    const {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = location

    return {
      trigger,
      state,
      length,
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    }
  }
  const isTracking = ref(false)
  const locationState: Ref<UseLocationState> = ref(buildState('load'))

  const popState = () => (locationState.value = buildState('popstate'))
  const pushState = () => (locationState.value = buildState('pushstate'))
  const replaceState = () => (locationState.value = buildState('replacestate'))

  const start = () => {
    if (isTracking.value) return
    patchHistoryMethodsOnce()
    locationState.value = buildState('start')
    window.addEventListener('popstate', popState)
    window.addEventListener('pushstate', pushState)
    window.addEventListener('replacestate', replaceState)
    isTracking.value = true
  }

  const stop = () => {
    if (!isTracking.value) return
    window.removeEventListener('popstate', popState)
    window.removeEventListener('pushstate', pushState)
    window.removeEventListener('replacestate', replaceState)
    isTracking.value = false
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { locationState, isTracking, start, stop }
}
