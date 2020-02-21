<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">{{label}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: {
      label: String,
    }
  }
</script>
