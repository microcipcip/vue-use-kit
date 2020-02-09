import { ref, onMounted, onUnmounted, Ref } from '../../api'

export function useHover(element: Ref<null | Element>) {
  const isHovered = ref(false)

  const mouseEnterHandler = (e: Event) => {
    isHovered.value = true
  }

  const mouseLeaveHandler = (e: Event) => {
    isHovered.value = false
  }

  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('mouseenter', mouseEnterHandler)
    element.value.addEventListener('mouseleave', mouseLeaveHandler)
  })

  onUnmounted(() => {
    if (!element.value) return
    element.value.removeEventListener('mouseenter', mouseEnterHandler)
    element.value.removeEventListener('mouseleave', mouseLeaveHandler)
  })

  return isHovered
}
