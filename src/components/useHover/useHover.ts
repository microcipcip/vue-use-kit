import { ref, onMounted, onUnmounted, Ref } from '@src/api'

export function useHover(elRef: Ref<null | Element>) {
  const isHovered = ref(false)

  const mouseEnterHandler = () => {
    isHovered.value = true
  }

  const mouseLeaveHandler = () => {
    isHovered.value = false
  }

  onMounted(() => {
    if (!elRef.value) return
    elRef.value.addEventListener('mouseenter', mouseEnterHandler)
    elRef.value.addEventListener('mouseleave', mouseLeaveHandler)
  })

  onUnmounted(() => {
    if (!elRef.value) return
    elRef.value.removeEventListener('mouseenter', mouseEnterHandler)
    elRef.value.removeEventListener('mouseleave', mouseLeaveHandler)
  })

  return isHovered
}
