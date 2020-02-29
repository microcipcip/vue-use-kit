import Cookies from 'cookie-universal'
import { CookieSerializeOptions } from 'cookie'
import {
  createSerializer,
  createDeserializer,
  trySerialize,
  tryDeserialize
} from '@src/utils'
import { ref, onMounted, Ref } from '@src/api'

export interface UseCookieOptions {
  isParsing: boolean
  serializer?: (value: any) => string
  deserializer?: (value: string) => any
}

const defaultOptions = {
  isParsing: false
}

export function useCookie(
  cookieName: string,
  options?: UseCookieOptions,
  runOnMount = true
) {
  const { isParsing, ...opts } = Object.assign({}, defaultOptions, options)
  const cookieLib = Cookies(undefined, undefined, false)
  const cookie: Ref<any> = ref(null)

  const serializer = createSerializer(opts.serializer)
  const deserializer = createDeserializer(opts.deserializer)

  const getCookie = () => {
    const cookieVal = tryDeserialize(
      cookieLib.get(cookieName),
      deserializer,
      isParsing
    )
    if (typeof cookieVal !== 'undefined') cookie.value = cookieVal
  }

  const setCookie = (
    // The user may pass a 'string', a 'number', a valid JSON object/array
    // or even a custom object when serializer/deserializer are defined
    // so it is better to set allowed cookie value as 'any'
    newVal: any,
    options?: CookieSerializeOptions
  ) => {
    const newCookieVal = trySerialize(newVal, serializer, isParsing)
    cookieLib.set(cookieName, newCookieVal, options)
    cookie.value = tryDeserialize(newCookieVal, deserializer, isParsing)
  }

  const removeCookie = (options?: CookieSerializeOptions) => {
    cookieLib.remove(cookieName, options)
    cookie.value = null
  }

  onMounted(() => runOnMount && getCookie())

  return { cookie, getCookie, setCookie, removeCookie }
}
