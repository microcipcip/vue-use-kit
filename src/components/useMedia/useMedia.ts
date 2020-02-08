import { ref, onMounted, onUnmounted } from '../../api'

export function useMedia(query: string, defaultState = false) {
  let mql: MediaQueryList
  const matches = ref(defaultState)

  const updateMatchValue = () => (matches.value = mql.matches)

  onMounted(() => {
    mql = window.matchMedia(query)
    mql.addListener(updateMatchValue)
    updateMatchValue()
  })

  onUnmounted(() => {
    mql.removeListener(updateMatchValue)
  })

  return matches
}
