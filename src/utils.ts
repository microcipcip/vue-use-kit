// The history methods 'pushState' and 'replaceState' by default do not fire an event
// unless it is coming from user interaction with the browser navigation bar,
// so we are adding a patch to make them detectable
let isPatched = false
export const patchHistoryMethodsOnce = () => {
  if (isPatched) return
  const methods = ['pushState', 'replaceState']
  methods.forEach(method => {
    const original = (history as any)[method]
    ;(history as any)[method] = function(state: any) {
      // eslint-disable-next-line prefer-rest-params
      const result = original.apply(this, arguments)
      const event = new Event(method.toLowerCase())
      ;(event as any).state = state
      window.dispatchEvent(event)
      return result
    }
  })

  isPatched = true
}

export const normalizeEntriesData = (data: [any, any][]) =>
  data.reduce((acc, [key, val]) => {
    acc[key] = val
    return acc
  }, {} as { [key: string]: any })
