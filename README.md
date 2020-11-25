<p align="center">
  <br>
  <br>
  <a href="https://github.com/microcipcip/vue-use-kit">
    <img 
      src="https://raw.githubusercontent.com/microcipcip/vue-use-kit/master/public/branding/logo.png" 
      alt="Vue use kit" 
      width="200" 
    />
  </a>
  <br>
  <br>
  <br>
</p>

[![NPM Version](https://img.shields.io/npm/v/vue-use-kit.svg)](https://www.npmjs.com/package/vue-use-kit) [![NPM Downloads](https://img.shields.io/npm/dm/vue-use-kit.svg)](https://www.npmjs.com/package/vue-use-kit) [![Build Status](https://img.shields.io/travis/microcipcip/vue-use-kit/master.svg)](https://travis-ci.org/microcipcip/vue-use-kit) [![GitHub license](https://img.shields.io/github/license/microcipcip/vue-use-kit?style=flat-square)](https://github.com/microcipcip/vue-use-kit/blob/master/LICENSE)
[![Demo](https://img.shields.io/badge/demos-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/)

> 🛠️ Vue kit of useful [Vue Composition API](https://vue-composition-api-rfc.netlify.com) functions.</em>

## Install

```shell script
npm install vue-use-kit
```

This library is built for Vue 2 and Vue 3, but if you are using Vue 2, you must also install [@vue/composition-api](https://github.com/vuejs/composition-api) library, which will enable the composition API in Vue 2.

```shell script
npm install @vue/composition-api
```

> Setup Composition API in Vue 2
```js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
```

## Usage

### Vue3
```html
<template>
  <div>isDesktop: {{ isDesktop ? 'Yes' : 'No' }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useMedia } from 'vue-use-kit'

  export default defineComponent({
    name: 'UseMedia',
    setup() {
      const query = '(min-width: 1024px)'
      const isDesktop = useMedia(query)
      return { isDesktop }
    }
  })
</script>
```
### Vue2
```html
<template>
  <div>isDesktop: {{ isDesktop ? 'Yes' : 'No' }}</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMedia } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseMedia',
    setup() {
      const query = '(min-width: 1024px)'
      const isDesktop = useMedia(query)
      return { isDesktop }
    }
  })
</script>
```

## APIs

- Sensors
  - [`useGeolocation`](./src/functions/useGeolocation/stories/useGeolocation.md) &mdash; tracks geolocation state of user's device.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usegeolocation--demo)
  - [`useHover`](./src/functions/useHover/stories/useHover.md) &mdash; tracks mouse hover state of a given element.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usehover--demo)
  - [`useIdle`](./src/functions/useIdle/stories/useIdle.md) &mdash; tracks whether user is being inactive.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-useidle--demo)
  - [`useIntersection`](./src/functions/useIntersection/stories/useIntersection.md) &mdash; tracks intersection of target element with an ancestor element.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-useintersection--demo)
    [![Demo](https://img.shields.io/badge/advanced_demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-useintersection--advanced-demo)
  - [`useKey`](./src/functions/useKey/stories/useKey.md) &mdash; executes a handler when a keyboard key is pressed.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usekey--demo)
  - [`useLocation`](./src/functions/useLocation/stories/useLocation.md) &mdash; tracks bar navigation location state.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-uselocation--demo)
  - [`useMedia`](./src/functions/useMedia/stories/useMedia.md) &mdash; tracks state of a CSS media query.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemedia--demo)
    [![Demo](https://img.shields.io/badge/advanced_demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemedia--advanced-demo)
  - [`useMediaDevices`](./src/functions/useMediaDevices/stories/useMediaDevices.md) &mdash; tracks connected hardware devices.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemediadevices--demo)
  - [`useMouse`](./src/functions/useMouse/stories/useMouse.md) &mdash; tracks the mouse position.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouse--demo)
    [![Demo](https://img.shields.io/badge/advanced_demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouse--advanced-demo)
  - [`useMouseElement`](./src/functions/useMouseElement/stories/useMouseElement.md) &mdash; tracks the mouse position relative to given element.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouseelement--demo)
  - [`useMouseLeavePage`](./src/functions/useMouseLeavePage/stories/useMouseLeavePage.md) &mdash; tracks when mouse leaves page boundaries.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouseleavepage--demo)
  - [`useOrientation`](./src/functions/useOrientation/stories/useOrientation.md) &mdash; tracks state of device's screen orientation.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-useorientation--demo)
  - [`useSize`](./src/functions/useSize/stories/useSize.md) &mdash; tracks size of an HTML element.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usesize--demo)
  - [`useScroll`](./src/functions/useScroll/stories/useScroll.md) &mdash; tracks an HTML element's scroll position.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usescroll--demo)
  - [`useScrollbarWidth`](./src/functions/useScrollbarWidth/stories/useScrollbarWidth.md) &mdash; gets current browser's scrollbar width.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usescrollbarwidth--demo)
  - [`useSearchParams`](./src/functions/useSearchParams/stories/useSearchParams.md) &mdash; tracks browser's location search params.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usesearchparams--demo)
  - [`useWindowSize`](./src/functions/useWindowSize/stories/useWindowSize.md) &mdash; tracks `Window` scroll position.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usewindowsize--demo)
- Animations
  - [`useInterval`](./src/functions/useInterval/stories/useInterval.md) &mdash; updates `counter` value repeatedly on a fixed time delay.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-useinterval--demo)
  - [`useIntervalFn`](./src/functions/useIntervalFn/stories/useIntervalFn.md) &mdash; calls function repeatedly on a fixed time delay.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-useintervalfn--demo)
  - [`useRaf`](./src/functions/useRaf/stories/useRaf.md) &mdash; returns `elapsedTime` with requestAnimationFrame.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-useraf--demo)
  - [`useRafFn`](./src/functions/useRafFn/stories/useRafFn.md) &mdash; calls function with requestAnimationFrame.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-useraffn--demo)
    [![Demo](https://img.shields.io/badge/advanced_demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-useraffn--advanced-demo)
  - [`useTimeout`](./src/functions/useTimeout/stories/useTimeout.md) &mdash; returns `isReady` true when timer is completed.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-usetimeout--demo)
  - [`useTimeoutFn`](./src/functions/useTimeoutFn/stories/useTimeoutFn.md) &mdash; calls function when timer is completed.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-usetimeoutfn--demo)
- Side Effects
  - [`useBeforeUnload`](./src/functions/useBeforeUnload/stories/useBeforeUnload.md) &mdash; shows browser alert when user try to reload or close the page.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/side-effects-usebeforeunload--demo)
  - [`useCookie`](./src/functions/useCookie/stories/useCookie.md) &mdash; provides way to read, update and delete a cookie.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/side-effects-usecookie--demo)
  - [`useFetch`](./src/functions/useFetch/stories/useFetch.md) &mdash; provides a way to fetch resources asynchronously across the network.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/side-effects-usefetch--demo)
  - [`useLocalStorage`](./src/functions/useLocalStorage/stories/useLocalStorage.md) &mdash; provides way to read, update and delete a localStorage key.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/side-effects-uselocalstorage--demo)
  - [`useSessionStorage`](./src/functions/useSessionStorage/stories/useSessionStorage.md) &mdash; provides way to read, update and delete a sessionStorage key.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/side-effects-usesessionstorage--demo)
- UI
  - [`useClickAway`](./src/functions/useClickAway/stories/useClickAway.md) &mdash; triggers callback when user clicks outside target area.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/ui-useclickaway--demo)
  - [`useFullscreen`](./src/functions/useFullscreen/stories/useFullscreen.md) &mdash; display an element in full-screen mode
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/ui-usefullscreen--demo)
- Utils
  - [`getQuery`](./src/functions/getQuery/stories/getQuery.md) &mdash; get a CSS media query string.
    [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/utils-getquery--demo)

## 🎁 Other examples of composition API functions

Some Vue composition API functions have not been included in this library but
can be created easily by following the steps below.

<details><summary>useStore</summary><p>

Creating a useStore function connected to Vuex store is pretty straightforward.
For example, given the following store:

```typescript
// @src/mystore.ts
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { searchTerm: '' },
  mutations: {
    SET_SEARCH(state, newVal) {
      state.searchTerm = newVal
    }
  },
  getters: { searchTerm: state => state.searchTerm },
  actions: {},
  modules: {}
})

export default store
```

We can get the store from the `vm` and expose it in our useStore function:

```typescript
// @src/useStore.ts
import { getCurrentInstance } from 'vue'

export function useStore() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('Vue instance not found!')
  return vm.$store
}
```

Now we can use useStore inside the setup() method of our component:

```html
// MyComponent.vue
<template>
  <input type="text" v-model="searchTerm" placeholder="🔎 Search..." />
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useStore } from '@src/useStore'

  export default defineComponent({
    name: 'UseStoreDemo',
    setup() {
      const { commit, getters } = useStore()
      const searchTerm = ref(getters['searchTerm'])
      watch(searchTerm, newVal => commit('SET_SEARCH', newVal))
      return { searchTerm }
    }
  })
</script>
```

</p></details>

<details><summary>useRouter</summary><p>

Creating a useRouter function connected to VueRouter is rather simple.
We can get `$route` and `$router` from the `vm` and expose them in our useRouter function:

```typescript
// @src/useRouter.ts
import { getCurrentInstance } from 'vue'

export function useRouter() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('Vue instance not found!')
  const route = vm.$route
  const router = vm.$router
  return { route, router }
}
```

Now we can use useRouter inside the setup() method of our component:

```html
// MyComponent.vue
<template>
  <div>
    Current id: {{ id }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from '@src/useRouter'

  export default defineComponent({
    name: 'UseRouterDemo',
    setup() {
      const { route } = useRouter()
      return { id: route.params.id }
    }
  })
</script>
```

</p></details>

## Inspiration

- [react-use 👍](https://github.com/streamich/react-use)
- [vue-hooks](https://github.com/u3u/vue-hooks)
- [vue-use-web](https://github.com/logaretm/vue-use-web)

## Made with

- [Vue](https://vuejs.org/)
- [@vue/composition-api](https://github.com/vuejs/composition-api)
- [@vue/test-utils](https://vue-test-utils.vuejs.org/)
- [Jest](https://jestjs.io/)
