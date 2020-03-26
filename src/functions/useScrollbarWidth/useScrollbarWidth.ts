import { ref, onMounted, Ref } from '@src/api'

export function useScrollbarWidth(runOnMount = true) {
  const scrollbarWidth = ref(0)

  const getScrollbarWidth = () => {
    // https://stackoverflow.com/a/13382873/974107
    // Creating invisible container
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll' // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
    document.body.appendChild(outer)

    // Creating inner element and placing it in the container
    const inner = document.createElement('div')
    outer.appendChild(inner)

    // Calculating difference between container's full width and the child width
    const scrollbarWidthValue = outer.offsetWidth - inner.offsetWidth

    // Removing temporary elements from the DOM
    if (outer.parentNode) outer.parentNode.removeChild(outer)

    scrollbarWidth.value = scrollbarWidthValue
  }

  onMounted(() => runOnMount && getScrollbarWidth())

  return { scrollbarWidth, getScrollbarWidth }
}
