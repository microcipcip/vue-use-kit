import { ref, onMounted, onUnmounted } from '@src/api'

export function useMouse() {
  const docX = ref(0)
  const docY = ref(0)

  const mouseMoveHandler = (e: MouseEvent) => {
    docX.value = e.pageX
    docY.value = e.pageY
  }

  onMounted(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', mouseMoveHandler)
  })

  return {
    docX,
    docY
  }
}
