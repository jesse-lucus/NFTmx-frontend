<script setup>
defineProps({
  border: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <thead class="text-tertiary-400 text-xs font-mont-light">
    <slot />
  </thead>
</template>
