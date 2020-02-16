<template>
  <div ref="elRef">
    <slot></slot>
    <button
      class="button is-primary"
      @click="handleObserverState"
      v-if="!isObserving"
      title="Start observing"
    >
      <span class="icon"><i class="fas fa-play"></i></span>
    </button>
    <button
      class="button is-warning"
      @click="handleObserverState"
      v-else
      title="Stop observing"
    >
      <span class="icon"><i class="fas fa-pause"></i></span>
    </button>
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

    const { observedEntry, start, stop } = useIntersection(
      elRef,
      options as IntersectionObserverInit
    )

    watch(() => {
      if (!observedEntry.value) return
      emit('change', observedEntry.value)
    })

    let isObserving = ref(true)
    const handleObserverState = () => {
      if (!observedEntry.value) return
      if (isObserving.value) {
        stop()
        emit('paused', observedEntry.value.target, true)
        isObserving.value = false
      } else {
        start()
        emit('paused', observedEntry.value.target, false)
        isObserving.value = true
      }
    }

    return { handleObserverState, isObserving, elRef }
  }
})
</script>
