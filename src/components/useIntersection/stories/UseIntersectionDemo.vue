<template>
  <div class="section">
    <div class="intersection" v-for="el in divElements">
      <use-intersection-element-demo
        class="intersection__el"
        :options="intersectionOpts"
        @change="handleIntersectionChange"
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

    return { divElements, intersectionOpts, handleIntersectionChange }
  }
})
</script>

<style>
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

/* Circle */
.intersection__el:after {
  content: 'OFF';
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: red;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  transition: all 0.7s ease-in-out;
  transform: translate(-50%, -50%) scale(1);
}

.intersection__el.-is-active:after {
  content: 'ON';
  background: green;
  transform: translate(-50%, -50%) scale(1.4);
}
</style>
