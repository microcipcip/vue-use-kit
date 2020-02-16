<template>
  <div ref="elRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch } from '@src/api'
import { useIntersection } from '@src/vue-use-kit'
export default Vue.extend({
  name: 'UseIntersectionElementDemo',
  props: {
    options: {
      default: {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    }
  },
  setup({ options }, { emit }) {
    const elRef = ref(null)
    const { observedEntry } = useIntersection(
      elRef,
      options as IntersectionObserverInit
    )
    watch(() => {
      if (!observedEntry.value) return
      emit('change', observedEntry.value)
    })

    return { elRef }
  }
})
</script>
