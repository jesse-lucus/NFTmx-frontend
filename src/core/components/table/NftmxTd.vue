<script setup>
defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  first: Boolean,
});
</script>

<template>
  <td
    :class="[
      border ? 'border-r border-black' : '',
      first ? 'px-6' : 'px-4',
      'py-4 whitespace-nowrap text-xs',
    ]"
  >
    <slot />
  </td>
</template>
