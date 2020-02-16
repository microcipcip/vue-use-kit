<template>
  <div class="section">
    <div class="intersection" v-for="el in divElements">
      <use-intersection-element-demo
        class="intersection__el"
        :options="intersectionOpts"
        @changed="handleIntersectionChange"
        @paused="handleIntersectionPaused"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UseIntersectionElementDemo from './UseIntersectionElementDemo.vue'

export default Vue.extend({
  name: 'UseIntersectionDemo',
  components: { UseIntersectionElementDemo },
  setup() {
    const intersectionOpts = {
      root: null,
      rootMargin: '-40px 0px -40px',
      threshold: 1
    }

    const divElements = new Array(100)

    const handleIntersectionChange = ({
      target,
      intersectionRatio
    }: IntersectionObserverEntry) => {
      const isVisible = intersectionRatio === 1
      target.classList.toggle('-is-active', isVisible)
    }

    const handleIntersectionPaused = (target: Element, isPaused: boolean) => {
      target.classList.toggle('-is-paused', isPaused)
    }

    return {
      divElements,
      intersectionOpts,
      handleIntersectionChange,
      handleIntersectionPaused
    }
  }
})
</script>

<style scoped>
.section {
  padding: 20px 0;
}

.intersection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}

/* El */
.intersection__el {
  position: relative;
  width: 80px;
  height: 80px;
}

/* Action buttons */
/deep/ .intersection__el .button {
  position: absolute;
  top: 50%;
  left: 130px;
  transform: translateY(-50%);
}

/* Circle */
.intersection__el:after {
  content: 'Not intersecting';
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  background: red;
  color: white;
  font-size: 12px;
  transition: all 0.7s ease-in-out;
  transform: translate(-50%, -50%) scale(1);
}

.intersection__el.-is-active:after {
  content: 'Intersecting';
  background: green;
  transform: translate(-50%, -50%) scale(1.4);
}

.intersection__el.-is-paused:after {
  content: 'Disabled';
  background: orange;
}
</style>
