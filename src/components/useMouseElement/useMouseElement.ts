import { ref, onMounted, onUnmounted, Ref } from '../../api'

export function useMouseElement(element: Ref<null | Element>) {
  const docX = ref(0)
  const docY = ref(0)
  const elX = ref(0)
  const elY = ref(0)
  const el = ref({
    x: 0,
    y: 0,
    w: 0,
    h: 0
  })

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!element || !element.value) return
    docX.value = e.pageX
    docY.value = e.pageY
    const { left, top, height, width } = element.value.getBoundingClientRect()
    el.value = {
      x: left + window.pageXOffset,
      y: top + window.pageYOffset,
      w: width,
      h: height
    }
    elX.value = e.pageX - el.value.x
    elY.value = e.pageY - el.value.y
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
    el
  }
}
