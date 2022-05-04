<script setup>
defineProps({
    title: String,
    active: Boolean
})
</script>

<template>
    <button
        :class="[active ? 'bg-primary-900' : '', 'transition border border-black h-11.25 text-white text-left px-3 hover:bg-primary-900']"
    >{{ title }}</button>
</template>
