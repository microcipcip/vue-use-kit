import { ref, onMounted, onUnmounted, Ref } from '../../api'

export function useMouseElement(element: Ref<null | Element>) {
  const docX = ref(0)
  const docY = ref(0)
  const elX = ref(0)
  const elY = ref(0)
  const elInfoX = ref(0)
  const elInfoY = ref(0)
  const elInfoW = ref(0)
  const elInfoH = ref(0)

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!element.value) return
    docX.value = e.pageX
    docY.value = e.pageY
    const { left, top, height, width } = element.value.getBoundingClientRect()
    elInfoX.value = left + window.pageXOffset
    elInfoY.value = top + window.pageYOffset
    elInfoW.value = width
    elInfoH.value = height
    elX.value = e.pageX - elInfoX.value
    elY.value = e.pageY - elInfoY.value
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
    elY,
    elInfoX,
    elInfoY,
    elInfoW,
    elInfoH
  }
}
