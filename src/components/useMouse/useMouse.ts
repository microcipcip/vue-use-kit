import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'

export function useMouse(el?: Ref<null | Element>) {
  const docX = ref(0)
  const docY = ref(0)
  const elX = ref(0)
  const elY = ref(0)

  const mouseMoveHandler = (e: MouseEvent) => {
    docX.value = e.pageX
    docY.value = e.pageY

    if (!el || !el.value) return
    const { left, top } = el.value.getBoundingClientRect()
    const posX = left + window.pageXOffset
    const posY = top + window.pageYOffset
    elX.value = e.pageX - posX
    elY.value = e.pageY - posY
  }

  onMounted(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', mouseMoveHandler)
  })

  return {
    docX,
    docY,
    elX,
    elY
  }
}
