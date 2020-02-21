import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export function useSampleComponent() {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  onUnmounted(() => {
    isMounted.value = false
  })

  return isMounted
}
