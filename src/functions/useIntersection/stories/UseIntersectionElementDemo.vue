<template>
  <div ref="elRef">
    <slot></slot>
    <button
      class="button is-primary"
      @click="handleStart"
      v-if="!isObserving"
      title="Start observing"
    >
      <span class="icon"><i class="fas fa-play"></i></span>
    </button>
    <button
      class="button is-warning"
      @click="handleStop"
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
      emit('changed', observedEntry.value)
    })

    let isObserving = ref(true)
    const handleStart = () => {
      if (!observedEntry.value) return
      start()
      emit('paused', observedEntry.value.target, false)
      isObserving.value = true
    }

    const handleStop = () => {
      if (!observedEntry.value) return
      stop()
      emit('paused', observedEntry.value.target, true)
      isObserving.value = false
    }

    return { handleStart, handleStop, isObserving, elRef }
  }
})
</script>
