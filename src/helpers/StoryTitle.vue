<template>
  <div>
    <div class="columns">
      <div class="column is-four-fifths">
        <h1 class="title"><slot name="title">Demo</slot></h1>
      </div>
      <div class="column is-one-fifth" v-if="fullUrl">
        <a :href="fullUrl" target="_blank">
          View Source
          <span class="icon is-small"><i class="fas fa-link"></i></span>
        </a>
      </div>
    </div>
    <slot name="intro"></slot>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getStoryDemoUrl } from '../helpers/config'

export default Vue.extend({
  name: 'StoryTitle',
  props: {
    storiesPath: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    }
  },
  computed: {
    fullUrl() {
      return getStoryDemoUrl(this.storiesPath, this.fileName)
    }
  }
})
</script>

<style scoped></style>
