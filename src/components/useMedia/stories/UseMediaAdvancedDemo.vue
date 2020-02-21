<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Query</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>isMobile</td>
        <td :class="getMediaClass(isMobile)">{{ isMobile }}</td>
      </tr>
      <tr>
        <td>isTablet</td>
        <td :class="getMediaClass(isTablet)">{{ isTablet }}</td>
      </tr>
      <tr>
        <td>isDesktop</td>
        <td :class="getMediaClass(isDesktop)">{{ isDesktop }}</td>
      </tr>
      <tr>
        <td>isPortrait</td>
        <td>{{ isPortrait }}</td>
      </tr>
      <tr>
        <td>isLandscape</td>
        <td>{{ isLandscape }}</td>
      </tr>
      <tr>
        <td>orientation</td>
        <td>{{ orientation }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { getQuery, useMedia } from '@src/vue-use-kit'

// breakpoints
const bp = { xxs: 0, xs: 320, s: 400, m: 768, ml: 992, l: 1100 }

const getMediaClass = (val: string) => (val ? 'query-valid' : 'query-invalid')

const useResponsive = () => {
  const isMobile = useMedia(getQuery(bp.xxs, bp.s))
  const isTablet = useMedia(getQuery(bp.s, bp.m))
  const isDesktop = useMedia(getQuery(bp.m))
  const isPortrait = useMedia(`only screen and (orientation: portrait)`)
  const isLandscape = computed(() => !isPortrait.value)
  const orientation = computed(() =>
    isPortrait.value ? 'portrait' : 'landscape'
  )

  return {
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    orientation
  }
}

export default Vue.extend({
  name: 'UseMediaAdvanced',
  setup() {
    return {
      ...useResponsive(),
      getMediaClass
    }
  }
})
</script>

<style scoped>
.query-valid {
  color: #fff;
  background: #209817;
}

.query-invalid {
  color: #fff;
  background: #981105;
}
</style>
