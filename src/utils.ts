const checkType = (typeToCheck: any) =>
  Object.prototype.toString.call(typeToCheck)

export const isObj = (varToCheck: any) =>
  checkType(varToCheck) === '[object Object]'

export const isNull = (varToCheck: any) =>
  checkType(varToCheck) === '[object Null]'

export const isUndefined = (varToCheck: any) =>
  checkType(varToCheck) === '[object Undefined]'

export const isNullOrUndefined = (varToCheck: any) =>
  isNull(varToCheck) || isUndefined(varToCheck)

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

export const createSerializer = (serializer?: Function) =>
  serializer || JSON.stringify

export const createDeserializer = (deserializer?: Function) =>
  deserializer || JSON.parse

export const trySerialize = (
  val: any,
  serializer: Function,
  shouldSerialize?: boolean
) => {
  if (!shouldSerialize) return String(val)
  try {
    return serializer(val)
  } catch (error) {
    return val
  }
}

export const tryDeserialize = (
  val: any,
  deserializer: Function,
  shouldDeserialize?: boolean
) => {
  if (!shouldDeserialize) return val
  try {
    return deserializer(val)
  } catch (error) {
    return val
  }
}
