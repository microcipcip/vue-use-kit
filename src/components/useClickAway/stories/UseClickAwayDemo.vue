<template>
  <div
    class="dropdown"
    ref="dropdownRef"
    :class="{ 'is-active': isDropdownOpen }"
  >
    <div class="dropdown-trigger">
      <button class="button" @click="openDropdownHandler">
        <span>Click me!</span>
        <span class="icon is-small"><i class="fas fa-angle-down"></i></span>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item" @click.prevent="closeDropdownHandler"
          >Home</a
        >
        <a href="#" class="dropdown-item" @click.prevent="closeDropdownHandler"
          >About</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '../../../api'
import { useClickAway } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseClickAwayDemo',
  setup() {
    const dropdownRef = ref(null)
    const isDropdownOpen = ref(false)
    const clickAwayHandler = () => {
      isDropdownOpen.value = false
    }

    useClickAway(dropdownRef, clickAwayHandler)

    const openDropdownHandler = () => {
      isDropdownOpen.value = true
    }

    const closeDropdownHandler = () => {
      isDropdownOpen.value = false
    }

    return {
      dropdownRef,
      isDropdownOpen,
      openDropdownHandler,
      closeDropdownHandler
    }
  }
})
</script>
