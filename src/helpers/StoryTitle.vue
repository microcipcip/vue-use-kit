<template>
  <div>
    <div class="columns">
      <div class="column is-three-fifths">
        <h1 class="title"><slot name="title">Demo</slot></h1>
      </div>
      <div class="column is-two-fifth story-link" v-if="demoName || sourceName">
        <a :href="demoUrl" target="_blank" v-if="demoName">
          Demo
          <span class="icon is-small story-ico"
            ><i class="fas fa-external-link-alt"></i
          ></span>
        </a>
        |
        <a :href="sourceUrl" target="_blank" v-if="sourceName">
          Source
          <span class="icon is-small story-ico"
            ><i class="fas fa-external-link-alt"></i
          ></span>
        </a>
      </div>
    </div>
    <div class="story-intro">
      <slot name="intro"></slot>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getDemoUrl, getSourceUrl } from '../helpers/config'

export default Vue.extend({
  name: 'StoryTitle',
  props: {
    functionPath: {
      type: String,
      required: true
    },
    demoName: {
      type: String,
      required: false
    },
    sourceName: {
      type: String,
      required: false
    }
  },
  computed: {
    demoUrl() {
      return getDemoUrl(this.functionPath, this.demoName)
    },
    sourceUrl() {
      return getSourceUrl(this.functionPath, this.sourceName)
    }
  }
})
</script>

<style scoped>
.story-link {
  text-align: right;
}

.story-ico {
  font-size: 12px;
}

.story-intro a {
  text-decoration: underline;
}
</style>
