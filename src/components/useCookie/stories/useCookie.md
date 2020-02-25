# useCookie

Vue function that provides way to read, set and remove a cookie.

## Reference

```typescript
function useCookie(
  cookieName: string,
  enableParseJSON?: boolean,
  runOnMount?: boolean
): {
  cookie: Ref<any>
  getCookie: () => void
  setCookie: (newVal: any, options?: CookieSerializeOptions | undefined) => void
  removeCookie: (options?: CookieSerializeOptions | undefined) => void
}
```

### Parameters

- `cookieName: string` the cookie name you wish to get/set/remove
- `enableParseJSON: boolean` whether to enable JSON parsing or not, `false` by default
- `runOnMount: boolean` whether to get the cookie on mount or not, `true` by default

### Returns

- `cookie: Ref<any>` the cookie value, it can be null, a string or a JSON object/array
- `getCookie: Function` get the cookie value
- `setCookie: Function` set the cookie value
  - `newVal: any`: the value to set, can be a string or an object/array
  - `options?: CookieSerializeOptions`: a [cookie](https://github.com/jshttp/cookie#options-1) options object
- `removeCookie: Function` delete the cookie
  - `options?: CookieSerializeOptions`: a [cookie](https://github.com/jshttp/cookie#options-1) options object

## Usage

```html
<template>
  <div>
    Cookie: {{ cookie }}

    <button @click="getCookie">Get cookie</button>
    <button @click="setCookie('Value here')">Set cookie</button>
    <button @click="removeCookie">Remove cookie</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { useCookie } from 'vue-use-kit'

export default Vue.extend({
  name: 'UseCookieDemo',
  setup() {
    const {
      cookie, getCookie, setCookie, removeCookie
    } = useCookie('i_love_cookies')

    return {
      cookie,
      getCookie,
      setCookie,
      removeCookie,
    }
  }
})
```
