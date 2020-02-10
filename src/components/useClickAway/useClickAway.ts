import { onMounted, onUnmounted, Ref } from '../../api'

const defaultEvents = ['mousedown', 'touchstart']

export function useClickAway(
  elRef: Ref<null | Element>,
  onClickAway: (e: Event) => void,
  events = defaultEvents
) {
  const handler = (e: Event) => {
    if (elRef.value && !elRef.value.contains(e.target as Node)) {
      onClickAway(e)
    }
  }

  onMounted(() => {
    events.forEach(evtName => document.addEventListener(evtName, handler))
  })

  onUnmounted(() => {
    events.forEach(evtName => document.removeEventListener(evtName, handler))
  })
}
