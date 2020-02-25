import Cookies from 'cookie-universal'
import { CookieSerializeOptions } from 'cookie'
import { ref, onMounted, Ref } from '@src/api'

export function useCookie(
  cookieName: string,
  enableParseJSON = false,
  runOnMount = true
) {
  const cookieLib = Cookies(undefined, undefined, enableParseJSON)
  const cookie: Ref<any> = ref(null)

  const getCookie = () => {
    const cookieVal = cookieLib.get(cookieName)
    if (typeof cookieVal !== 'undefined') cookie.value = cookieVal
  }

  const setCookie = (
    // The user may pass a 'string', a 'number', or a valid JSON object/array
    // so it is better to set allowed cookie value as 'any'
    newVal: any,
    options?: CookieSerializeOptions
  ) => {
    cookieLib.set(cookieName, newVal, options)
    cookie.value = newVal
  }

  const removeCookie = (options?: CookieSerializeOptions) => {
    cookieLib.remove(cookieName, options)
    cookie.value = null
  }

  onMounted(() => runOnMount && getCookie())

  return { cookie, getCookie, setCookie, removeCookie }
}
