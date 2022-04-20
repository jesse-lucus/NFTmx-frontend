<script setup>
import { ref } from 'vue';
import Accordion from '@/core/components/accordion/BasicAccordion.vue';

defineProps({
    title: String
})

const open = ref(false);
const onClickOutside = () => {
    open.value = false;
}
const handleClick = () => {
    open.value = !open.value;
}
</script>

<template>
    <div
        class="border border-black pr-3 bg-black"
        v-click-outside="onClickOutside"
    >
        <accordion
            :border="false"
            :sidebar="true"
            v-model="open"
            @handle-click="handleClick"
            handleEmit
        >
            <template v-slot:caption>
                <div class="flex items-center">
                    <div class="flex-1 text-sm font-ibm-semi-bold pt-3.25 pb-3.75 px-3.5">{{ title }}</div>
                </div>
            </template>
            <div class="grid gap-2.5 justify-between text-xs pb-4">
                <slot name="content" />
            </div>
        </accordion>
    </div>
</template>
