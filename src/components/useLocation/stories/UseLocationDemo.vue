<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>locationState</td>
        <td>
          <pre>{{ JSON.stringify(locationState, null, 2) }}</pre>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="push">
            Fire push event
          </button>
          <button class="button is-danger" @click="replace">
            Fire replace event
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Start tracking location
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking location
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useLocation } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseLocationDemo',
  setup() {
    let count = 0
    const url = location.origin + location.pathname + location.search
    const push = () => {
      count++
      history.pushState({ page: count }, '', `${url}&page=${count}`)
    }
    const replace = () => {
      count--
      history.replaceState({ page: count }, '', `${url}&page=${count}`)
    }

    const { locationState, isTracking, start, stop } = useLocation()
    return { locationState, isTracking, start, stop, push, replace }
  }
})
</script>
