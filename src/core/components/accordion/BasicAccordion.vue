<script setup>
import { computed, onMounted, onUpdated, ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    accordion: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: true
    },
    sidebar: {
        type: Boolean,
        default: false
    },
    bIcon: {
        type: Boolean,
        default: false
    },
    value: {
        type: Boolean,
        default: true
    },
    animation: {
        type: Boolean,
        default: true
    },
    handleEmit: Boolean,
    modelValue: Boolean
})

const emit = defineEmits(['handle-click']);

const store = useStore();
const anim = ref(null);
const aHeight = ref(0);
const open = ref(props.handleEmit ? props.modelValue : props.value);
const windowWidth = computed(() => store.state.app.windowWidth);

const handleClick = () => {
    aHeight.value = anim.value.scrollHeight + 'px';
    if (props.handleEmit) {
        emit('handle-click');
    } else {
        open.value = props.accordion ? !open.value : true;
    }
}

watchEffect(() => {
    if (props.handleEmit) {
        open.value = props.modelValue;
    }
})
onMounted(() => {
    aHeight.value = anim.value.scrollHeight + 'px';
})
onUpdated(() => {
    if (anim.value) {
        aHeight.value = anim.value.scrollHeight + 'px';
    }
})
watch(windowWidth, val => {
    aHeight.value = anim.value.scrollHeight + 'px';
})
</script>


<template>
    <div :class="[border ? 'border border-black bg-tertiary-800' : '', 'font-ibm']">
        <div
            @click="handleClick"
            :class="[border && open ? 'border-b border-black' : '', sidebar ? '' : 'px-5', 'flex text-2xl text-white cursor-pointer']"
        >
            <div class="flex-1">
                <slot name="caption"></slot>
            </div>
            <div v-if="accordion" class="self-center cursor-pointer">
                <font-awesome-icon
                    v-if="!open"
                    :icon="['fas', 'sort-down']"
                    :class="[bIcon ? 'text-2xl' : 'text-sm', '-translate-y-1/3']"
                />
                <font-awesome-icon
                    v-if="open"
                    :icon="['fas', 'sort-up']"
                    :class="[bIcon ? 'text-2xl' : 'text-sm']"
                />
            </div>
        </div>
        <div
            :class="[animation ? 'transition-all overflow-hidden' : '']"
            :style="{ maxHeight: animation ? open ? aHeight : '0' : '' }"
        >
            <div ref="anim" v-if="!animation ? open : true">
                <slot />
            </div>
        </div>
    </div>
</template>