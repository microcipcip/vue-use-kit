import { ref, onMounted, onUnmounted, Ref } from '@src/api'

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

// The history methods 'pushState' and 'replaceState' by default do not fire an event
// unless it is coming from user interaction with the browser navigation bar,
// so we are adding a patch to make them detectable
let isPatched = false
const patchHistoryMethodsOnce = () => {
  if (isPatched) return
  const methods = ['pushState', 'replaceState']
  methods.forEach(method => {
    const original = (history as any)[method]
    ;(history as any)[method] = function(state: any) {
      // eslint-disable-next-line prefer-rest-params
      const result = original.apply(this, arguments)
      const event = new Event(method.toLowerCase())
      ;(event as any).state = state
      window.dispatchEvent(event)
      return result
    }
  })

  isPatched = true
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
    patchHistoryMethodsOnce()

    if (isTracking.value) return
    isTracking.value = true

    locationState.value = buildState('start')
    window.addEventListener('popstate', popState)
    window.addEventListener('pushstate', pushState)
    window.addEventListener('replacestate', replaceState)
  }

  const stop = () => {
    if (!isTracking.value) return
    isTracking.value = false
    window.removeEventListener('popstate', popState)
    window.removeEventListener('pushstate', pushState)
    window.removeEventListener('replacestate', replaceState)
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return { locationState, isTracking, start, stop }
}
