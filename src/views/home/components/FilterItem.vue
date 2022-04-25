<script setup>
defineProps({
    title: String,
    active: Boolean
})
</script>

<template>
    <div
        :class="[active ? 'text-primary-900' : '', 'font-ibm-medium text-xs text-white hover:text-primary-900 transition cursor-pointer py-1']"
    >{{ title }}</div>
</template>
