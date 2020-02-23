import Cookies from 'js-cookie'
import { ref, Ref } from '@vue/composition-api'

type CookieValueType = string | JSON

const tryParse = (val: string, enableParsing: boolean) => {
  if (!enableParsing) return val
  try {
    return JSON.parse(val)
  } catch (err) {
    return val
  }
}

const tryStringify = (val: CookieValueType, enableParsing: boolean) => {
  if (!enableParsing) return val
  try {
    return JSON.stringify(val)
  } catch (err) {
    return val
  }
}

export function useCookie(cookieName: string, enableParseJSON = false) {
  const getCookie = () => {
    const cookieVal = Cookies.get(cookieName)
    if (typeof cookieVal === 'undefined') return null
    return tryParse(cookieVal, enableParseJSON)
  }

  const cookie = ref(getCookie())

  const updateCookie = (
    newVal: CookieValueType,
    options?: Cookies.CookieAttributes
  ) => {
    const newCookieValue = tryStringify(newVal, enableParseJSON)
    Cookies.set(cookieName, newCookieValue, options)
    cookie.value = newVal
  }

  const deleteCookie = (options?: Cookies.CookieAttributes) => {
    Cookies.remove(cookieName, options)
    cookie.value = null
  }

  return { cookie, updateCookie, deleteCookie }
}
