<template>
  <button
    type="submit"
    class="btn-submit"
    :class="{ 'is-loading': loading }"
  >
    {{ loading ? 'Loading' : label }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
    default: 'Submit'
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>