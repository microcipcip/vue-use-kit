# vue-use-kit

[![NPM Version](https://img.shields.io/npm/v/vue-use-kit.svg)](https://www.npmjs.com/package/vue-use-kit) [![NPM Downloads](https://img.shields.io/npm/dm/vue-use-kit.svg)](https://www.npmjs.com/package/vue-use-kit) [![Build Status](https://img.shields.io/travis/microcipcip/vue-use-kit/master.svg)](https://travis-ci.org/microcipcip/vue-use-kit) [![GitHub license](https://img.shields.io/github/license/microcipcip/vue-use-kit?style=flat-square)](https://github.com/microcipcip/vue-use-kit/blob/master/LICENSE) [![Demo](https://img.shields.io/badge/demos-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/)

> 🌳 Vue kit of useful [Vue Composition API](https://vue-composition-api-rfc.netlify.com) functions.</em>

Please note that Vue 3.0 has not been released yet, therefore the installation and setup of [@vue/composition-api](https://github.com/vuejs/composition-api) is required for this library to work.

## Install

```shell script
npm install @vue/composition-api vue-use-kit
```

## Usage

Please check the [documentation](https://microcipcip.github.io/vue-use-kit/) to learn how to use this kit of Vue Composition API functions.

## APIs

- Sensors
  - [`useHover`](./src/components/useHover/stories/useHover.md) &mdash; tracks mouse hover state of a given element. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usehover--demo)
  - [`useMedia`](./src/components/useMedia/stories/useMedia.md) &mdash; tracks state of a CSS media query. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemedia--demo)
  - [`useMouse`](./src/components/useMouse/stories/useMouse.md) &mdash; tracks the mouse position. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouse--demo)
  - [`useMouseElement`](./src/components/useMouseElement/stories/useMouseElement.md) &mdash; tracks the mouse position relative to given element. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/sensors-usemouseelement--demo)
- Animations
  - [`useTimeout`](./src/components/useTimeout/stories/useTimeout.md) &mdash; returns `isReady` true when timer is completed. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-usetimeout--demo)
  - [`useTimeoutFn`](./src/components/useTimeoutFn/stories/useTimeoutFn.md) &mdash; calls function when timer is completed. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/animations-usetimeoutfn--demo)
- UI
  - [`useClickAway`](./src/components/useClickAway/stories/useClickAway.md) &mdash; triggers callback when user clicks outside target area. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/ui-useclickaway--demo)
- Utils
  - [`getQuery`](./src/components/getQuery/stories/getQuery.md) &mdash; get a CSS media query string. [![Demo](https://img.shields.io/badge/demo-🚀-yellow.svg)](https://microcipcip.github.io/vue-use-kit/?path=/story/utils-getquery--demo)

## Inspiration

- [react-use](https://github.com/streamich/react-use)
- [vue-hooks](https://github.com/u3u/vue-hooks)
- [vue-use-web](https://github.com/logaretm/vue-use-web)

## Made with

- [Vue](https://vuejs.org/)
- [@vue/composition-api](https://github.com/vuejs/composition-api)
- [@vue/test-utils](https://vue-test-utils.vuejs.org/)
- [Jest](https://jestjs.io/)
