import { onMounted, onUnmounted, Ref } from '@src/api'

const defaultEvents = ['mousedown', 'touchstart']

export function useClickAway(
  elRef: Ref<null | Element>,
  callback: (e: Event) => void,
  events = defaultEvents
) {
  const handler = (e: Event) => {
    if (elRef.value && !elRef.value.contains(e.target as Node)) {
      callback(e)
    }
  }

  onMounted(() => {
    events.forEach(evtName => document.addEventListener(evtName, handler))
  })

  onUnmounted(() => {
    events.forEach(evtName => document.removeEventListener(evtName, handler))
  })
}
